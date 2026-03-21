import os
from models import Step
from tools.registry import registry
from typing import Dict, Any

class ToolSelectorAgent:
    def __init__(self):
        self.api_key = os.getenv("KRUTRIM_CLOUD_API_KEY")
        # Initialize Krutrim connection if available

    def select_tool(self, step: Step, context: Dict[str, Any]) -> str:
        print(f"[ToolSelector] Selecting tool for intent: '{step.intent}'")
        
        # Real Krutrim LLM logic would ask the model to pick from `registry.list_tools()`
        # We will use simple keyword matching as the fallback/MVP implementation
        
        intent = step.intent.lower()
        if "availability" in intent:
            return "calendar_api.get_availability"
        elif "event" in intent or "book" in intent or "schedule" in intent:
            return "calendar_api.create_event"
        elif "notify" in intent or "send" in intent or "message" in intent:
            return "notification_api.send_message"
            
        return "unknown_tool"

tool_selector = ToolSelectorAgent()
