import os
import tempfile
import urllib.parse
from datetime import datetime, timedelta, timezone
from tools.registry import registry
from models import ToolResult

GENERATED_DOCS_DIR = os.path.join(tempfile.gettempdir(), "agent_generated_docs")
os.makedirs(GENERATED_DOCS_DIR, exist_ok=True)

def get_availability(team: list[str] = None, start_date: str = None) -> ToolResult:
    """Check calendar availability for a given team on a specific date."""
    team_list = team or ["team@example.com"]
    date_str = start_date or datetime.now().strftime("%Y-%m-%d")
    print(f"[Calendar] Checking availability for {team_list} on {date_str}...")
    
    slots = ["09:00 AM - 10:00 AM", "11:30 AM - 12:30 PM", "02:00 PM - 03:00 PM", "04:30 PM - 05:30 PM"]
    status_text = (
        f"📅 **Calendar Availability Analysis** for `{date_str}`:\n\n"
        f"**Target Attendees:** {', '.join(team_list)}\n\n"
        f"**Available Open Windows:**\n"
        + "\n".join([f"- 🟢 `{slot}`" for slot in slots])
    )
    return ToolResult(success=True, data={"available_slots": slots, "status": status_text, "date": date_str})

def create_event(title: str = "Team Sync", attendees: list[str] = None, time_slot: str = "Tomorrow at 10:00 AM") -> ToolResult:
    """Create a new calendar event at a specified time slot and generate an .ics invite file, Google Calendar link, and Outlook link."""
    clean_title = (title or "Team Sync").strip()
    attendee_list = attendees if (attendees and isinstance(attendees, list)) else (["team@example.com"] if not attendees else [str(attendees)])
    slot_str = time_slot or "Tomorrow at 10:00 AM"
    
    print(f"[Calendar] Creating event '{clean_title}' at {slot_str} for {attendee_list}...")
    
    from icalendar import Calendar, Event, vText

    try:
        cal = Calendar()
        cal.add('prodid', '-//Autonomous Taskforce Calendar Core//EN')
        cal.add('version', '2.0')

        event = Event()
        event.add('summary', clean_title)

        try:
            import pytz
            tz = pytz.UTC
        except ImportError:
            tz = timezone.utc
            
        now = datetime.now(tz)
        # Offset time calculation
        if "today" in slot_str.lower():
            start_time = now.replace(minute=0, second=0) + timedelta(hours=2)
        elif "next week" in slot_str.lower():
            start_time = now.replace(minute=0, second=0) + timedelta(days=7, hours=2)
        else:
            start_time = now.replace(minute=0, second=0) + timedelta(days=1, hours=2)
            
        end_time = start_time + timedelta(hours=1)
        
        event.add('dtstart', start_time)
        event.add('dtend', end_time)
        event.add('description', f"Meeting scheduled by Autonomous Taskforce Chronos Agent.\nRequested Slot: {slot_str}\nAttendees: {', '.join(attendee_list)}")
        
        for attendee in attendee_list:
            event.add('attendee', vText(f"mailto:{attendee.strip()}"))
            
        cal.add_component(event)
        
        sanitized_title = "".join(c for c in clean_title if c.isalnum() or c in (' ', '_', '-')).strip().replace(' ', '_')
        ics_filename = f"invite_{sanitized_title}.ics"
        file_path = os.path.join(GENERATED_DOCS_DIR, ics_filename)
        
        with open(file_path, 'wb') as f:
            f.write(cal.to_ical())
            
        # Format timestamps for Google Calendar: YYYYMMDDTHHMMSSZ
        gcal_start = start_time.strftime("%Y%m%dT%H%M%SZ")
        gcal_end = end_time.strftime("%Y%m%dT%H%M%SZ")
        gcal_desc = f"Scheduled by Autonomous Taskforce Chronos. Attendees: {', '.join(attendee_list)}"
        
        gcal_url = (
            f"https://calendar.google.com/calendar/render?action=TEMPLATE"
            f"&text={urllib.parse.quote(clean_title)}"
            f"&dates={gcal_start}/{gcal_end}"
            f"&details={urllib.parse.quote(gcal_desc)}"
            f"&add={urllib.parse.quote(','.join(attendee_list))}"
        )
        
        outlook_url = (
            f"https://outlook.live.com/calendar/0/deeplink/compose?"
            f"subject={urllib.parse.quote(clean_title)}"
            f"&body={urllib.parse.quote(gcal_desc)}"
            f"&startdt={start_time.strftime('%Y-%m-%dT%H:%M:%SZ')}"
            f"&enddt={end_time.strftime('%Y-%m-%dT%H:%M:%SZ')}"
        )

        date_human = start_time.strftime("%A, %B %d, %Y at %I:%M %p (UTC)")

        status_text = (
            f"📅 **Chronos Temporal Scheduler:**\n\n"
            f"Confirmed appointment **{clean_title}**\n\n"
            f"- **Scheduled Date/Time:** `{date_human}`\n"
            f"- **Time Slot:** `{slot_str}`\n"
            f"- **Attendees:** {', '.join(attendee_list)}\n\n"
            f"[DOWNLOAD:{ics_filename}]\n"
            f"<!-- [LAUNCH_APP:Add to Google Calendar:{gcal_url}] -->\n"
            f"<!-- [LAUNCH_APP:Add to Outlook:{outlook_url}] -->"
        )
            
        return ToolResult(
            success=True, 
            data={
                "event_id": f"EVT-{start_time.strftime('%Y%m%d%H%M%S')}", 
                "status": status_text, 
                "ics_file_path": file_path,
                "ics_filename": ics_filename,
                "gcal_url": gcal_url,
                "outlook_url": outlook_url
            }
        )
    except Exception as e:
        return ToolResult(success=False, error=f"Could not create calendar event: {str(e)}")

registry.register("calendar_api.get_availability", "Check user availability", get_availability, risk_level="LOW", requires_approval=False, timeout=15)
registry.register("calendar_api.create_event", "Create a calendar event and generate invite .ics", create_event, risk_level="MEDIUM", requires_approval=False, timeout=30)
