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
  ZapIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ChatIcon
} from './components/Icons'

const INITIAL_MESSAGE = { 
  role: 'agent', 
  content: 'System initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or trigger Assemble Protocol for a full status briefing.', 
  node: 'supervisor' 
};

const createNewSession = (index = 1) => ({
  id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
  title: `Chat ${index}`,
  messages: [INITIAL_MESSAGE],
  createdAt: Date.now(),
  updatedAt: Date.now()
});

function AppContent() {
  const { user, logout } = useAuth();
  
  // Multi-chat sessions state
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('taskforce_chat_sessions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [createNewSession(1)];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    try {
      const savedId = localStorage.getItem('taskforce_active_session_id');
      if (savedId) return savedId;
    } catch (e) {}
    return null;
  });

  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitleVal, setEditTitleVal] = useState('');

  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const [isAssembling, setIsAssembling] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logEndRef = useRef(null);

  // Active session resolution
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const currentSessionId = activeSession?.id || sessions[0]?.id;
  const messages = activeSession?.messages || [INITIAL_MESSAGE];

  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputVal(transcript);
    }
  }, [transcript]);

  const nodes = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos'];

  // Persist sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('taskforce_chat_sessions', JSON.stringify(sessions));
      if (currentSessionId) {
        localStorage.setItem('taskforce_active_session_id', currentSessionId);
      }
    }
  }, [sessions, currentSessionId]);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isRunning, isAssembling]);

  // Session Management Handlers
  const handleNewChat = () => {
    const newSession = createNewSession(sessions.length + 1);
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSelectSession = (id) => {
    setActiveSessionId(id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteSession = (e, id) => {
    e.stopPropagation();
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        const fresh = createNewSession(1);
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (currentSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleStartRename = (e, session) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleVal(session.title);
  };

  const handleSaveRename = (id) => {
    if (!editTitleVal.trim()) {
      setEditingSessionId(null);
      return;
    }
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: editTitleVal.trim(), updatedAt: Date.now() } : s));
    setEditingSessionId(null);
  };

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

      const agentBriefingMsgs = briefing.map(item => ({
        role: 'agent',
        node: item.agent,
        content: `[${item.name.toUpperCase()} - ${item.title}]: ${item.text}`,
        timestamp: new Date()
      }));

      const newMsgs = [headerMsg, ...agentBriefingMsgs];

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            updatedAt: Date.now(),
            messages: [...s.messages, ...newMsgs]
          };
        }
        return s;
      }));

      if (user) {
        agentBriefingMsgs.forEach(m => {
          addDoc(collection(db, 'users', user.uid, 'activities'), { ...m, timestamp: serverTimestamp() }).catch(() => {});
        });
      }

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

    const userMsgText = inputVal.trim();
    const userMsg = { 
      role: 'user', 
      content: userMsgText, 
      timestamp: new Date(),
      node: null 
    };
    
    // Optimistic update & auto-title session if it's the first message
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        let newTitle = s.title;
        if (s.title.startsWith('Chat ') && s.messages.filter(m => m.role === 'user').length === 0) {
          newTitle = userMsgText.slice(0, 24) + (userMsgText.length > 24 ? '...' : '');
        }
        return {
          ...s,
          title: newTitle,
          updatedAt: Date.now(),
          messages: [...s.messages, userMsg]
        };
      }
      return s;
    }));

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
                setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, updatedAt: Date.now(), messages: [...s.messages, errorMsg] } : s));
                addDoc(activitiesRef, { ...errorMsg, timestamp: serverTimestamp() }).catch(() => {});
              } else {
                const agentMsg = { 
                  role: 'agent', 
                  content: data.content, 
                  node: data.node,
                  timestamp: new Date()
                };
                setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, updatedAt: Date.now(), messages: [...s.messages, agentMsg] } : s));
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
      setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, updatedAt: Date.now(), messages: [...s.messages, errorMsg] } : s));
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

          <button 
            type="button" 
            className="new-chat-btn"
            onClick={handleNewChat}
          >
            <PlusIcon size={16} />
            <span>New Chat</span>
          </button>

          <div className="sidebar-section chats-section">
            <div className="section-title">
              <span>Chats ({sessions.length})</span>
            </div>
            <div className="chat-session-list">
              {sessions.map(s => {
                const isActive = s.id === currentSessionId;
                const isEditing = editingSessionId === s.id;
                return (
                  <div 
                    key={s.id}
                    className={`chat-session-item ${isActive ? 'active-chat' : ''}`}
                    onClick={() => handleSelectSession(s.id)}
                  >
                    <div className="chat-item-icon">
                      <ChatIcon size={14} />
                    </div>

                    <div className="chat-item-info">
                      {isEditing ? (
                        <input
                          autoFocus
                          type="text"
                          value={editTitleVal}
                          onChange={(e) => setEditTitleVal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(s.id);
                            if (e.key === 'Escape') setEditingSessionId(null);
                          }}
                          onBlur={() => handleSaveRename(s.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="chat-title-input"
                        />
                      ) : (
                        <span className="chat-item-title" title={s.title}>
                          {s.title}
                        </span>
                      )}
                    </div>

                    <div className="chat-item-actions">
                      <button
                        type="button"
                        className="chat-action-btn edit-btn"
                        onClick={(e) => handleStartRename(e, s)}
                        title="Rename chat"
                      >
                        <EditIcon size={12} />
                      </button>
                      <button
                        type="button"
                        className="chat-action-btn delete-btn"
                        onClick={(e) => handleDeleteSession(e, s.id)}
                        title="Delete chat"
                      >
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
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
