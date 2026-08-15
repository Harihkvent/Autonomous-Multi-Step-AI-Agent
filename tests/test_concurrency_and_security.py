import pytest
import json
from core.graph import calculate, _parse_json_plan, agent_graph
from langchain_core.messages import HumanMessage

def test_safe_calculator_valid():
    """Verify that safe math operations evaluate correctly."""
    assert calculate("2 + 2") == "4"
    assert calculate("10 * 5 - 2") == "48"
    assert float(calculate("sqrt(16) * 2")) == 8.0
    assert calculate("abs(-10)") == "10"
    assert float(calculate("sin(0)")) == 0.0

def test_safe_calculator_unsafe_rejected():
    """Verify that arbitrary code injection attempts are rejected."""
    res = calculate("__import__('os').system('echo unsafe')")
    assert "Error:" in res
    assert "Unsupported" in res or "not defined" in res

    res2 = calculate("eval('2 + 2')")
    assert "Error:" in res2

    res3 = calculate("globals()")
    assert "Error:" in res3

def test_pydantic_plan_validation():
    """Verify that execution plan schema complies with Pydantic expectations."""
    # Valid plan JSON
    valid_json = '{"steps": [{"tool": "researcher", "args": {"query": "test query"}}, {"tool": "calculator", "args": {"expression": "2+2"}}]}'
    plan = _parse_json_plan(valid_json)
    assert plan is not None
    assert len(plan) == 2
    assert plan[0]["tool"] == "researcher"
    assert plan[1]["tool"] == "calculator"

    # Missing tool should fail or be filtered out
    invalid_json = '{"steps": [{"args": {"query": "no tool name"}}]}'
    plan2 = _parse_json_plan(invalid_json)
    # The parser normalizes steps but if it's completely missing tool, it filters out
    assert plan2 is None or len(plan2) == 0

def test_session_plan_isolation():
    """Verify that multiple concurrent graph invocations do not leak pending plans."""
    # Invocations are isolated because the state is returned per invoke call
    # instead of using module-level global variables.
    
    state1 = {
        "messages": [HumanMessage(content="Search Python 3.12 and generate report doc")],
        "metadata": {"user_id": "U-1", "auto_approve": False}
    }
    state2 = {
        "messages": [HumanMessage(content="Book review meeting and email team@example.com")],
        "metadata": {"user_id": "U-2", "auto_approve": False}
    }

    # Run supervisor & planner nodes for Session 1
    res1 = agent_graph.invoke(state1)
    plan1 = res1.get("pending_plan")

    # Run supervisor & planner nodes for Session 2
    res2 = agent_graph.invoke(state2)
    plan2 = res2.get("pending_plan")

    # The plan outputs should correspond to their objectives and not leak
    assert plan1 is not None
    assert plan2 is not None
    assert any("research" in str(s["tool"]).lower() for s in plan1)
    assert any("calendar" in str(s["tool"]).lower() or "notification" in str(s["tool"]).lower() for s in plan2)
