import os
import imaplib
import email
from email.header import decode_header
from typing import Dict, Any, List

def fetch_email_digest(max_emails: int = 3) -> Dict[str, Any]:
    """
    Safely inspect the user's Gmail inbox for recent unread or important messages
    using IMAP SSL and the App Password from environment variables.
    """
    username = os.getenv("SMTP_USERNAME")
    password = os.getenv("SMTP_PASSWORD")
    
    # Check if real credentials exist
    if not username or not password or "your_email" in username or "your_app_password" in password:
        return {
            "status": "unconfigured",
            "unread_count": 0,
            "emails": [],
            "briefing": "Hermes reporting: Email credentials not fully configured in environment. Inbox scanning is standing by."
        }
        
    try:
        # Connect to Gmail IMAP
        mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        mail.login(username, password)
        mail.select("INBOX", readonly=True) # Read-only for total safety
        
        # Search for unread messages
        status, search_data = mail.search(None, "UNSEEN")
        unread_ids = search_data[0].split()
        total_unread = len(unread_ids)
        
        # If no unread, grab recent ones
        if total_unread == 0:
            status, search_data = mail.search(None, "ALL")
            email_ids = search_data[0].split()[-max_emails:]
        else:
            email_ids = unread_ids[-max_emails:]
            
        digest = []
        for e_id in reversed(email_ids):
            try:
                res, msg_data = mail.fetch(e_id, "(RFC822.HEADER)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])
                        
                        # Decode subject
                        raw_sub = msg.get("Subject", "No Subject")
                        decoded_parts = decode_header(raw_sub)
                        subject = ""
                        for part, encoding in decoded_parts:
                            if isinstance(part, bytes):
                                subject += part.decode(encoding or "utf-8", errors="replace")
                            else:
                                subject += str(part)
                            
                        # Decode sender
                        sender = msg.get("From", "Unknown Sender")
                        
                        digest.append({
                            "from": sender,
                            "subject": subject.strip(),
                            "date": msg.get("Date", "")
                        })
            except Exception:
                continue
                
        mail.logout()
        
        if total_unread == 0:
            if digest:
                recent_senders = list({d['from'].split('<')[0].replace('"', '').strip() for d in digest[:2] if d.get('from')})
                recent_topics = [d['subject'] for d in digest[:2] if d.get('subject')]
                senders_str = " and ".join(recent_senders) if recent_senders else "recent contacts"
                topic_str = f" regarding '{recent_topics[0][:35]}'" if recent_topics else ""
                brief = f"Hermes online. Inbox is up to date with zero unread messages. Recent correspondence on file from {senders_str}{topic_str}."
            else:
                brief = "Hermes online. Inbox is clear with zero unread emails. Standing by for outgoing dispatches."
        elif total_unread == 1:
            first_mail = digest[0]
            clean_from = first_mail['from'].split('<')[0].replace('"', '').strip()
            clean_subj = first_mail['subject'][:45]
            brief = f"Hermes reporting: You have 1 unread email from {clean_from} regarding '{clean_subj}'. Ready to summarize or draft a reply."
        else:
            first_mail = digest[0]
            clean_from = first_mail['from'].split('<')[0].replace('"', '').strip()
            clean_subj = first_mail['subject'][:35]
            brief = f"Hermes alert! You have {total_unread} unread emails. Newest priority dispatch from {clean_from} regarding '{clean_subj}'."
            
        return {
            "status": "ok",
            "unread_count": total_unread,
            "emails": digest,
            "briefing": brief
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "unread_count": 0,
            "emails": [],
            "briefing": f"Hermes reporting: Secure mail link experienced a connection timeout ({str(e)[:40]}). Standing by."
        }
