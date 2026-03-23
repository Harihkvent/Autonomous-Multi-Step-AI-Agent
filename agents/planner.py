import os
import json
from models import Task, Step
from typing import List, Dict, Any

class PlannerAgent:
    def __init__(self):
        self.api_key = os.getenv("KRUTRIM_CLOUD_API_KEY")
        if self.api_key:
            # Note: We configure the Krutrim client here. 
            # If the official `krutrim-cloud` package provides a different import, it can be updated.
            # Often, LLM clouds provide OpenAI-compatible endpoints or a specific client.
            try:
                from krutrim_cloud import KrutrimCloud
                self.client = KrutrimCloud(api_key=self.api_key)
            except ImportError:
                self.client = None
        else:
            self.client = None

    def plan(self, task: Task, context: Dict[str, Any]) -> List[Step]:
        print(f"[Planner] Generating plan for task: '{task.objective}'")
        if self.client:
            # Real Krutrim LLM integration
            prompt = f"""Break down this task into minimal sequential steps: {task.objective}. 
Context: {context}.

Available Tools & Agents:
1. "researcher" - {{"query": "<search query>"}}
   Capabilities: Connects to the live web to find real-time info, news, and technical data. Use for any external knowledge needs.
2. "doc_parser" - {{"filepath": "<path to file>"}}
   Capabilities: Reads local files (.pdf, .docx, .txt). Use to extract content from documents provided in the user's workspace.
3. "doc_generator" - {{"topic_or_content": "<text>"}}
   Capabilities: Generates professional Word (.docx) documents. Use when the user asks to "create a report", "generate a doc", or "write a paper".
4. "calendar_api.create_event" - {{"title": "<string>", "attendees": ["email"], "time_slot": "<string>"}}
   Capabilities: Schedules meetings. Use when the user wants to book an appointment or set a calendar reminder.
5. "notification_api.send_message" - {{"recipients": ["email"], "message": "<body>"}}
   Capabilities: Sends emails or notifications. Use to communicate findings or invites to external users via email.
6. "text_writer" - {{"prompt": "<detailed instructions>"}}
   Capabilities: A powerful LLM sub-agent. Use it to draft emails, summarize long research, or write creative content based on previous step outputs.
7. "get_current_date" - {{}}
   Capabilities: Returns the current date and time. CRITICAL: Always call this first if the user mentions "today", "tomorrow", or "next week" without providing a specific date.
8. "get_system_info" - {{}}
   Capabilities: Returns OS, Python version, and hardware info. Use when the user asks about the environment they are running in.

Return as JSON array of objects with 'intent' and 'step_id'."""
            try:
                # Assuming chat completions interface
                response = self.client.chat.completions.create(
                    model="Krutrim-2-instruct", 
                    messages=[{"role": "user", "content": prompt}]
                )
                output = response.choices[0].message.content
                # parse output ...
                # For brevity in MVP, we just fall back if parsing fails
            except Exception as e:
                print(f"[Planner] Krutrim API call failed or missing: {e}. Falling back to mock plan.")

        # Fallback / Mock logic for MVP if no API key or if API call fails
        return self._mock_plan(task, context)

    def _mock_plan(self, task: Task, context: Dict[str, Any]) -> List[Step]:
        obj = task.objective.lower()
        if "book meeting" in obj and "notify" in obj:
            return [
                Step(step_id="step_1", intent="Check team availability"),
                Step(step_id="step_2", intent="Create calendar event", dependencies=["step_1"]),
                Step(step_id="step_3", intent="Send notification to team", dependencies=["step_2"]),
            ]
        # Default generic step
        return [Step(step_id="step_1", intent=task.objective)]

planner = PlannerAgent()
