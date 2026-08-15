from models import Task
from core.graph import agent_graph
from langchain_core.messages import HumanMessage

class Orchestrator:
    def handle_task(self, task: Task) -> dict:
        print(f"--- [Orchestrator via LangGraph] Starting Task: {task.task_id} for User: {task.user_id} ---")
        
        # Initial input state for the graph
        initial_state = {
            "messages": [HumanMessage(content=task.objective)],
            "metadata": {
                "user_id": task.user_id,
                "task_id": task.task_id,
                "auto_approve": True  # Enable non-interactive auto-approval
            }
        }
        
        # Run graph to completion synchronously
        final_state = agent_graph.invoke(initial_state)
        
        # Format the output results
        results_summary = []
        
        # Scan messages for execution logs and intermediate/final reports
        for msg in final_state.get("messages", []):
            if hasattr(msg, "name") and msg.name in ["executor", "researcher", "weather", "calculator", "doc_parser", "doc_generator"]:
                results_summary.append({
                    "step": f"Agent Node: {msg.name}",
                    "status": "success",
                    "data": msg.content
                })
                
        task.status = "success"
        print(f"--- [Orchestrator] Task {task.task_id} Completed Successfully ---")
        return {"status": "success", "results": results_summary}

orchestrator = Orchestrator()

