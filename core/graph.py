import os
import re
import json
from typing import Annotated, Sequence, TypedDict, Dict, Any, List
import operator
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
from langgraph.graph import StateGraph, END

from pydantic import BaseModel, Field, ValidationError
from tools.registry import registry
import tools.agent_tools
import tools.system_tools
import tools.calendar_tool
import tools.notification_tool
import tools.search_tool
from agents.executor import executor
from models import Step

# Try to initialize Krutrim
try:
    from krutrim_cloud import KrutrimCloud
    krutrim_client = KrutrimCloud(api_key=os.getenv("KRUTRIM_CLOUD_API_KEY", "dummy"))
except Exception as e:
    krutrim_client = None
    print(f"Failed to load Krutrim client: {e}")

# Define the State for our Graph
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str
    metadata: Dict[str, Any]

# Pydantic models for structured planning
class PlanStep(BaseModel):
    tool: str = Field(..., description="The name of the tool to use", alias="function")
    args: Dict[str, Any] = Field(default_factory=dict, description="The arguments for the tool", alias="parameters")

    class Config:
        populate_by_name = True

class Plan(BaseModel):
    steps: List[PlanStep] = Field(..., description="The sequence of steps to execute")

# Server-side plan store (persists between API calls since module stays loaded)
_pending_plans = {}

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
        # Try fixing common errors (single quotes, trailing commas)
        try:
            # Basic fix for common model error: single quotes for keys/strings
            fixed = re.sub(r"'(.*?)'", r'"\1"', raw_json_str)
            parsed = json.loads(fixed)
        except Exception:
            return None
    
    # 4. Normalize and validate with Pydantic
    try:
        if isinstance(parsed, dict):
            # If the model returned {"steps": [...]} or {"plan": [...]}
            for key in ["steps", "plan", "instructions", "actions"]:
                if key in parsed and isinstance(parsed[key], list):
                    return [PlanStep(**s).model_dump() for s in parsed[key]]
            # If it's a single step object, wrap it
            return [PlanStep(**parsed).model_dump()]
        
        if isinstance(parsed, list):
            return [PlanStep(**s).model_dump() for s in parsed]
    except ValidationError as e:
        print(f"[Planner] Validation Error: {e}")
        return None
    
    return None

def generate_krutrim_response(messages: Sequence[BaseMessage]) -> str:
    if not krutrim_client or not os.getenv("KRUTRIM_CLOUD_API_KEY"):
        return "(API Key for Krutrim missing in .env. As a fallback: I am a multi-agent AI system. Please provide a key for me to chat naturally!)"
    try:
        import time
        start_time = time.time()
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
            
        res = krutrim_client.chat.completions.create(
            model="Krutrim-spectre-v2",
            messages=formatted
        )
        latency = (time.time() - start_time) * 1000 # ms
        content = res.choices[0].message.content
        
        # Log telemetry for observability
        print(f"[Telemetry] LLM call latency: {latency:.2f}ms")
        
        return content
    except Exception as e:
        return f"(Krutrim API Error: {str(e)})"

def _classify_intent_with_llm(user_message: str) -> str:
    """Classify user intent using fast regex first, with LLM as fallback."""
    msg = user_message.lower().strip()
    
    # Fast regex classification — instant, free, and reliable
    # Weather
    if re.search(r'\b(weather|temperature|forecast|rain|sunny|humid|climate)\b', msg):
        return "weather"
    # Calculator  
    if re.search(r'\b(calculate|compute|math|what is \d|how much is \d|\d+\s*[\+\-\*\/\^]\s*\d)\b', msg):
        return "calculator"
    # Doc parser
    if re.search(r'\b(parse|read|extract|open)\b.*\b(file|pdf|docx|txt|document)\b', msg):
        return "doc_parser"
    # Multi-step: write+send, research+generate, etc.
    if re.search(r'\b(write|draft|compose)\b.*\b(send|email|mail)\b', msg) or \
       re.search(r'\b(research|search)\b.*\b(generate|create|report|document)\b', msg) or \
       re.search(r'\b(send|email|mail)\b.*@', msg) or \
       re.search(r'\b(date|time|today|tomorrow|yesterday|now)\b', msg):
        return "planner"
    # Doc generator
    if re.search(r'\b(generate|create|make|build|write)\b.*\b(doc|document|report|paper|article)\b', msg):
        return "doc_generator"
    # Researcher
    if re.search(r'\b(search|research|find|look up|latest news|what happened)\b', msg):
        return "researcher"
    # Calendar
    if re.search(r'\b(schedule|meeting|book|calendar|appointment)\b', msg):
        return "planner"
    # Common chat patterns
    if re.search(r'^(hi|hello|hey|thanks|thank you|who are you|what can you do|help)\b', msg):
        return "chat"
    
    # LLM fallback for ambiguous messages
    try:
        response = generate_krutrim_response([
            SystemMessage(content="Classify this message. Reply with ONE word only: planner, researcher, weather, calculator, doc_parser, doc_generator, or chat."),
            HumanMessage(content=user_message)
        ])
        # Scan response for any valid route name
        valid_routes = ["planner", "researcher", "weather", "calculator", "doc_parser", "doc_generator", "chat"]
        resp_lower = response.lower()
        first_word = resp_lower.strip().split()[0].strip('."\',:;!?') if resp_lower.strip() else ""
        if first_word in valid_routes:
            return first_word
        for r in valid_routes:
            if r in resp_lower:
                return r
    except Exception:
        pass
    
    # Ultimate fallback: route to planner (most capable)
    print(f"[Supervisor] Could not classify: '{user_message[:60]}...'. Defaulting to 'planner'.")
    return "planner"

def supervisor_node(state: AgentState):
    # Initialize metadata if not present
    if "metadata" not in state:
        state["metadata"] = {}
        
    last_msg = state["messages"][-1]
    
    # If the last message was generated by an internal agent, stop and wait for user input.
    if hasattr(last_msg, "name") and last_msg.name and last_msg.name != "supervisor":
        return {"next": "FINISH"}
        
    last_message = str(last_msg.content).lower().strip()
    
    # Handle plan approval/rejection
    if last_message in ["approve", "yes", "y", "approve it", "go ahead"]:
        return {"messages": [], "next": "executor"}
        
    if last_message in ["reject", "no", "n", "reject it", "cancel"]:
        _pending_plans.pop("latest", None)
        return {"messages": [AIMessage(content="Plan rejected. What would you like to do instead?", name="supervisor")], "next": "FINISH"}
    
    # Use LLM to classify intent
    user_content = str(last_msg.content)
    route = _classify_intent_with_llm(user_content)
    print(f"[Supervisor] LLM classified intent as: '{route}' for message: '{user_content[:80]}...'")
    
    if route == "chat":
        # Conversational response
        res_text = generate_krutrim_response(state["messages"])
        msg = AIMessage(content=res_text, name="supervisor")
        return {"messages": [msg], "next": "FINISH"}
    
    return {"next": route}

def _clean_search_query(raw_msg: str) -> str:
    """Extract a concise search query from a verbose user prompt."""
    
    # Primary: regex-based cleaning (instant, reliable)
    clean = raw_msg
    # Strip common action prefixes
    clean = re.sub(r'^(search for|search about|search|research about|research the latest news about|research the|research for|research|find information about|find out about|tell me about|look up)\s+', '', clean, flags=re.IGNORECASE)
    # Strip trailing action commands ("and generate a report", "and send it", etc.)
    clean = re.sub(r',?\s+and\s+(generate|create|make|send|write|build|produce|compile)\b.*$', '', clean, flags=re.IGNORECASE)
    # Strip trailing period/question mark
    clean = clean.strip(' .,;:!?\"\'')
    
    # If the result is still long (>60 chars), try to trim further
    if len(clean) > 60:
        # Take the core subject — everything before the first comma or period
        shorter = re.split(r'[,\.;]', clean)[0].strip()
        if len(shorter) > 5:
            clean = shorter
    
    return clean if clean and len(clean) > 3 else raw_msg

def planner_node(state: AgentState):
    # Re-assemble the true request intent
    user_msgs = [m.content for m in state["messages"] if hasattr(m, "type") and m.type == "human" and m.content.lower() not in ["approve", "reject"]]
    original_user_msg = user_msgs[-1] if user_msgs else state["messages"][0].content
    system_prompt = """You are the strictly-typed Orchestrator AI for the Autonomous Multi-Step AI Agent.
Your ONLY job is to route the user's request by outputting a JSON execution plan.

Available Tools & Agents:
1. "researcher" - {"query": "<search query>"}
   Capabilities: Connects to the live web to find real-time info, news, and technical data. Use for any external knowledge needs.
2. "doc_parser" - {"filepath": "<path to file>"}
   Capabilities: Reads local files (.pdf, .docx, .txt). Use to extract content from documents provided in the user's workspace.
3. "doc_generator" - {"topic_or_content": "<text>"}
   Capabilities: Generates professional Word (.docx) documents. Use when the user asks to "create a report", "generate a doc", or "write a paper".
4. "calendar_api.create_event" - {"title": "<string>", "attendees": ["email"], "time_slot": "<string>"}
   Capabilities: Schedules meetings. Use when the user wants to book an appointment or set a calendar reminder.
5. "notification_api.send_message" - {"recipients": ["email"], "message": "<body>"}
   Capabilities: Sends emails or notifications. Use to communicate findings or invites to external users via email.
6. "text_writer" - {"prompt": "<detailed instructions>"}
   Capabilities: A powerful LLM sub-agent. Use it to draft emails, summarize long research, or write creative content based on previous step outputs.
7. "get_current_date" - {}
   Capabilities: Returns the current date and time. CRITICAL: Always call this first if the user mentions "today", "tomorrow", or "next week" without providing a specific date.
8. "get_system_info" - {}
   Capabilities: Returns OS, Python version, and hardware info. Use when the user asks about the environment they are running in.
9. "calculator" - {"expression": "<math expression>"}
   Capabilities: Performs precise mathematical calculations (e.g., "25 * 17 + 3"). Use for any numeric logic.
10. "weather" - {"location": "<city>"}
    Capabilities: Retrieves live weather data for any metropolitan area globally.

Rules:
- Output MUST be a JSON object with a "steps" array.
- Use "{STEP_N_OUTPUT}" to reference the output of a specific step (e.g., {STEP_1_OUTPUT}).
- Use "{PREVIOUS_STEP_OUTPUT}" for the immediate preceding step.
- Do NOT include any conversational text.
- If a task is complex, break it down into several logical steps.
- Always check the current date if you need to schedule something relative to "today".

Examples:
User: "Research AI trends and generate a report"
Output: {"steps": [{"tool": "researcher", "args": {"query": "current AI trends 2024"}}, {"tool": "text_writer", "args": {"prompt": "Write a report based on: {STEP_1_OUTPUT}"}}, {"tool": "doc_generator", "args": {"topic_or_content": "{STEP_2_OUTPUT}"}}]}

User: "What is today's date and give me system info"
Output: {"steps": [{"tool": "get_current_date", "args": {}}, {"tool": "get_system_info", "args": {}}]}

User: "Send an email to harik@example.com about our meeting"
Output: {"steps": [{"tool": "text_writer", "args": {"prompt": "Draft a professional email about a meeting"}}, {"tool": "notification_api.send_message", "args": {"recipients": ["harik@example.com"], "message": "{PREVIOUS_STEP_OUTPUT}"}}]}
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
        ])
        
        plan = _parse_json_plan(response_text)
        if plan:
            break
        print(f"[Planner] Attempt {attempt + 1} failed to produce valid JSON. Retrying...")

    if plan:
        plan_str = "\n".join([f"Step {i+1}: {step['tool']} ({step.get('args', {})})" for i, step in enumerate(plan)])
        review_msg = f"[REVIEW_REQUIRED] The AI orchestrated the following execution plan:\n\n{plan_str}\n\nDo you approve executing this plan? (Reply 'Approve' or 'Reject')"
        
        # Save plan to server-side store
        _pending_plans["latest"] = plan
        print(f"[Planner] Saved plan to server-side store: {plan}")
        
        msg = AIMessage(content=review_msg, name="planner")
        return {"messages": [msg], "next": "supervisor"}
    else:
        # If parsing failed, fall back to heuristics
        print(f"[Planner] JSON parsing failed for response: {response_text[:200]}... Attempting heuristic fallback...")
        plan = None
        user_lower = original_user_msg.lower()
        
        import re
        emails_found = re.findall(r'[\w\.-]+@[\w\.-]+', original_user_msg)
        
        # Heuristic 1: Generate doc AND send it as attachment
        if any(k in user_lower for k in ["generate", "create", "make", "build", "write"]) and any(k in user_lower for k in ["doc", "document", "report"]) and ("send" in user_lower or "email" in user_lower or "mail" in user_lower) and emails_found:
            recipient = emails_found[0]
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}},
                {"tool": "doc_generator", "args": {"topic_or_content": "{PREVIOUS_STEP_OUTPUT}"}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "Please find the attached document. {PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 2: Write and Send Email (text only, no doc)
        elif ("write" in user_lower or "draft" in user_lower) and ("send" in user_lower or "email" in user_lower or emails_found):
            recipient = emails_found[0] if emails_found else "test@example.com"
            plan = [
                {"tool": "text_writer", "args": {"prompt": original_user_msg}},
                {"tool": "notification_api.send_message", "args": {"recipients": [recipient], "message": "{PREVIOUS_STEP_OUTPUT}"}}
            ]
        # Heuristic 2: Send email (no writing needed, content already specified)
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
        # Heuristic 6: Schedule / Calendar
        elif any(k in user_lower for k in ["schedule", "meeting", "book", "calendar"]):
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
            
            # Save plan to server-side store
            _pending_plans["latest"] = plan
            print(f"[Planner] Saved heuristic fallback plan to server-side store: {plan}")
            
            msg = AIMessage(content=review_msg, name="planner")
            return {"messages": [msg], "next": "supervisor"}
            
        return {"messages": [AIMessage(content=f"Error formulating execution plan. The AI failed to output valid JSON: {str(e)}\n\n(Wait: If using a basic Krutrim model instead of Pro, it may struggle with raw JSON structures without preamble.)", name="planner")], "next": "supervisor"}

def execute_tools(state: AgentState):
    plan_data = None
    original_user_msg = ""
    
    # First: check server-side plan store
    plan_data = _pending_plans.pop("latest", None)
    
    if plan_data:
        print(f"[Executor] Retrieved plan from server-side store: {plan_data}")
    else:
        # Fallback: check message history (legacy support)
        for m in reversed(state["messages"]):
            if hasattr(m, "type") and m.type == "human" and m.content and m.content.lower() not in ["approve", "reject"]:
                original_user_msg = m.content
            if m.content and "<PLAN_DATA>" in m.content:
                try:
                    plan_json_str = m.content.split("<PLAN_DATA>")[1].split("</PLAN_DATA>")[0]
                    plan_data = json.loads(plan_json_str)
                    break
                except Exception: pass

    # Find original user message for context
    for m in reversed(state["messages"]):
        if hasattr(m, "type") and m.type == "human" and m.content and m.content.lower() not in ["approve", "reject"]:
            original_user_msg = m.content
            break

    if not plan_data:
        return {"messages": [AIMessage(content="Executor failed: No dynamic plan was found in history.", name="executor")], "next": "supervisor"}
        
    print(f"[Executor Node] Beginning Execution Phase for Plan Sequence")
    
    step_outputs = {} # Store all step outputs by index (1-based)
    prev_output = ""
    logs = []
    
    for i, step in enumerate(plan_data):
        step_index = i + 1
        tool_name = step.get("tool")
        args = step.get("args", {})
        
        # Hydrate dynamic variables
        for k, v in args.items():
            if isinstance(v, str):
                # 1. Replace specific step references: {STEP_1_OUTPUT}, {STEP_2_OUTPUT}, etc.
                for idx, out in step_outputs.items():
                    placeholder = f"{{STEP_{idx}_OUTPUT}}"
                    if placeholder in v:
                        v = v.replace(placeholder, str(out))
                # 2. Replace legacy {PREVIOUS_STEP_OUTPUT}
                if "{PREVIOUS_STEP_OUTPUT}" in v:
                    v = v.replace("{PREVIOUS_STEP_OUTPUT}", str(prev_output))
                args[k] = v
                
        print(f"[Executor Node] Step {step_index}: Triggering {tool_name}")
        
        step_res = None
        try:
            # 1. Check if tool is in registry
            try:
                tool_func = registry.get_tool(tool_name)
                # ... (rest of the tool calling logic)
                import inspect
                sig = inspect.signature(tool_func)
                filtered_args = {k: v for k, v in args.items() if k in sig.parameters}
                
                res = tool_func(**filtered_args)
                
                from models import ToolResult
                if isinstance(res, ToolResult):
                    if res.success:
                        step_res = res.data
                        logs.append(f"✓ {tool_name} successful")
                    else:
                        step_res = f"Error: {res.error}"
                        logs.append(f"✗ {tool_name} failed: {res.error}")
                else:
                    step_res = res
                    logs.append(f"✓ {tool_name} completed")
                    
            except ValueError:
                if tool_name == "researcher":
                    from tools.search_tool import search_web
                    step_res = search_web(args.get("query", ""))
                    logs.append(f"✓ researcher completed")
                else:
                    step_res = f"Unknown tool: {tool_name}"
                    logs.append(f"✗ {tool_name} not found")
        except Exception as e:
            print(f"[Executor] Error running {tool_name}: {e}")
            step_res = f"Critical Error: {str(e)}"
            logs.append(f"✗ {tool_name} exception: {str(e)}")
            
        # Update trackers
        prev_output = step_res
        step_outputs[step_index] = step_res
            
    final_report = "Execution Sequence Complete:\n" + "\n".join(logs) + f"\n\nFinal State Buffer Output:\n{str(prev_output)[:300]}..."
    
    return {"messages": [AIMessage(content=final_report, name="executor")], "next": "supervisor"}

def researcher_node(state: AgentState):
    from tools.search_tool import search_web
    
    last_message = state["messages"][-1].content
    clean_query = _clean_search_query(last_message)
    
    print(f"[Researcher Node] Original: '{last_message}' -> Cleaned Query: '{clean_query}'")
    result = search_web(clean_query)
    msg = AIMessage(content=f"Research Results: {result}", name="researcher")
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
    """Performs safe mathematical computations."""
    import ast
    # Replace ^ with ** for Python exponentiation
    expression = expression.replace('^', '**')
    print(f"[Calculator Tool] Evaluating: {expression}")
    try:
        tree = ast.parse(expression, mode='eval')
        for node in ast.walk(tree):
            if not isinstance(node, (ast.Expression, ast.BinOp, ast.UnaryOp, ast.Num, ast.Constant,
                                    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow, ast.Mod,
                                    ast.FloorDiv, ast.USub, ast.UAdd)):
                raise ValueError(f"Unsafe operation detected: {type(node).__name__}")
        result = eval(compile(tree, '<calc>', 'eval'))
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

# Build Graph
workflow = StateGraph(AgentState)

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("planner", planner_node)
workflow.add_node("executor", execute_tools)
workflow.add_node("researcher", researcher_node)
workflow.add_node("weather", weather_node)
workflow.add_node("calculator", calculator_node)

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
        "weather": "weather",
        "calculator": "calculator",
        "doc_parser": "doc_parser",
        "doc_generator": "doc_generator",
        "executor": "executor",
        "FINISH": END
    }
)
workflow.add_edge("planner", "supervisor") # Planner now routes back to supervisor for Review loop, or executor can be triggered by supervisor
workflow.add_edge("executor", "supervisor")
workflow.add_edge("researcher", "supervisor")
workflow.add_edge("weather", "supervisor")
workflow.add_edge("calculator", "supervisor")
workflow.add_edge("doc_parser", "supervisor")
workflow.add_edge("doc_generator", "supervisor")

workflow.set_entry_point("supervisor")

agent_graph = workflow.compile()
