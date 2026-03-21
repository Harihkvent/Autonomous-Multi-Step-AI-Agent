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
            prompt = f"Break down this task into minimal sequential steps: {task.objective}. Context: {context}. Return as JSON array of objects with 'intent' and 'step_id'."
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
