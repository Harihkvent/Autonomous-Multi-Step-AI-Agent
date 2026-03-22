import os
from duckduckgo_search import DDGS

def search_web(query: str) -> str:
    """Perform a live web search using DuckDuckGo."""
    print(f"[Search Tool] Searching live web for: {query}")
    
    # Simple hardcoded fallback for built-in queries
    if "tools" in query.lower() and "available" in query.lower():
        return "The available tools are: Calendar API, Notification API, and Web Search API."
        
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=3))
        
        if not results:
            return f"No results found for '{query}'."
            
        formatted_results = "\n\n".join(
            [f"Title: {r.get('title', '')}\nSnippet: {r.get('body', '')}\nLink: {r.get('href', '')}" for r in results]
        )
        return f"Live Search Results for '{query}':\n\n{formatted_results}"
    except Exception as e:
        return f"Error performing live search: {str(e)}"
