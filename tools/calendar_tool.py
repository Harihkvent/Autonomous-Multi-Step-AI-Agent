from tools.registry import registry
from models import ToolResult

def get_availability(team: list[str], start_date: str) -> ToolResult:
    """Check calendar availability for a given team on a specific date."""
    print(f"[Calendar] Checking availability for {team} on {start_date}...")
    # Mocking available slots
    return ToolResult(success=True, data={"available_slots": ["10:00 AM", "2:00 PM"]})

def create_event(title: str, attendees: list[str], time_slot: str) -> ToolResult:
    """Create a new calendar event at a specified time slot and generate an .ics file."""
    print(f"[Calendar] Creating event '{title}' at {time_slot} for {attendees}...")
    
    from icalendar import Calendar, Event, vText
    from datetime import datetime, timedelta
    import pytz
    import os

    try:
        cal = Calendar()
        cal.add('prodid', '-//Autonomous AI Agent Calendar//mxm.dk//')
        cal.add('version', '2.0')

        event = Event()
        event.add('summary', title)
        
        # Simple parsing for MVP: assume time_slot is tomorrow at a specific hour if just a string, 
        # but for simplicity let's just create a generic event starting 24h from now.
        tz = pytz.UTC
        start_time = datetime.now(tz) + timedelta(days=1, hours=2)
        end_time = start_time + timedelta(hours=1)
        
        event.add('dtstart', start_time)
        event.add('dtend', end_time)
        event.add('description', f"Meeting scheduled by Autonomous Agent.\nTime requested: {time_slot}")
        
        for attendee in attendees:
            event.add('attendee', vText(f"mailto:{attendee}"))
            
        cal.add_component(event)
        
        os.makedirs("output", exist_ok=True)
        file_path = os.path.abspath(f"output/invite_{title.replace(' ', '_')}.ics")
        
        with open(file_path, 'wb') as f:
            f.write(cal.to_ical())
            
        return ToolResult(success=True, data={"event_id": f"EVT-{start_time.strftime('%Y%m%d%H%M%S')}", "status": "confirmed", "ics_file_path": file_path})
    except Exception as e:
        return ToolResult(success=False, error=str(e))

registry.register("calendar_api.get_availability", "Check user availability", get_availability)
registry.register("calendar_api.create_event", "Create a calendar event", create_event)
