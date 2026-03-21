from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

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
async def chat_endpoint(req: ChatRequest):
    from core.graph import agent_graph
    from langchain_core.messages import HumanMessage, AIMessage
    from fastapi.responses import StreamingResponse
    import json
    import asyncio

    lc_messages = []
    for msg in req.messages:
        if msg.get("role") == "user":
            lc_messages.append(HumanMessage(content=msg.get("content", "")))
        else:
            lc_messages.append(AIMessage(content=msg.get("content", "")))

    async def generate():
        # Stream the graph step-by-step
        try:
            async for event in agent_graph.astream({"messages": lc_messages}, stream_mode="updates"):
                for node_name, node_state in event.items():
                    if "messages" in node_state and node_state["messages"]:
                        # Typically the last message contains the node's output
                        msg = node_state["messages"][-1]
                        
                        data = {
                            "node": node_name,
                            "content": msg.content
                        }
                        yield f"data: {json.dumps(data)}\n\n"
                        # Small delay to allow the frontend to animate the thinking process
                        await asyncio.sleep(0.5)
                        
            # Indicate stream completion
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
