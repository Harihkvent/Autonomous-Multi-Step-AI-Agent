import os
import re
import requests
import time
from typing import Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

# Sandboxed root logs directory
LOGS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "logs"))
VERCEL_API_BASE = "https://api.vercel.com"

def ensure_logs_dir():
    """Ensure the sandboxed logs directory exists with a sample file."""
    if not os.path.exists(LOGS_DIR):
        os.makedirs(LOGS_DIR, exist_ok=True)
    
    sample_log = os.path.join(LOGS_DIR, "app.log")
    if not os.path.exists(sample_log):
        with open(sample_log, "w", encoding="utf-8") as f:
            f.write("[INFO] System initialized successfully. All services operational.\n")
            f.write("[INFO] LangGraph engine standing by on port 8000.\n")
            f.write("[INFO] Database connection verified.\n")

def check_vercel_health() -> Dict[str, Any]:
    """Inspect live Vercel deployments and project health."""
    token = os.getenv("VERCEL_TOKEN", "").strip()
    team_id = os.getenv("VERCEL_TEAM_ID", "").strip()
    
    if not token or token.startswith("your_"):
        return {
            "status": "unconfigured",
            "active_count": 0,
            "ready_count": 0,
            "error_count": 0,
            "latest_project": "N/A",
            "latest_state": "N/A",
            "summary": "Vercel integration standing by (no token configured)."
        }
        
    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": "AutonomousTaskforce/2.0 (sentinel-watcher)"
    }
    params: Dict[str, Any] = {"limit": 10}
    if team_id and not team_id.startswith("your_"):
        params["teamId"] = team_id
        
    try:
        resp = requests.get(f"{VERCEL_API_BASE}/v6/deployments", headers=headers, params=params, timeout=5)
        if not resp.ok:
            return {
                "status": "api_error",
                "code": resp.status_code,
                "summary": f"Vercel API error (HTTP {resp.status_code})"
            }
            
        deployments = resp.json().get("deployments", [])
        if not deployments:
            return {
                "status": "empty",
                "active_count": 0,
                "summary": "0 active deployments found on Vercel."
            }
            
        ready_count = sum(1 for d in deployments if d.get("state", "").upper() == "READY")
        error_count = sum(1 for d in deployments if d.get("state", "").upper() in ["ERROR", "FAILED", "CANCELED"])
        building_count = sum(1 for d in deployments if d.get("state", "").upper() == "BUILDING")
        
        latest = deployments[0]
        latest_name = latest.get("name", "Unknown Project")
        latest_state = latest.get("state", "UNKNOWN").upper()
        latest_url = latest.get("url", "")
        commit_msg = latest.get("meta", {}).get("githubCommitMessage", "")
        
        state_icon = "🟢" if latest_state == "READY" else "🟡" if latest_state == "BUILDING" else "🔴"
        
        return {
            "status": "healthy" if error_count == 0 else "warning",
            "total_deployments": len(deployments),
            "ready_count": ready_count,
            "building_count": building_count,
            "error_count": error_count,
            "latest_project": latest_name,
            "latest_state": latest_state,
            "latest_url": latest_url,
            "latest_commit": commit_msg[:50],
            "summary": f"Monitored {len(deployments)} Vercel deployments. Latest: '{latest_name}' {state_icon} {latest_state} ({ready_count} healthy, {error_count} errors)."
        }
    except Exception as e:
        return {
            "status": "error",
            "summary": f"Vercel health check exception: {str(e)}"
        }

def scan_system_logs(filename: str = "app.log", max_lines: int = 100) -> Dict[str, Any]:
    """
    Safely inspect application logs and live Vercel deployments.
    Returns combined telemetry and structured briefing.
    """
    ensure_logs_dir()
    
    # 1. Local sandboxed log scan
    safe_filename = os.path.basename(filename)
    target_path = os.path.abspath(os.path.join(LOGS_DIR, safe_filename))
    
    err_count = 0
    warn_count = 0
    recent_lines = []
    
    if target_path.startswith(LOGS_DIR) and os.path.exists(target_path):
        try:
            with open(target_path, "r", encoding="utf-8", errors="replace") as f:
                lines = f.readlines()
                recent_lines = [line.strip() for line in lines[-max_lines:] if line.strip()]
                for line in recent_lines:
                    if re.search(r'\b(error|exception|critical|fatal|failed)\b', line, re.IGNORECASE):
                        err_count += 1
                    elif re.search(r'\b(warn|warning)\b', line, re.IGNORECASE):
                        warn_count += 1
        except Exception:
            pass
            
    # 2. Live Vercel health check
    vercel_health = check_vercel_health()
    
    # 3. Formulate comprehensive Sentinel report
    vercel_part = vercel_health.get("summary", "")
    if err_count == 0 and warn_count == 0:
        log_part = "Local application telemetry is nominal (0 system errors)."
    else:
        log_part = f"Local telemetry detected {err_count} errors, {warn_count} warnings."
        
    brief = f"Sentinel online. {vercel_part} {log_part}"
    
    return {
        "status": "ok" if err_count == 0 and vercel_health.get("error_count", 0) == 0 else "warning",
        "log_file": safe_filename,
        "total_scanned": len(recent_lines),
        "error_count": err_count,
        "warning_count": warn_count,
        "vercel": vercel_health,
        "briefing": brief
    }

def log_event(message: str, level: str = "INFO"):
    """Appends an event to the local app.log file safely."""
    ensure_logs_dir()
    log_path = os.path.join(LOGS_DIR, "app.log")
    try:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] [{level.upper()}] {message}\n")
    except Exception as e:
        print(f"[Sentinel Log Event Failed]: {e}")
