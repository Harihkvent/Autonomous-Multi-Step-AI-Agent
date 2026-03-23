import datetime
import platform
import sys
from tools.registry import registry
from models import ToolResult

def get_current_date() -> ToolResult:
    """Returns the current date and time in a human-readable format."""
    now = datetime.datetime.now()
    # Format: Monday, March 23, 2026 10:25 AM
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

# Register the new tools
registry.register("get_current_date", "Get the current date and time (required for date calculations and scheduling)", get_current_date)
registry.register("get_system_info", "Get basic information about the system environment", get_system_info)
