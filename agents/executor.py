import inspect
from models import Step, ToolResult
from tools.registry import registry
from typing import Dict, Any

class ExecutorAgent:
    def execute(self, tool_name: str, step: Step, context: Dict[str, Any]) -> ToolResult:
        print(f"[Executor] Executing {tool_name} for step {step.step_id}")
        
        try:
            tool_func = registry.get_tool(tool_name)
        except ValueError as e:
            return ToolResult(success=False, error=str(e))
            
        # 1. Prepare base arguments from context
        kwargs = dict(context)
        
        # 2. Add smart fallbacks for required args based on tool name
        if tool_name == "calendar_api.get_availability":
            if "start_date" not in kwargs:
                from datetime import datetime
                kwargs["start_date"] = datetime.now().strftime("%Y-%m-%d")
        
        elif tool_name == "calendar_api.create_event":
            if "title" not in kwargs or not kwargs["title"]:
                kwargs["title"] = "New Meeting"
            if "attendees" not in kwargs:
                kwargs["attendees"] = kwargs.get("team", [])
            if "time_slot" not in kwargs:
                kwargs["time_slot"] = "tomorrow at 10 AM"

        elif tool_name == "notification_api.send_message":
            if "recipients" not in kwargs or not kwargs["recipients"]:
                kwargs["recipients"] = kwargs.get("team", ["admin@example.com"])
            if "message" not in kwargs:
                kwargs["message"] = "Automated email payload missing."
                
        # 3. CRITICAL FIX: Filter kwargs to only those accepted by the tool_func
        sig = inspect.signature(tool_func)
        filtered_kwargs = {
            k: v for k, v in kwargs.items() 
            if k in sig.parameters or any(p.kind == inspect.Parameter.VAR_KEYWORD for p in sig.parameters.values())
        }
        
        try:
            result = tool_func(**filtered_kwargs)
            return result
        except Exception as e:
            return ToolResult(success=False, error=str(e))

executor = ExecutorAgent()
