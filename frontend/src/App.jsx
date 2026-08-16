import { useState, useRef, useEffect } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './AuthContext'
import Auth from './components/Auth'
import useSpeechRecognition from './hooks/useSpeechRecognition'
import AgentAssembleBar from './components/AgentAssembleBar'
import { playAssembleSequence, speakAgent, stopSpeech, AGENT_PROFILES } from './utils/speech'
import { db } from './firebase'
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'

function AppContent() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'System Initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or call "Agents Assemble" for a full briefing.', node: 'supervisor' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeNode, setActiveNode] = useState(null)
  const [activeAgent, setActiveAgent] = useState(null)
  const [isAssembling, setIsAssembling] = useState(false)
  const logEndRef = useRef(null)

  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputVal(transcript);
    }
  }, [transcript]);

  const nodes = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos']

  // Load message history from Firestore once on mount or auth change
  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        const q = query(
          collection(db, 'users', user.uid, 'activities'),
          orderBy('timestamp', 'asc')
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setMessages([{ role: 'agent', content: 'System Initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or call "Agents Assemble" for a full briefing.', node: 'supervisor' }]);
        } else {
          const history = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setMessages(history);
        }
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    };

    loadHistory();
  }, [user]);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isRunning, isAssembling])

  const handleTriggerAssemble = async () => {
    if (isAssembling) return;
    setIsAssembling(true);
    setActiveNode('supervisor');
    setActiveAgent('jarvis');

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/assemble`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      const briefing = data.briefing || [];

      // Add assemble header
      const headerMsg = {
        role: 'agent',
        node: 'supervisor',
        content: '⚡ **[TASKFORCE PROTOCOL ACTIVATED]** Synchronous multi-agent status briefing in progress...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, headerMsg]);

      // Add each agent's individual briefing item
      briefing.forEach(item => {
        const agentMsg = {
          role: 'agent',
          node: item.agent,
          content: `[${item.name.toUpperCase()} - ${item.title}]: ${item.text}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMsg]);
        if (user) {
          addDoc(collection(db, 'users', user.uid, 'activities'), { ...agentMsg, timestamp: serverTimestamp() }).catch(() => {});
        }
      });

      // Play the sequential voice symphony
      playAssembleSequence(briefing, (currentAgent) => {
        setActiveAgent(currentAgent);
        setActiveNode(currentAgent || 'supervisor');
      }, () => {
        setActiveAgent(null);
        setIsAssembling(false);
      });
    } catch (err) {
      console.error("Assemble failed:", err);
      setIsAssembling(false);
      setActiveAgent(null);
    }
  };

  const handleSelectAgent = (agentKey) => {
    const profile = AGENT_PROFILES[agentKey];
    if (!profile) return;
    setActiveAgent(agentKey);
    const text = `${profile.name} reporting. All systems operational in the ${profile.title} sub-system.`;
    speakAgent(text, agentKey, null, () => setActiveAgent(null));
  };

  const handleSend = async () => {
    if (!inputVal.trim() || isRunning || !user) return;
    
    // Check if user requested the assemble protocol via voice/text
    if (/^(assemble|agents assemble|status report|brief me|morning brief)/i.test(inputVal.trim())) {
      setInputVal('');
      handleTriggerAssemble();
      return;
    }

    const userMsg = { 
      role: 'user', 
      content: inputVal, 
      timestamp: new Date(), // Local timestamp for optimistic update
      node: null 
    };
    
    // OPTIMISTIC UPDATE: Add to local state immediately
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsRunning(true);
    setActiveNode('supervisor');
    
    const activitiesRef = collection(db, 'users', user.uid, 'activities');
    
    try {
      // Save user message to Firestore
      addDoc(activitiesRef, { ...userMsg, timestamp: serverTimestamp() }).catch(() => {});
      
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.concat(userMsg).map(m => ({ role: m.role, content: m.content })),
          userId: user.uid
        })
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
                const errorMsg = { 
                  role: 'error', 
                  content: `Error: ${data.error}`, 
                  node: 'system',
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMsg]);
                addDoc(activitiesRef, { ...errorMsg, timestamp: serverTimestamp() }).catch(() => {});
              } else {
                // OPTIMISTIC UPDATE: Add agent response message locally
                const agentMsg = { 
                  role: 'agent', 
                  content: data.content, 
                  node: data.node,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, agentMsg]);
                setActiveNode(data.node);

                // Optional voice read for single-step completions
                if (data.content && typeof data.content === 'string' && data.content.length < 200 && !data.content.includes('{')) {
                  speakAgent(data.content, data.node || 'jarvis');
                }

                // Save to Firestore
                addDoc(activitiesRef, { ...agentMsg, timestamp: serverTimestamp() }).catch(() => {});
              }
            } catch (e) {
              console.error("[SSE Parse Error]", e);
            }
          }
        }
      }
    } catch (err) {
      const errorMsg = { 
        role: 'error', 
        content: `Error: ${err.message}`, 
        node: 'system',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      addDoc(activitiesRef, { ...errorMsg, timestamp: serverTimestamp() }).catch(() => {});
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
            <div className="user-avatar">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <button onClick={logout} className="logout-btn">DISCONNECT</button>
            </div>
          </div>
          
          <div className="sys-status">
            <div className="status-dot"></div>
            <span>TASKFORCE ONLINE</span>
          </div>
          <h2>Specialized Agents</h2>
          <div className="node-list">
            {nodes.map(n => {
              const profile = AGENT_PROFILES[n] || { name: n.toUpperCase(), icon: '🤖' };
              const isCurrent = activeNode === n || activeAgent === n;
              return (
                <div key={n} className={`node-item ${isCurrent ? 'active-node' : ''}`} onClick={() => handleSelectAgent(n)}>
                  <div className="node-icon-wrapper">{profile.icon}</div>
                  <span className="node-name">{profile.name}</span>
                  {isCurrent && <div className="pulse-ring"></div>}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="chat-container">
          <AgentAssembleBar 
            activeAgent={activeAgent}
            isAssembling={isAssembling}
            onTriggerAssemble={handleTriggerAssemble}
            onSelectAgent={handleSelectAgent}
          />
          
          <div className="chat-history">
            {messages.map((msg, i) => {
              const isReview = msg.content && typeof msg.content === 'string' && msg.content.includes('[REVIEW_REQUIRED]');
              let displayContent = isReview ? msg.content.replace('[REVIEW_REQUIRED]', '').trim() : msg.content;
              
              // Security/UX cleanup: Strip hidden plan serialization comments
              if (displayContent && typeof displayContent === 'string') {
                displayContent = displayContent.replace(/<!--\s*<PLAN_DATA>[\s\S]*?<\/PLAN_DATA>\s*-->/g, '').trim();
              }

              // Extract download markers [DOWNLOAD:filename]
              const downloadMatch = displayContent && typeof displayContent === 'string' && displayContent.match(/\[DOWNLOAD:(.+?)\]/);
              const downloadFile = downloadMatch ? downloadMatch[1] : null;
              if (downloadFile) {
                displayContent = displayContent.replace(/\[DOWNLOAD:.+?\]/, '').trim();
              }
              
              const nodeProfile = AGENT_PROFILES[msg.node] || null;
              const label = msg.role === 'user' ? 'USER' : nodeProfile ? `${nodeProfile.name} (${nodeProfile.title})` : (msg.node ? msg.node.toUpperCase() : msg.role.toUpperCase());

              return (
                <div key={msg.id || i} className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : msg.role === 'error' ? 'error-bubble' : 'agent-bubble'} node-${msg.node || 'system'}`}>
                  <div className="bubble-header">
                    <span className="bubble-label">{label}</span>
                  </div>
                  <div className="bubble-content">{displayContent}</div>
                  {downloadFile && (
                    <div style={{ marginTop: '12px' }}>
                      <a 
                        href={`${import.meta.env.VITE_API_URL || ''}/api/download/${downloadFile}`}
                        download
                        className="download-btn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        📄 Download Generated Document ({downloadFile})
                      </a>
                    </div>
                  )}
                  {isReview && !isRunning && (
                    <div className="approval-actions">
                      <button 
                        className="btn-approve"
                        onClick={() => {
                          setInputVal('approve');
                          setTimeout(() => {
                            const btn = document.getElementById('btn-send-command');
                            if (btn) btn.click();
                          }, 100);
                        }}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => {
                          setInputVal('reject');
                          setTimeout(() => {
                            const btn = document.getElementById('btn-send-command');
                            if (btn) btn.click();
                          }, 100);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            <div ref={logEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="input-wrapper">
              <span className="input-prompt">_ENTER OBJECTIVE OR SAY "ASSEMBLE"...</span>
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening to your voice..." : "Direct JARVIS or taskforce units..."}
                disabled={isRunning || isAssembling}
              />
            </div>
            
            {isSupported && (
              <button 
                type="button"
                className={`mic-btn ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop Listening" : "Voice Input (Speech-to-Text)"}
              >
                <div className="mic-icon"></div>
              </button>
            )}

            <button 
              id="btn-send-command"
              className="send-btn" 
              onClick={handleSend} 
              disabled={isRunning || !inputVal.trim() || isAssembling}
            >
              EXECUTE
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
