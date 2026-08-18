import sqlite3
import os
import json
import time
from typing import List, Dict, Any, Optional

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
DB_PATH = os.path.join(DB_DIR, "context_memory.db")

def _get_connection():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database schema for context memory, conversations, and deployment traces."""
    conn = _get_connection()
    cursor = conn.cursor()
    
    # 1. Conversations table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT NOT NULL,
            created_at REAL NOT NULL,
            updated_at REAL NOT NULL
        )
    """)
    
    # 2. Messages table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversation_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            role TEXT NOT NULL,
            node TEXT,
            content TEXT NOT NULL,
            timestamp REAL NOT NULL,
            FOREIGN KEY (conversation_id) REFERENCES conversations(id)
        )
    """)
    
    # 3. User long-term memory / facts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_memory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            memory_key TEXT NOT NULL,
            memory_value TEXT NOT NULL,
            category TEXT DEFAULT 'general',
            updated_at REAL NOT NULL,
            UNIQUE(user_id, memory_key)
        )
    """)
    
    # 4. Execution traces & deployment records
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS execution_traces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            conversation_id TEXT,
            plan_json TEXT NOT NULL,
            status TEXT NOT NULL,
            duration_ms REAL,
            output TEXT,
            created_at REAL NOT NULL
        )
    """)
    
    conn.commit()
    conn.close()

# Auto-initialize on module load
init_db()

def save_conversation(conversation_id: str, user_id: str, title: str):
    """Creates or updates a conversation record."""
    conn = _get_connection()
    cursor = conn.cursor()
    now = time.time()
    cursor.execute("""
        INSERT INTO conversations (id, user_id, title, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET title=excluded.title, updated_at=excluded.updated_at
    """, (conversation_id, user_id, title, now, now))
    conn.commit()
    conn.close()

def save_message(conversation_id: str, user_id: str, role: str, content: str, node: Optional[str] = None):
    """Persists a message to the database context history."""
    conn = _get_connection()
    cursor = conn.cursor()
    now = time.time()
    
    # Ensure conversation exists
    cursor.execute("SELECT id FROM conversations WHERE id = ?", (conversation_id,))
    if not cursor.fetchone():
        cursor.execute("""
            INSERT INTO conversations (id, user_id, title, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
        """, (conversation_id, user_id, "New Chat", now, now))
    else:
        cursor.execute("UPDATE conversations SET updated_at = ? WHERE id = ?", (now, conversation_id))
        
    cursor.execute("""
        INSERT INTO messages (conversation_id, user_id, role, node, content, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (conversation_id, user_id, role, node, content, now))
    
    conn.commit()
    conn.close()

def get_recent_messages(conversation_id: str, limit: int = 20) -> List[Dict[str, Any]]:
    """Fetches recent conversation history."""
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT role, node, content, timestamp
        FROM messages
        WHERE conversation_id = ?
        ORDER BY id ASC
        LIMIT ?
    """, (conversation_id, limit))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def remember_fact(user_id: str, key: str, value: str, category: str = "general"):
    """Stores or updates a long-term memory fact for the user."""
    conn = _get_connection()
    cursor = conn.cursor()
    now = time.time()
    cursor.execute("""
        INSERT INTO user_memory (user_id, memory_key, memory_value, category, updated_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, memory_key) DO UPDATE SET
            memory_value = excluded.memory_value,
            category = excluded.category,
            updated_at = excluded.updated_at
    """, (user_id, key.strip().lower(), value.strip(), category, now))
    conn.commit()
    conn.close()

def get_user_memories(user_id: str) -> List[Dict[str, Any]]:
    """Retrieves all remembered facts for a given user."""
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT memory_key, memory_value, category, updated_at
        FROM user_memory
        WHERE user_id = ?
        ORDER BY updated_at DESC
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def search_context_memory(user_id: str, query: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Searches past messages and facts across all sessions for semantic or keyword matches."""
    conn = _get_connection()
    cursor = conn.cursor()
    like_q = f"%{query.strip()}%"
    
    # 1. Search memory facts
    cursor.execute("""
        SELECT 'memory' as source, memory_key as title, memory_value as snippet, updated_at as timestamp
        FROM user_memory
        WHERE user_id = ? AND (memory_key LIKE ? OR memory_value LIKE ?)
        LIMIT ?
    """, (user_id, like_q, like_q, limit))
    mem_rows = cursor.fetchall()
    
    # 2. Search message history
    cursor.execute("""
        SELECT 'chat' as source, role || ' (' || COALESCE(node, 'user') || ')' as title, content as snippet, timestamp
        FROM messages
        WHERE user_id = ? AND content LIKE ?
        ORDER BY id DESC
        LIMIT ?
    """, (user_id, like_q, limit))
    msg_rows = cursor.fetchall()
    
    conn.close()
    return [dict(r) for r in mem_rows] + [dict(r) for r in msg_rows]

def save_execution_trace(run_id: str, user_id: str, plan: List[Dict[str, Any]], status: str, duration_ms: float, output: str, conversation_id: Optional[str] = None):
    """Saves a multi-step execution trace into database memory."""
    conn = _get_connection()
    cursor = conn.cursor()
    now = time.time()
    cursor.execute("""
        INSERT INTO execution_traces (run_id, user_id, conversation_id, plan_json, status, duration_ms, output, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (run_id, user_id, conversation_id, json.dumps(plan), status, duration_ms, str(output), now))
    conn.commit()
    conn.close()

def get_recent_execution_traces(user_id: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Retrieves recent multi-step execution traces."""
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT run_id, conversation_id, plan_json, status, duration_ms, output, created_at
        FROM execution_traces
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT ?
    """, (user_id, limit))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]
