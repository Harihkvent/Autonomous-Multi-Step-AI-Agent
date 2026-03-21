import unittest
from models import Task
from agents.planner import planner
from agents.tool_selector import tool_selector
from tools.registry import registry

class TestAgents(unittest.TestCase):
    def test_planner_mock(self):
        # Even without Krutrim API key, the mock should produce a plan for 'book meeting and notify team'
        task = Task(task_id="T-123", user_id="U-1", objective="Book meeting and notify team")
        steps = planner.plan(task, {})
        self.assertEqual(len(steps), 3)
        self.assertIn("availability", steps[0].intent.lower())
        self.assertIn("calendar", steps[1].intent.lower())
        self.assertIn("notification", steps[2].intent.lower())

    def test_tool_selector(self):
        task = Task(task_id="T-123", user_id="U-1", objective="Book meeting and notify team")
        steps = planner.plan(task, {})
        selected_tools = [tool_selector.select_tool(step, {}) for step in steps]
        self.assertEqual(selected_tools[0], "calendar_api.get_availability")
        self.assertEqual(selected_tools[1], "calendar_api.create_event")
        self.assertEqual(selected_tools[2], "notification_api.send_message")

if __name__ == '__main__':
    unittest.main()
