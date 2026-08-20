"""
core/lc_compat.py
-----------------
Lightweight drop-in replacements for langchain-core messages and the
langgraph StateGraph, so we can drop ~200 MB of dependencies from the
Vercel bundle while keeping the rest of the codebase unchanged.

Public API mirrors:
  from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
  from langgraph.graph import StateGraph, END
"""

from __future__ import annotations
from typing import Any, Callable, Dict, Optional, Sequence, Annotated
import operator

# ---------------------------------------------------------------------------
# Message types  (drop-in for langchain_core.messages)
# ---------------------------------------------------------------------------

class BaseMessage:
    """Minimal base for all chat messages."""
    role: str = "base"

    def __init__(self, content: str, name: Optional[str] = None, **kwargs):
        self.content = content
        self.name = name
        # langchain compat: expose .type
        self.type = self.role

    def __repr__(self):
        return f"{self.__class__.__name__}(content={self.content!r})"


class HumanMessage(BaseMessage):
    role = "human"
    def __init__(self, content: str, name: Optional[str] = None, **kwargs):
        super().__init__(content, name, **kwargs)
        self.type = "human"


class AIMessage(BaseMessage):
    role = "ai"
    def __init__(self, content: str, name: Optional[str] = None, **kwargs):
        super().__init__(content, name, **kwargs)
        self.type = "ai"


class SystemMessage(BaseMessage):
    role = "system"
    def __init__(self, content: str, name: Optional[str] = None, **kwargs):
        super().__init__(content, name, **kwargs)
        self.type = "system"


# ---------------------------------------------------------------------------
# StateGraph  (drop-in for langgraph.graph.StateGraph / END)
# ---------------------------------------------------------------------------

END = "__end__"


class StateGraph:
    """
    Minimal synchronous StateGraph that replicates the LangGraph API used in
    this project:
      - add_node(name, fn)
      - add_edge(src, dst)
      - add_conditional_edges(src, router_fn, mapping)
      - set_entry_point(name)
      - compile()  → returns self (the compiled graph)
      - invoke(state) → final state dict
      - astream(state, stream_mode) → async generator of {node: state} updates
    """

    def __init__(self, state_schema=None):
        self._nodes: Dict[str, Callable] = {}
        self._edges: Dict[str, str] = {}           # src → fixed dst
        self._cond_edges: Dict[str, tuple] = {}    # src → (router_fn, mapping)
        self._entry: Optional[str] = None

    # --- builder API --------------------------------------------------------

    def add_node(self, name: str, fn: Callable):
        self._nodes[name] = fn

    def add_edge(self, src: str, dst: str):
        self._edges[src] = dst

    def add_conditional_edges(self, src: str, router_fn: Callable, mapping: dict):
        self._cond_edges[src] = (router_fn, mapping)

    def set_entry_point(self, name: str):
        self._entry = name

    def compile(self):
        return self   # compiled graph IS the graph (simple impl)

    # --- execution ----------------------------------------------------------

    def _next_node(self, current: str, state: dict) -> Optional[str]:
        """Resolve the next node from edges or conditional edges."""
        if current in self._cond_edges:
            router_fn, mapping = self._cond_edges[current]
            key = router_fn(state)
            dst = mapping.get(key, END)
            return None if dst == END else dst
        if current in self._edges:
            dst = self._edges[current]
            return None if dst == END else dst
        return None

    def invoke(self, state: dict, config: dict = None) -> dict:
        """Run the graph synchronously to completion."""
        if self._entry is None:
            raise RuntimeError("Entry point not set")

        current = self._entry
        MAX_STEPS = 50
        steps = 0

        while current and steps < MAX_STEPS:
            steps += 1
            fn = self._nodes.get(current)
            if fn is None:
                break
            updates = fn(state)
            if updates:
                # Merge: lists are appended (operator.add), others overwrite
                for k, v in updates.items():
                    if k in state and isinstance(state[k], list) and isinstance(v, list):
                        state[k] = state[k] + v
                    else:
                        state[k] = v
            current = self._next_node(current, state)

        return state

    async def astream(self, state: dict, stream_mode: str = "updates"):
        """
        Async generator that yields {node_name: partial_state} for every node
        that produces messages — mirrors langgraph's astream(stream_mode='updates').
        """
        import asyncio

        if self._entry is None:
            raise RuntimeError("Entry point not set")

        current = self._entry
        MAX_STEPS = 50
        steps = 0

        while current and steps < MAX_STEPS:
            steps += 1
            fn = self._nodes.get(current)
            if fn is None:
                break

            # Support both sync and async node functions
            if asyncio.iscoroutinefunction(fn):
                updates = await fn(state)
            else:
                updates = fn(state)

            if updates:
                for k, v in updates.items():
                    if k in state and isinstance(state[k], list) and isinstance(v, list):
                        state[k] = state[k] + v
                    else:
                        state[k] = v
                yield {current: updates}

            current = self._next_node(current, state)
