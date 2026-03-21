from models import Step, ToolResult
from agents.executor import executor
from tools.registry import registry
from typing import Dict, Any
import time

class RetryManagerAgent:
    def __init__(self, max_retries: int = 3):
        self.max_retries = max_retries

    def retry(self, step: Step, tool_name: str, context: Dict[str, Any], last_result: ToolResult) -> ToolResult:
        print(f"[RetryManager] Attempting to retry step {step.step_id} (failures: {step.retry_count})")
        
        while step.retry_count < self.max_retries:
            step.retry_count += 1
            # Exponential backoff mock
            time.sleep(1)
            
            print(f"[RetryManager] Retry {step.retry_count}/{self.max_retries} for step {step.step_id}")
            # Try executing again
            new_result = executor.execute(tool_name, step, context)
            if new_result.success:
                print(f"[RetryManager] Step {step.step_id} succeeded on retry {step.retry_count}")
                return new_result
                
        print(f"[RetryManager] Step {step.step_id} failed after {self.max_retries} retries.")
        return last_result

retry_manager = RetryManagerAgent()
