import sys
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import uuid
import os
import tempfile
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import main logic & authentication
from models import Task
from core.orchestrator import orchestrator
from core.auth import get_current_user, get_optional_user

app = FastAPI(title="Autonomous Multi-Step AI Agent API")

# Enable CORS for the React frontend
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Autonomous Multi-Step AI Agent API is running", "status": "online"}

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "autonomous-agent-backend"}

class TaskRequest(BaseModel):
    objective: str
    userId: Optional[str] = None

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    userId: Optional[str] = None
    conversationId: Optional[str] = "default"


@app.post("/api/task")
def create_and_run_task(req: TaskRequest, user: dict = Depends(get_current_user)):
    if not req.objective:
        raise HTTPException(status_code=400, detail="Objective is required")
        
    task_id = f"T-{str(uuid.uuid4())[:8]}"
    authenticated_uid = user.get("uid") or req.userId or "U-1"
    
    task = Task(
        task_id=task_id,
        user_id=authenticated_uid,
        objective=req.objective
    )
    
    result = orchestrator.handle_task(task)
    return result

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest, user: dict = Depends(get_current_user)):
    from core.graph import agent_graph
    from core.lc_compat import HumanMessage, AIMessage
    from fastapi.responses import StreamingResponse
    import core.database as db
    import json
    import asyncio

    conv_id = req.conversationId or "default"
    user_id = user.get("uid") or req.userId or "U-1"

    lc_messages = []
    for msg in req.messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role == "user":
            lc_messages.append(HumanMessage(content=content))
        else:
            lc_messages.append(AIMessage(content=content))

    # Save the latest user message to persistent context database
    if req.messages and req.messages[-1].get("role") == "user":
        db.save_message(
            conversation_id=conv_id,
            user_id=user_id,
            role="user",
            content=req.messages[-1].get("content", "")
        )

    async def generate():
        print(f"[API /api/chat] User '{user_id}' starting generation stream for conversation '{conv_id}'.")
        try:
            async for event in agent_graph.astream({"messages": lc_messages}, stream_mode="updates"):
                for node_name, node_state in event.items():
                    print(f"[API] Graph advanced node: {node_name}")
                    if "messages" in node_state and node_state["messages"]:
                        msg = node_state["messages"][-1]
                        
                        # Save assistant message to database context
                        db.save_message(
                            conversation_id=conv_id,
                            user_id=user_id,
                            role="assistant",
                            content=str(msg.content),
                            node=node_name
                        )
                        
                        data = {
                            "node": node_name,
                            "content": msg.content
                        }
                        yield f"data: {json.dumps(data)}\n\n"
                        await asyncio.sleep(0.4)
                        
            print("[API] Stream finished normally.")
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            print(f"[API] Error encountered during stream execution: {str(e)}")
            import traceback
            traceback.print_exc()
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

# --- Context & Memory Endpoints (Protected) ---
@app.get("/api/context/{conversation_id}")
async def get_context_history(conversation_id: str, limit: int = 30, user: dict = Depends(get_current_user)):
    """Retrieve saved messages and context from SQLite database for authenticated user."""
    import core.database as db
    messages = db.get_recent_messages(conversation_id, limit=limit)
    return {"conversation_id": conversation_id, "messages": messages, "user_id": user.get("uid")}

@app.get("/api/memories/{user_id}")
async def get_user_memories(user_id: str, user: dict = Depends(get_current_user)):
    """Retrieve stored long-term memory facts for the authenticated user."""
    import core.database as db
    # Ensure users only read their own memory unless admin
    target_uid = user.get("uid") or user_id
    memories = db.get_user_memories(target_uid)
    return {"user_id": target_uid, "memories": memories}

# --- Vercel Deployments & Logs Endpoints (Protected) ---
@app.get("/api/vercel/deployments")
async def get_vercel_deployments(limit: int = 5, user: dict = Depends(get_current_user)):
    """Fetch live Vercel deployments (Strictly authenticated)."""
    from tools.vercel_tool import list_vercel_deployments
    return {"output": list_vercel_deployments(limit=limit)}

@app.get("/api/vercel/logs")
async def get_vercel_deployment_logs(deployment_id: Optional[str] = None, limit: int = 30, user: dict = Depends(get_current_user)):
    """Fetch live Vercel deployment logs (Strictly authenticated)."""
    from tools.vercel_tool import get_vercel_logs
    return {"output": get_vercel_logs(deployment_id=deployment_id, limit=limit)}

# --- Document Download Endpoint ---
GENERATED_DOCS_DIR = os.path.join(tempfile.gettempdir(), "agent_generated_docs")
os.makedirs(GENERATED_DOCS_DIR, exist_ok=True)

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    from fastapi.responses import FileResponse
    safe_filename = os.path.basename(filename)
    file_path = os.path.join(GENERATED_DOCS_DIR, safe_filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(
        path=file_path,
        filename=safe_filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

# --- Assemble Protocol Endpoint (Protected) ---
@app.get("/api/assemble")
@app.post("/api/assemble")
async def assemble_agents(user: dict = Depends(get_current_user)):
    """Trigger the 'Avengers Assemble' briefing sequence across all specialized agents."""
    try:
        from core.graph import run_assemble_briefing
        briefing = run_assemble_briefing()
        return {"status": "success", "briefing": briefing, "caller": user.get("email")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Assemble protocol failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
