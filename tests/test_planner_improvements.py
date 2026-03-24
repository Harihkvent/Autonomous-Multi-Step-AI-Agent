import unittest
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

from core.graph import _parse_json_plan, planner_node, AgentState
from langchain_core.messages import HumanMessage, AIMessage

class TestPlannerImprovements(unittest.TestCase):
    def test_raw_list_parsing(self):
        """Test that a raw JSON list (without 'steps' wrapper) is parsed correctly."""
        text = '[{"tool": "researcher", "args": {"query": "test query"}}]'
        plan = _parse_json_plan(text)
        self.assertIsNotNone(plan)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "researcher")

    def test_conversational_json_parsing(self):
        """Test that JSON embedded in conversation is extracted."""
        text = "Certainly! Here is your plan:\n\n```json\n[{\"tool\": \"calculator\", \"args\": {\"expression\": \"2+2\"}}]\n```\nI hope this helps!"
        plan = _parse_json_plan(text)
        self.assertIsNotNone(plan)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "calculator")

    def test_search_email_heuristic(self):
        """Test the new 'Search then Email' heuristic."""
        # Mocking the state and dependencies for heuristic check
        # This requires manually calling the logic or a mock of planner_node's fallback
        state = {
            "messages": [HumanMessage(content="search for mvgr college and email it to harik@example.com")],
            "next": "planner",
            "metadata": {}
        }
        
        # We need to reach the heuristic part of planner_node
        # Since we use Krutrim, we'd need to mock generate_krutrim_response to fail
        import core.graph as graph
        original_gen = graph.generate_krutrim_response
        graph.generate_krutrim_response = lambda messages, model_name=None: "INVALID_JSON"
        
        try:
            result = planner_node(state)
            plan_str = result["messages"][0].content
            self.assertIn("researcher", plan_str)
            self.assertIn("notification_api.send_message", plan_str)
            self.assertIn("harik@example.com", plan_str)
        finally:
            graph.generate_krutrim_response = original_gen

if __name__ == '__main__':
    unittest.main()
