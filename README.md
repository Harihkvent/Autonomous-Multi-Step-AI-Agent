# Autonomous Multi-Step AI Agent

A full-stack, AI-powered system capable of accepting high-level tasks, breaking them down into sequential steps, and executing them autonomously using a suite of integrated tools. 

## 🏗 Architecture

The system is separated into a **React (Vite) Frontend** and a **FastAPI Python Backend**. The backend is driven by a modular multi-agent orchestration setup:

- **Orchestrator**: Controls the workflow lifecycle and data flow.
- **Planner Agent**: Decomposes high-level text input into executable steps (integrates with Krutrim LLM).
- **Tool Selector Agent**: Matches task intent to specific tool plugins.
- **Executor & Validator Agents**: Runs tools and ensures output validity.
- **Retry Manager**: Provides exponential backoff for resilience.

## ✨ Current Features and How They Work

- **Dynamic Task Planning**: When a user inputs a task (e.g., "Book a meeting"), the **Planner Agent** queries the LLM to structurally break down the task into smaller intents.
- **Pluggable Tools System**: The system uses a centralized `ToolRegistry` (`tools/registry.py`). When the **Tool Selector** identifies the intent of a step, it searches the registry and routes the payload to the correct mock/real function.
- **Robust Failure Recovery**: The **Validator Agent** evaluates the outcome of each executor API call. If a failure occurs, the **Retry Manager** steps in to perform an exponential backoff sequence, ensuring transient failures do not crash the workflow.
- **Beautiful React Interface**: Features a dark-mode glassmorphic UI (`frontend/src/`) with sequential execution animations that reflect the real-time progress of the orchestrator.

## ➕ How to Add More Agents

The architecture is highly modular, making it very easy to plug in additional reasoning or safety agents explicitly within the orchestrator loop.

To add a new agent (e.g., a **Safety Agent** that prevents destructive actions):
1. **Create the Agent**: Under `agents/`, create a new file `safety_agent.py` holding a class that implements your rules or calls an LLM to rate the safety of an action.
2. **Inject into Orchestrator**: Open `core/orchestrator.py`, import your new agent, and inject its logic into the execution pipeline. For example, right before the Executor runs, call `safety_agent.check(step)`.
3. **Handle Outcomes**: If the new agent flags an issue, you can immediately fail the step or route it back to the Planner for re-planning.

## 🚀 How We Can Improve (Including MCP)

1. **Model Context Protocol (MCP) Integration**: Currently, our tools are manually written Python wrappers in the `ToolRegistry`. By adopting **Model Context Protocol (MCP) technology**, we can standardize tool usage. Our multi-step agent could act as an MCP Client, immediately unlocking thousands of existing MCP Servers (like GitHub, SQLite, Slack) without writing custom wrappers for each.
2. **Parallel Step Execution**: Enhancing the Orchestrator to resolve Direct Acyclic Graphs (DAGs) of steps, executing independent steps in parallel to reduce latency.
3. **Database Memory Persistence**: Replacing the simple dictionary-based `MemoryManager` with a PostgreSQL or Vector database to allow long-term memory access across multiple sessions or users.

## ⚙️ Getting Started

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**

### 1. Set Up the Backend
1. Clone the repository and navigate to the project directory.
2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your environment:
   In your `.env` file, supply your Krutrim key if desired.
   *(If no API key is set, the system will use a robust fallback mock logic for testing purposes.)*
5. Start the FastAPI server:
   ```bash
   python -m uvicorn api:app --reload
   ```
   The backend runs on `http://localhost:8000`.

### 2. Set Up the Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the UI at `http://localhost:5173`.

## 🧑‍💻 Usage
Navigate to the frontend UI, enter a task like *"Book meeting and notify team"*, and click **Run Agent**. You will see the agent's thought process unravel sequentially.

## 🧪 Testing
Run the Python test suite to verify the orchestration logic and individual agents:
```bash
python -m unittest discover tests/
```
