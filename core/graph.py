import os
from typing import Annotated, Sequence, TypedDict
import operator
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langgraph.graph import StateGraph, END

from tools.registry import registry
from agents.executor import executor
from models import Step

# Try to initialize Krutrim
try:
    from krutrim_cloud import KrutrimCloud
    krutrim_client = KrutrimCloud(api_key=os.getenv("KRUTRIM_CLOUD_API_KEY", "dummy"))
except Exception as e:
    krutrim_client = None
    print(f"Failed to load Krutrim client: {e}")

# Define the State for our Graph
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str

def generate_krutrim_response(messages: Sequence[BaseMessage]) -> str:
    if not krutrim_client or not os.getenv("KRUTRIM_CLOUD_API_KEY"):
        return "(API Key for Krutrim missing in .env. As a fallback: I am a multi-agent AI system. Please provide a key for me to chat naturally!)"
    try:
        formatted = []
        for m in messages:
            role = "user" if isinstance(m, HumanMessage) else "assistant"
            # Ignore function/agent system messages for basic chat context
            if m.content and not m.content.startswith("[LangGraph"):
                formatted.append({"role": role, "content": m.content})
        
        # Ensure there's at least one message
        if not formatted:
            formatted.append({"role": "user", "content": "Hello"})
            
        res = krutrim_client.chat.completions.create(
            model="Krutrim-spectre-v2", # Default model name assumption
            messages=formatted
        )
        return res.choices[0].message.content
    except Exception as e:
        return f"(Krutrim API Error: {str(e)})"

def supervisor_node(state: AgentState):
    """
    Supervisor routes the task, or uses the real Krutrim LLM to answer general questions!
    """
    messages = state.get("messages", [])
    if not messages:
        return {"next": "FINISH"}
        
    last_message = messages[-1].content.lower()
    
    # Check if a worker just finished executing. If so, return to user.
    if hasattr(messages[-1], "name") and messages[-1].name in ["executor", "researcher", "planner", "weather", "calculator"]:
        return {"next": "FINISH"}

    # Keyword routing to Specialized Agents
    if "book" in last_message or "schedule" in last_message:
        return {"next": "planner"}
    elif "search" in last_message or "research" in last_message:
        return {"next": "researcher"}
    elif "weather" in last_message or "temperature" in last_message:
        return {"next": "weather"}
    elif "calculate" in last_message or "math" in last_message or "+" in last_message:
        return {"next": "calculator"}
    
    # If no specific task detected, it's a generic chat. Use KRUTRIM!
    llm_reply = generate_krutrim_response(messages)
    return {"messages": [AIMessage(content=llm_reply)], "next": "FINISH"}

def planner_node(state: AgentState):
    msg = AIMessage(content="Planner Agent: Creating execution sequence: Check Availability -> Book Event.", name="planner")
    return {"messages": [msg], "next": "executor"}

def execute_tools(state: AgentState):
    res1 = executor.execute("calendar_api.get_availability", Step(step_id="auto", intent="availability", tool_hint="calendar_api.get_availability"), {"team": ["Asha"]})
    msg = AIMessage(content=f"Executor completed tasks. Calendar returned: {res1.data}", name="executor")
    return {"messages": [msg], "next": "supervisor"}

def researcher_node(state: AgentState):
    from tools.search_tool import search_web
    last_message = state["messages"][-1].content
    result = search_web(last_message)
    msg = AIMessage(content=f"Research Results: {result}", name="researcher")
    return {"messages": [msg], "next": "supervisor"}

def weather_node(state: AgentState):
    """A new agent that checks the weather."""
    # Mocking a weather API call
    msg = AIMessage(content="Weather Agent: The current weather in the specified location is 72°F and sunny.", name="weather")
    return {"messages": [msg], "next": "supervisor"}

def calculator_node(state: AgentState):
    """A new agent that does math computations."""
    # Mocking a math calculation
    msg = AIMessage(content="Calculator Agent: I have computed the result. The answer is 42.", name="calculator")
    return {"messages": [msg], "next": "supervisor"}

# Build Graph
workflow = StateGraph(AgentState)

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("planner", planner_node)
workflow.add_node("executor", execute_tools)
workflow.add_node("researcher", researcher_node)
workflow.add_node("weather", weather_node)
workflow.add_node("calculator", calculator_node)

workflow.add_conditional_edges(
    "supervisor",
    lambda x: x["next"],
    {
        "planner": "planner", 
        "researcher": "researcher", 
        "weather": "weather",
        "calculator": "calculator",
        "FINISH": END
    }
)
workflow.add_edge("planner", "executor")
workflow.add_edge("executor", "supervisor")
workflow.add_edge("researcher", "supervisor")
workflow.add_edge("weather", "supervisor")
workflow.add_edge("calculator", "supervisor")

workflow.set_entry_point("supervisor")

agent_graph = workflow.compile()
