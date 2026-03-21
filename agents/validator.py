from models import Step, ToolResult

class ValidatorAgent:
    def validate(self, step: Step, result: ToolResult) -> bool:
        print(f"[Validator] Validating step: {step.step_id} - Success: {result.success}")
        
        if not result.success:
            return False
            
        # In a real system, we'd check if `result.data` matches expected schema for `step.intent`.
        # For our MVP, we just assume it's valid if success=True and data exists.
        if result.data is None and not result.error:
            # Maybe valid, depending on tool, but let's assume all our mock tools return data
            pass

        return True

validator = ValidatorAgent()
