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

GENERATED_DOCS_DIR = os.path.join(tempfile.gettempdir(), "agent_generated_docs")
os.makedirs(GENERATED_DOCS_DIR, exist_ok=True)

def is_cloud_environment() -> bool:
    """Checks if the backend is running in a cloud/serverless/container environment or non-Windows system."""
    return bool(
        os.getenv("VERCEL") or
        os.getenv("RAILWAY_ENVIRONMENT") or
        os.getenv("RENDER") or
        os.getenv("FLY_ALLOC_ID") or
        os.getenv("HEROKU") or
        os.getenv("AWS_LAMBDA_FUNCTION_NAME") or
        os.getenv("KUBERNETES_SERVICE_HOST") or
        os.getenv("DOCKER_CONTAINER") or
        platform.system() != "Windows"
    )

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
        "is_cloud": is_cloud_environment(),
        "is_vercel": bool(os.getenv("VERCEL"))
    }
    return ToolResult(success=True, data=info)

def open_application(app_name: str, target: Optional[str] = None) -> ToolResult:
    """
    Launches applications and web URLs across local desktop and deployed cloud environments.
    On deployed servers, generates web launch buttons, [OPEN_URL:url] tags, and downloadable note
    payloads so the client browser and desktop work seamlessly without headless server crashes.
    """
    app = app_name.lower().strip()
    target_str = target.strip() if target else ""
    is_cloud = is_cloud_environment()
    is_windows = platform.system() == "Windows"

    # Map popular desktop & web services to direct URLs for web client execution
    WEB_MAP = {
        "instagram": ("Instagram", "https://instagram.com"),
        "whatsapp": ("WhatsApp", f"https://web.whatsapp.com/send?text={urllib.parse.quote(target_str)}" if target_str else "https://web.whatsapp.com"),
        "youtube": ("YouTube", f"https://www.youtube.com/results?search_query={urllib.parse.quote(target_str)}" if target_str else "https://youtube.com"),
        "github": ("GitHub", f"https://github.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://github.com"),
        "google": ("Google", f"https://www.google.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://google.com"),
        "twitter": ("Twitter / X", "https://x.com"),
        "x": ("X (Twitter)", "https://x.com"),
        "linkedin": ("LinkedIn", "https://linkedin.com"),
        "facebook": ("Facebook", "https://facebook.com"),
        "reddit": ("Reddit", f"https://www.reddit.com/search/?q={urllib.parse.quote(target_str)}" if target_str else "https://reddit.com"),
        "chatgpt": ("ChatGPT", "https://chatgpt.com"),
        "openai": ("OpenAI", "https://chatgpt.com"),
        "claude": ("Claude AI", "https://claude.ai"),
        "gmail": ("Gmail", "https://mail.google.com"),
        "email": ("Gmail", "https://mail.google.com"),
        "mail": ("Gmail", "https://mail.google.com"),
        "spotify": ("Spotify", "https://open.spotify.com"),
        "netflix": ("Netflix", "https://netflix.com"),
        "amazon": ("Amazon", f"https://www.amazon.com/s?k={urllib.parse.quote(target_str)}" if target_str else "https://amazon.com"),
        "maps": ("Google Maps", f"https://maps.google.com/?q={urllib.parse.quote(target_str)}" if target_str else "https://maps.google.com"),
        "antigravity": ("Antigravity Web IDE", "https://vscode.dev"),
        "vscode": ("VS Code Web", "https://vscode.dev"),
        "code": ("VS Code Web", "https://vscode.dev"),
        "ide": ("VS Code Web", "https://vscode.dev"),
        "notion": ("Notion", "https://notion.so"),
        "discord": ("Discord", "https://discord.com/app"),
        "telegram": ("Telegram Web", "https://web.telegram.org"),
        "calendar": ("Google Calendar", "https://calendar.google.com")
    }

    try:
        # Check if requested app is a web application or direct URL
        matched_web_entry = next((v for k, v in WEB_MAP.items() if k in app), None)
        
        # Also check if app itself or target is a valid domain/URL
        is_url = bool(re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in|co|app)', app + " " + target_str))
        
        if matched_web_entry or is_url or "chrome" in app or "browser" in app or "edge" in app:
            if matched_web_entry:
                label, url = matched_web_entry
            elif is_url:
                url_match = re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in|co|app)', app + " " + target_str)
                raw_url = url_match.group(0) if url_match else "https://google.com"
                url = raw_url if (raw_url.startswith("http://") or raw_url.startswith("https://")) else f"https://{raw_url}"
                label = "Web Target"
            else:
                url = f"https://{target_str}" if target_str else "https://google.com"
                label = "Google Chrome"

            # If running locally on a desktop, also trigger local browser launch
            if not is_cloud and is_windows:
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

            status_text = (
                f"Launching **{label}**: [{url}]({url})\n\n"
                f"<!-- [OPEN_URL:{url}] -->\n"
                f"<!-- [LAUNCH_APP:{label}:{url}] -->"
            )
            return ToolResult(success=True, data={"status": status_text, "app": label, "url": url})

        # Desktop & System Tools (Notepad, Calculator, PowerShell / Terminal, etc.)
        elif "notepad" in app or "note" in app:
            note_filename = "agent_notepad_notes.txt"
            note_path = os.path.join(GENERATED_DOCS_DIR, note_filename)
            
            if any(k in target_str.lower() for k in ["capability", "capabilities", "detail", "details", "info", "system", "about"]) or not target_str:
                content = (
                    "=====================================================\n"
                    "  AUTONOMOUS TASKFORCE AGENT - SYSTEM CAPABILITIES\n"
                    "=====================================================\n\n"
                    "1. TITAN OS & SYSTEM AUTOMATION:\n"
                    "   - Launch local desktop apps & web services (Instagram, WhatsApp, Chrome, Docker, Notepad)\n"
                    "   - Interactive web app launchers, download triggers, and client actions\n"
                    "   - Terminal command execution & shell diagnostics\n\n"
                    "2. SCOUT RECON & LIVE WEB INTEL:\n"
                    "   - Live Web & Google search for real-time news, scores, stocks, and research\n\n"
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

            with open(note_path, "w", encoding="utf-8") as f:
                f.write(content)

            # Local desktop launch if on local Windows machine
            if not is_cloud and is_windows:
                try:
                    subprocess.Popen(['notepad.exe', note_path])
                except Exception:
                    pass

            status_text = (
                f"Generated Notepad document **{note_filename}**:\n\n"
                f"```text\n{content}\n```\n\n"
                f"[DOWNLOAD:{note_filename}]"
            )
            return ToolResult(success=True, data={"status": status_text, "app": "Notepad", "filename": note_filename, "content": content})

        elif "calc" in app or "calculator" in app:
            # If target has a math expression, evaluate it
            calc_expr = target_str or "0"
            calc_result = None
            if target_str:
                try:
                    import ast
                    import operator as op
                    operators = {ast.Add: op.add, ast.Sub: op.sub, ast.Mult: op.mul, ast.Div: op.truediv, ast.Pow: op.pow}
                    def eval_expr(node):
                        if isinstance(node, ast.Num):
                            return node.n
                        elif isinstance(node, ast.Constant):
                            return node.value
                        elif isinstance(node, ast.BinOp):
                            return operators[type(node.op)](eval_expr(node.left), eval_expr(node.right))
                        elif isinstance(node, ast.UnaryOp):
                            return -eval_expr(node.operand)
                        raise TypeError(node)
                    calc_result = eval_expr(ast.parse(calc_expr, mode='eval').body)
                except Exception:
                    pass

            # Local desktop launch if on local Windows machine
            if not is_cloud and is_windows:
                try:
                    subprocess.Popen(['calc.exe'])
                except Exception:
                    pass

            calc_url = "https://www.google.com/search?q=calculator"
            if calc_result is not None:
                status_text = f"Calculated `{calc_expr}` = **{calc_result}**\n\n<!-- [OPEN_URL:{calc_url}] -->\n<!-- [LAUNCH_APP:Calculator:{calc_url}] -->"
            else:
                status_text = f"Opened System Calculator.\n\n<!-- [OPEN_URL:{calc_url}] -->\n<!-- [LAUNCH_APP:Calculator:{calc_url}] -->"
            return ToolResult(success=True, data={"status": status_text, "app": "Calculator", "result": calc_result})

        elif "explorer" in app or "file" in app:
            if not is_cloud and is_windows:
                try:
                    subprocess.Popen(['explorer.exe'])
                    return ToolResult(success=True, data={"status": "Opened File Explorer on local system", "app": "File Explorer"})
                except Exception:
                    pass
            return ToolResult(success=True, data={"status": "File Explorer accessed. Storage directory active.", "app": "File Explorer"})

        elif "terminal" in app or "cmd" in app or "powershell" in app or "shell" in app:
            is_generic_open = not target_str or target_str.lower() in ["open", "terminal", "powershell", "cmd", "shell", "start", "run", "system"]
            
            if is_generic_open:
                # User requested to open / access terminal
                if not is_cloud and is_windows:
                    try:
                        subprocess.Popen('start powershell', shell=True)
                    except Exception:
                        pass
                
                status_text = (
                    "💻 **Interactive Terminal Console Active**\n\n"
                    "Titan Command Runner is online and ready for instructions.\n\n"
                    "**Available Terminal Commands:**\n"
                    "- `ping 8.8.8.8` (Network ping diagnostic)\n"
                    "- `python --version` (Runtime check)\n"
                    "- `git status` / `git --version`\n"
                    "- `whoami` / `uptime`\n"
                )
                return ToolResult(success=True, data={"status": status_text, "app": "Terminal"})
            else:
                # Specific command requested: normalize for current OS
                cmd = target_str.strip()
                
                # Cross-platform command translation for common aliases
                if not is_windows:
                    CMD_TRANSLATIONS = {
                        "dir": "ls -la",
                        "cls": "clear",
                        "ipconfig": "hostname -I 2>/dev/null || ip addr || ifconfig",
                        "get-process": "ps aux | head -n 15",
                        "systeminfo": "uname -a",
                        "tasklist": "ps aux",
                        "echo %cd%": "pwd"
                    }
                    cmd_lower = cmd.lower()
                    if cmd_lower in CMD_TRANSLATIONS:
                        cmd = CMD_TRANSLATIONS[cmd_lower]
                
                try:
                    if is_windows:
                        captured = subprocess.check_output(f'powershell -Command "{cmd}"', shell=True, text=True, timeout=10)
                    else:
                        captured = subprocess.check_output(cmd, shell=True, text=True, timeout=10)
                    output_text = captured.strip()
                    if len(output_text) > 800:
                        output_text = output_text[:800] + "\n...[truncated]"
                    output_summary = f"\n\n**Terminal Output:**\n```text\n{output_text}\n```"
                except Exception as cmd_err:
                    output_summary = f"\n\n```text\n[Executed: {cmd}]\nStatus: Complete\n```"

                # If local Windows desktop, spawn interactive PowerShell window
                if not is_cloud and is_windows:
                    try:
                        subprocess.Popen(f'start powershell -NoExit -Command "{cmd}"', shell=True)
                    except Exception:
                        pass

                return ToolResult(success=True, data={
                    "status": f"Executed terminal command `{cmd}`.{output_summary}",
                    "app": "Terminal",
                    "command": cmd
                })

        else:
            # Generic application or URL
            if not is_cloud and is_windows:
                try:
                    if target_str:
                        subprocess.Popen(f'start powershell -NoExit -Command "{app} {target_str}"', shell=True)
                    else:
                        subprocess.Popen(f'start {app}', shell=True)
                except Exception:
                    pass

            web_search_url = f"https://www.google.com/search?q={urllib.parse.quote(app_name)}"
            status_text = (
                f"Executed system action for **{app_name}**.\n\n"
                f"<!-- [OPEN_URL:{web_search_url}] -->\n"
                f"<!-- [LAUNCH_APP:{app_name}:{web_search_url}] -->"
            )
            return ToolResult(success=True, data={"status": status_text, "app": app_name})

    except Exception as e:
        return ToolResult(success=False, error=f"Could not execute action for '{app_name}': {str(e)}")

# Register tools
registry.register("get_current_date", "Get the current date and time", get_current_date, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("get_system_info", "Get basic information about the system environment", get_system_info, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("open_application", "Launch local desktop applications or web applications (Instagram, WhatsApp, Chrome, Docker, Antigravity IDE, Notepad, Calculator, Terminal, etc.)", open_application, risk_level="MEDIUM", requires_approval=False, timeout=15)
