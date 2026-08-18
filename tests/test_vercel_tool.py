import pytest
from tools.vercel_tool import list_vercel_deployments, get_vercel_logs, vercel_logger

class TestVercelTool:
    def test_list_deployments_fallback(self, monkeypatch):
        monkeypatch.setenv("VERCEL_TOKEN", "")
        res = list_vercel_deployments()
        assert "VERCEL_TOKEN is not configured" in res or "Simulated Staging Status" in res

    def test_get_logs_fallback(self, monkeypatch):
        monkeypatch.setenv("VERCEL_TOKEN", "")
        res = get_vercel_logs()
        assert "Simulated Build Logs" in res or "VERCEL_TOKEN" in res

    def test_vercel_logger_unified_dispatch(self, monkeypatch):
        monkeypatch.setenv("VERCEL_TOKEN", "")
        res_list = vercel_logger(action="list_deployments")
        assert "Staging Status" in res_list or "VERCEL_TOKEN" in res_list
        
        res_logs = vercel_logger(action="get_logs")
        assert "Build Logs" in res_logs or "VERCEL_TOKEN" in res_logs
