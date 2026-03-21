from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

# Import main logic
from models import Task
from core.orchestrator import orchestrator

app = FastAPI(title="Autonomous Multi-Step AI Agent API")

# Enable CORS for the local React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Default Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from typing import List, Dict

class TaskRequest(BaseModel):
    objective: str

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

@app.post("/api/task")
def create_and_run_task(req: TaskRequest):
    if not req.objective:
        raise HTTPException(status_code=400, detail="Objective is required")
        
    task_id = f"T-{str(uuid.uuid4())[:8]}"
    task = Task(
        task_id=task_id,
        user_id="U-1",
        objective=req.objective
    )
    
    # In a real app, we'd run this asynchronously or return a Job ID.
    # For MVP context, we execute synchronously and return final result.
    result = orchestrator.handle_task(task)
    return result

@app.post("/api/chat")
def chat_endpoint(req: ChatRequest):
    from core.graph import agent_graph
    from langchain_core.messages import HumanMessage, AIMessage

    lc_messages = []
    for msg in req.messages:
        if msg.get("role") == "user":
            lc_messages.append(HumanMessage(content=msg.get("content", "")))
        else:
            lc_messages.append(AIMessage(content=msg.get("content", "")))
            
    # Invoke StateGraph (acts as our multi-agent orchestrator)
    response_state = agent_graph.invoke({"messages": lc_messages})
    
    # Extract the new messages returned by the agents
    new_messages = response_state["messages"][len(lc_messages):]
    
    out = []
    for m in new_messages:
        out.append({"role": "agent", "content": m.content})
        
    return {"messages": out}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
