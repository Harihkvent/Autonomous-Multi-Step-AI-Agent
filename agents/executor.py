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
            
        # For the mock tools, we hardcode payload mapping based on intent to avoid complex parsing.
        # An LLM tool selector would also generate the correct kwargs payload.
        kwargs = {}
        if tool_name == "calendar_api.get_availability":
            kwargs = {"team": context.get("team", ["Unknown"]), "start_date": "Today"}
        elif tool_name == "calendar_api.create_event":
            kwargs = {"title": "Team Sync", "attendees": context.get("team", []), "time_slot": "10:00 AM"}
        elif tool_name == "notification_api.send_message":
            kwargs = {"recipients": context.get("team", []), "message": "Meeting scheduled!"}
            
        try:
            result = tool_func(**kwargs)
            return result
        except Exception as e:
            return ToolResult(success=False, error=str(e))

executor = ExecutorAgent()
