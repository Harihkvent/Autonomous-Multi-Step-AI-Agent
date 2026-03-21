import unittest
from models import Task
from core.orchestrator import orchestrator

class TestOrchestrator(unittest.TestCase):
    def test_handle_task_success(self):
        task = Task(task_id="T-001", user_id="U-1", objective="Book meeting and notify team")
        result = orchestrator.handle_task(task)
        
        self.assertEqual(result["status"], "success")
        self.assertEqual(len(result["results"]), 3)
        self.assertEqual(task.status, "success")
        for r in result["results"]:
            self.assertEqual(r["status"], "success")

if __name__ == '__main__':
    unittest.main()
