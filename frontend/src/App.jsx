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
    
    console.log("[UI] Initiating API request to /api/chat with messages:", newContext);
    
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });
      
      console.log("[UI] API Response received. Status:", response.status);
      
      if (!response.ok) throw new Error(`API failed with status ${response.status}`);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let doneReading = false;
      let buffer = "";

      console.log("[UI] Starting to read EventStream...");
      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("[UI] EventStream reader returned 'done'.");
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
              console.log("[SSE] Parsed Chunk:", data);
              
              if (data.done) {
                console.log("[SSE] Received 'done' signal.");
                doneReading = true;
                break;
              } else if (data.error) {
                console.error("[SSE] Stream returned error:", data.error);
                setMessages(prev => [...prev, { role: 'error', content: `Error: ${data.error}`, node: 'system' }]);
              } else {
                setMessages(prev => [...prev, { role: 'agent', content: data.content, node: data.node }]);
                setActiveNode(data.node);
              }
            } catch (e) {
              console.error("[SSE Parse Error] Failed to parse JSON chunk:", dataStr, e);
            }
          }
        }
      }
    } catch (err) {
      console.error("[UI Error] Exception during handleSend:", err);
      setMessages(prev => [...prev, { role: 'error', content: `Error: ${err.message}`, node: 'system' }]);
    } finally {
      console.log("[UI] Request completed. Resetting run state.");
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
          {messages.map((msg, i) => {
            const isReview = msg.content && msg.content.includes('[REVIEW_REQUIRED]');
            let displayContent = isReview ? msg.content.replace('[REVIEW_REQUIRED]', '').trim() : msg.content;
            
            // Extract download markers [DOWNLOAD:filename]
            const downloadMatch = displayContent && displayContent.match(/\[DOWNLOAD:(.+?)\]/);
            const downloadFile = downloadMatch ? downloadMatch[1] : null;
            if (downloadFile) {
              displayContent = displayContent.replace(/\[DOWNLOAD:.+?\]/, '').trim();
            }
            
            return (
              <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'agent-bubble'} node-${msg.node || 'system'}`}>
                <div className="bubble-header">
                  <span className="bubble-label">{msg.role === 'user' ? 'USER' : msg.node ? msg.node.toUpperCase() : 'AGENT'}</span>
                </div>
                <div className="bubble-content">{displayContent}</div>
                {downloadFile && (
                  <div style={{ marginTop: '12px' }}>
                    <a 
                      href={`http://localhost:8000/api/download/${downloadFile}`}
                      download={downloadFile}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseOver={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)'; }}
                      onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)'; }}
                    >
                      📄 Download {downloadFile}
                    </a>
                  </div>
                )}
                {isReview && msg.role !== 'user' && i === messages.length - 1 && (
                  <div className="review-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => { setInputVal('Approve'); setTimeout(handleSend, 100); }} 
                      style={{ background: '#10b981', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✓ APPROVE
                    </button>
                    <button 
                      onClick={() => { setInputVal('Reject'); setTimeout(handleSend, 100); }} 
                      style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✕ REJECT
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
