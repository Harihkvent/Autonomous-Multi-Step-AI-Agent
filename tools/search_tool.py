import os
from serpapi import GoogleSearch
from tools.registry import registry
from models import ToolResult

def search_web(query: str) -> str:
    """Perform a live web search using SerpApi."""
    print(f"[Search Tool] Searching live web for: {query}")
    
    # Simple hardcoded fallback for built-in queries
    if "tools" in query.lower() and "available" in query.lower():
        return "The available tools are: Calendar API, Notification API, and Web Search API."
        
    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return "Error: SERPAPI_API_KEY not found in environment variables."

    try:
        search = GoogleSearch({
            "q": query,
            "api_key": api_key,
            "num": 3
        })
        results_dict = search.get_dict()
        organic_results = results_dict.get("organic_results", [])
        
        if not organic_results:
            return f"No results found for '{query}'."
            
        formatted_results = "\n\n".join(
            [f"Title: {r.get('title', '')}\nSnippet: {r.get('snippet', '')}\nLink: {r.get('link', '')}" for r in organic_results]
        )
        return f"Live Search Results for '{query}':\n\n{formatted_results}"
    except Exception as e:
        return f"Error performing live search with SerpApi: {str(e)}"

registry.register("researcher", "Search the live web for information.", search_web)
