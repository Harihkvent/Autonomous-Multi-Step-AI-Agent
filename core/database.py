import sqlite3
import os
import json
import time
import httpx
from typing import List, Dict, Any, Optional

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
DB_PATH = os.path.join(DB_DIR, "context_memory.db")

FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "").strip()

def _get_connection():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the SQLite database schema for local fallback context memory."""
    try:
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
    except Exception as e:
        print(f"[Database] SQLite init warning (Vercel read-only filesystem ok): {e}")

# Auto-initialize on module load
init_db()

# --- Firestore REST API Helpers ---
def _value_to_firestore(val: Any) -> Dict[str, Any]:
    if isinstance(val, bool):
        return {"booleanValue": val}
    elif isinstance(val, (int, float)):
        return {"doubleValue": float(val)}
    elif isinstance(val, dict):
        return {"mapValue": {"fields": {k: _value_to_firestore(v) for k, v in val.items()}}}
    elif val is None:
        return {"nullValue": None}
    else:
        return {"stringValue": str(val)}

def _firestore_to_value(val_dict: Dict[str, Any]) -> Any:
    if "stringValue" in val_dict:
        return val_dict["stringValue"]
    elif "doubleValue" in val_dict:
        return val_dict["doubleValue"]
    elif "integerValue" in val_dict:
        return int(val_dict["integerValue"])
    elif "booleanValue" in val_dict:
        return val_dict["booleanValue"]
    elif "mapValue" in val_dict:
        fields = val_dict.get("mapValue", {}).get("fields", {})
        return {k: _firestore_to_value(v) for k, v in fields.items()}
    return None

def _save_to_firestore(collection_path: str, document_id: str, data: Dict[str, Any]) -> bool:
    """Save/patch a document to Firebase Firestore REST API."""
    project_id = os.getenv("FIREBASE_PROJECT_ID", "").strip()
    if not project_id or project_id == "your_firebase_project_id_here":
        return False
    
    url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/{collection_path}/{document_id}"
    fields = {k: _value_to_firestore(v) for k, v in data.items()}
    
    try:
        resp = httpx.patch(url, json={"fields": fields}, timeout=5)
        return resp.status_code in [200, 201]
    except Exception as e:
        print(f"[Firestore] Failed to save document to {collection_path}/{document_id}: {e}")
        return False

def _get_from_firestore(collection_path: str, limit: int = 30) -> List[Dict[str, Any]]:
    """Retrieve documents from Firebase Firestore REST API."""
    project_id = os.getenv("FIREBASE_PROJECT_ID", "").strip()
    if not project_id or project_id == "your_firebase_project_id_here":
        return []
    
    url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/{collection_path}?pageSize={limit}"
    
    try:
        resp = httpx.get(url, timeout=5)
        if resp.status_code == 200:
            docs = resp.json().get("documents", [])
            results = []
            for doc in docs:
                fields = doc.get("fields", {})
                item = {k: _firestore_to_value(v) for k, v in fields.items()}
                results.append(item)
            return results
    except Exception as e:
        print(f"[Firestore] Failed to fetch collection {collection_path}: {e}")
    return []

# --- Database Interface Methods ---

def save_conversation(conversation_id: str, user_id: str, title: str):
    """Creates or updates a conversation record in Firestore & local SQLite."""
    now = time.time()
    
    # 1. Firebase Firestore
    _save_to_firestore("conversations", conversation_id, {
        "id": conversation_id,
        "user_id": user_id,
        "title": title,
        "updated_at": now
    })

    # 2. SQLite local fallback
    try:
        conn = _get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO conversations (id, user_id, title, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET title=excluded.title, updated_at=excluded.updated_at
        """, (conversation_id, user_id, title, now, now))
        conn.commit()
        conn.close()
    except Exception:
        pass

def save_message(conversation_id: str, user_id: str, role: str, content: str, node: Optional[str] = None):
    """Persists a message to Firebase Firestore & local SQLite."""
    now = time.time()
    msg_id = f"msg_{int(now * 1000)}"
    
    # 1. Firebase Firestore
    _save_to_firestore(f"conversations/{conversation_id}/messages", msg_id, {
        "conversation_id": conversation_id,
        "user_id": user_id,
        "role": role,
        "node": node or "",
        "content": content,
        "timestamp": now
    })
    
    save_conversation(conversation_id, user_id, "Chat Session")

    # 2. SQLite local fallback
    try:
        conn = _get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO messages (conversation_id, user_id, role, node, content, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (conversation_id, user_id, role, node, content, now))
        conn.commit()
        conn.close()
    except Exception:
        pass

def get_recent_messages(conversation_id: str, limit: int = 20) -> List[Dict[str, Any]]:
    """Fetches recent conversation history from Firebase Firestore or SQLite fallback."""
    # 1. Try Firebase Firestore
    fs_messages = _get_from_firestore(f"conversations/{conversation_id}/messages", limit=limit)
    if fs_messages:
        fs_messages.sort(key=lambda x: x.get("timestamp", 0))
        return fs_messages

    # 2. SQLite Fallback
    try:
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
    except Exception:
        return []

def remember_fact(user_id: str, key: str, value: str, category: str = "general"):
    """Stores or updates a long-term memory fact for the user."""
    now = time.time()
    sanitized_key = key.strip().lower().replace(" ", "_")
    
    # 1. Firebase Firestore
    _save_to_firestore(f"users/{user_id}/memories", sanitized_key, {
        "user_id": user_id,
        "memory_key": key.strip().lower(),
        "memory_value": value.strip(),
        "category": category,
        "updated_at": now
    })

    # 2. SQLite Fallback
    try:
        conn = _get_connection()
        cursor = conn.cursor()
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
    except Exception:
        pass

def get_user_memories(user_id: str) -> List[Dict[str, Any]]:
    """Retrieves all remembered facts for a given user from Firestore or SQLite."""
    # 1. Try Firebase Firestore
    fs_memories = _get_from_firestore(f"users/{user_id}/memories", limit=50)
    if fs_memories:
        return fs_memories

    # 2. SQLite Fallback
    try:
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
    except Exception:
        return []

def search_context_memory(user_id: str, query: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Searches past messages and facts across all sessions."""
    try:
        conn = _get_connection()
        cursor = conn.cursor()
        like_q = f"%{query.strip()}%"
        
        cursor.execute("""
            SELECT 'memory' as source, memory_key as title, memory_value as snippet, updated_at as timestamp
            FROM user_memory
            WHERE user_id = ? AND (memory_key LIKE ? OR memory_value LIKE ?)
            LIMIT ?
        """, (user_id, like_q, like_q, limit))
        mem_rows = cursor.fetchall()
        
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
    except Exception:
        return []

def save_execution_trace(run_id: str, user_id: str, plan: List[Dict[str, Any]], status: str, duration_ms: float, output: str, conversation_id: Optional[str] = None):
    """Saves a multi-step execution trace into database memory."""
    now = time.time()
    
    # 1. Firebase Firestore
    _save_to_firestore("execution_traces", run_id, {
        "run_id": run_id,
        "user_id": user_id,
        "conversation_id": conversation_id or "",
        "plan_json": json.dumps(plan),
        "status": status,
        "duration_ms": duration_ms,
        "output": str(output),
        "created_at": now
    })

    # 2. SQLite Fallback
    try:
        conn = _get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO execution_traces (run_id, user_id, conversation_id, plan_json, status, duration_ms, output, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (run_id, user_id, conversation_id, json.dumps(plan), status, duration_ms, str(output), now))
        conn.commit()
        conn.close()
    except Exception:
        pass

def get_recent_execution_traces(user_id: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Retrieves recent multi-step execution traces."""
    # 1. Try Firestore
    fs_traces = _get_from_firestore("execution_traces", limit=limit)
    if fs_traces:
        user_traces = [t for t in fs_traces if t.get("user_id") == user_id]
        user_traces.sort(key=lambda x: x.get("created_at", 0), reverse=True)
        return user_traces

    # 2. SQLite Fallback
    try:
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
    except Exception:
        return []
