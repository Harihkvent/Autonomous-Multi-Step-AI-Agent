from typing import Dict, Any, Callable
import inspect

class ToolRegistry:
    def __init__(self):
        self._tools = {}

    def register(self, name: str, description: str, func: Callable):
        sig = inspect.signature(func)
        self._tools[name] = {
            "name": name,
            "description": description,
            "func": func,
            "signature": str(sig)
        }

    def get_tool(self, name: str) -> Callable:
        if name not in self._tools:
            raise ValueError(f"Tool '{name}' not found in registry.")
        return self._tools[name]["func"]

    def list_tools(self) -> Dict[str, Any]:
        return {name: {"description": meta["description"], "signature": meta["signature"]} 
                for name, meta in self._tools.items()}

# Global registry instance
registry = ToolRegistry()
