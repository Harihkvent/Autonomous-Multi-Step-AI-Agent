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

    # Validate recipients format - if placeholder / mock address, simulate safely
    valid_recipients = [r.strip() for r in recipients if r and "@" in r and "placeholder" not in r.lower() and "." in r.split("@")[-1]]
    if not valid_recipients:
        print(f"[Notification] Non-RFC / placeholder recipient detected ({recipients}). Simulating safe mock dispatch.", flush=True)
        return ToolResult(success=True, data={"delivery_status": "simulated_mock", "recipients": recipients, "channel": channel})

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

def read_inbox(max_emails: int = 5) -> ToolResult:
    """Fetch and read the top recent emails from the inbox with subject, sender, and date."""
    import imaplib
    import email
    from email.header import decode_header

    try:
        max_n = int(max_emails) if max_emails else 5
    except Exception:
        max_n = 5

    print(f"[Notification] Reading top {max_n} emails from inbox...", flush=True)
    smtp_user = os.getenv("SMTP_USERNAME", "").strip()
    smtp_pass = os.getenv("SMTP_PASSWORD", "").strip()

    if not smtp_user or not smtp_pass or "your_email" in smtp_user:
        print("[Notification] Credentials unconfigured. Returning sample inbox digest.", flush=True)
        mock_emails = [
            {"from": "team@techcorp.com", "subject": "Quarterly Sprint Review & Product Roadmaps", "date": "Today"},
            {"from": "alerts@cloudservice.com", "subject": "System Health Status: All Green", "date": "Today"},
            {"from": "newsletter@aiweekly.io", "subject": "Top AI Breakthroughs This Week", "date": "Yesterday"},
            {"from": "security@company.com", "subject": "Quarterly Security Audit Verification Completed", "date": "Yesterday"},
            {"from": "hr@organization.org", "subject": "Upcoming Holiday Schedule and Event Details", "date": "2 days ago"},
            {"from": "billing@saas.com", "subject": "Monthly Subscription Invoice Summary", "date": "3 days ago"},
            {"from": "support@github.com", "subject": "New Release Notification v2.4.0", "date": "4 days ago"}
        ][:max_n]
        formatted = [f"{i+1}. From: {e['from']} | Subject: {e['subject']} | Date: {e['date']}" for i, e in enumerate(mock_emails)]
        return ToolResult(
            success=True,
            data={
                "status": "mocked",
                "emails": mock_emails,
                "total_fetched": len(mock_emails),
                "summary": f"Fetched {len(mock_emails)} emails from inbox (Mock Mode - set SMTP_USERNAME/SMTP_PASSWORD in .env for live IMAP):\n" + "\n".join(formatted)
            }
        )

    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        mail.login(smtp_user, smtp_pass)
        mail.select("INBOX", readonly=True)

        status, search_data = mail.search(None, "ALL")
        if status != "OK" or not search_data or not search_data[0]:
            mail.logout()
            return ToolResult(success=True, data={"emails": [], "summary": "Inbox is empty."})

        all_ids = search_data[0].split()
        target_ids = all_ids[-max_n:]

        digest = []
        for e_id in reversed(target_ids):
            try:
                res, msg_data = mail.fetch(e_id, "(RFC822.HEADER)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])
                        raw_sub = msg.get("Subject", "No Subject")
                        decoded_parts = decode_header(raw_sub)
                        subject = ""
                        for part, encoding in decoded_parts:
                            if isinstance(part, bytes):
                                subject += part.decode(encoding or "utf-8", errors="replace")
                            else:
                                subject += str(part)

                        sender = msg.get("From", "Unknown Sender")
                        date_str = msg.get("Date", "")
                        digest.append({
                            "from": sender.strip(),
                            "subject": subject.strip(),
                            "date": date_str.strip()
                        })
            except Exception:
                continue

        mail.logout()
        formatted = [f"{i+1}. From: {e['from']} | Subject: {e['subject']} | Date: {e['date']}" for i, e in enumerate(digest)]
        return ToolResult(
            success=True,
            data={
                "status": "success",
                "emails": digest,
                "total_fetched": len(digest),
                "summary": f"Fetched {len(digest)} emails from inbox:\n" + "\n".join(formatted)
            }
        )
    except Exception as e:
        return ToolResult(success=False, error=f"Inbox fetch error: {str(e)}")

registry.register("notification_api.send_message", "Send an email with optional .docx/.ics attachments.", send_message, risk_level="HIGH", requires_approval=True, timeout=45)
registry.register("inbox_reader", "Fetch and read recent emails from the inbox. Args: max_emails (int)", read_inbox, risk_level="LOW", requires_approval=False, timeout=30)

