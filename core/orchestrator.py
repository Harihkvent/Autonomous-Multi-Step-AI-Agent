from models import Task
from core.memory import memory
from agents.planner import planner
from agents.tool_selector import tool_selector
from agents.executor import executor
from agents.validator import validator
from agents.retry_manager import retry_manager
import tools.calendar_tool
import tools.notification_tool
import tools.system_tools
import tools.search_tool
import tools.agent_tools

class Orchestrator:
    def handle_task(self, task: Task) -> dict:
        print(f"--- [Orchestrator] Starting Task: {task.task_id} for User: {task.user_id} ---")
        
        # 1. Load context
        context = memory.load(task.user_id)
        # Mocking some context
        if not context:
            context = {"team": ["Asha", "Ravi"], "preferred_time": "morning"}
            memory.store_context(task.user_id, "team", context["team"])
            
        # 2. Plan
        task.steps = planner.plan(task, context)
        task.status = "running"
        
        results_summary = []
        
        for step in task.steps:
            step.status = "running"
            # 3. Select Tool
            tool_name = tool_selector.select_tool(step, context)
            step.tool_hint = tool_name
            
            # 4. Execute
            result = executor.execute(tool_name, step, context)
            
            # 5. Validate
            is_valid = validator.validate(step, result)
            
            # 6. Retry if invalid
            if not is_valid:
                result = retry_manager.retry(step, tool_name, context, result)
                is_valid = validator.validate(step, result)
            
            # 7. Update memory and state
            memory.store_step(task.user_id, step.dict(), result.dict() if result else None)
            
            if is_valid:
                step.status = "success"
                results_summary.append({"step": step.intent, "status": "success", "data": result.data})
            else:
                step.status = "failed"
                task.status = "failed"
                results_summary.append({"step": step.intent, "status": "failed", "error": result.error})
                return {"status": "failed", "results": results_summary}

        task.status = "success"
        print(f"--- [Orchestrator] Task {task.task_id} Completed Successfully ---")
        return {"status": "success", "results": results_summary}

orchestrator = Orchestrator()
