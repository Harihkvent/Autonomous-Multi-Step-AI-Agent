from typing import Dict, Any

class MemoryManager:
    def __init__(self):
        self._store: Dict[str, Dict[str, Any]] = {}

    def load(self, user_id: str) -> Dict[str, Any]:
        """Loads the context for a given user."""
        return self._store.get(user_id, {})

    def store_context(self, user_id: str, key: str, value: Any):
        """Stores a specific key-value pair in the user's context."""
        if user_id not in self._store:
            self._store[user_id] = {}
        self._store[user_id][key] = value

    def store_step(self, user_id: str, step_data: Any, output: Any):
        """Stores the result of a step."""
        if user_id not in self._store:
            self._store[user_id] = {}
        if "history" not in self._store[user_id]:
            self._store[user_id]["history"] = []
        self._store[user_id]["history"].append({
            "step": step_data,
            "output": output
        })

memory = MemoryManager()
