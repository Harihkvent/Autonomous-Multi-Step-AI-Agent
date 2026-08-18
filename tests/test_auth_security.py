import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from api import app
from core.auth import verify_firebase_token, get_current_user

client = TestClient(app)

def test_unauthenticated_requests_are_rejected():
    """Verify that protected endpoints reject requests with 401 when no token is provided."""
    endpoints = [
        ("POST", "/api/chat", {"messages": [{"role": "user", "content": "Hello"}]}),
        ("POST", "/api/task", {"objective": "Test security"}),
        ("GET", "/api/context/test-conv", None),
        ("GET", "/api/memories/test-user", None),
        ("GET", "/api/vercel/deployments", None),
        ("GET", "/api/vercel/logs", None),
        ("POST", "/api/assemble", None),
    ]
    
    for method, path, json_data in endpoints:
        if method == "POST":
            response = client.post(path, json=json_data)
        else:
            response = client.get(path)
            
        assert response.status_code == 401, f"Expected 401 for {method} {path}, got {response.status_code}"
        data = response.json()
        assert "detail" in data

def test_invalid_token_is_rejected():
    """Verify that invalid/tampered Bearer tokens return 401 Unauthorized."""
    headers = {"Authorization": "Bearer invalid.fake.token"}
    response = client.post("/api/task", json={"objective": "Test"}, headers=headers)
    assert response.status_code == 401

def test_public_routes_remain_accessible():
    """Verify that root / and health /api/health remain accessible without auth."""
    root_resp = client.get("/")
    assert root_resp.status_code == 200
    assert root_resp.json()["status"] == "online"

    health_resp = client.get("/api/health")
    assert health_resp.status_code == 200
    assert health_resp.json()["status"] == "healthy"

@patch("core.auth.verify_firebase_token")
def test_authenticated_task_request_succeeds(mock_verify):
    """Verify that a valid token correctly authorizes the request and attaches user identity."""
    mock_verify.return_value = {
        "uid": "google-uid-12345",
        "email": "agent.tester@gmail.com",
        "name": "Agent Tester"
    }
    
    headers = {"Authorization": "Bearer mock_valid_token"}
    
    with patch("core.orchestrator.orchestrator.handle_task") as mock_handle:
        from models import Task
        mock_handle.return_value = Task(
            task_id="T-123",
            user_id="google-uid-12345",
            objective="Deploy secure enclave",
            status="completed"
        )
        
        response = client.post(
            "/api/task",
            json={"objective": "Deploy secure enclave"},
            headers=headers
        )
        assert response.status_code == 200
        mock_verify.assert_called_once_with("mock_valid_token")
