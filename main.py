import uuid
from models import Task
from core.orchestrator import orchestrator

def main():
    print("Welcome to the Autonomous Multi-Step AI Agent (MVP)")
    print("This agent can break down tasks, select tools, and execute them.")
    print("-" * 50)
    
    # Predefined sample task
    sample_objective = "Book meeting and notify team"
    print(f"Sample Input Task: '{sample_objective}'\n")
    
    task = Task(
        task_id=f"T-{str(uuid.uuid4())[:8]}",
        user_id="U-1",
        objective=sample_objective
    )
    
    result = orchestrator.handle_task(task)
    
    print("-" * 50)
    print("Final Output:")
    import json
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
