import datetime
import platform
import sys
import os
import subprocess
import webbrowser
import tempfile
import urllib.parse
import re
from typing import Optional, Dict, Any
from tools.registry import registry
from models import ToolResult

def get_current_date() -> ToolResult:
    """Returns the current date and time in human-readable IST (UTC+5:30) format."""
    try:
        from datetime import datetime, timezone, timedelta
        ist = timezone(timedelta(hours=5, minutes=30))
        now = datetime.now(ist)
        formatted_date = now.strftime("%A, %B %d, %Y %I:%M %p (IST)")
    except Exception:
        now = datetime.datetime.now()
        formatted_date = now.strftime("%A, %B %d, %Y %I:%M %p")
    return ToolResult(success=True, data={"current_date": formatted_date})

def get_system_info() -> ToolResult:
    """Returns basic information about the system environment."""
    info = {
        "os": platform.system(),
        "os_release": platform.release(),
        "python_version": sys.version,
        "machine": platform.machine(),
        "processor": platform.processor(),
        "is_vercel": bool(os.getenv("VERCEL"))
    }
    return ToolResult(success=True, data=info)

def open_application(app_name: str, target: Optional[str] = None) -> ToolResult:
    """
    Launches applications and web URLs across local and cloud Vercel deployments.
    On Vercel / Cloud deployments, generates web links & [OPEN_URL:url] tags so the 
    user's browser automatically pops open web apps (Instagram, WhatsApp, YouTube, etc.).
    """
    app = app_name.lower().strip()
    target_str = target.strip() if target else ""
    is_vercel = bool(os.getenv("VERCEL"))

    # Map popular web services to direct URLs
    WEB_MAP = {
        "instagram": "https://instagram.com",
        "whatsapp": f"https://web.whatsapp.com/send?text={urllib.parse.quote(target_str)}" if target_str else "https://web.whatsapp.com",
        "youtube": f"https://www.youtube.com/results?search_query={urllib.parse.quote(target_str)}" if target_str else "https://youtube.com",
        "github": f"https://github.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://github.com",
        "google": f"https://www.google.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://google.com",
        "twitter": "https://twitter.com",
        "x": "https://x.com",
        "linkedin": "https://linkedin.com",
        "facebook": "https://facebook.com",
        "reddit": f"https://www.reddit.com/search/?q={urllib.parse.quote(target_str)}" if target_str else "https://reddit.com"
    }

    try:
        # Check if requested app is a web application or URL
        matched_web_key = next((k for k in WEB_MAP if k in app), None)
        
        # Also check if app itself or target is a valid domain/URL
        is_url = bool(re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in)', app + " " + target_str))
        
        if matched_web_key or is_url or "chrome" in app:
            if matched_web_key:
                url = WEB_MAP[matched_web_key]
            elif is_url:
                url_match = re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in)', app + " " + target_str)
                raw_url = url_match.group(0) if url_match else "https://google.com"
                url = raw_url if (raw_url.startswith("http://") or raw_url.startswith("https://")) else f"https://{raw_url}"
            else:
                url = f"https://{target_str}" if target_str else "https://google.com"

            # If running locally, also attempt local browser trigger
            if not is_vercel:
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

            label = matched_web_key.capitalize() if matched_web_key else "Web Application"
            status_text = (
                f"Opened **{label}**: [{url}]({url})\n\n"
                f"<!-- [OPEN_URL:{url}] -->"
            )
            return ToolResult(success=True, data={"status": status_text, "app": label, "url": url})

        # Desktop-only OS executables (Notepad, Calculator, PowerShell, Docker, etc.)
        elif "notepad" in app:
            if target_str:
                temp_dir = tempfile.gettempdir()
                note_file = os.path.join(temp_dir, "agent_notepad_notes.txt")
                
                if any(k in target_str.lower() for k in ["capability", "capabilities", "detail", "details", "info", "system"]):
                    content = (
                        "=====================================================\n"
                        "  AUTONOMOUS TASKFORCE AGENT - SYSTEM CAPABILITIES\n"
                        "=====================================================\n\n"
                        "1. TITAN OS & SYSTEM AUTOMATION:\n"
                        "   - Launch local desktop apps & web services (Instagram, WhatsApp, Chrome, Docker, Notepad)\n"
                        "   - Spawn PowerShell terminal windows & execute live shell commands (git, python, ping, npm)\n\n"
                        "2. SCOUT RECON & LIVE WEB INTEL:\n"
                        "   - Live Web & Google/Wikipedia search for real-time news, scores, stocks, and events\n\n"
                        "3. SENTINEL VERCEL WATCHER:\n"
                        "   - Inspect live Vercel deployments, build logs, and serverless runtime telemetry\n\n"
                        "4. HERMES COMMUNICATIONS COURIER:\n"
                        "   - IMAP Gmail inbox digest scanner & SMTP email dispatch\n\n"
                        "5. SCRIBE DOCUMENT ARCHIVIST:\n"
                        "   - Read/extract PDF, DOCX, TXT files & generate formatted Word documents\n\n"
                        "6. CIPHER & CHRONOS CORES:\n"
                        "   - Deterministic AST math calculator & calendar meeting scheduler\n"
                        "=====================================================\n"
                    )
                else:
                    content = target_str
                
                with open(note_file, "w", encoding="utf-8") as f:
                    f.write(content)
                
                if not is_vercel:
                    subprocess.Popen(['notepad.exe', note_file])
                    
                return ToolResult(success=True, data={"status": f"Created Notepad content:\n```text\n{content}\n```", "app": "Notepad"})
            else:
                if not is_vercel:
                    subprocess.Popen(['notepad.exe'])
                return ToolResult(success=True, data={"status": "Opened Notepad application", "app": "Notepad"})

        elif "calc" in app or "calculator" in app:
            if not is_vercel:
                subprocess.Popen(['calc.exe'])
            return ToolResult(success=True, data={"status": "Opened System Calculator", "app": "Calculator"})

        elif "explorer" in app or "file" in app:
            if not is_vercel:
                subprocess.Popen(['explorer.exe'])
            return ToolResult(success=True, data={"status": "Opened File Explorer", "app": "File Explorer"})

        elif "terminal" in app or "cmd" in app or "powershell" in app:
            if target_str:
                if not is_vercel:
                    subprocess.Popen(f'start powershell -NoExit -Command "{target_str}"', shell=True)
                
                try:
                    captured = subprocess.check_output(f'powershell -Command "{target_str}"', shell=True, text=True, timeout=10)
                    output_text = captured.strip()
                    if len(output_text) > 800:
                        output_text = output_text[:800] + "\n...[truncated]"
                    output_summary = f"\n\n**Terminal Output:**\n```text\n{output_text}\n```"
                except Exception:
                    output_summary = f"\n\n(Executed command `{target_str}`)"
                
                return ToolResult(success=True, data={
                    "status": f"Executed terminal command `{target_str}`.{output_summary}",
                    "app": "Terminal",
                    "command": target_str
                })
            else:
                if not is_vercel:
                    subprocess.Popen('start powershell', shell=True)
                return ToolResult(success=True, data={"status": "Opened PowerShell Terminal window", "app": "Terminal"})

        else:
            if not is_vercel:
                if target_str:
                    subprocess.Popen(f'start powershell -NoExit -Command "{app} {target_str}"', shell=True)
                else:
                    subprocess.Popen(f'start {app}', shell=True)
            return ToolResult(success=True, data={"status": f"Executed launch command for '{app_name}'", "app": app_name})

    except Exception as e:
        return ToolResult(success=False, error=f"Could not launch application '{app_name}': {str(e)}")

# Register tools
registry.register("get_current_date", "Get the current date and time", get_current_date, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("get_system_info", "Get basic information about the system environment", get_system_info, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("open_application", "Launch local desktop applications (Chrome, WhatsApp, Docker, Antigravity IDE, Notepad, Calculator, Terminal with commands, etc.)", open_application, risk_level="MEDIUM", requires_approval=False, timeout=15)
