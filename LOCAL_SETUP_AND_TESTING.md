# 🛠️ Local Setup, Execution & Testing Guide

This document provides step-by-step instructions for running the **Autonomous Multi-Step AI Agent** locally, configuring environment variables, running the frontend and backend servers, and executing the automated unit test suite.

---

## 📋 System Prerequisites

Ensure you have the following installed on your local machine:
- **Python 3.10+** (Verify with `python --version`)
- **Node.js 18+** & **npm** (Verify with `node -v` and `npm -v`)
- **Git**

---

## ⚙️ 1. Environment Configuration

1. Clone the repository and navigate to the project root:
   ```bash
   git clone <repository-url>
   cd Autonomous-Multi-Step-AI-Agent
   ```

2. Copy the sample environment template:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and configure your API keys and configuration parameters:

```env
# ==============================================================================
# Autonomous Multi-Step AI Agent - Environment Configuration
# ==============================================================================

# --- 1. LLM Provider API Keys ---
# Primary ultra-fast LLM inference (Groq OpenAI-compatible endpoint)
# Get a key at: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here

# Krutrim Cloud API (Fallback LLM provider)
# Get a key at: https://cloud.krutrim.com/
KRUTRIM_CLOUD_API_KEY=your_krutrim_api_key_here

# Recommended models: openai/gpt-oss-120b, qwen/qwen3.6-27b
DEFAULT_MODEL=openai/gpt-oss-120b
CHAT_MODEL=openai/gpt-oss-120b
PLANNER_MODEL=openai/gpt-oss-120b

# --- 2. Live Web Search APIs ---
# SerpApi Key for Google Search integration (Optional, free tier available)
# Get a key at: https://serpapi.com/manage-api-key
SERPAPI_API_KEY=your_serpapi_api_key_here

# --- 3. Vercel Deployment & Runtime Logs Integration ---
# Vercel Personal Access Token to inspect deployments & logs
# Create a token at: https://vercel.com/account/tokens
VERCEL_TOKEN=your_vercel_api_token_here

# --- 4. Email Inbox & Sender Configuration (Gmail IMAP & SMTP) ---
GMAIL_SENDER_EMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
IMAP_SERVER=imap.gmail.com

# --- 5. Security & Origins ---
FIREBASE_PROJECT_ID=your_firebase_project_id_here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
```

---

## 🐍 2. Backend Setup & Local Server Run

1. Initialize and activate a Python virtual environment:

   * **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```

   * **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the FastAPI Uvicorn development server:
   ```bash
   python -m uvicorn api:app --reload --host 0.0.0.0 --port 8000
   ```
   * **API Docs (Swagger UI)**: `http://localhost:8000/docs`
   * **Health Check**: `http://localhost:8000/health`

---

## 💻 3. Frontend Setup & UI Run

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node modules:
   ```bash
   npm install
   ```

3. Start the Vite React development server:
   ```bash
   npm run dev
   ```

4. Access the web interface in your browser at:
   `http://localhost:5173`

---

## 🧪 4. Automated Testing & Verification

The project includes a comprehensive Python `unittest` suite covering agent logic, security authentication, SQLite memory database, system watchers, and external tools.

### Running the Full Test Suite
To execute all test modules from the project root:

```bash
python -m unittest discover tests/
```

### Running Specific Test Modules

* **Auth & Firebase Security Tests**:
  ```bash
  python tests/test_auth_security.py
  ```
  *Verifies Firebase JWT token validation, Google X.509 cert caching, and guest token bypass.*

* **SQLite Context Memory & Trace Database Tests**:
  ```bash
  python tests/test_database_context.py
  ```
  *Validates table initialization, message history logging, user memory facts, and execution trace retention.*

* **Vercel Telemetry Tool Tests**:
  ```bash
  python tests/test_vercel_tool.py
  ```
  *Tests Vercel REST API deployment listing and build/runtime log fetching.*

* **System Watchers & Avengers Assemble Tests**:
  ```bash
  python tests/test_assemble_and_watchers.py
  ```
  *Tests system telemetry, Sentinel watcher, Hermes notification agent, and Avengers Assemble briefing sequence.*

* **Planner Improvements & Robustness Tests**:
  ```bash
  python tests/test_planner_improvements.py
  python tests/test_planner_robustness.py
  ```
  *Validates fallback JSON parsing, plan decomposition heuristics, and error handling.*

---

## 🚀 5. Command-Line (CLI) Quick Execution

To test the sequential orchestrator via command-line without launching the frontend:

```bash
python main.py
```
This runs a sample multi-step task ("Book meeting and notify team") and outputs the structured execution log in JSON format.
