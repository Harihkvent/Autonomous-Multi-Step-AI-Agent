import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'
import { AuthProvider, useAuth } from './AuthContext'
import Auth from './components/Auth'
import useSpeechRecognition from './hooks/useSpeechRecognition'
import AgentAssembleBar from './components/AgentAssembleBar'
import { playAssembleSequence, speakAgent, AGENT_PROFILES } from './utils/speech'
import { db } from './firebase'
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'
import { 
  AgentIcon, 
  SendIcon, 
  MicIcon, 
  DownloadIcon, 
  LogOutIcon, 
  MenuIcon, 
  CloseIcon, 
  CheckIcon, 
  XIcon, 
  UserIcon,
  ZapIcon
} from './components/Icons'

function AppContent() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([
    { 
      role: 'agent', 
      content: 'System initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or trigger Assemble Protocol for a full status briefing.', 
      node: 'supervisor' 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const [isAssembling, setIsAssembling] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logEndRef = useRef(null);

  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputVal(transcript);
    }
  }, [transcript]);

  const nodes = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos'];

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
          setMessages([{ 
            role: 'agent', 
            content: 'System initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or trigger Assemble Protocol for a full status briefing.', 
            node: 'supervisor' 
          }]);
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
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isRunning, isAssembling]);

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
        content: '[TASKFORCE PROTOCOL ACTIVATED] Multi-agent briefing in progress...',
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
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
      timestamp: new Date(),
      node: null 
    };
    
    // Optimistic update
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsRunning(true);
    setActiveNode('supervisor');
    
    const activitiesRef = collection(db, 'users', user.uid, 'activities');
    
    try {
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
      
      if (!response.ok) throw new Error(`API returned status ${response.status}`);
      
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
                const agentMsg = { 
                  role: 'agent', 
                  content: data.content, 
                  node: data.node,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, agentMsg]);
                setActiveNode(data.node);

                if (data.content && typeof data.content === 'string' && data.content.length < 200 && !data.content.includes('{')) {
                  speakAgent(data.content, data.node || 'jarvis');
                }

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
  };

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app-viewport">
      {/* Mobile Top Navigation */}
      <header className="mobile-header">
        <button 
          className="menu-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
        <div className="mobile-header-title">
          <span className="app-title">Autonomous Taskforce</span>
        </div>
        <button 
          className="mobile-assemble-btn"
          onClick={handleTriggerAssemble}
          disabled={isAssembling}
          title="Agents Assemble"
        >
          <ZapIcon size={16} />
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <div className="user-profile">
              <div className="user-avatar">
                {user.email ? user.email[0].toUpperCase() : <UserIcon size={16} />}
              </div>
              <div className="user-info">
                <span className="user-email" title={user.email}>{user.email}</span>
                <button onClick={logout} className="logout-btn">
                  <LogOutIcon size={12} />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
            
            <div className="sys-status">
              <div className="status-dot"></div>
              <span>Taskforce Online</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-title">
              <span>Constellation Units</span>
            </div>
            <div className="node-list">
              {nodes.map(n => {
                const profile = AGENT_PROFILES[n] || { name: n.toUpperCase(), title: 'Unit', color: '#06b6d4' };
                const isCurrent = activeNode === n || activeAgent === n;
                return (
                  <button 
                    key={n} 
                    type="button"
                    className={`node-item ${isCurrent ? 'active-node' : ''}`} 
                    onClick={() => handleSelectAgent(n)}
                    style={{ '--node-color': profile.color }}
                  >
                    <div className="node-icon-wrapper">
                      <AgentIcon agentKey={n} size={15} />
                    </div>
                    <div className="node-details">
                      <span className="node-name">{profile.name}</span>
                      <span className="node-desc">{profile.title}</span>
                    </div>
                    {isCurrent && <div className="pulse-indicator" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Chat Workspace */}
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
              
              if (displayContent && typeof displayContent === 'string') {
                displayContent = displayContent.replace(/<!--\s*<PLAN_DATA>[\s\S]*?<\/PLAN_DATA>\s*-->/g, '').trim();
              }

              const downloadMatch = displayContent && typeof displayContent === 'string' && displayContent.match(/\[DOWNLOAD:(.+?)\]/);
              const downloadFile = downloadMatch ? downloadMatch[1] : null;
              if (downloadFile) {
                displayContent = displayContent.replace(/\[DOWNLOAD:.+?\]/, '').trim();
              }
              
              const nodeProfile = AGENT_PROFILES[msg.node] || null;
              const isUser = msg.role === 'user';
              const isError = msg.role === 'error';
              const label = isUser ? 'You' : nodeProfile ? `${nodeProfile.name}` : (msg.node ? msg.node.toUpperCase() : 'System');
              const roleTitle = !isUser && nodeProfile ? nodeProfile.title : null;

              return (
                <div 
                  key={msg.id || i} 
                  className={`chat-bubble ${isUser ? 'user-bubble' : isError ? 'error-bubble' : 'agent-bubble'}`}
                  style={nodeProfile ? { '--bubble-accent': nodeProfile.color } : {}}
                >
                  <div className="bubble-header">
                    <div className="bubble-avatar">
                      {isUser ? (
                        <UserIcon size={14} />
                      ) : (
                        <AgentIcon agentKey={msg.node || 'supervisor'} size={14} />
                      )}
                    </div>
                    <span className="bubble-label">{label}</span>
                    {roleTitle && <span className="bubble-title">{roleTitle}</span>}
                  </div>
                  
                  <div className="bubble-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {displayContent}
                    </ReactMarkdown>
                  </div>
                  
                  {downloadFile && (
                    <div className="bubble-actions">
                      <a 
                        href={`${import.meta.env.VITE_API_URL || ''}/api/download/${downloadFile}`}
                        download
                        className="download-btn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <DownloadIcon size={14} />
                        <span>Download {downloadFile}</span>
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
                          }, 50);
                        }}
                      >
                        <CheckIcon size={14} />
                        <span>Approve Plan</span>
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => {
                          setInputVal('reject');
                          setTimeout(() => {
                            const btn = document.getElementById('btn-send-command');
                            if (btn) btn.click();
                          }, 50);
                        }}
                      >
                        <XIcon size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="chat-input-area">
            <div className="input-wrapper">
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening to voice input..." : "Enter objective or instruction..."}
                disabled={isRunning || isAssembling}
              />
            </div>
            
            {isSupported && (
              <button 
                type="button"
                className={`mic-btn ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : "Voice input"}
                aria-label="Voice input"
              >
                <MicIcon size={18} />
              </button>
            )}

            <button 
              id="btn-send-command"
              className="send-btn" 
              onClick={handleSend} 
              disabled={isRunning || !inputVal.trim() || isAssembling}
              aria-label="Send command"
            >
              <SendIcon size={16} />
              <span className="send-btn-text">{isRunning ? 'Running...' : 'Execute'}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
