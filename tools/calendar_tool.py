from tools.registry import registry
from models import ToolResult

def get_availability(team: list[str], start_date: str) -> ToolResult:
    """Check calendar availability for a given team on a specific date."""
    print(f"[Calendar] Checking availability for {team} on {start_date}...")
    # Mocking available slots
    return ToolResult(success=True, data={"available_slots": ["10:00 AM", "2:00 PM"]})

def create_event(title: str, attendees: list[str], time_slot: str) -> ToolResult:
    """Create a new calendar event at a specified time slot."""
    print(f"[Calendar] Creating event '{title}' at {time_slot} for {attendees}...")
    return ToolResult(success=True, data={"event_id": "EVT-12345", "status": "confirmed"})

registry.register("calendar_api.get_availability", "Check user availability", get_availability)
registry.register("calendar_api.create_event", "Create a calendar event", create_event)
