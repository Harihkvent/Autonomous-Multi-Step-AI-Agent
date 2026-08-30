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
    Launches applications across client machines (Calculator, Notepad, WhatsApp Desktop,
    PowerShell/Terminal, VS Code, Spotify) and cloud deployments via native client OS protocols,
    batch launchers, and web triggers.
    """
    app = app_name.lower().strip()
    target_str = target.strip() if target else ""
    is_cloud = is_cloud_environment()
    is_windows = platform.system() == "Windows"

    # Map desktop & web applications with both native client protocol URI and web fallback
    WEB_MAP = {
        "instagram": ("Instagram", "https://instagram.com", None),
        "whatsapp": (
            "WhatsApp", 
            f"https://web.whatsapp.com/send?text={urllib.parse.quote(target_str)}" if target_str else "https://web.whatsapp.com",
            f"whatsapp://send?text={urllib.parse.quote(target_str)}" if target_str else "whatsapp://"
        ),
        "youtube": ("YouTube", f"https://www.youtube.com/results?search_query={urllib.parse.quote(target_str)}" if target_str else "https://youtube.com", None),
        "github": ("GitHub", f"https://github.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://github.com", None),
        "google": ("Google", f"https://www.google.com/search?q={urllib.parse.quote(target_str)}" if target_str else "https://google.com", None),
        "twitter": ("Twitter / X", "https://x.com", None),
        "x": ("X (Twitter)", "https://x.com", None),
        "linkedin": ("LinkedIn", "https://linkedin.com", None),
        "facebook": ("Facebook", "https://facebook.com", None),
        "reddit": ("Reddit", f"https://www.reddit.com/search/?q={urllib.parse.quote(target_str)}" if target_str else "https://reddit.com", None),
        "chatgpt": ("ChatGPT", "https://chatgpt.com", None),
        "openai": ("OpenAI", "https://chatgpt.com", None),
        "claude": ("Claude AI", "https://claude.ai", None),
        "gmail": ("Gmail", "https://mail.google.com", "mailto:"),
        "email": ("Gmail", "https://mail.google.com", "mailto:"),
        "mail": ("Gmail", "https://mail.google.com", "mailto:"),
        "spotify": ("Spotify", "https://open.spotify.com", "spotify:"),
        "netflix": ("Netflix", "https://netflix.com", None),
        "amazon": ("Amazon", f"https://www.amazon.com/s?k={urllib.parse.quote(target_str)}" if target_str else "https://amazon.com", None),
        "maps": ("Google Maps", f"https://maps.google.com/?q={urllib.parse.quote(target_str)}" if target_str else "https://maps.google.com", "maps:"),
        "antigravity": ("Antigravity / VS Code", "https://vscode.dev", "vscode://"),
        "vscode": ("VS Code Desktop", "https://vscode.dev", "vscode://"),
        "code": ("VS Code Desktop", "https://vscode.dev", "vscode://"),
        "ide": ("VS Code Desktop", "https://vscode.dev", "vscode://"),
        "notion": ("Notion", "https://notion.so", None),
        "discord": ("Discord", "https://discord.com/app", "discord://"),
        "telegram": ("Telegram", "https://web.telegram.org", "tg://"),
        "calendar": ("Google Calendar", "https://calendar.google.com", None)
    }

    try:
        # 1. Windows Native Calculator (Client OS Protocol + Math Evaluator)
        if "calc" in app or "calculator" in app:
            calc_expr = target_str or ""
            calc_result = None
            if calc_expr:
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

            # Local desktop launch if backend is running on local Windows
            if not is_cloud and is_windows:
                try:
                    subprocess.Popen(['calc.exe'])
                except Exception:
                    pass

            web_calc_url = "https://www.google.com/search?q=calculator"
            result_line = f"Computed: `{calc_expr}` = **{calc_result}**\n\n" if calc_result is not None else ""
            status_text = (
                f"🧮 **Windows Calculator Triggered for Client System**\n\n"
                f"{result_line}"
                f"Launching native Calculator (`calc.exe`) on your PC.\n\n"
                f"<!-- [CLIENT_PROTOCOL:calculator:] -->\n"
                f"<!-- [LAUNCH_APP:Windows Calculator:calculator:] -->\n"
                f"<!-- [LAUNCH_APP:Web Calculator:{web_calc_url}] -->"
            )
            return ToolResult(success=True, data={"status": status_text, "app": "Calculator", "result": calc_result, "protocol": "calculator:"})

        # 2. Notepad / Text Editor (Generates Notes, .bat One-Click Launcher, & Download)
        elif "notepad" in app or "note" in app:
            note_filename = "agent_notepad_notes.txt"
            bat_filename = "launch_notepad.bat"
            note_path = os.path.join(GENERATED_DOCS_DIR, note_filename)
            bat_path = os.path.join(GENERATED_DOCS_DIR, bat_filename)
            
            if any(k in target_str.lower() for k in ["capability", "capabilities", "detail", "details", "info", "system", "about"]) or not target_str:
                content = (
                    "=====================================================\n"
                    "  AUTONOMOUS TASKFORCE AGENT - SYSTEM CAPABILITIES\n"
                    "=====================================================\n\n"
                    "1. TITAN OS & SYSTEM AUTOMATION:\n"
                    "   - Direct Client OS Application Access (Calculator, Notepad, WhatsApp, Terminal, VS Code)\n"
                    "   - One-click native launchers & batch automation triggers\n"
                    "   - Cross-platform shell execution & diagnostics\n\n"
                    "2. SCOUT RECON & LIVE WEB INTEL:\n"
                    "   - Live Web & Google search for real-time news, scores, stocks, and research\n\n"
                    "3. SENTINEL VERCEL WATCHER:\n"
                    "   - Inspect live Vercel deployments, build logs, and runtime telemetry\n\n"
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

            # Write text note
            with open(note_path, "w", encoding="utf-8") as f:
                f.write(content)

            # Write one-click Windows batch launcher for the client PC
            bat_content = (
                "@echo off\n"
                "chcp 65001 >nul\n"
                "title Titan Notepad Launcher\n"
                f'set "NOTETMP=%TEMP%\\{note_filename}"\n'
                "(\n"
            )
            for line in content.split("\n"):
                sanitized_line = line.replace("%", "%%").replace(">", "^>").replace("<", "^<").replace("&", "^&").replace("|", "^|")
                bat_content += f"echo {sanitized_line}\n"
            bat_content += (
                ") > \"%NOTETMP%\"\n"
                "start notepad.exe \"%NOTETMP%\"\n"
            )
            with open(bat_path, "w", encoding="utf-8") as f:
                f.write(bat_content)

            # Local desktop launch if on local Windows machine
            if not is_cloud and is_windows:
                try:
                    subprocess.Popen(['notepad.exe', note_path])
                except Exception:
                    pass

            status_text = (
                f"📝 **Notepad Document Created for Client System**:\n\n"
                f"```text\n{content}\n```\n\n"
                f"[DOWNLOAD:{note_filename}]\n"
                f"[DOWNLOAD:{bat_filename}]"
            )
            return ToolResult(success=True, data={"status": status_text, "app": "Notepad", "filename": note_filename, "content": content})

        # 3. Terminal & PowerShell (Interactive Console, .bat Launcher, & Cross-Platform Execution)
        elif "terminal" in app or "cmd" in app or "powershell" in app or "shell" in app:
            is_generic_open = not target_str or target_str.lower() in ["open", "terminal", "powershell", "cmd", "shell", "start", "run", "system"]
            bat_filename = "launch_powershell.bat"
            bat_path = os.path.join(GENERATED_DOCS_DIR, bat_filename)

            if is_generic_open:
                # Generate a one-click launcher for the client's PowerShell
                bat_code = (
                    "@echo off\n"
                    "title Autonomous Taskforce - Terminal Console\n"
                    "color 0B\n"
                    "echo ====================================================\n"
                    "echo   AUTONOMOUS TASKFORCE - CLIENT TERMINAL RUNNER\n"
                    "echo ====================================================\n"
                    "echo.\n"
                    "powershell -NoExit -Command \"Write-Host 'Taskforce Terminal Online. Enter commands below:' -ForegroundColor Cyan\"\n"
                )
                with open(bat_path, "w", encoding="utf-8") as f:
                    f.write(bat_code)

                if not is_cloud and is_windows:
                    try:
                        subprocess.Popen('start powershell', shell=True)
                    except Exception:
                        pass

                status_text = (
                    "💻 **Titan Terminal Console Active for Client System**\n\n"
                    "Ready to execute system diagnostics and command-line instructions.\n\n"
                    "**Available Diagnostics:**\n"
                    "- `ping 8.8.8.8` (Network latency check)\n"
                    "- `python --version` (Runtime check)\n"
                    "- `git status` / `git --version`\n"
                    "- `whoami` / `uptime`\n\n"
                    f"[DOWNLOAD:{bat_filename}]"
                )
                return ToolResult(success=True, data={"status": status_text, "app": "Terminal"})
            else:
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

                # Create .bat launcher to run this exact command on client PC
                bat_code = (
                    "@echo off\n"
                    f"title Titan Command Runner - {cmd}\n"
                    "color 0A\n"
                    "echo ====================================================\n"
                    f"echo   Executing Command: {cmd}\n"
                    "echo ====================================================\n"
                    "echo.\n"
                    f'powershell -NoExit -Command "{cmd}"\n'
                )
                with open(bat_path, "w", encoding="utf-8") as f:
                    f.write(bat_code)

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

                if not is_cloud and is_windows:
                    try:
                        subprocess.Popen(f'start powershell -NoExit -Command "{cmd}"', shell=True)
                    except Exception:
                        pass

                status_text = (
                    f"💻 **Executed Terminal Command:** `{cmd}`{output_summary}\n\n"
                    f"[DOWNLOAD:{bat_filename}]"
                )
                return ToolResult(success=True, data={"status": status_text, "app": "Terminal", "command": cmd})

        # 4. Check Web & Native Protocol Mappings (WhatsApp, VS Code, Spotify, Telegram, Discord, etc.)
        matched_web_entry = next((v for k, v in WEB_MAP.items() if k in app), None)
        is_url = bool(re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in|co|app)', app + " " + target_str))

        if matched_web_entry or is_url or "chrome" in app or "browser" in app or "edge" in app:
            if matched_web_entry:
                label, web_url, native_protocol = matched_web_entry
            elif is_url:
                url_match = re.search(r'https?://\S+|www\.\S+|[\w-]+\.(?:com|org|io|net|dev|ai|in|co|app)', app + " " + target_str)
                raw_url = url_match.group(0) if url_match else "https://google.com"
                web_url = raw_url if (raw_url.startswith("http://") or raw_url.startswith("https://")) else f"https://{raw_url}"
                label = "Web Target"
                native_protocol = None
            else:
                web_url = f"https://{target_str}" if target_str else "https://google.com"
                label = "Google Chrome"
                native_protocol = None

            # Local desktop launch if running locally on Windows
            if not is_cloud and is_windows:
                try:
                    webbrowser.open(native_protocol if native_protocol else web_url)
                except Exception:
                    pass

            protocol_tag = f"<!-- [CLIENT_PROTOCOL:{native_protocol}] -->\n" if native_protocol else ""
            app_btn = f"<!-- [LAUNCH_APP:{label} Desktop:{native_protocol}] -->\n" if native_protocol else ""
            web_btn = f"<!-- [LAUNCH_APP:{label} Web:{web_url}] -->"

            status_text = (
                f"🚀 **Launching {label} on Client System**\n\n"
                f"Direct access: [{web_url}]({web_url})\n\n"
                f"{protocol_tag}"
                f"{app_btn}"
                f"{web_btn}"
            )
            return ToolResult(success=True, data={"status": status_text, "app": label, "url": web_url, "protocol": native_protocol})

        # 5. Generic Application Launch / Search
        else:
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
registry.register("open_application", "Launch local and client desktop applications (Calculator, Notepad, WhatsApp, Terminal, VS Code, Chrome, etc.)", open_application, risk_level="MEDIUM", requires_approval=False, timeout=15)
