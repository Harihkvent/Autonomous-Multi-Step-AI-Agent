import datetime
import platform
import sys
import os
import subprocess
import webbrowser
import re
from typing import Optional, Dict, Any
from tools.registry import registry
from models import ToolResult

def get_current_date() -> ToolResult:
    """Returns the current date and time in a human-readable format."""
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
        "processor": platform.processor()
    }
    return ToolResult(success=True, data=info)

def open_application(app_name: str, target: Optional[str] = None) -> ToolResult:
    """
    Launches a local desktop application or system tool on Windows/OS 
    (Chrome, WhatsApp, Docker Desktop, Antigravity IDE/VS Code, Notepad, Calculator, Terminal/PowerShell, etc.).
    Supports running terminal commands in the spawned terminal window!
    """
    app = app_name.lower().strip()
    target_str = target.strip() if target else ""
    
    try:
        if "chrome" in app:
            if target_str:
                url = target_str if (target_str.startswith("http://") or target_str.startswith("https://")) else f"https://{target_str}"
                subprocess.Popen(f'start chrome "{url}"', shell=True)
                return ToolResult(success=True, data={"status": f"Successfully launched Google Chrome at '{url}'", "app": "Chrome", "target": url})
            else:
                subprocess.Popen('start chrome', shell=True)
                return ToolResult(success=True, data={"status": "Successfully launched Google Chrome", "app": "Chrome"})

        elif "whatsapp" in app:
            if target_str:
                url = f"https://web.whatsapp.com/send?text={target_str}"
                webbrowser.open(url)
                return ToolResult(success=True, data={"status": f"Opened WhatsApp with prepared message/contact query: '{target_str}'", "app": "WhatsApp"})
            else:
                try:
                    subprocess.Popen('start whatsapp:', shell=True)
                except Exception:
                    webbrowser.open("https://web.whatsapp.com")
                return ToolResult(success=True, data={"status": "Successfully opened WhatsApp application", "app": "WhatsApp"})

        elif "docker" in app:
            subprocess.Popen('start "" "Docker Desktop"', shell=True)
            return ToolResult(success=True, data={"status": "Successfully launched Docker Desktop", "app": "Docker Desktop"})

        elif "antigravity" in app or "ide" in app or "code" in app or "vscode" in app:
            subprocess.Popen('code', shell=True)
            return ToolResult(success=True, data={"status": "Successfully opened Antigravity IDE / VS Code workspace", "app": "Antigravity IDE"})

        elif "notepad" in app:
            subprocess.Popen(['notepad.exe'])
            return ToolResult(success=True, data={"status": "Opened Notepad", "app": "Notepad"})

        elif "calc" in app or "calculator" in app:
            subprocess.Popen(['calc.exe'])
            return ToolResult(success=True, data={"status": "Opened System Calculator", "app": "Calculator"})

        elif "explorer" in app or "file" in app:
            subprocess.Popen(['explorer.exe'])
            return ToolResult(success=True, data={"status": "Opened File Explorer", "app": "File Explorer"})

        elif "terminal" in app or "cmd" in app or "powershell" in app:
            if target_str:
                # Open interactive PowerShell window executing the requested command
                subprocess.Popen(f'start powershell -NoExit -Command "{target_str}"', shell=True)
                
                # Execute command locally to capture output for Titan's response
                try:
                    captured = subprocess.check_output(f'powershell -Command "{target_str}"', shell=True, text=True, timeout=5)
                    output_text = captured.strip()
                    if len(output_text) > 800:
                        output_text = output_text[:800] + "\n...[truncated]"
                    output_summary = f"\n\n**Terminal Output:**\n```text\n{output_text}\n```"
                except Exception as ex:
                    output_summary = f" (Launched command `{target_str}` in new terminal window)"
                
                return ToolResult(success=True, data={
                    "status": f"Opened PowerShell terminal window and executed `{target_str}`.{output_summary}",
                    "app": "Terminal",
                    "command": target_str
                })
            else:
                subprocess.Popen('start powershell', shell=True)
                return ToolResult(success=True, data={"status": "Opened PowerShell Terminal window", "app": "Terminal"})

        else:
            # Generic OS start
            if target_str:
                subprocess.Popen(f'start powershell -NoExit -Command "{app} {target_str}"', shell=True)
                return ToolResult(success=True, data={"status": f"Opened terminal and executed `{app} {target_str}`", "app": app_name})
            else:
                subprocess.Popen(f'start {app}', shell=True)
                return ToolResult(success=True, data={"status": f"Executed launch command for '{app_name}'", "app": app_name})

    except Exception as e:
        return ToolResult(success=False, error=f"Could not launch application '{app_name}': {str(e)}")

# Register tools
registry.register("get_current_date", "Get the current date and time", get_current_date, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("get_system_info", "Get basic information about the system environment", get_system_info, risk_level="LOW", requires_approval=False, timeout=10)
registry.register("open_application", "Launch local desktop applications (Chrome, WhatsApp, Docker, Antigravity IDE, Notepad, Calculator, Terminal with commands, etc.)", open_application, risk_level="MEDIUM", requires_approval=False, timeout=15)
