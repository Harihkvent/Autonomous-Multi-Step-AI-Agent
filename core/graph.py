import sys
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import os
import re
import json
from dotenv import load_dotenv
load_dotenv()
from typing import Annotated, Sequence, TypedDict, Dict, Any, List, Optional
import operator
from core.lc_compat import BaseMessage, HumanMessage, AIMessage, SystemMessage, StateGraph, END

from pydantic import BaseModel, Field, ValidationError
from tools.registry import registry
import tools.agent_tools
import tools.system_tools
import tools.calendar_tool
import tools.notification_tool
import tools.search_tool
import tools.vercel_tool
import core.database as db
from agents.executor import executor
from models import Step
from core.utils import truncate_history

# httpx is already in deps — use it directly instead of the heavy openai SDK
import httpx as _httpx

_GROQ_API_KEY = os.getenv("GROQ_API_KEY")
_KRUTRIM_API_KEY = os.getenv("KRUTRIM_CLOUD_API_KEY")
groq_client = bool(_GROQ_API_KEY)       # True = available
krutrim_client = bool(_KRUTRIM_API_KEY) # True = available

def _chat_completion(base_url: str, api_key: str, model: str, messages: list, timeout: int = 60) -> str:
    """Thin httpx wrapper for any OpenAI-compatible chat completions endpoint."""
    resp = _httpx.post(
        f"{base_url.rstrip('/')}/chat/completions",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={"model": model, "messages": messages},
        timeout=timeout,
    )
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"]

# Define the State for our Graph
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str
    pending_plan: Optional[List[Dict[str, Any]]]
    execution_trace: Optional[List[Dict[str, Any]]]
    metadata: Dict[str, Any]


# Pydantic models for structured planning
class PlanStep(BaseModel):
    tool: str = Field(..., description="The name of the tool to use", alias="function")
    args: Dict[str, Any] = Field(default_factory=dict, description="The arguments for the tool", alias="parameters")

    model_config = {
        "populate_by_name": True,
        "extra": "ignore"
    }

class ExecutionPlan(BaseModel):
    steps: List[PlanStep] = Field(..., description="The sequence of steps to execute")

def _parse_json_plan(text):
    # 1. Clean markdown fences
    text = re.sub(r'```(?:json)?\s*(.*?)\s*```', r'\1', text, flags=re.DOTALL).strip()
    
    # 2. Find anything that looks like a JSON array or object
    json_match = re.search(r'\[.*\]|\{.*\}', text, re.DOTALL)
    if not json_match:
        return None
    
    raw_json_str = json_match.group(0)
    
    # 3. Try to parse it
    try:
        parsed = json.loads(raw_json_str)
    except Exception:
        # Try finding a list if it was a raw list instead of object with 'steps'
        list_match = re.search(r'\[\s*\{.*\}\s*\]', text, re.DOTALL)
        if list_match:
            try:
                parsed = json.loads(list_match.group(0))
            except Exception:
                # Try fixing common errors (single quotes, trailing commas)
                try:
                    fixed = re.sub(r"'(.*?)'", r'"\1"', raw_json_str)
                    parsed = json.loads(fixed)
                except Exception:
                    return None
        else:
            return None
    
    # 4. Normalize steps list
    steps_list = []
    if isinstance(parsed, dict):
        for key in ["steps", "plan", "instructions", "actions"]:
            if key in parsed and isinstance(parsed[key], list):
                steps_list = parsed[key]
                break
        if not steps_list:
            steps_list = [parsed]
    elif isinstance(parsed, list):
        steps_list = parsed
 
    # 5. Robust normalization and validation using Pydantic models
    normalized_steps = []
    for step in steps_list:
        if isinstance(step, str):
            # If the model just outputs a string, treat it as a researcher query if it looks like a question
            if "?" in step or len(step.split()) > 3:
                normalized_steps.append(PlanStep(tool="researcher", args={"query": step}))
            else:
                normalized_steps.append(PlanStep(tool=step, args={}))
            continue
            
        if not isinstance(step, dict):
            continue

        # Map common keys to 'tool'
        tool = step.get("tool") or step.get("function") or step.get("action") or step.get("method") or step.get("name")
        # Map common keys to 'args'
        args = step.get("args") or step.get("parameters") or step.get("payload") or step.get("inputs") or step.get("input") or {}
        
        # If tool is missing but step has keys matching our tools, infer it
        if not tool:
            known_tools = ["researcher", "doc_parser", "doc_generator", "calendar_api", "notification_api", "text_writer", "get_current_date", "get_system_info", "calculator", "weather", "inbox_reader"]
            for kt in known_tools:
                if kt in step or any(kt in str(v) for v in step.values()):
                    tool = kt
                    break
        
        # If args is empty and there are other keys, they might be the args
        if not args and len(step) > 1:
            args = {k: v for k, v in step.items() if k not in ["tool", "function", "action", "method", "name", "step", "index", "id", "description"]}

        if tool:
            try:
                # Use Pydantic to validate/normalize the step
                normalized_steps.append(PlanStep(tool=str(tool), args=args if isinstance(args, dict) else {"query": str(args)}))
            except Exception:
                pass

    if not normalized_steps:
        return None

    try:
        # Validate whole execution plan
        validated_plan = ExecutionPlan(steps=normalized_steps)
        return [step.model_dump() for step in validated_plan.steps]
    except Exception as e:
        print(f"[Planner] Pydantic validation failed for plan: {e}")
        return None

def generate_krutrim_response(messages: Sequence[BaseMessage], model_name: str = None) -> str:
    # 1. Try Groq / Fast endpoint first if key is configured (for ultra-low latency & high reliability)
    if groq_client:
        requested_model = model_name or os.getenv("CHAT_MODEL") or "openai/gpt-oss-120b"
        
        # Determine candidate models to try in order
        candidate_models = []
        if "120b" in requested_model or "planner" in requested_model.lower() or requested_model == "Meta-Llama-3-8B-Instruct":
            candidate_models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.3-70b-versatile", "qwen/qwen3.6-27b"]
        elif "20b" in requested_model or "spectre" in requested_model.lower():
            candidate_models = ["openai/gpt-oss-20b", "openai/gpt-oss-120b", "llama-3.1-8b-instant", "qwen/qwen3.6-27b"]
        else:
            candidate_models = [requested_model, "openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.3-70b-versatile"]
            
        import time
        messages = truncate_history(messages, max_tokens=3000)
        formatted = []
        for m in messages:
            if isinstance(m, HumanMessage):
                role = "user"
            elif isinstance(m, SystemMessage):
                role = "system"
            else:
                role = "assistant"
                
            if m.content and not m.content.startswith("[LangGraph"):
                formatted.append({"role": role, "content": m.content})
        
        if not formatted:
            formatted.append({"role": "user", "content": "Hello"})

        for model in candidate_models:
            try:
                start_time = time.time()
                content = _chat_completion(
                    base_url="https://api.groq.com/openai/v1",
                    api_key=_GROQ_API_KEY,
                    model=model,
                    messages=formatted,
                )
                latency = (time.time() - start_time) * 1000
                print(f"[Telemetry] Groq LLM call latency: {latency:.2f}ms using model: {model}")
                return content
            except Exception as e:
                print(f"[Groq Client] Attempt with model '{model}' failed: {e}. Trying next candidate...")
                continue

    # 2. Fallback to Krutrim Cloud API
    if not krutrim_client or not os.getenv("KRUTRIM_CLOUD_API_KEY"):
        return "(API Keys for Krutrim/Groq missing in .env. As a fallback: I am a multi-agent AI system. Please provide a key for me to chat naturally!)"
    
    model = model_name or os.getenv("CHAT_MODEL") or os.getenv("DEFAULT_MODEL") or "Krutrim-spectre-v2"
    
    try:
        import time
        start_time = time.time()
        # Truncate history to stay within token limits
        messages = truncate_history(messages, max_tokens=3000)
        
        formatted = []
        for m in messages:
            if isinstance(m, HumanMessage):
                role = "user"
            elif isinstance(m, SystemMessage):
                role = "system"
            else:
                role = "assistant"
                
            if m.content and not m.content.startswith("[LangGraph"):
                formatted.append({"role": role, "content": m.content})
        
        if not formatted:
            formatted.append({"role": "user", "content": "Hello"})
            
        res = _chat_completion(
            base_url="https://cloud.krutrim.com/v1",
            api_key=_KRUTRIM_API_KEY,
            model=model,
            messages=formatted,
        )
        latency = (time.time() - start_time) * 1000
        print(f"[Telemetry] Krutrim LLM call latency: {latency:.2f}ms using model: {model}")
        return res
    except Exception as e:
        return f"(API Error: {str(e)})"

def _classify_intent_with_llm(user_message: str) -> str:
    """Classify user intent using fast regex first, with LLM as fallback."""
    msg = user_message.lower().strip()
    
    # Strip URLs to prevent regex collisions (e.g. "sr=1-1" inside Amazon URLs matching calculator regex \d-\d)
    msg_clean = re.sub(r'https?://\S+|www\.\S+', '', msg)
    
    # Fast regex classification — instant, free, and reliable
    # 1. Common conversational greetings and casual chat patterns (Indian + Global)
    if re.search(r'^(namaste|namaskar|namaskaram|vanakkam|pranam|kya haal hai|hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|yo|how are you|who are you|what are you|what can you do|who created you|help|thanks|thank you|bye|goodbye)$', msg_clean):
        return "chat"

    # 1.5 HIGH-PRIORITY TITAN OS & SYSTEM AUTOMATION DISPATCH
    # Matches any open/launch/start/run command for desktop apps, browsers, text editors, terminals, or shell commands
    if re.search(r'\b(open|launch|start|run|exec|execute|spawn)\s+([a-zA-Z0-9_\-\.\s]+)\b', msg_clean) or \
       re.search(r'\b(ping|git|python|pip|npm|npx|node|curl|ipconfig|netstat|dir|ls|cls|clear|echo|docker|systeminfo)\b', msg_clean) or \
       re.search(r'\b(instagram|whatsapp|youtube|github|reddit|spotify|netflix|notion|discord|telegram|chatgpt|claude|notepad|calculator|calc|explorer|terminal|powershell|cmd|chrome|edge|firefox|vscode|code|antigravity)\b', msg_clean):
        # Ensure it's not a generic web search or weather request
        if not re.search(r'\b(search|research|find out|google search|weather|forecast)\b', msg_clean):
            return "titan"

    # 2. MULTI-STEP & COMPOSITE TASK DETECTION (Must take priority over single-tool regexes)
    # Check if prompt contains multiple steps, agent tags, or multiple distinct actions
    has_numbered_steps = bool(re.search(r'(\b(step\s*\d|1\.|2\.|3\.|first|second|then|finally)\b|\[(sentinel|scout|cipher|scribe|hermes|chronos|jarvis)\])', msg_clean))
    
    # Check for presence of multiple tool action domains
    has_search = bool(re.search(r'\b(search|research|find out|look up|google|web intel)\b', msg_clean))
    has_math = bool(re.search(r'\b(calculate|compute|math|percentage|uptime|cost|growth|\d+\s*[\+\-\*\/\^]\s*\d)\b', msg_clean))
    has_doc = bool(re.search(r'\b(generate|create|build|draft|write)\b.*\b(doc|document|report|docx|summary)\b', msg_clean))
    has_email = bool(re.search(r'\b(send|email|mail)\b|\b(inbox|unread)\b', msg_clean))
    has_cal = bool(re.search(r'\b(schedule|meeting|calendar|appointment|debrief|review meeting)\b', msg_clean))
    has_vercel = bool(re.search(r'\b(vercel|deployment|deployments|build logs?|server logs?)\b', msg_clean))
    
    action_domain_count = sum([has_search, has_math, has_doc, has_email, has_cal, has_vercel])
    
    if has_numbered_steps or action_domain_count >= 2:
        return "planner"

    # Explicit multi-step phrases
    if re.search(r'\b(write|draft|compose)\b.*\b(send|email|mail)\b', msg_clean) or \
       re.search(r'\b(research|search)\b.*\b(generate|create|report|document)\b', msg_clean) or \
       re.search(r'\b(check|audit|inspect)\b.*\b(calculate|send|email|generate|schedule)\b', msg_clean) or \
       re.search(r'\b(send|email|mail)\b.*@', msg_clean) or \
       re.search(r'\b(date|time|today|tomorrow|yesterday|now)\b', msg_clean):
        return "planner"

    # 3. SINGLE-ACTION DISPATCH
    # Inbox / Email Reading & Listing
    if re.search(r'\b(inbox|mail|mails|email|emails)\b', msg_clean) and \
       (re.search(r'\b(check|read|fetch|get|list|show|view|display|summarize|summer|top|latest|recent)\b', msg_clean) or "my" in msg_clean):
        return "planner"
        
    # Calendar scheduling
    if re.search(r'\b(schedule|meeting|book|calendar|appointment)\b', msg_clean):
        return "planner"

    # Weather
    if re.search(r'\b(weather|temperature|forecast|rain|sunny|humid|climate)\b', msg_clean):
        return "weather"
        
    # Single-step Calculator (pure math expressions or single calculate command)
    if re.search(r'^(calculate|compute|what is|how much is)?\s*[\d\.\s\+\-\*\/\^\(\)]+$', msg_clean) or \
       re.search(r'\b(calculate|compute)\s+[\d\.\s\+\-\*\/\^\(\)]+\b', msg_clean) or \
       re.search(r'^\d+\s*[\+\-\*\/\^]\s*\d+', msg_clean):
        return "calculator"
        
    # Doc parser
    if re.search(r'\b(parse|read|extract|open)\b.*\b(file|pdf|docx|txt|document)\b', msg_clean):
        return "doc_parser"
        
    # Doc generator
    if re.search(r'\b(generate|create|make|build|write)\b.*\b(doc|document|report|paper|article)\b', msg_clean):
        return "doc_generator"
    
    # Vercel / Deployments / Build Logs / Server Logs
    if re.search(r'\b(vercel|deployment|deployments|deployed|build logs?|server logs?|runtime logs?|versal)\b', msg_clean):
        return "vercel_logger"

    # OS System Control & Application Launching (Titan Agent)
    if re.search(r'\b(open|launch|start|run)\b.*\b(instagram|whatsapp|youtube|github|reddit|spotify|netflix|notion|discord|telegram|chatgpt|claude|chrome|docker|antigravity|vscode|code|notepad|calculator|calc|explorer|terminal|powershell|app|application)\b', msg_clean) or \
       re.search(r'\b(open instagram|open whatsapp|open youtube|open github|open reddit|open spotify|open netflix|open chatgpt|open claude|open chrome|open docker|open antigravity|open vscode|open notepad|open calculator|open new tab)\b', msg_clean):
        return "titan"
        
    # Researcher & Live Information Queries
    if re.search(r'\b(search|research|find out|look up|google|browse|web search)\b', msg_clean) or \
       re.search(r'\b(who won|winner of|who is|who are|latest news|latest updates|what happened|current score|stock price|when is|when will)\b', msg_clean):
        return "researcher"
    
    # If the message is short (<= 3 words) and clearly casual (e.g. "ok", "cool", "nice"), treat as chat
    if len(msg_clean.split()) <= 3 and not re.search(r'\b(search|who|what|when|where|why|how|which|tell|ipl|score|winner|news|vercel|deploy|log)\b', msg_clean):
        return "chat"
    
    # LLM fallback for ambiguous messages
    try:
        response = generate_krutrim_response([
            SystemMessage(content="Classify this message. Reply with ONE word only: planner, researcher, vercel_logger, weather, calculator, doc_parser, doc_generator, or chat."),
            HumanMessage(content=user_message)
        ])
        valid_routes = ["planner", "researcher", "vercel_logger", "weather", "calculator", "doc_parser", "doc_generator", "chat"]
        resp_lower = response.lower()
        first_word = resp_lower.strip().split()[0].strip('."\',:;!?') if resp_lower.strip() else ""
        if first_word in valid_routes:
            return first_word
        for r in valid_routes:
            if r in resp_lower:
                return r
    except Exception:
        pass
    
    # Ultimate fallback
    if any(q in msg_clean for q in ["who", "what", "where", "when", "why", "how", "which"]):
        return "researcher"
        
    return "chat"

def supervisor_node(state: AgentState):
    # Initialize metadata if not present
    if "metadata" not in state:
        state["metadata"] = {}
        
    last_msg = state["messages"][-1]
    
    # If the last message was generated by an internal agent, stop and wait for user input.
    if hasattr(last_msg, "name") and last_msg.name and last_msg.name != "supervisor":
        # If we are in auto_approve mode and the planner just generated a plan, route directly to executor
        if last_msg.name == "planner" and state["metadata"].get("auto_approve") and state.get("pending_plan"):
            print("[Supervisor] Auto-approving plan based on metadata flag.")
            return {"messages": [], "next": "executor"}
        return {"next": "FINISH"}
        
    last_message = str(last_msg.content).lower().strip()
    
    # Handle plan approval/rejection
    if last_message in ["approve", "yes", "y", "approve it", "go ahead"]:
        return {"messages": [], "next": "executor"}
        
    if last_message in ["reject", "no", "n", "reject it", "cancel"]:
        return {"messages": [AIMessage(content="Plan rejected. What would you like to do instead?", name="supervisor")], "next": "FINISH", "pending_plan": None}
    
    # Use LLM to classify intent
    user_content = str(last_msg.content)
    route = _classify_intent_with_llm(user_content)
    print(f"[Supervisor] Classified intent as: '{route}' for message: '{user_content[:80]}...'")
    
    if route == "chat":
        # Conversational response
        res_text = generate_krutrim_response(state["messages"])
        # If LLM failed, unconfigured, or returned error, provide clean conversational response
        if not res_text or res_text.startswith("(API Error:") or res_text.startswith("(API Keys"):
            msg_lower = user_content.lower().strip()
            if any(g in msg_lower for g in ["namaste", "namaskar", "pranam", "vanakkam"]):
                res_text = "Namaste! 🙏 I am JARVIS, master supervisor of the Autonomous Taskforce. All units (Sentinel, Hermes, Scout, Scribe, Cipher, Chronos) are standing by. How can I assist you?"
            elif any(g in msg_lower for g in ["hi", "hello", "hey", "good morning", "good evening"]):
                res_text = "Hello! I am JARVIS, ready to coordinate live search, inbox summaries, document generation, and multi-step workflows. What objective can we tackle today?"
            elif any(g in msg_lower for g in ["how are you", "what's up", "whats up"]):
                res_text = "All systems are nominal and operational! Ready to coordinate your tasks."
            elif any(g in msg_lower for g in ["who are you", "what are you", "what can you do"]):
                res_text = "I am JARVIS, the master supervisor of this autonomous multi-agent taskforce. I can perform live web research, parse files, compose documents, inspect and summarize your email inbox, manage calendar events, and orchestrate complex autonomous plans."
            else:
                res_text = "Greetings! I am JARVIS, ready to assist you. You can give me an objective like searching the web, checking your inbox, drafting documents, or scheduling events."
                
        msg = AIMessage(content=res_text, name="supervisor")
        return {"messages": [msg], "next": "FINISH"}
    
    return {"next": route}

def _clean_search_query(raw_msg: str) -> str:
    """Extract a clean, concise search query from a verbose user prompt."""
    clean = raw_msg.strip()
    
    # Strip common command prefixes
    prefixes = [
        r'^(?:can you\s+)?(?:please\s+)?(?:go\s+and\s+)?(?:search\s+(?:the\s+)?(?:web|internet|online)?\s*(?:and\s+(?:tell|find|show)(?:\s+me)?\s*(?:about)?|for|about|and\s+look\s+up)?)\s*',
        r'^(?:search\s+and\s+tell\s*(?:me)?(?:\s+about|\s+who|\s+what|\s+when|\s+where|\s+why|\s+how)?)\s*',
        r'^(?:search\s+for|search\s+about|search|research\s+about|research\s+for|research|look\s*up|find\s*out|tell\s*me\s*(?:about)?)\s*',
    ]
    for p in prefixes:
        clean = re.sub(p, '', clean, flags=re.IGNORECASE).strip()
    
    # Strip trailing action clauses ("and send email", "and write report", etc.)
    clean = re.sub(r',?\s+and\s+(?:generate|create|make|send|write|build|produce|compile|mail)\b.*$', '', clean, flags=re.IGNORECASE)
    clean = clean.strip(' .,;:!?\"\'')
    
    return clean if clean and len(clean) > 2 else raw_msg

def planner_node(state: AgentState):
    # Re-assemble the true request intent
    user_msgs = [m.content for m in state["messages"] if hasattr(m, "type") and m.type == "human" and m.content.lower() not in ["approve", "reject"]]
    original_user_msg = user_msgs[-1] if user_msgs else state["messages"][0].content
    
    planner_model = os.getenv("PLANNER_MODEL") or "Meta-Llama-3-8B-Instruct"
    
    system_prompt = f"""You are the strictly-typed Orchestrator AI. Your job is to decompose the user's request into a valid JSON execution plan.

CRITICAL RULES:
1. Output MUST be a single raw JSON object with a "steps" array.
2. DO NOT include any conversational text, preamble, or explanations.
3. Each step MUST have "tool" and "args" keys.
4. Use "{{STEP_N_OUTPUT}}" to reference findings from Step N.
5. If you need current time/date, call get_current_date FIRST.

Available Tools:
- "inbox_reader" (args: {{"max_emails": integer}}) - Read/fetch top recent emails from the inbox.
- "researcher" (args: {{"query": "string"}}) - Search live web/news.
- "doc_parser" (args: {{"filepath": "string"}}) - Read PDF/Docx/TXT.
- "doc_generator" (args: {{"topic_or_content": "string"}}) - Create Word docs.
- "calendar_api.create_event" (args: {{"title": "string", "attendees": ["email"], "time_slot": "string"}}) - Schedule meetings.
- "notification_api.send_message" (args: {{"recipients": ["email"], "message": "string"}}) - Send emails.
- "text_writer" (args: {{"prompt": "string"}}) - Draft content, summarizes, cross-references.
- "get_current_date" (args: {{}}) - Get today's date (CRITICAL for scheduling context).
- "calculator" (args: {{"expression": "string"}}) - Perform math.
- "weather" (args: {{"location": "string"}}) - Get weather.
- "vercel_logger" (args: {{"action": "list_deployments" | "get_logs"}}) - Inspect Vercel deployments, build logs, and runtime telemetry.

Example (Complex 5+ Step Task):
User: "Search for upcoming AI conferences in 2024, write a summary essay, create a report doc, schedule a review meeting with team@example.com for next Friday, and email them the summary."
Output: {{
  "steps": [
    {{"tool": "get_current_date", "args": {{}}}},
    {{"tool": "researcher", "args": {{"query": "upcoming AI conferences 2024"}}}},
    {{"tool": "text_writer", "args": {{"prompt": "Write a summary essay about these AI conferences: {{STEP_2_OUTPUT}}"}}}},
    {{"tool": "doc_generator", "args": {{"topic_or_content": "{{STEP_3_OUTPUT}}"}}}},
    {{"tool": "calendar_api.create_event", "args": {{"title": "AI Conference Review", "attendees": ["team@example.com"], "time_slot": "Next Friday (rel to {{STEP_1_OUTPUT}})"}}}},
    {{"tool": "notification_api.send_message", "args": {{"recipients": ["team@example.com"], "message": "Hi, here is the summary of AI conferences: {{STEP_3_OUTPUT}}. I have also scheduled a meeting for {{STEP_5_OUTPUT}} and attached the report."}}}}
  ]
}}
"""
    # Assuming logger is defined, if not, replace with print or define it.
    # import logging
    # logger = logging.getLogger(__name__)
    # For this example, using print.
    print(f"[Planner] Designing dynamic graph for prompt: {original_user_msg}")
    
    max_retries = 2
    plan = None
    response_text = ""
    
    for attempt in range(max_retries + 1):
        response_text = generate_krutrim_response([
            SystemMessage(content=system_prompt),
            HumanMessage(content=original_user_msg if attempt == 0 else f"Your previous response was NOT valid JSON. Please try again and output ONLY a raw JSON object with a 'steps' array. Error context: {original_user_msg}")
        ], model_name=planner_model)
        
        plan = _parse_json_plan(response_text)
        if plan:
            break
        print(f"[Planner] Attempt {attempt + 1} failed to produce valid JSON using {planner_model}. Retrying...")

    if plan:
        plan_str = "\n".join([f"Step {i+1}: {step['tool']} ({step.get('args', {})})" for i, step in enumerate(plan)])
        review_msg = f"[REVIEW_REQUIRED] The AI orchestrated the following execution plan:\n\n{plan_str}\n\nDo you approve executing this plan? (Reply 'Approve' or 'Reject')"
        # Embed serialized plan statelessly in the message content
        review_msg += f"\n\n<!-- <PLAN_DATA>{json.dumps(plan)}</PLAN_DATA> -->"
        
        print(f"[Planner] Generated plan: {plan}")
        msg = AIMessage(content=review_msg, name="planner")
        return {"messages": [msg], "next": "supervisor", "pending_plan": plan}
    else:
        # If parsing failed, fall back to heuristics
        print(f"[Planner] JSON parsing failed for response: {response_text[:200]}... Attempting heuristic fallback...")
        plan = None
        user_lower = original_user_msg.lower()
        
        import re
        emails_found = re.findall(r'[\w\.-]+@[\w\.-]+', original_user_msg)
        
        # Heuristic 0: Check / Read / List Inbox / Mails (+ optional summarize / forward)
        is_inbox_query = (
            "inbox" in user_lower or
            any(k in user_lower for k in ["read mail", "check mail", "list mail", "show mail", "get mail", "fetch mail", "top mail", "latest mail", "recent mail"]) or
            any(k in user_lower for k in ["read email", "check email", "list email", "show email", "get email", "fetch email", "top email", "latest email", "recent email"]) or
            ("mail" in user_lower and any(k in user_lower for k in ["list", "show", "get", "read", "check", "fetch", "top", "latest", "recent", "my"])) or
            ("email" in user_lower and any(k in user_lower for k in ["list", "show", "get", "read", "check", "fetch", "top", "latest", "recent", "my"]))
        )
        if is_inbox_query:
            count_match = re.search(r'\b(?:top|latest|recent|first)?\s*(\d+)\s*(?:latest|recent)?\s*(?:emails|mails)?\b', user_lower)
            count = int(count_match.group(1)) if count_match else 5
            
            if emails_found and any(k in user_lower for k in ["mail", "send", "forward", "dispatch"]):
                recipient = emails_found[0]
                plan = [
                    {"tool": "inbox_reader", "args": {"max_emails": count}},
                    {"tool": "text_writer", "args": {"prompt": f"Summarize these {count} inbox emails clearly with sender, subject, and key takeaways:\n\n{{STEP_1_OUTPUT}}"}},
                    {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "Here is the summary of your recent inbox emails:\n\n{STEP_2_OUTPUT}"}}
                ]
            else:
                plan = [
                    {"tool": "inbox_reader", "args": {"max_emails": count}},
                    {"tool": "text_writer", "args": {"prompt": f"Summarize the key points of these {count} emails clearly for the user:\n\n{{STEP_1_OUTPUT}}"}}
                ]
        # Heuristic 1: Generate doc AND send it as attachment
        elif any(k in user_lower for k in ["generate", "create", "make", "build", "write"]) and any(k in user_lower for k in ["doc", "document", "report"]) and ("send" in user_lower or "email" in user_lower or "mail" in user_lower) and emails_found:
            recipient = emails_found[0]
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}},
                {"tool": "doc_generator", "args": {"topic_or_content": "{PREVIOUS_STEP_OUTPUT}"}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "Please find the attached document. {PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 2: Write and Send Email (text only, no doc)
        elif ("write" in user_lower or "draft" in user_lower or "essay" in user_lower) and ("send" in user_lower or "email" in user_lower or emails_found):
            recipient = emails_found[0] if emails_found else "test@example.com"
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "{PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 3: Search then Email (New)
        elif ("search" in user_lower or "research" in user_lower) and ("send" in user_lower or "email" in user_lower) and emails_found:
            recipient = emails_found[0]
            clean_q = _clean_search_query(original_user_msg)
            plan = [
                {"tool": "researcher", "args": {"query": clean_q}},
                {"tool": "text_writer", "args": {"prompt": f"Write an informative email/essay based on this research: {{STEP_1_OUTPUT}}. Original directive: {original_user_msg}"}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "{STEP_2_OUTPUT}"}}
            ]
        # Heuristic 4: Send email (no writing needed, content already specified)
        elif ("send" in user_lower or "mail" in user_lower) and emails_found:
            recipient = emails_found[0]
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "{PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 3: Research + Document Generation (combined)
        elif ("research" in user_lower or "search" in user_lower) and any(k in user_lower for k in ["generate", "create", "report", "document", "doc", "summary"]):
            clean_q = _clean_search_query(original_user_msg)
            plan = [
                {"tool": "researcher", "args": {"query": clean_q}},
                {"tool": "text_writer", "args": {"prompt": "Based on the following research data, write a detailed, well-structured report:\n\n{STEP_1_OUTPUT}"}},
                {"tool": "doc_generator", "args": {"topic_or_content": "{STEP_2_OUTPUT}"}}
            ]
        # Heuristic 4: Search and Summarize
        elif "research" in user_lower or "search" in user_lower:
            clean_q = _clean_search_query(original_user_msg)
            plan = [
                {"tool": "researcher", "args": {"query": clean_q}},
                {"tool": "text_writer", "args": {"prompt": "Summarize the following research context concisely:\n\n{STEP_1_OUTPUT}"}}
            ]
        # Heuristic 4: Document Generation
        elif any(k in user_lower for k in ["generate", "create", "make", "build"]) and any(k in user_lower for k in ["doc", "document", "report", "paper", "article"]):
            plan = [
                {"tool": "doc_generator", "args": {"topic_or_content": original_user_msg}}
            ]
        # Heuristic 5: Parse / Read document
        elif any(k in user_lower for k in ["parse", "read", "extract", "summarize"]) and any(k in user_lower for k in ["file", "pdf", "doc", "txt", "document"]):
            # Try to extract filepath from the message
            filepath_match = re.search(r'[\w\\/:.-]+\.(pdf|docx|txt)', original_user_msg, re.IGNORECASE)
            filepath = filepath_match.group(0) if filepath_match else "unknown_file"
            plan = [
                {"tool": "doc_parser", "args": {"filepath": filepath}}
            ]
        # Heuristic 6: Schedule / Calendar (+ optional notification)
        elif any(k in user_lower for k in ["schedule", "meeting", "book", "calendar"]):
            if any(k in user_lower for k in ["notify", "send", "email", "mail", "message"]):
                plan = [
                    {"tool": "calendar_api.create_event", "args": {"title": original_user_msg, "attendees": emails_found or ["team@example.com"], "time_slot": "TBD"}},
                    {"tool": "text_writer", "args": {"prompt": f"Write a confirmation message for meeting: {original_user_msg}"}},
                    {"tool": "notification_api.send_message", "args": {"recipients": emails_found or ["team@example.com"], "message": "{STEP_2_OUTPUT}"}}
                ]
            else:
                plan = [
                    {"tool": "calendar_api.create_event", "args": {"title": original_user_msg, "attendees": [], "time_slot": "TBD"}}
                ]
        # Heuristic 7: Current Date
        elif any(k in user_lower for k in ["date", "today", "current time"]):
            plan = [
                {"tool": "get_current_date", "args": {}},
                {"tool": "text_writer", "args": {"prompt": "Tell the user today's date based on: {PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 8: System Info
        elif any(k in user_lower for k in ["system info", "environment", "os version", "python version"]):
            plan = [
                {"tool": "get_system_info", "args": {}},
                {"tool": "text_writer", "args": {"prompt": "Summarize this system information for the user: {PREVIOUS_STEP_OUTPUT}"}}
            ]
        # CATCH-ALL: Any task keyword matched but no specific heuristic — use text_writer
        else:
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}}
            ]
            
        if plan:
            plan_str = "\n".join([f"Step {i+1}: {step['tool']} ({step.get('args', {})})" for i, step in enumerate(plan)])
            review_msg = f"[REVIEW_REQUIRED] The LLM failed JSON formatting, but the orchestrator synthesized a heuristic fallback plan:\n\n{plan_str}\n\nDo you approve executing this plan? (Reply 'Approve' or 'Reject')"
            # Embed serialized plan statelessly in the message content
            review_msg += f"\n\n<!-- <PLAN_DATA>{json.dumps(plan)}</PLAN_DATA> -->"
            
            print(f"[Planner] Generated heuristic fallback plan: {plan}")
            msg = AIMessage(content=review_msg, name="planner")
            return {"messages": [msg], "next": "supervisor", "pending_plan": plan}
            
        return {"messages": [AIMessage(content=f"Error formulating execution plan. The AI failed to output valid JSON: {str(e)}\n\n(Wait: If using a basic Krutrim model instead of Pro, it may struggle with raw JSON structures without preamble.)", name="planner")], "next": "supervisor"}

def execute_tools(state: AgentState):
    import time
    import inspect
    import uuid

    # 1. Retrieve the plan
    plan_data = state.get("pending_plan")
    original_user_msg = ""
    
    # Check message history for serialized plan data as a fallback
    for m in reversed(state["messages"]):
        content = getattr(m, "content", "")
        if content and "<PLAN_DATA>" in content:
            try:
                plan_json_str = content.split("<PLAN_DATA>")[1].split("</PLAN_DATA>")[0]
                plan_data = json.loads(plan_json_str)
                break
            except Exception:
                pass

    # Find the original user message for contextual reference
    for m in reversed(state["messages"]):
        if hasattr(m, "type") and m.type == "human" and m.content and m.content.lower() not in ["approve", "reject"]:
            original_user_msg = m.content
            break

    if not plan_data:
        return {"messages": [AIMessage(content="Executor failed: No validated execution plan was found in state or history.", name="executor")], "next": "supervisor"}

    run_id = f"run_{str(uuid.uuid4())[:6]}"
    print(f"[Executor Node] Beginning Execution Phase for {run_id}")
    
    step_outputs = {} # Store step outputs by 1-based index
    prev_output = ""
    trace_logs = []
    
    for i, step in enumerate(plan_data):
        step_index = i + 1
        tool_name = step.get("tool")
        args = step.get("args", {}).copy()
        
        # Hydrate dynamic variables from previous steps
        for k, v in args.items():
            if isinstance(v, str):
                # Replace specific step references: {STEP_1_OUTPUT}, etc.
                for idx, out in step_outputs.items():
                    placeholder = f"{{STEP_{idx}_OUTPUT}}"
                    if placeholder in v:
                        v = v.replace(placeholder, str(out))
                # Replace legacy {PREVIOUS_STEP_OUTPUT}
                if "{PREVIOUS_STEP_OUTPUT}" in v:
                    v = v.replace("{PREVIOUS_STEP_OUTPUT}", str(prev_output))
                args[k] = v
        
        print(f"[Executor Node] Step {step_index}: Triggering {tool_name} with args {args}")
        
        # Implement Step Validation and Retry Loop
        attempt = 0
        max_retries = 3
        success = False
        step_res = None
        error_msg = None
        start_time = time.time()
        
        while attempt < max_retries and not success:
            attempt += 1
            if attempt > 1:
                # Exponential backoff: 1s, 2s, 4s...
                backoff_time = 2 ** (attempt - 2)
                print(f"[Executor] Retrying step {step_index} in {backoff_time}s (attempt {attempt}/{max_retries})...")
                time.sleep(backoff_time)
            
            try:
                # Resolve tool from registry
                try:
                    tool_func = registry.get_tool(tool_name)
                    # Filter kwargs to only match signature parameters
                    sig = inspect.signature(tool_func)
                    filtered_args = {k: v for k, v in args.items() if k in sig.parameters}
                    res = tool_func(**filtered_args)
                except ValueError:
                    # Fallback for researcher if missing from registry
                    if tool_name == "researcher":
                        from tools.search_tool import search_web
                        res = search_web(args.get("query", ""))
                    else:
                        raise ValueError(f"Tool '{tool_name}' not found in registry.")

                # Check and validate result
                from models import ToolResult
                if isinstance(res, ToolResult):
                    if res.success:
                        step_res = res.data
                        success = True
                    else:
                        error_msg = res.error
                        step_res = f"Error: {res.error}"
                else:
                    step_res = res
                    success = True
            except Exception as e:
                error_msg = str(e)
                step_res = f"Critical Error: {str(e)}"
        
        duration_ms = (time.time() - start_time) * 1000
        
        # Frame search results with LLM if researcher was the final step
        if tool_name == "researcher" and i == len(plan_data) - 1 and success:
            print(f"[Executor] Framing final search results using LLM...")
            step_res = _frame_search_results(original_user_msg, step_res)

        # Update tracking buffers
        prev_output = step_res
        step_outputs[step_index] = step_res
        
        # Add to diagnostic traces
        status_symbol = "✓ SUCCESS" if success else "✗ FAILED"
        
        # Generate a clean, human-readable one-line summary for trace table
        raw_output_str = str(step_res) if step_res is not None else ""
        clean_summary = _format_trace_summary(tool_name, step_res, success)
        
        trace_logs.append({
            "step": step_index,
            "tool": tool_name,
            "status": status_symbol,
            "duration": f"{duration_ms:.1f}ms",
            "attempt": f"{attempt}/{max_retries}",
            "output": clean_summary,
            "error": error_msg
        })
        
        # Abort the workflow sequence immediately if a step fails completely
        if not success:
            print(f"[Executor] Aborting sequence due to failure at step {step_index}")
            break

    # Build the Markdown Trace Report
    trace_rows = []
    for log in trace_logs:
        trace_rows.append(f"| {log['step']} | `{log['tool']}` | {log['status']} | {log['attempt']} | {log['duration']} | {log['output']} |")
    
    trace_table = "\n".join(trace_rows)
    
    # Format the final output cleanly
    final_output_section = _format_final_output(plan_data[-1].get("tool", "") if plan_data else "", prev_output)
    
    final_report = f"""### 🛠️ Execution Trace: `{run_id}`
| Step | Tool | Status | Attempts | Duration | Output Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
{trace_table}

{final_output_section}
"""
    
    return {"messages": [AIMessage(content=final_report, name="executor")], "next": "supervisor", "execution_trace": trace_logs}


def _format_trace_summary(tool_name: str, step_res: Any, success: bool) -> str:
    """Generate a clean one-line summary for a trace table row."""
    if not success or step_res is None:
        return "❌ Step failed"
    
    s = step_res
    
    # Dict results (ToolResult.data)
    if isinstance(s, dict):
        if tool_name in ("vercel_logger", "vercel"):
            deps = s.get("deployments", [])
            if deps:
                first = deps[0]
                state = first.get("state", "?").upper()
                name = first.get("name", "?")
                icon = "🟢" if state == "READY" else "🟡" if state == "BUILDING" else "🔴"
                return f"{icon} {name} — {state} ({len(deps)} deployments)"
            return s.get("summary", "Vercel data retrieved")
        if "emails" in s:
            count = s.get("unread_count", len(s.get("emails", [])))
            return f"📬 {count} unread emails fetched"
        if "delivery_status" in s or "status" in s:
            status = s.get("delivery_status") or s.get("status", "done")
            return f"📨 Email: {status}"
        if "event_id" in s or "title" in s:
            return f"📅 Event scheduled: {s.get('title', 'Meeting')}"
        if "filename" in s or "Generated_Report" in str(s):
            fname = s.get("filename", "report.docx")
            return f"📄 Document generated: {fname}"
        if "current_date" in s:
            return f"🕐 {s['current_date']}"
        # Generic dict - show key count
        keys = list(s.keys())[:3]
        return f"✅ Result: {{{', '.join(keys)}...}}"
    
    # String results
    if isinstance(s, str):
        # Strip markdown headers and get first meaningful line
        lines = [l.strip() for l in s.splitlines() if l.strip() and not l.strip().startswith("#")]
        first_line = lines[0] if lines else s
        return first_line[:120] + ("…" if len(first_line) > 120 else "")
    
    return str(s)[:120]


def _format_final_output(last_tool: str, output: Any) -> str:
    """Format the final executor output as clean, readable markdown."""
    if output is None:
        return "**Result:** No output produced."
    
    # If it's already a well-formed markdown string
    if isinstance(output, str) and (output.strip().startswith("#") or "**" in output or "\n-" in output):
        return f"**📋 Final Result:**\n\n{output}"
    
    # Dict-type results — render based on tool type
    if isinstance(output, dict):
        lines = ["**📋 Final Result:**\n"]
        
        # Email/inbox result
        if "emails" in output:
            emails = output.get("emails", [])
            unread = output.get("unread_count", len(emails))
            lines.append(f"📬 **Inbox Summary** — {unread} unread emails\n")
            for i, e in enumerate(emails[:5], 1):
                sender = e.get("from", "Unknown")
                subject = e.get("subject", "(No subject)")
                date = e.get("date", "")
                lines.append(f"**{i}.** {subject}")
                lines.append(f"   > From: {sender} | {date}\n")
            if unread > 5:
                lines.append(f"_...and {unread - 5} more unread messages._")
            return "\n".join(lines)
        
        # Vercel deployments
        if "deployments" in output:
            deps = output["deployments"]
            lines.append(f"🛡️ **Vercel Deployments** — {len(deps)} total\n")
            for d in deps[:5]:
                state = d.get("state", "?").upper()
                icon = "🟢" if state == "READY" else "🟡" if state == "BUILDING" else "🔴"
                lines.append(f"- {icon} **{d.get('name','?')}** `{state}` — [{d.get('url','')}](https://{d.get('url','')})")
            return "\n".join(lines)
        
        # Email send result
        if "delivery_status" in output:
            status = output.get("delivery_status", "sent")
            return f"**📨 Email Dispatch:** `{status}` — {output.get('channel', 'email')} channel confirmed."
        
        # Calendar event
        if "event_id" in output or "title" in output:
            return f"**📅 Calendar Event Created:**\n- **Title:** {output.get('title','Event')}\n- **Time:** {output.get('time_slot','')}\n- **ID:** `{output.get('event_id','')}`"
        
        # Current date
        if "current_date" in output:
            return f"**🕐 System Date:** {output['current_date']}"
        
        # Fallback: pretty print the dict as a markdown list
        lines.append("")
        for k, v in output.items():
            if isinstance(v, list) and len(v) > 3:
                lines.append(f"- **{k}:** _{len(v)} items_")
            elif isinstance(v, str) and len(v) > 200:
                lines.append(f"- **{k}:** {v[:150]}…")
            else:
                lines.append(f"- **{k}:** {v}")
        return "\n".join(lines)
    
    # List results
    if isinstance(output, list):
        if len(output) == 0:
            return "**Result:** Empty list returned."
        lines = ["**📋 Final Result:**\n"]
        for item in output[:8]:
            if isinstance(item, dict):
                subject = item.get("subject") or item.get("title") or item.get("name") or str(item)[:80]
                sender = item.get("from") or item.get("url") or ""
                lines.append(f"- **{subject}**{(' — ' + sender) if sender else ''}")
            else:
                lines.append(f"- {str(item)[:100]}")
        if len(output) > 8:
            lines.append(f"\n_...and {len(output) - 8} more items._")
        return "\n".join(lines)
    
    # Fallback: plain string
    return f"**📋 Final Result:**\n\n{str(output)}"




def _frame_search_results(query: str, raw_results: str) -> str:
    """Uses LLM to synthesize raw search results into a clean, comprehensive answer."""
    prompt = f"""User Question: '{query}'

Live Web Search Context:
{raw_results}

Instructions:
1. Answer the user's question directly and informatively using the live web search findings above.
2. If the user asks about an event, tournament, or topic in recent or future years (e.g. 2024, 2025, 2026), summarize the latest confirmed winners, current official status, and upcoming schedules from the search results.
3. NEVER state that you cannot search the web or that your data cuts off in the past, because you have just performed a live web search.
4. Use clean markdown with clear bullet points and highlights."""

    try:
        framed_answer = generate_krutrim_response([
            SystemMessage(content="You are Scout, the Autonomous Research Specialist. Deliver direct, informative, and well-structured answers using the live web intelligence provided."),
            HumanMessage(content=prompt)
        ])
        return framed_answer
    except Exception as e:
        print(f"[Search Framing] Error: {e}")
        return raw_results

def researcher_node(state: AgentState):
    from tools.search_tool import search_web
    
    last_message = state["messages"][-1].content
    clean_query = _clean_search_query(last_message)
    
    print(f"[Researcher Node] Original: '{last_message}' -> Cleaned Query: '{clean_query}'")
    
    # 1. Perform the live search
    raw_results = search_web(clean_query)
    
    # 2. Use LLM to frame a good answer
    framed_answer = _frame_search_results(last_message, raw_results)

    msg = AIMessage(content=framed_answer, name="researcher")
    return {"messages": [msg], "next": "supervisor"}

def get_weather(location: str = "New York") -> str:
    """Retrieves live weather data for a location."""
    import urllib.request
    import urllib.parse
    print(f"[Weather Tool] Looking up weather for: {location}")
    try:
        encoded = urllib.parse.quote(location)
        url = f"https://wttr.in/{encoded}?format=%C+%t+%h+%w"
        req = urllib.request.Request(url, headers={"User-Agent": "curl/7.68.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read().decode('utf-8').strip()
    except Exception as e:
        print(f"[Weather Tool] API failed: {e}. Using LLM fallback.")
        return generate_krutrim_response([
            HumanMessage(content=f"Tell me about typical weather conditions in {location}. Be brief, 2-3 sentences.")
        ])

def calculate(expression: str) -> str:
    """Performs safe mathematical computations using recursive AST node evaluation without eval()."""
    import ast
    import operator
    import math

    # Operators mapping
    operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.Mod: operator.mod,
        ast.FloorDiv: operator.floordiv,
        ast.USub: operator.neg,
        ast.UAdd: lambda x: x
    }

    # Math functions mapping
    functions = {
        'sqrt': math.sqrt,
        'log': math.log,
        'sin': math.sin,
        'cos': math.cos,
        'tan': math.tan,
        'abs': abs
    }

    def _eval(node):
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        elif isinstance(node, (ast.Num, ast.Constant)):
            # Support both older ast.Num and newer ast.Constant
            return getattr(node, 'n', getattr(node, 'value', None))
        elif isinstance(node, ast.BinOp):
            left = _eval(node.left)
            right = _eval(node.right)
            op_type = type(node.op)
            if op_type in operators:
                return operators[op_type](left, right)
            raise TypeError(f"Unsupported binary operator: {op_type.__name__}")
        elif isinstance(node, ast.UnaryOp):
            operand = _eval(node.operand)
            op_type = type(node.op)
            if op_type in operators:
                return operators[op_type](operand)
            raise TypeError(f"Unsupported unary operator: {op_type.__name__}")
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name) and node.func.id in functions:
                func = functions[node.func.id]
                args = [_eval(arg) for arg in node.args]
                return func(*args)
            raise TypeError(f"Unsupported function call: {node.func.id if isinstance(node.func, ast.Name) else 'unknown'}")
        raise TypeError(f"Unsupported AST node: {type(node).__name__}")

    # Replace ^ with ** for exponentiation
    expression = expression.replace('^', '**')
    print(f"[Calculator Tool] Safe evaluating: {expression}")
    try:
        tree = ast.parse(expression, mode='eval')
        result = _eval(tree)
        return str(result)
    except Exception as e:
        return f"Error: {str(e)}"


# Register tools
registry.register("weather", "Get current weather for a city. Args: location", get_weather)
registry.register("calculator", "Perform math calculations. Args: expression", calculate)

def weather_node(state: AgentState):
    """Agent that checks the weather using wttr.in API."""
    import re
    last_message = state["messages"][-1].content
    
    # Extract location using regex patterns
    location = None
    loc_match = re.search(r'(?:weather|temperature|forecast|climate)\s+(?:in|at|for|of)\s+(.+?)(?:\?|$|\.)', last_message, re.IGNORECASE)
    if loc_match:
        location = loc_match.group(1).strip()
    
    if not location:
        loc_match = re.search(r'(.+?)\s+(?:weather|temperature|forecast)', last_message, re.IGNORECASE)
        if loc_match:
            candidate = loc_match.group(1).strip()
            # Filter out common prefixes
            candidate = re.sub(r'^(what|how|tell me|get|check|show|whats|what\'s|is the)\s+', '', candidate, flags=re.IGNORECASE).strip()
            if candidate and len(candidate) > 1:
                location = candidate
    
    if not location:
        location = "New York"
    
    weather_data = get_weather(location)
    msg = AIMessage(content=f"Weather Agent: Current weather in {location}: {weather_data}", name="weather")
    return {"messages": [msg], "next": "supervisor"}

def calculator_node(state: AgentState):
    """Agent that does math computations using safe eval."""
    import re
    last_message = state["messages"][-1].content
    
    # Try to extract a math expression
    math_match = re.search(r'[\d\s\+\-\*/\(\)\.\^%]+', last_message)
    expression = math_match.group(0).strip() if math_match else None
    
    if not expression or len(expression) < 2:
        try:
            expr_response = generate_krutrim_response([
                SystemMessage(content="Extract ONLY the mathematical expression from this message. Respond with just the math expression using numbers and operators (+, -, *, /, **, %), nothing else."),
                HumanMessage(content=last_message)
            ])
            expression = expr_response.strip().split('\n')[0].strip()
        except Exception:
            expression = None
    
    if expression:
        result = calculate(expression)
        msg = AIMessage(content=f"Calculator Agent: {expression} = {result}", name="calculator")
    else:
        msg = AIMessage(content=f"Calculator Agent: No mathematical expression found.", name="calculator")
    
    return {"messages": [msg], "next": "supervisor"}

def vercel_logger_node(state: AgentState):
    from tools.vercel_tool import vercel_logger
    last_msg = str(state["messages"][-1].content).lower()
    action = "get_logs" if any(k in last_msg for k in ["log", "logs", "event", "events", "error", "errors", "trace", "fail", "failed"]) else "list_deployments"
    
    print(f"[Vercel Node] Action: {action} for prompt: {last_msg[:60]}")
    res_text = vercel_logger(action=action)
    msg = AIMessage(content=res_text, name="sentinel")
    return {"messages": [msg], "next": "supervisor"}

def titan_node(state: AgentState):
    """Agent that controls system automation (launching web apps, Instagram, WhatsApp, Chrome, Docker, Notepad, Terminal, etc.)."""
    import re
    from tools.system_tools import open_application
    last_message = str(state["messages"][-1].content)
    msg_lower = last_message.lower().strip()
    
    app_name = "system"
    target = None
    
    # Check for direct URL in message
    url_match = re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in|co|app)', last_message)
    
    popular_apps = [
        "instagram", "whatsapp", "youtube", "github", "google", "twitter", "reddit",
        "chatgpt", "openai", "claude", "gmail", "spotify", "netflix", "amazon",
        "maps", "notion", "discord", "telegram", "calendar", "antigravity", "vscode",
        "notepad", "calculator", "calc", "explorer", "powershell", "terminal", "docker", "chrome", "edge"
    ]
    
    matched_app = next((pa for pa in popular_apps if pa in msg_lower), None)
    
    if matched_app:
        app_name = matched_app
        if app_name in ["calc", "calculator"]:
            app_name = "calculator"
            math_match = re.search(r'(?:calculate|calc|compute|for)?\s*([\d\.\s\+\-\*\/\^\(\)]+)', last_message, re.IGNORECASE)
            if math_match and re.search(r'\d', math_match.group(1)):
                target = math_match.group(1).strip()
        elif app_name in ["chrome", "edge"]:
            if url_match:
                target = url_match.group(0)
            else:
                q_match = re.search(r'(?:open|launch|search|for)\s+(?:chrome|browser|edge)?\s*(.+)', last_message, re.IGNORECASE)
                if q_match:
                    target = q_match.group(1).strip()
        elif app_name == "whatsapp":
            txt_match = re.search(r'(?:send|text|message|abt|about|to)\s+(?:hi|hello|hey|message|to)?\s*(.+)', last_message, re.IGNORECASE)
            if txt_match:
                target = txt_match.group(1).strip()
        elif app_name == "notepad":
            note_match = re.search(r'(?:and\s+)?(?:add|write|insert|put|with)\s+(?:details\s+(?:about)?|text|content|note)?\s*(.+)', last_message, re.IGNORECASE)
            if note_match:
                target = note_match.group(1).strip()
            elif any(k in msg_lower for k in ["capabilities", "details", "capability", "system", "info"]):
                target = "capabilities"
        elif app_name in ["terminal", "powershell"]:
            cmd_match = re.search(r'(?:and|to|run|execute|exec|command)\s+(.+)', last_message, re.IGNORECASE)
            if cmd_match:
                raw_cmd = cmd_match.group(1).strip()
                clean_cmd = re.sub(r'^(run|execute|exec|command)\s+', '', raw_cmd, flags=re.IGNORECASE).strip(' .,;:"\'')
                target = clean_cmd if clean_cmd else raw_cmd
            else:
                cmd_direct = re.search(r'\b(ping\s+\S+|git\s+\S+|python\s+\S+|npm\s+\S+|dir|ls|curl\s+\S+|ipconfig)\b', last_message, re.IGNORECASE)
                if cmd_direct:
                    target = cmd_direct.group(0).strip()
        else:
            # Extract target search/message if specified
            t_match = re.search(rf'{matched_app}\s+(?:and\s+)?(?:to\s+|for\s+|search\s+|with\s+)?(.+)', last_message, re.IGNORECASE)
            if t_match:
                target = t_match.group(1).strip()
    elif url_match:
        app_name = "browser"
        target = url_match.group(0)
    else:
        # Generalized shell command detection
        shell_cmd = re.search(r'\b(ping|git|python|pip|npm|npx|node|curl|ipconfig|netstat|dir|ls|cls|clear|echo|docker|systeminfo)\b.*', last_message, re.IGNORECASE)
        if shell_cmd:
            app_name = "powershell"
            target = shell_cmd.group(0).strip(' .,;:"\'')
        else:
            open_match = re.search(r'\b(?:open|launch|start|run)\s+([a-zA-Z0-9_\-\.\s]+)', msg_lower)
            if open_match:
                app_name = open_match.group(1).strip()
                target_match = re.search(r'(?:and|to|with)\s+(.+)', last_message, re.IGNORECASE)
                if target_match:
                    target = target_match.group(1).strip()

    print(f"[Titan Node] Launching app '{app_name}' with target '{target}' for prompt: '{last_message[:60]}...'")
    result = open_application(app_name=app_name, target=target)
    if result.success:
        status_msg = result.data.get("status", f"Opened {app_name}")
        msg = AIMessage(content=f"⚙️ **Titan System Automation Core:** {status_msg}", name="titan")
    else:
        msg = AIMessage(content=f"⚙️ **Titan System Automation Core:** Could not execute system action: {result.error}", name="titan")

    return {"messages": [msg], "next": "supervisor"}

# Build Graph
workflow = StateGraph(AgentState)

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("planner", planner_node)
workflow.add_node("executor", execute_tools)
workflow.add_node("researcher", researcher_node)
workflow.add_node("weather", weather_node)
workflow.add_node("calculator", calculator_node)
workflow.add_node("vercel_logger", vercel_logger_node)
workflow.add_node("titan", titan_node)

from agents.doc_parser import doc_parser_node
from agents.doc_generator import doc_generator_node
workflow.add_node("doc_parser", doc_parser_node)
workflow.add_node("doc_generator", doc_generator_node)

workflow.add_conditional_edges(
    "supervisor",
    lambda x: x["next"],
    {
        "planner": "planner", 
        "researcher": "researcher", 
        "vercel_logger": "vercel_logger",
        "weather": "weather",
        "calculator": "calculator",
        "doc_parser": "doc_parser",
        "doc_generator": "doc_generator",
        "titan": "titan",
        "executor": "executor",
        "FINISH": END
    }
)
workflow.add_edge("planner", "supervisor") # Planner now routes back to supervisor for Review loop, or executor can be triggered by supervisor
workflow.add_edge("executor", "supervisor")
workflow.add_edge("researcher", "supervisor")
workflow.add_edge("vercel_logger", "supervisor")
workflow.add_edge("weather", "supervisor")
workflow.add_edge("calculator", "supervisor")
workflow.add_edge("doc_parser", "supervisor")
workflow.add_edge("doc_generator", "supervisor")
workflow.add_edge("titan", "supervisor")

workflow.set_entry_point("supervisor")

agent_graph = workflow.compile()

# Assemble Protocol Implementation
from core.watchers.sentinel_watcher import scan_system_logs
from core.watchers.hermes_watcher import fetch_email_digest
from core.watchers.assemble_diagnostics import probe_scout_health, probe_scribe_health, probe_cipher_health

def run_assemble_briefing() -> List[Dict[str, Any]]:
    """
    Executes the Avengers-style 'Agent Assemble' protocol.
    Aggregates live, synchronous diagnostic probes from all specialized agent units:
    - Sentinel: Vercel deployments health & system log analysis
    - Hermes: Gmail IMAP inbox unread count & recent messages
    - Scout: Real-time search engine latency probe
    - Scribe: DOCX template and document parser probe
    - Cipher: AST arithmetic evaluator self-test
    - Chronos: Temporal clock & calendar synchronization
    - Jarvis: Master synthesis & operational readiness check
    """
    from datetime import datetime
    now = datetime.now()
    hour = now.hour
    time_greeting = "Good morning" if hour < 12 else "Good afternoon" if hour < 17 else "Good evening"
    time_str = now.strftime("%I:%M %p")
    day_str = now.strftime("%A, %B %d")

    # Run live diagnostics concurrently / sequentially
    sentinel_report = scan_system_logs()
    hermes_report = fetch_email_digest()
    scout_report = probe_scout_health()
    scribe_report = probe_scribe_health()
    cipher_report = probe_cipher_health()
    
    # Calculate overall taskforce health
    healthy_units = sum(1 for r in [sentinel_report, hermes_report, scout_report, scribe_report, cipher_report] if r.get("status") in ["ok", "ready", "healthy"])
    
    briefing_sequence = [
        {
            "agent": "jarvis",
            "name": "JARVIS",
            "title": "Supreme Orchestrator",
            "text": f"{time_greeting}, sir. Assembling the multi-agent taskforce. Executing live operational health probes across all specialized units...",
            "status": "active"
        },
        {
            "agent": "chronos",
            "name": "CHRONOS",
            "title": "Temporal Coordinator",
            "text": f"Chronos reporting. Today is {day_str}, system time {time_str} (IST). Timekeeper clock synchronized.",
            "status": "ready"
        },
        {
            "agent": "sentinel",
            "name": "SENTINEL",
            "title": "System Guardian & Vercel Watcher",
            "text": sentinel_report.get("briefing", "Sentinel online. System health nominal."),
            "status": sentinel_report.get("status", "ok"),
            "data": sentinel_report
        },
        {
            "agent": "hermes",
            "name": "HERMES",
            "title": "Communications Courier",
            "text": hermes_report.get("briefing", "Hermes online. Inbox scanning standing by."),
            "status": hermes_report.get("status", "ok"),
            "data": hermes_report
        },
        {
            "agent": "scout",
            "name": "SCOUT",
            "title": "Recon & Web Intel",
            "text": scout_report.get("briefing", "Scout online. Web intelligence pipelines operational."),
            "status": scout_report.get("status", "ready"),
            "data": scout_report
        },
        {
            "agent": "scribe",
            "name": "SCRIBE",
            "title": "Master Archivist",
            "text": scribe_report.get("briefing", "Scribe standing by. Document extraction and compilation ready."),
            "status": scribe_report.get("status", "ready"),
            "data": scribe_report
        },
        {
            "agent": "cipher",
            "name": "CIPHER",
            "title": "Mathematical Core",
            "text": cipher_report.get("briefing", "Cipher online. Deterministic AST arithmetic evaluator operational."),
            "status": cipher_report.get("status", "ready"),
            "data": cipher_report
        },
        {
            "agent": "titan",
            "name": "TITAN",
            "title": "OS & System Automation Core",
            "text": "Titan System Automation online. Local OS application controller, process launchers, and desktop triggers active.",
            "status": "ready"
        },
        {
            "agent": "jarvis",
            "name": "JARVIS",
            "title": "Supreme Orchestrator",
            "text": f"All units reported in ({healthy_units}/5 units fully green). Taskforce constellation is fully armed and standing by for orders, sir.",
            "status": "awaiting_orders"
        }
    ]
    
    return briefing_sequence
