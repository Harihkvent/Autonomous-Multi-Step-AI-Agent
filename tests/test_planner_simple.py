import sys
import os
import json

# Add the project root to sys.path
sys.path.append(os.getcwd())

from core.graph import agent_graph, _pending_plans
from langchain_core.messages import HumanMessage

def test_planner_simple_task():
    print("--- Testing Planner with Simple Task: 'what is todays date' ---")
    
    # 1. Run supervisor/planner
    msgs = [HumanMessage(content="what is todays date")]
    res = agent_graph.invoke({"messages": msgs})
    
    # 2. Check result
    print(f"Next Node: {res.get('next')}")
    messages = res.get('messages', [])
    print(f"Messages count: {len(messages)}")
    
    plan_found = False
    for m in reversed(messages):
        if getattr(m, 'name', '') == 'planner' and '[REVIEW_REQUIRED]' in m.content:
            print(f"Plan found in message: {m.content[:100]}...")
            plan_found = True
            break
            
    if not plan_found:
        # Check if it hit a heuristic fallback
        for m in reversed(messages):
            if 'heuristic fallback plan' in m.content:
                print(f"Heuristic fallback plan found: {m.content[:100]}...")
                plan_found = True
                break
                
    assert plan_found, "No plan found in output messages"
    print("--- Planner Simple Task Test Passed (via messages)! ---")

if __name__ == "__main__":
    test_planner_simple_task()
