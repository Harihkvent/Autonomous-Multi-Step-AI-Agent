from tools.registry import registry
from models import ToolResult

def send_message(recipients: list[str], message: str, channel: str = "email") -> ToolResult:
    """Send a notification message via email or SMS."""
    print(f"[Notification] Sending {channel} to {recipients}: '{message}'")
    return ToolResult(success=True, data={"delivery_status": "sent", "channel": channel})

registry.register("notification_api.send_message", "Send a message or notification", send_message)
