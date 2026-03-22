"""Test what the Krutrim LLM actually returns when asked for JSON."""
import os
import re

os.environ['KRUTRIM_CLOUD_API_KEY'] = os.getenv('KRUTRIM_CLOUD_API_KEY', '6CIYq3OVlXswA9FW4eME6Hqv')

from krutrim_cloud import KrutrimCloud
client = KrutrimCloud(api_key=os.environ['KRUTRIM_CLOUD_API_KEY'])

system_prompt = """You are the strictly-typed Orchestrator AI for the Autonomous Multi-Step AI Agent.
Your ONLY job is to route the user's request by outputting a JSON execution plan.
Do NOT attempt to fulfill the user's request directly.

Available Tools:
1. "text_writer" - Arguments: {"prompt": "<detailed instructions>"}
2. "notification_api.send_message" - Arguments: {"recipients": ["email"], "message": "<body>"}

CRITICAL INSTRUCTION: You MUST respond ONLY with a raw JSON array of objects inside a ```json``` block. NEVER respond with conversational text.
Example Output:
```json
[
    {"tool": "text_writer", "args": {"prompt": "Write a 500 word essay on LLMs"}},
    {"tool": "notification_api.send_message", "args": {"recipients": ["user@gmail.com"], "message": "Here is the essay requested:\\n\\n{PREVIOUS_STEP_OUTPUT}"}}
]
```
"""

user_msg = "what is devops"

print("=" * 60)
print("SENDING TO KRUTRIM API...")
print("=" * 60)

resp = client.chat.completions.create(
    model="Krutrim-spectre-v2",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_msg}
    ]
)

raw = resp.choices[0].message.content
print("\n=== RAW RESPONSE (repr) ===")
print(repr(raw))
print("\n=== RAW RESPONSE (display) ===")
print(raw)

# Test current parsing logic
print("\n=== PARSING TEST ===")
match = re.search(r'\[.*\]', raw, re.DOTALL)
if match:
    print(f"Regex matched: {match.group(0)[:200]}")
    import json
    try:
        parsed = json.loads(match.group(0))
        print(f"JSON parsed successfully: {parsed}")
    except Exception as e:
        print(f"JSON parse FAILED: {e}")
else:
    print("NO MATCH - regex did not find [...] in response")
    print("This is WHY it falls back to heuristic!")
