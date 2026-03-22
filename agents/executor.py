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
            
        # Dynamically pass provided context variables to the tool 
        kwargs = dict(context)
        
        # Add basic fallback for required args if missing for robustness
        if tool_name == "notification_api.send_message":
            if "recipients" not in kwargs or not kwargs["recipients"]:
                kwargs["recipients"] = kwargs.get("team", ["admin@example.com"])
            if "message" not in kwargs:
                kwargs["message"] = "Automated email payload missing."
                
        try:
            result = tool_func(**kwargs)
            return result
        except Exception as e:
            return ToolResult(success=False, error=str(e))

executor = ExecutorAgent()
