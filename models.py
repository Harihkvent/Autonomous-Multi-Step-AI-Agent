from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class Step(BaseModel):
    step_id: str
    intent: str
    tool_hint: Optional[str] = None
    payload: Dict[str, Any] = Field(default_factory=dict)
    status: str = "pending"
    retry_count: int = 0
    dependencies: List[str] = Field(default_factory=list)

class Task(BaseModel):
    task_id: str
    user_id: str
    objective: str
    status: str = "pending"
    steps: List[Step] = Field(default_factory=list)

class ToolResult(BaseModel):
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None
