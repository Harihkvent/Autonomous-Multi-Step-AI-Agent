import os
import time
import requests
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv
from tools.registry import registry

load_dotenv()

VERCEL_API_BASE = "https://api.vercel.com"

def _get_headers() -> Dict[str, str]:
    token = os.getenv("VERCEL_TOKEN", "").strip()
    headers = {
        "User-Agent": "AutonomousTaskforce/2.0 (deployment-monitoring)"
    }
    if token and not token.startswith("your_"):
        headers["Authorization"] = f"Bearer {token}"
    return headers

def list_vercel_deployments(project_id: Optional[str] = None, limit: int = 5) -> str:
    """Lists recent deployments from Vercel."""
    headers = _get_headers()
    token = os.getenv("VERCEL_TOKEN", "").strip()
    team_id = os.getenv("VERCEL_TEAM_ID", "").strip()
    proj = project_id or os.getenv("VERCEL_PROJECT_ID", "").strip()
    
    if not token or token.startswith("your_"):
        return (
            "⚠️ VERCEL_TOKEN is not configured in `.env`.\n\n"
            "To connect live Vercel deployments, add your token to `.env`:\n"
            "```\nVERCEL_TOKEN=your_vercel_api_token\nVERCEL_PROJECT_ID=your_project_id (optional)\n```\n\n"
            "💡 [Simulated Staging Status]: Project 'Autonomous-Multi-Step-AI-Agent' - Latest deployment: READY at https://autonomous-agent.vercel.app (Clean build, 0 fatal errors)."
        )
    
    params: Dict[str, Any] = {"limit": limit}
    if proj and not proj.startswith("your_"):
        params["projectId"] = proj
    if team_id and not team_id.startswith("your_"):
        params["teamId"] = team_id
        
    try:
        resp = requests.get(f"{VERCEL_API_BASE}/v6/deployments", headers=headers, params=params, timeout=10)
        if resp.status_code == 401 or resp.status_code == 403:
            return f"❌ Vercel Authentication Error: Invalid or expired VERCEL_TOKEN (HTTP {resp.status_code}). Please verify your token permissions."
        if not resp.ok:
            return f"❌ Vercel API Error ({resp.status_code}): {resp.text[:300]}"
            
        data = resp.json()
        deployments = data.get("deployments", [])
        if not deployments:
            return "No deployments found for the configured Vercel account/project."
            
        rows = []
        for d in deployments:
            dep_id = d.get("uid", d.get("id", "N/A"))
            name = d.get("name", "Unknown")
            state = d.get("state", d.get("status", "UNKNOWN")).upper()
            url = d.get("url", "N/A")
            created = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(d.get("created", time.time()*1000)/1000))
            meta = d.get("meta", {})
            commit_msg = meta.get("githubCommitMessage", "N/A")
            
            status_icon = "🟢" if state in ["READY", "BUILDING"] else "🔴" if state in ["ERROR", "CANCELED"] else "⚪"
            rows.append(f"{status_icon} **{name}** (`{dep_id[:12]}`) — State: **{state}**\n   - URL: https://{url}\n   - Created: {created}\n   - Commit: {commit_msg[:60]}")
            
        return "### 🚀 Vercel Deployments Overview:\n\n" + "\n\n".join(rows)
    except Exception as e:
        return f"Error connecting to Vercel API: {str(e)}"

def get_vercel_logs(deployment_id: Optional[str] = None, limit: int = 30) -> str:
    """Fetches build and execution event logs for a specific or latest deployment."""
    headers = _get_headers()
    token = os.getenv("VERCEL_TOKEN", "").strip()
    team_id = os.getenv("VERCEL_TEAM_ID", "").strip()
    
    if not token or token.startswith("your_"):
        return (
            "⚠️ Live Vercel connection requires `VERCEL_TOKEN` in `.env`.\n\n"
            "Simulated Build Logs:\n"
            "[INFO] [Build] vite v6.4.3 building for production...\n"
            "[INFO] [Build] ✓ 304 modules transformed.\n"
            "[INFO] [Build] dist/assets/index-kQpxXL3n.js  751.44 kB\n"
            "[INFO] [Build] ✓ built in 9.24s\n"
            "[SUCCESS] [Deploy] Deployment completed successfully. Status: READY"
        )
        
    dep_id = deployment_id
    if not dep_id:
        # Fetch the latest deployment ID automatically
        params: Dict[str, Any] = {"limit": 1}
        if team_id:
            params["teamId"] = team_id
        try:
            r = requests.get(f"{VERCEL_API_BASE}/v6/deployments", headers=headers, params=params, timeout=10)
            if r.ok and r.json().get("deployments"):
                dep_id = r.json()["deployments"][0].get("uid")
        except Exception:
            pass
            
    if not dep_id:
        return "Could not determine deployment ID to inspect logs."
        
    try:
        events_url = f"{VERCEL_API_BASE}/v2/deployments/{dep_id}/events"
        params = {"limit": limit}
        if team_id:
            params["teamId"] = team_id
            
        resp = requests.get(events_url, headers=headers, params=params, timeout=12)
        if not resp.ok:
            return f"❌ Failed to fetch logs for deployment `{dep_id}` ({resp.status_code}): {resp.text[:300]}"
            
        events = resp.json()
        if not isinstance(events, list) or not events:
            return f"No log events recorded for deployment `{dep_id}`."
            
        formatted_logs = []
        for ev in events[-limit:]:
            payload = ev.get("payload", {})
            text = payload.get("text", ev.get("text", ""))
            event_type = ev.get("type", "log")
            if text:
                formatted_logs.append(f"[{event_type.upper()}] {text.strip()}")
                
        return f"### 📜 Vercel Logs for Deployment `{dep_id[:12]}`:\n\n```log\n" + "\n".join(formatted_logs) + "\n```"
    except Exception as e:
        return f"Error retrieving Vercel deployment logs: {str(e)}"

def vercel_logger(action: str = "list_deployments", deployment_id: Optional[str] = None, project_id: Optional[str] = None, limit: int = 5) -> str:
    """Unified Vercel tool for deployment listing, logs retrieval, and diagnostics."""
    act = action.lower().strip()
    if "log" in act or "event" in act or "error" in act:
        return get_vercel_logs(deployment_id=deployment_id, limit=limit or 30)
    return list_vercel_deployments(project_id=project_id, limit=limit or 5)

registry.register(
    "vercel_logger",
    "Inspect Vercel deployments and retrieve build/runtime logs. Args: action ('list_deployments' or 'get_logs'), deployment_id (optional), project_id (optional)",
    vercel_logger
)
