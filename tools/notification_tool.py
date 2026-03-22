import os
import smtplib
from email.message import EmailMessage
import re
import tempfile
from tools.registry import registry
from models import ToolResult

def send_message(recipients: list[str], message: str, channel: str = "email") -> ToolResult:
    """Send a notification message via email. Auto-attaches .docx and .ics files found in message."""
    print(f"[Notification] Sending {channel} to {recipients}", flush=True)
    
    if channel != "email":
        return ToolResult(success=True, data={"status": "mocked", "note": "Only email is fully implemented."})

    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com").strip()
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USERNAME", "").strip()
    smtp_pass = os.getenv("SMTP_PASSWORD", "").strip()

    if not smtp_user or not smtp_pass or "your_email" in smtp_user:
        print("[Notification] Credentials missing. Mocking email send.", flush=True)
        return ToolResult(success=True, data={"status": "mocked_draft_saved", "recipients": recipients})

    # --- Detect attachable files in the message ---
    docx_pattern = re.compile(r'Generated_Report_\d+\.docx')
    docx_matches = docx_pattern.findall(message)
    ics_pattern = re.compile(r'[\w/\\:\.\-]+\.ics')
    ics_matches = ics_pattern.findall(message)

    print(f"[Notification] Detected .docx files: {docx_matches}", flush=True)
    print(f"[Notification] Detected .ics files: {ics_matches}", flush=True)

    # --- Clean the email body ---
    clean_body = message
    # Remove [DOWNLOAD:...] markers
    clean_body = re.sub(r'\[DOWNLOAD:[^\]]+\]', '', clean_body)
    # Replace file generation messages with cleaner text
    clean_body = re.sub(r'Successfully generated document:\s*\S+\.docx', 'Please find the attached document.', clean_body)
    clean_body = clean_body.strip()

    # --- Build the email ---
    msg = EmailMessage()
    msg.set_content(clean_body)
    msg['Subject'] = "Autonomous Agent Notification"
    msg['From'] = smtp_user
    msg['To'] = ", ".join([r.strip() for r in recipients])

    has_attachments = False
    docs_dir = os.path.join(tempfile.gettempdir(), "agent_generated_docs")

    # Attach .docx files
    for docx_name in docx_matches:
        docx_path = os.path.join(docs_dir, docx_name)
        print(f"[Notification] Looking for docx at: {docx_path}", flush=True)
        if os.path.exists(docx_path):
            with open(docx_path, 'rb') as f:
                docx_data = f.read()
            msg.add_attachment(
                docx_data,
                maintype='application',
                subtype='vnd.openxmlformats-officedocument.wordprocessingml.document',
                filename=docx_name
            )
            has_attachments = True
            print(f"[Notification] Attached: {docx_name} ({len(docx_data)} bytes)", flush=True)
        else:
            print(f"[Notification] WARNING: File not found at {docx_path}", flush=True)

    # Attach .ics files
    for ics_file in ics_matches:
        if os.path.exists(ics_file):
            with open(ics_file, 'rb') as f:
                ics_data = f.read()
            msg.add_attachment(ics_data, maintype='text', subtype='calendar', filename=os.path.basename(ics_file))
            has_attachments = True

    if has_attachments:
        msg.replace_header('Subject', 'Document from AI Agent')

    # --- Send via SMTP ---
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.set_debuglevel(1)
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, [r.strip() for r in recipients], msg.as_string())
        print("[Notification] Email sent successfully via SMTP.", flush=True)
        return ToolResult(success=True, data={"delivery_status": "sent_via_smtp", "channel": channel, "attachments": docx_matches})
    except Exception as e:
        import traceback
        trace_str = traceback.format_exc()
        print(f"[Notification] SMTP Error Trace: {trace_str}", flush=True)
        rejects = getattr(e, 'recipients', {})
        reject_msg = f"Rejected Details: {rejects}" if rejects else repr(e)
        return ToolResult(success=False, error=reject_msg)

registry.register("notification_api.send_message", "Send an email with optional .docx/.ics attachments.", send_message)
