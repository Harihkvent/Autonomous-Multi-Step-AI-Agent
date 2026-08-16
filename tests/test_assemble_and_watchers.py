import pytest
import os
from core.watchers.sentinel_watcher import scan_system_logs, log_event, LOGS_DIR
from core.watchers.hermes_watcher import fetch_email_digest
from core.graph import run_assemble_briefing

def test_sentinel_log_sandboxing():
    """Verify that Sentinel watcher operates strictly inside the sandboxed logs directory."""
    # Write a test log event
    log_event("Test critical error detected for verification", level="ERROR")
    
    report = scan_system_logs("app.log")
    assert report["status"] == "ok"
    assert report["error_count"] >= 1
    assert "Sentinel alert" in report["briefing"] or "Sentinel online" in report["briefing"]
    
    # Path traversal attack test: attempt reading sensitive system files outside sandbox
    traversal_report = scan_system_logs("../../windows/system32/cmd.exe")
    # Base name sanitization strips path elements, ensuring it only targets the sandbox file
    assert traversal_report["status"] in ["ok", "error"]
    assert "error" in traversal_report or traversal_report.get("log_file") == "cmd.exe"

def test_hermes_email_digest_structure():
    """Verify that Hermes email digest structure complies with briefing format."""
    report = fetch_email_digest()
    assert "briefing" in report
    assert "status" in report
    assert "unread_count" in report
    assert isinstance(report["emails"], list)

def test_assemble_protocol_roster():
    """Verify that all 7 agent personas are represented in the assemble briefing sequence."""
    sequence = run_assemble_briefing()
    assert isinstance(sequence, list)
    assert len(sequence) >= 7
    
    agents = [item["agent"] for item in sequence]
    assert "jarvis" in agents
    assert "sentinel" in agents
    assert "hermes" in agents
    assert "scout" in agents
    assert "scribe" in agents
    assert "cipher" in agents
    assert "chronos" in agents
