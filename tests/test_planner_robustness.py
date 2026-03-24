import unittest
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

from core.graph import _parse_json_plan

class TestPlannerRobustness(unittest.TestCase):
    def test_strict_format(self):
        text = '{"steps": [{"tool": "researcher", "args": {"query": "test query"}}]}'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "researcher")
        self.assertEqual(plan[0]["args"]["query"], "test query")

    def test_alias_format(self):
        text = '{"steps": [{"function": "weather", "parameters": {"location": "London"}}]}'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "weather")
        self.assertEqual(plan[0]["args"]["location"], "London")

    def test_sloppy_keys(self):
        text = '{"plan": [{"action": "calculator", "inputs": {"expression": "2+2"}}]}'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "calculator")
        self.assertEqual(plan[0]["args"]["expression"], "2+2")

    def test_list_directly(self):
        text = '[{"tool": "get_current_date", "args": {}}]'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "get_current_date")

    def test_string_steps(self):
        text = '["researcher", "What is the capital of France?"]'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 2)
        self.assertEqual(plan[0]["tool"], "researcher")
        self.assertEqual(plan[1]["tool"], "researcher")
        self.assertEqual(plan[1]["args"]["query"], "What is the capital of France?")

    def test_inferred_tool(self):
        # Even if 'tool' key is missing, if it has 'query' and a known tool name is found
        text = '[{"researcher": true, "query": "latest news"}]'
        plan = _parse_json_plan(text)
        self.assertEqual(len(plan), 1)
        self.assertEqual(plan[0]["tool"], "researcher")
        self.assertEqual(plan[0]["args"]["query"], "latest news")

    def test_malformed_json_fallback(self):
        # Testing the markdown fence cleaning
        text = 'Here is the plan:\n```json\n{"steps": [{"tool": "weather", "args": {"location": "Mumbai"}}]}\n```'
        plan = _parse_json_plan(text)
        self.assertIsNotNone(plan)
        self.assertEqual(plan[0]["tool"], "weather")

    def test_single_quotes_fix(self):
        text = "{'steps': [{'tool': 'calculator', 'args': {'expression': '10*10'}}]}"
        plan = _parse_json_plan(text)
        self.assertIsNotNone(plan)
        self.assertEqual(plan[0]["tool"], "calculator")

if __name__ == '__main__':
    unittest.main()
