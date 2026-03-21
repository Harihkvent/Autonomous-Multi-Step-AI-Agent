import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'System Initialized. I am the Autonomous Multi-Step AI Agent. Enter your objective below.', node: 'supervisor' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeNode, setActiveNode] = useState(null)
  const logEndRef = useRef(null)

  const nodes = ['supervisor', 'planner', 'executor', 'researcher', 'weather', 'calculator']

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isRunning])

  const handleSend = async () => {
    if (!inputVal.trim() || isRunning) return;
    
    const userMsg = { role: 'user', content: inputVal };
    const newContext = [...messages, userMsg];
    
    setMessages(newContext);
    setInputVal('');
    setIsRunning(true);
    setActiveNode('supervisor');
    
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });
      
      if (!response.ok) throw new Error('API failed');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let doneReading = false;
      let buffer = "";

      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          doneReading = true;
          break;
        }
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last partial line in the buffer
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (!dataStr.trim()) continue;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.done) {
                doneReading = true;
                break;
              } else if (data.error) {
                setMessages(prev => [...prev, { role: 'error', content: `Error: ${data.error}`, node: 'system' }]);
              } else {
                setMessages(prev => [...prev, { role: 'agent', content: data.content, node: data.node }]);
                setActiveNode(data.node);
              }
            } catch (e) {
              console.error("Failed to parse chunk", dataStr);
            }
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'error', content: `Error: ${err.message}`, node: 'system' }]);
    } finally {
      setIsRunning(false);
      setActiveNode(null);
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sys-status">
          <div className="status-indicator online"></div>
          <span>SYSTEM ONLINE</span>
        </div>
        <h2>Agent Nodes</h2>
        <div className="node-list">
          {nodes.map(n => (
            <div key={n} className={`node-item ${activeNode === n ? 'active-node' : ''}`}>
              <div className={`node-icon ${n}`}></div>
              <span className="node-name">{n.toUpperCase()}</span>
              {activeNode === n && <div className="pulse-ring"></div>}
            </div>
          ))}
        </div>
      </aside>

      <main className="chat-container">
        <div className="chat-header">
          <h1>AUTONOMOUS-MULTI-STEP-AI-AGENT</h1>
          <p className="subtitle">LangGraph Orchestration Engine</p>
        </div>
        
        <div className="chat-history">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'agent-bubble'} node-${msg.node}`}>
              <div className="bubble-header">
                <span className="bubble-label">{msg.role === 'user' ? 'USER' : msg.node ? msg.node.toUpperCase() : 'AGENT'}</span>
              </div>
              <div className="bubble-content">{msg.content}</div>
            </div>
          ))}
          {isRunning && (
            <div className="chat-bubble agent-bubble typing-indicator">
              <div className="bubble-header"><span className="bubble-label">{activeNode ? activeNode.toUpperCase() : 'SYSTEM'}</span></div>
              <div className="bubble-content">Processing network request...</div>
            </div>
          )}
          <div ref={logEndRef} />
        </div>

        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="_ENTER COMMAND OR QUERY..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isRunning}
          />
          <button 
            className={`chat-submit-btn ${inputVal.trim() && !isRunning ? 'ready' : ''}`} 
            onClick={handleSend}
            disabled={isRunning || !inputVal.trim()}
          >
            EXECUTE
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
