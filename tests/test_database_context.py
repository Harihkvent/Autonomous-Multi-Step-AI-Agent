import pytest
import time
import core.database as db

class TestDatabaseContext:
    def test_save_and_retrieve_messages(self):
        conv_id = f"test_conv_{int(time.time()*1000)}"
        user_id = "test_user_1"
        
        db.save_message(conv_id, user_id, "user", "Hello database context!")
        db.save_message(conv_id, user_id, "assistant", "I am persisting your chat context.", node="supervisor")
        
        messages = db.get_recent_messages(conv_id)
        assert len(messages) == 2
        assert messages[0]["role"] == "user"
        assert messages[0]["content"] == "Hello database context!"
        assert messages[1]["role"] == "assistant"
        assert messages[1]["node"] == "supervisor"

    def test_remember_and_get_user_memories(self):
        user_id = f"test_user_{int(time.time()*1000)}"
        
        db.remember_fact(user_id, "favorite_framework", "React Vite", category="preferences")
        db.remember_fact(user_id, "target_cloud", "Vercel", category="infrastructure")
        
        memories = db.get_user_memories(user_id)
        assert len(memories) == 2
        keys = [m["memory_key"] for m in memories]
        assert "favorite_framework" in keys
        assert "target_cloud" in keys

    def test_search_context_memory(self):
        user_id = f"test_search_user_{int(time.time()*1000)}"
        conv_id = f"test_search_conv_{int(time.time()*1000)}"
        
        db.remember_fact(user_id, "project_name", "Quantum Taskforce", category="projects")
        db.save_message(conv_id, user_id, "user", "Deploy Quantum Taskforce on production server")
        
        results = db.search_context_memory(user_id, "Quantum")
        assert len(results) >= 2
        sources = [r["source"] for r in results]
        assert "memory" in sources
        assert "chat" in sources

    def test_save_and_retrieve_execution_traces(self):
        user_id = "test_trace_user"
        run_id = f"run_{int(time.time()*1000)}"
        plan = [{"tool": "researcher", "args": {"query": "AI agents"}}]
        
        db.save_execution_trace(run_id, user_id, plan, "SUCCESS", 1240.5, "Search findings: AI Agents", conversation_id="conv_123")
        traces = db.get_recent_execution_traces(user_id, limit=5)
        assert len(traces) > 0
        assert traces[0]["run_id"] == run_id
        assert traces[0]["status"] == "SUCCESS"
