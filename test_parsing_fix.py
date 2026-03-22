"""Test the new robust JSON parsing logic from core/graph.py."""
import re
import json

def _parse_json_plan(text):
    # 1. Clean markdown fences
    text = re.sub(r'```(?:json)?\s*(.*?)\s*```', r'\1', text, flags=re.DOTALL)
    
    # 2. Find anything that looks like a JSON array or object
    json_match = re.search(r'\[.*\]|\{.*\}', text, re.DOTALL)
    if not json_match:
        return None
    
    raw_json_str = json_match.group(0)
    
    # 3. Try to parse it
    try:
        parsed = json.loads(raw_json_str)
    except Exception:
        # Try fixing common errors (single quotes, trailing commas)
        try:
            # Basic fix for common model error: single quotes for keys/strings
            fixed = re.sub(r"'(.*?)'", r'"\1"', raw_json_str)
            parsed = json.loads(fixed)
        except Exception:
            return None
    
    # 4. Normalize to array
    if isinstance(parsed, dict):
        # If the model returned {"instructions": [...]} or {"steps": [...]}
        for key in ["instructions", "steps", "plan", "actions"]:
            if key in parsed and isinstance(parsed[key], list):
                return parsed[key]
        return [parsed] # Wrap single object in list
    
    return parsed if isinstance(parsed, list) else None

# Test cases based on observed failures
test_responses = [
    # Case 1: The "Instructions" object failure
    """ Here is an example JSON object that represents your task:
    ```json
    {
      "name": "devops",
      "type": "OrchestratorAI",
      "instructions": [
        {"tool": "text_writer", "args": {"prompt": "what is devops"}},
        {"tool": "notification_api.send_message", "args": {"recipients": ["test@test.com"], "message": "{PREVIOUS_STEP_OUTPUT}"}}
      ]
    }
    ```""",
    
    # Case 2: Single quotes failure
    """[{'tool': 'text_writer', 'args': {'prompt': 'hello'}}]""",
    
    # Case 3: Wrapped in text without fences
    "Sure, here is your plan: [{\"tool\": \"researcher\", \"args\": {\"query\": \"weather\"}}] Hope this helps!",
    
    # Case 4: MD fences with 'json' label
    "```json\n[{\"tool\": \"doc_parser\", \"args\": {\"filepath\": \"test.txt\"}}]\n```"
]

print("=" * 60)
print("RUNNING PARSING TESTS")
print("=" * 60)

for i, resp in enumerate(test_responses):
    print(f"\n--- TEST CASE {i+1} ---")
    plan = _parse_json_plan(resp)
    if plan:
        print(f"SUCCESS: Parsed {len(plan)} steps.")
        print(f"PLAN: {plan}")
    else:
        print("FAILED: Could not parse plan.")

print("\n" + "=" * 60)
print("TESTING LIVE API WITH NEW PROMPT")
print("=" * 60)

import os
os.environ['KRUTRIM_CLOUD_API_KEY'] = os.getenv('KRUTRIM_CLOUD_API_KEY', '6CIYq3OVlXswA9FW4eME6Hqv')
from krutrim_cloud import KrutrimCloud
client = KrutrimCloud(api_key=os.environ['KRUTRIM_CLOUD_API_KEY'])

system_prompt = """You are the strictly-typed Orchestrator AI for the Autonomous Multi-Step AI Agent.
Your ONLY job is to route the user's request by outputting a JSON execution plan.
Do NOT attempt to fulfill the user's request directly.

Available Tools:
1. "researcher" - Arguments: {"query": "<search string>"}
2. "notification_api.send_message" - Arguments: {"recipients": ["email"], "message": "<body>"}
3. "text_writer" - Arguments: {"prompt": "<detailed instructions>"}

CRITICAL INSTRUCTION: You MUST respond ONLY with a raw JSON array of objects. NEVER respond with conversational text or nested objects like {"instructions": [...]}.
Output format must be EXACTLY: [{"tool": "name", "args": {...}}, ...]
"""

resp = client.chat.completions.create(
    model="Krutrim-spectre-v2",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "write a bio for me and email it to me@me.com"}
    ]
)

raw = resp.choices[0].message.content
print(f"\nRAW RESPONSE:\n{raw}")
plan = _parse_json_plan(raw)
if plan:
    print(f"\nVERIFIED: Parsed {len(plan)} steps from live API.")
    print(f"PLAN: {plan}")
else:
    print("\nSTILL FAILED: Live API response is still not parsable.")
