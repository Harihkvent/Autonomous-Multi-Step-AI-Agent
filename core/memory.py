import json
import os
from typing import Dict, Any

class MemoryManager:
    def __init__(self, filename="memory.json"):
        self.filename = filename
        self._store: Dict[str, Dict[str, Any]] = self._load_from_disk()

    def _load_from_disk(self) -> Dict[str, Any]:
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"[Memory] Load error: {e}")
        return {}

    def _save_to_disk(self):
        try:
            with open(self.filename, 'w', encoding='utf-8') as f:
                json.dump(self._store, f, indent=2)
        except Exception as e:
            print(f"[Memory] Save error: {e}")

    def load(self, user_id: str) -> Dict[str, Any]:
        """Loads the context for a given user."""
        return self._store.get(user_id, {})

    def store_context(self, user_id: str, key: str, value: Any):
        """Stores a specific key-value pair in the user's context."""
        if user_id not in self._store:
            self._store[user_id] = {}
        self._store[user_id][key] = value
        self._save_to_disk()

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
        self._save_to_disk()

memory = MemoryManager()
