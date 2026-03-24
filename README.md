# 🤖 Autonomous Multi-Step AI Agent

An advanced, full-stack autonomous agent platform designed to execute complex, multi-step business workflows. The system transforms high-level natural language instructions into actionable plans, executes them using a suite of specialized tools, and ensures reliability through a robust validation and retry architecture.

---

## 🎯 Project Overview & Justification

This project was built to satisfy the **Cerevyn Solutions** campus drive problem statement, which required an agent capable of **reasoning, task decomposition, and tool usage** (specifically mentioning calendar and notifications).

### Why this satisfies the Design Document
1.  **Modular Agent Orchestration**: Following the High-Level Design (HLD), the system separates concerns into a **Supervisor**, **Planner**, **Tool Selector**, **Executor**, **Validator**, and **Retry Manager**.
2.  **Sophisticated Planning**: It moves beyond basic scripts by using LLM-powered (Krutrim Cloud) JSON planning with heuristic fallbacks, as outlined in the Low-Level Design (LLD).
3.  **Real-world Tool Integration**: Integrated with real APIs for **Web Search (SerpApi)**, **Calendar Management**, **Notifications (SMTP/Email)**, and **Document Processing**.
4.  **Resilience by Design**: Implements a dedicated **Validator** and **Retry Manager** to handle transient API failures and ensure output quality, fulfilling the safety and reliability requirements.

---

## 🏗 System Architecture

The project implements two powerful patterns for autonomous execution:

### 1. Sequential Orchestrator (`core/orchestrator.py`)
A structured pipeline that follows a strict lifecycle:
- **Planner**: Decomposes tasks into atomic steps.
- **Tool Selector**: Maps steps to the `ToolRegistry`.
- **Executor**: Authenticates and calls external APIs.
- **Validator & Retry**: Confirms success and recovers from errors using exponential backoff.

### 2. Multi-Agent Graph (`core/graph.py`)
A state-of-the-art **LangGraph** implementation for dynamic, conversational workflows:
- **Supervisor Agent**: The "Master Brain" that classifies user intent and routes to specialized sub-agents.
- **Researcher Agent**: Performs live web research using **SerpApi**.
- **DocGenerator & DocParser**: Specialized agents for reading and writing professional `.docx` reports.
- **Calculator & Weather Agents**: Specialized utility agents for precise math and real-time environmental data.
- **Planner & Executor**: Cooperative agents that negotiate an execution plan and run it upon user approval.

---

## ✨ Key Features

- **🚀 Advanced JSON Planning**: LLM-driven plan generation with automated parsing and structured validation.
- **🌐 Tool Registry**: A plug-around system allowing instant addition of new capabilities (Calendar, CSV, Slack, etc.).
- **📄 Document Intelligence**: PDF/Docx parsing and professional document generation with LLM-composed content.
- **🛡️ Safety & Validation**: Human-in-the-loop approval for complex execution plans and automated validation of tool outputs.
- **🎨 Glassmorphic UI**: A premium React/Vite frontend with real-time status updates and sequential execution animations.

---

## 🛠️ Tool Suite

| Tool | Capability | Source |
| :--- | :--- | :--- |
| **Web Search** | Live web research & news | SerpApi |
| **Calendar** | Meeting scheduling & availability | Custom Calendar API |
| **Notification** | Professional email & alerts | SMTP / Email |
| **Doc Parser** | Extract text from PDF, Docx, TXT | PyPDF2, python-docx |
| **Doc Generator**| Create professional reports | python-docx |
| **System Info** | Environment telemetry (OS, Python) | System Tools |
| **Calculator** | Scientific mathematical computations | Safe Eval |
| **Weather** | Real-time global weather data | wttr.in |

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
1. Clone the repository and navigate to the project root.
2. Initialize and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # Windows
   source venv/bin/activate    # Linux/Mac
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure `.env` (use `.env.example` as a template):
   - `KRUTRIM_CLOUD_API_KEY`: For LLM planning and chat.
   - `SERPAPI_API_KEY`: For web search capabilities.
   - `SMTP_CONFIG`: For email notifications.
5. Start the server:
   ```bash
   python -m uvicorn api:app --reload
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Access the UI at `http://localhost:5173`.

---

## 🧑‍💻 Technical Demonstration

Try these prompts to see the agent in action:
- *"Research the latest trends in renewable energy and generate a detailed report."*
- *"Schedule a meeting with Asha for tomorrow morning and notify her via email."*
- *"Analyze the document at path/to/file.pdf and summarize the key findings."*
- *"What is 25 * 17.5 + log(100)? Also, check the weather in Mumbai."*

---

## 🧪 Verification & Testing
Maintain system integrity using the Python test suite:
```bash
python -m unittest discover tests/
```
Specifically for the search tool:
```bash
python tests/test_search_tool.py
```
