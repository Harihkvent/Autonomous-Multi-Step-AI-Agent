import os
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage

def search_web(query: str) -> str:
    """Mock web search tool"""
    print(f"[Search Tool] Searching for: {query}")
    if "tools" in query.lower():
        return "The available tools are: Calendar API, Notification API, and Web Search API."
    return f"Mock search results for '{query}'. Found 5 relevant pages."
