import os
import json
import re
import html
import urllib.parse
import requests
from dotenv import load_dotenv
from tools.registry import registry
from models import ToolResult

try:
    from duckduckgo_search import DDGS
except ImportError:
    DDGS = None

load_dotenv()

def _search_wikipedia(query: str, max_results: int = 3) -> str:
    """Fetches real-time encyclopedic summaries from Wikipedia REST API."""
    # Generate search candidates: raw query + core keyword stripped of question phrases
    cleaned_kw = re.sub(r'^(?:who won|who is|who are|what is|what are|when is|when was|where is|how to|winner of|tell me about|champion of)\s+', '', query, flags=re.IGNORECASE).strip(' ?.')
    candidates = [query]
    if cleaned_kw and cleaned_kw != query:
        candidates.append(cleaned_kw)
    
    headers = {"User-Agent": "TaskforceAgent/2.0 (research@example.com)"}
    
    for cand in candidates:
        try:
            url = "https://en.wikipedia.org/w/api.php"
            params = {
                "action": "opensearch",
                "search": cand,
                "limit": max_results,
                "namespace": 0,
                "format": "json"
            }
            resp = requests.get(url, params=params, headers=headers, timeout=6)
            if resp.ok:
                data = resp.json()
                titles = data[1] if len(data) > 1 else []
                links = data[3] if len(data) > 3 else []
                
                results = []
                for i, title in enumerate(titles[:max_results]):
                    try:
                        summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title.replace(' ', '_'))}"
                        s_resp = requests.get(summary_url, headers=headers, timeout=5)
                        if s_resp.ok:
                            s_data = s_resp.json()
                            extract = s_data.get("extract")
                            if extract:
                                link = links[i] if i < len(links) else f"https://en.wikipedia.org/wiki/{urllib.parse.quote(title)}"
                                results.append(f"Title: {title}\nSnippet: {extract}\nLink: {link}")
                    except Exception:
                        pass
                
                if results:
                    return "\n\n".join(results)
        except Exception as e:
            print(f"[Search Tool] Wikipedia search exception on '{cand}': {e}")
            
    return ""

def search_web(query: str, max_results: int = 4) -> str:
    """Perform a live web search using DuckDuckGo, Wikipedia, and SerpApi."""
    print(f"[Search Tool] Searching live web for: {query}")
    query = str(query).strip()
    
    # 1. Built-in hardcoded quick response for tool capability checks
    if "tools" in query.lower() and "available" in query.lower():
        return "The available tools are: Calendar API, Notification API (Gmail Inbox & Sender), Web Search API (Researcher), Document Writer (Scribe), and Code Execution."

    search_findings = []

    # 2. Try DuckDuckGo Search (DDGS)
    if DDGS is not None:
        try:
            ddgs = DDGS()
            results = list(ddgs.text(query, max_results=max_results))
            if results:
                for r in results:
                    title = r.get('title', '').strip()
                    snippet = r.get('body', r.get('snippet', '')).strip()
                    link = r.get('href', r.get('link', '')).strip()
                    if snippet:
                        search_findings.append(f"Title: {title}\nSnippet: {snippet}\nLink: {link}")
        except Exception as e:
            print(f"[Search Tool] DDGS failed: {e}. Trying alternate providers...")

    # 3. Try SerpApi if API Key is configured and valid
    api_key = os.getenv("SERPAPI_API_KEY")
    if api_key and not api_key.startswith("your_") and not search_findings:
        try:
            from serpapi import GoogleSearch
            search = GoogleSearch({
                "q": query,
                "api_key": api_key,
                "num": max_results
            })
            results_dict = search.get_dict()
            organic_results = results_dict.get("organic_results", [])
            if organic_results:
                for r in organic_results[:max_results]:
                    search_findings.append(f"Title: {r.get('title', '')}\nSnippet: {r.get('snippet', '')}\nLink: {r.get('link', '')}")
        except Exception as e:
            print(f"[Search Tool] SerpApi failed: {e}")

    # 4. Try Wikipedia Live Knowledge Base
    if len(search_findings) < 2:
        wiki_res = _search_wikipedia(query, max_results=max_results)
        if wiki_res:
            search_findings.append(wiki_res)

    # 5. Fallback: DuckDuckGo Instant Answer API
    if not search_findings:
        try:
            resp = requests.get(
                "https://api.duckduckgo.com/",
                params={"q": query, "format": "json", "no_html": 1, "skip_disambig": 1},
                headers={"User-Agent": "TaskforceAgent/2.0"},
                timeout=8
            )
            if resp.ok:
                data = resp.json()
                abstract = data.get("AbstractText")
                heading = data.get("Heading")
                if abstract:
                    search_findings.append(f"Title: {heading}\nSnippet: {abstract}\nLink: {data.get('AbstractURL', 'DuckDuckGo')}")
                
                related = data.get("RelatedTopics", [])
                for topic in related[:max_results]:
                    if isinstance(topic, dict) and "Text" in topic:
                        search_findings.append(f"Snippet: {topic['Text']}")
        except Exception as e:
            print(f"[Search Tool] Instant Answer fallback failed: {e}")

    if search_findings:
        return f"Live Search Results for '{query}':\n\n" + "\n\n".join(search_findings)

    return f"Search completed for '{query}'. No real-time results could be fetched at this moment."

registry.register("researcher", "Search the live web for information.", search_web)

