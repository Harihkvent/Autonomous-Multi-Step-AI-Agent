import { useState, useRef, useEffect } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './AuthContext'
import Auth from './components/Auth'
import { db } from './firebase'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

function AppContent() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'System Initialized. I am the Autonomous Multi-Step AI Agent. Enter your objective below.', node: 'supervisor' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeNode, setActiveNode] = useState(null)
  const logEndRef = useRef(null)

  const nodes = ['supervisor', 'planner', 'executor', 'researcher', 'weather', 'calculator']

  // Load message history from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'activities'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Keep the initial message if no history
        setMessages([{ role: 'agent', content: 'System Initialized. I am the Autonomous Multi-Step AI Agent. Enter your objective below.', node: 'supervisor' }]);
      } else {
        const history = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setMessages(history);
      }
    });

    return unsubscribe;
  }, [user]);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isRunning])

  const handleSend = async () => {
    if (!inputVal.trim() || isRunning || !user) return;
    
    const userMsg = { 
      role: 'user', 
      content: inputVal, 
      timestamp: serverTimestamp(),
      node: null 
    };
    
    // Save user message to Firestore
    const activitiesRef = collection(db, 'users', user.uid, 'activities');
    await addDoc(activitiesRef, userMsg);
    
    const currentContext = [...messages, userMsg];
    setInputVal('');
    setIsRunning(true);
    setActiveNode('supervisor');
    
    const API_BASE = import.meta.env.VITE_API_URL || '';
    
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentContext.map(m => ({ role: m.role, content: m.content })) })
      });
      
      if (!response.ok) throw new Error(`API failed with status ${response.status}`);
      
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
                await addDoc(activitiesRef, { 
                  role: 'error', 
                  content: `Error: ${data.error}`, 
                  node: 'system',
                  timestamp: serverTimestamp() 
                });
              } else {
                // Save agent response to Firestore
                await addDoc(activitiesRef, { 
                  role: 'agent', 
                  content: data.content, 
                  node: data.node,
                  timestamp: serverTimestamp()
                });
                setActiveNode(data.node);
              }
            } catch (e) {
              console.error("[SSE Parse Error]", e);
            }
          }
        }
      }
    } catch (err) {
      await addDoc(activitiesRef, { 
        role: 'error', 
        content: `Error: ${err.message}`, 
        node: 'system',
        timestamp: serverTimestamp() 
      });
    } finally {
      setIsRunning(false);
      setActiveNode(null);
    }
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app-viewport">
      <div className="scanlines"></div>
      <div className="grid-bg"></div>
      <div className="noise"></div>
      
      <div className="layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="user-avatar">{user.email[0].toUpperCase()}</div>
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={logout}>LOGOUT</button>
          </div>
        </div>

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
          <h1 className="glitch" data-text="AUTONOMOUS-MULTI-STEP-AI-AGENT">AUTONOMOUS-MULTI-STEP-AI-AGENT</h1>
          <p className="subtitle">LangGraph Orchestration Engine</p>
        </div>
        
        <div className="chat-history">
          {messages.map((msg, i) => {
            const isReview = msg.content && typeof msg.content === 'string' && msg.content.includes('[REVIEW_REQUIRED]');
            let displayContent = isReview ? msg.content.replace('[REVIEW_REQUIRED]', '').trim() : msg.content;
            
            // Extract download markers [DOWNLOAD:filename]
            const downloadMatch = displayContent && typeof displayContent === 'string' && displayContent.match(/\[DOWNLOAD:(.+?)\]/);
            const downloadFile = downloadMatch ? downloadMatch[1] : null;
            if (downloadFile) {
              displayContent = displayContent.replace(/\[DOWNLOAD:.+?\]/, '').trim();
            }
            
            return (
              <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : msg.role === 'error' ? 'error-bubble' : 'agent-bubble'} node-${msg.node || 'system'}`}>
                <div className="bubble-header">
                  <span className="bubble-label">{msg.role === 'user' ? 'USER' : msg.node ? msg.node.toUpperCase() : msg.role.toUpperCase()}</span>
                </div>
                <div className="bubble-content">{displayContent}</div>
                {downloadFile && (
                  <div style={{ marginTop: '12px' }}>
                    <a 
                      href={`${import.meta.env.VITE_API_URL || ''}/api/download/${downloadFile}`}
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
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
