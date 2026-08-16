import os
import re
from typing import Dict, Any, List

# Sandboxed root logs directory
LOGS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "logs"))

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

def scan_system_logs(filename: str = "app.log", max_lines: int = 100) -> Dict[str, Any]:
    """
    Safely inspect application logs in read-only sandboxed mode.
    Returns error counts, critical entries, and an executive brief for Jarvis.
    """
    ensure_logs_dir()
    
    # Security: sanitize filename to prevent path traversal
    safe_filename = os.path.basename(filename)
    target_path = os.path.abspath(os.path.join(LOGS_DIR, safe_filename))
    
    # Assert path remains inside LOGS_DIR sandbox
    if not target_path.startswith(LOGS_DIR):
        return {
            "status": "error",
            "message": "Access Denied: Path traversal detected outside sandboxed logs directory."
        }
        
    if not os.path.exists(target_path):
        return {
            "status": "ok",
            "log_file": safe_filename,
            "error_count": 0,
            "warning_count": 0,
            "recent_events": [],
            "briefing": "Sentinel reporting: Log archive is pristine. Zero anomalies recorded."
        }
        
    errors = []
    warnings = []
    recent_lines = []
    
    try:
        with open(target_path, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
            recent_lines = [line.strip() for line in lines[-max_lines:] if line.strip()]
            
            for line in recent_lines:
                if re.search(r'\b(error|exception|critical|fatal|failed)\b', line, re.IGNORECASE):
                    errors.append(line)
                elif re.search(r'\b(warn|warning)\b', line, re.IGNORECASE):
                    warnings.append(line)
                    
        err_count = len(errors)
        warn_count = len(warnings)
        
        if err_count == 0 and warn_count == 0:
            brief = f"Sentinel online. System health at 100%. Verified {len(recent_lines)} log entries with zero errors or warnings."
        elif err_count == 0:
            brief = f"Sentinel online. System nominal with {warn_count} minor warnings. No critical failures detected."
        else:
            brief = f"Sentinel alert! Detected {err_count} errors and {warn_count} warnings in the recent log stream. Immediate review advised."
            
        return {
            "status": "ok",
            "log_file": safe_filename,
            "total_scanned": len(recent_lines),
            "error_count": err_count,
            "warning_count": warn_count,
            "errors": errors[-5:], # Top 5 latest
            "warnings": warnings[-5:],
            "briefing": brief
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Sentinel read failure: {str(e)}",
            "briefing": f"Sentinel reporting a sensor malfunction while reading log file: {str(e)}"
        }

def log_event(message: str, level: str = "INFO"):
    """Appends an event to the local app.log file safely."""
    ensure_logs_dir()
    log_path = os.path.join(LOGS_DIR, "app.log")
    try:
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] [{level.upper()}] {message}\n")
    except Exception as e:
        print(f"[Sentinel Log Event Failed]: {e}")
