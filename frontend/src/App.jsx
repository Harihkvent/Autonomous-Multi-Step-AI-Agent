import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'
import { AuthProvider, useAuth } from './AuthContext'
import Auth from './components/Auth'
import useSpeechRecognition from './hooks/useSpeechRecognition'
import AgentAssembleBar from './components/AgentAssembleBar'
import CuteAvatarCompanion from './components/CuteAvatarCompanion'
import AssembleBriefingModal from './components/AssembleBriefingModal'
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
  ChatIcon,
  ExternalLinkIcon,
  CopyIcon
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

/**
 * Cleans raw Python dict/list/JSON blobs from agent message content before rendering.
 * Prevents ugly walls of {'key': 'value', ...} from showing in the chat UI.
 */
function cleanAgentContent(content) {
  if (!content || typeof content !== 'string') return content;

  let cleaned = content.trim();

  // If content is a JSON string with response / message / content, extract the text
  if ((cleaned.startsWith('{') && cleaned.endsWith('}')) || (cleaned.startsWith('```json') && cleaned.endsWith('```'))) {
    try {
      const jsonStr = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const textVal = parsed.response || parsed.message || parsed.content || parsed.text || parsed.answer || parsed.reply;
        if (textVal && typeof textVal === 'string') {
          cleaned = textVal;
        }
      }
    } catch (e) {
      // Continue with standard cleanup
    }
  }

  // Remove standalone raw Python dict lines (e.g. "{'status': 'ok', 'emails': [...]}")
  // that are NOT inside code blocks
  const codeBlockRanges = [];
  const codeBlockRe = /```[\s\S]*?```/g;
  let cbm;
  while ((cbm = codeBlockRe.exec(cleaned)) !== null) {
    codeBlockRanges.push([cbm.index, cbm.index + cbm[0].length]);
  }

  const isInsideCodeBlock = (idx) => codeBlockRanges.some(([s, e]) => idx >= s && idx <= e);

  // Remove raw Python dict/list dump lines outside code blocks
  cleaned = cleaned.split('\n').map((line, lineIdx) => {
    const trimmed = line.trim();
    // Detect raw Python dict/list: starts with { or [ and contains Python-style key-value
    if (
      (trimmed.startsWith('{') || trimmed.startsWith('[')) &&
      (trimmed.includes("': '") || trimmed.includes("': [") || trimmed.includes("': {") || trimmed.includes('\': True') || trimmed.includes('\': False') || trimmed.includes('\': None')) &&
      !isInsideCodeBlock(lineIdx)
    ) {
      return ''; // strip this raw dump line
    }
    return line;
  }).join('\n');

  // Collapse multiple blank lines into max 2
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Remove leftover "Final Output Buffer:" label if it's now followed by blank content
  cleaned = cleaned.replace(/\*\*Final Output Buffer:\*\*\s*\n\s*\n/g, '');

  return cleaned.trim();
}



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
  const [isAssembleModalOpen, setIsAssembleModalOpen] = useState(false);
  const [assembleBriefingItems, setAssembleBriefingItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
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

  const nodes = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos', 'titan'];

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
    setIsAssembleModalOpen(true);
    setActiveNode('supervisor');
    setActiveAgent('jarvis');

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const token = user ? await user.getIdToken() : '';
      const response = await fetch(`${API_BASE}/api/assemble`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      const data = await response.json();
      const briefing = data.briefing || [];
      setAssembleBriefingItems(briefing);

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

  const handleSend = async (directText = null) => {
    const textToSend = typeof directText === 'string' ? directText.trim() : inputVal.trim();
    if (!textToSend || isRunning || !user) return;
    
    // Check if user requested the assemble protocol via voice/text
    if (/^(assemble|agents assemble|status report|brief me|morning brief)/i.test(textToSend)) {
      setInputVal('');
      handleTriggerAssemble();
      return;
    }

    const userMsgText = textToSend;
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
      const token = user ? await user.getIdToken() : '';
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ 
          messages: messages.concat(userMsg).map(m => ({ role: m.role, content: m.content })),
          userId: user.uid,
          conversationId: currentSessionId
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
                setIsRunning(false);
                setActiveNode(null);
                try { await reader.cancel(); } catch (e) {}
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

                // Auto-trigger client OS protocol (calculator:, whatsapp://, vscode://, etc.)
                if (data.content && typeof data.content === 'string' && data.content.includes('[CLIENT_PROTOCOL:')) {
                  const protoMatches = [...data.content.matchAll(/\[CLIENT_PROTOCOL:([a-zA-Z0-9_\-\.\:\/\?\=\&\%]+)\]/g)];
                  for (const pm of protoMatches) {
                    if (pm && pm[1]) {
                      try {
                        const iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = pm[1];
                        document.body.appendChild(iframe);
                        setTimeout(() => {
                          try { document.body.removeChild(iframe); } catch(e){}
                        }, 2500);
                      } catch (e) {
                        console.log("[Client Protocol Launch Error]", e);
                      }
                    }
                  }
                }

                // Auto-open URL in user's browser if Titan returned an [OPEN_URL:url] payload tag
                if (data.content && typeof data.content === 'string' && data.content.includes('[OPEN_URL:')) {
                  const urlMatch = data.content.match(/\[OPEN_URL:(https?:\/\/[^\]\s]+)\]/);
                  if (urlMatch && urlMatch[1]) {
                    try {
                      window.open(urlMatch[1], '_blank');
                    } catch (e) {
                      console.log("[Auto-Open URL blocked or failed]", e);
                    }
                  }
                }

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

          <div className="sidebar-footer">
            <div className="telemetry-pill">
              <div className="telemetry-dot"></div>
              <span className="telemetry-title">8 Units Online</span>
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
                // Scrub raw Python dict/list literals that leaked into content
                displayContent = cleanAgentContent(displayContent);
              }

              // Extract all [DOWNLOAD:filename] tags
              const downloadFiles = [];
              if (displayContent && typeof displayContent === 'string') {
                const dMatches = [...displayContent.matchAll(/\[DOWNLOAD:(.+?)\]/g)];
                for (const dm of dMatches) {
                  if (dm && dm[1] && !downloadFiles.includes(dm[1].trim())) {
                    downloadFiles.push(dm[1].trim());
                  }
                }
              }

              // Extract all [LAUNCH_APP:name:url] tags
              const launchApps = [];
              if (displayContent && typeof displayContent === 'string') {
                const lMatches = [...displayContent.matchAll(/\[LAUNCH_APP:([^:]+):([a-zA-Z0-9_\-\.\:\/\?\=\&\%]+)\]/g)];
                for (const lm of lMatches) {
                  if (lm && lm[1] && lm[2]) {
                    launchApps.push({ name: lm[1].trim(), url: lm[2].trim() });
                  }
                }
              }

              // Fallback [OPEN_URL:url]
              const openUrlMatches = launchApps.length === 0 && displayContent && typeof displayContent === 'string' ? displayContent.match(/\[OPEN_URL:(https?:\/\/[^\]\s]+)\]/) : null;
              const fallbackOpenUrl = openUrlMatches ? openUrlMatches[1].trim() : null;

              if (displayContent && typeof displayContent === 'string') {
                displayContent = displayContent
                  .replace(/<!--\s*\[CLIENT_PROTOCOL:.*?\]\s*-->/g, '')
                  .replace(/\[CLIENT_PROTOCOL:.*?\]/g, '')
                  .replace(/<!--\s*\[LAUNCH_APP:.*?\]\s*-->/g, '')
                  .replace(/\[LAUNCH_APP:.*?\]/g, '')
                  .replace(/<!--\s*\[OPEN_URL:.*?\]\s*-->/g, '')
                  .replace(/\[OPEN_URL:.*?\]/g, '')
                  .replace(/\[DOWNLOAD:.+?\]/g, '')
                  .trim();
              }
              
              const nodeProfile = AGENT_PROFILES[msg.node] || null;
              const isUser = msg.role === 'user';
              const isError = msg.role === 'error';
              const label = isUser ? 'You' : nodeProfile ? `${nodeProfile.name}` : (msg.node ? msg.node.toUpperCase() : 'System');
              const roleTitle = !isUser && nodeProfile ? nodeProfile.title : null;

              return (
                <div 
                  key={msg.id || i} 
                  className={`chat-bubble ${isUser ? 'user-bubble' : isError ? 'error-bubble' : 'agent-bubble'} node-${msg.node || 'supervisor'}`}
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
                  
                  {(launchApps.length > 0 || fallbackOpenUrl || downloadFiles.length > 0) && (
                    <div className="bubble-actions">
                      {launchApps.map((app, appIdx) => {
                        const isNativeProtocol = app.url.includes(':') && !app.url.startsWith('http://') && !app.url.startsWith('https://');
                        return (
                          <a 
                            key={appIdx}
                            href={app.url}
                            target={isNativeProtocol ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            className={isNativeProtocol ? "launch-native-btn" : "launch-app-btn"}
                            title={isNativeProtocol ? `Launch native ${app.name} on your PC` : `Open ${app.name} in browser`}
                          >
                            <ExternalLinkIcon size={14} />
                            <span>{app.name}</span>
                          </a>
                        );
                      })}
                      
                      {fallbackOpenUrl && (
                        <a 
                          href={fallbackOpenUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="launch-app-btn"
                          title="Open link in a new tab"
                        >
                          <ExternalLinkIcon size={14} />
                          <span>Open Link</span>
                        </a>
                      )}
                      
                      {downloadFiles.map((file, fileIdx) => {
                        const isBat = file.endsWith('.bat') || file.endsWith('.cmd');
                        return (
                          <a 
                            key={fileIdx}
                            href={`${import.meta.env.VITE_API_URL || ''}/api/download/${file}`}
                            download={file}
                            className={isBat ? "launch-batch-btn" : "download-btn"}
                            target="_blank"
                            rel="noreferrer"
                            title={isBat ? `Click to download and run ${file} on your PC` : `Download ${file}`}
                          >
                            <DownloadIcon size={14} />
                            <span>{isBat ? `⚡ Run on My PC (${file})` : `Download ${file}`}</span>
                          </a>
                        );
                      })}

                      {(downloadFiles.length > 0 || displayContent.length > 50) && !isUser && (
                        <button
                          type="button"
                          className="copy-note-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(displayContent);
                            setCopiedMsgId(msg.id || i);
                            setTimeout(() => setCopiedMsgId(null), 2000);
                          }}
                          title="Copy content to clipboard"
                        >
                          <CopyIcon size={13} />
                          <span>{copiedMsgId === (msg.id || i) ? 'Copied!' : 'Copy Text'}</span>
                        </button>
                      )}
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

            {messages.length <= 1 && (
              <div className="welcome-directives-grid">
                <div className="directives-header">
                  <span className="directives-badge">⚡ QUICK DIRECTIVES</span>
                  <span className="directives-sub">1-Click Instant Agent Execution</span>
                </div>
                <div className="directives-cards">
                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={() => handleSend("open calculator")}
                    disabled={isRunning}
                  >
                    <span className="directive-icon">🧮</span>
                    <div className="directive-text">
                      <strong>Open Calculator</strong>
                      <small>Launch native Windows Calculator</small>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={() => handleSend("open terminal and run ping 8.8.8.8")}
                    disabled={isRunning}
                  >
                    <span className="directive-icon">⚡</span>
                    <div className="directive-text">
                      <strong>Run Diagnostics</strong>
                      <small>Execute shell ping & system check</small>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={() => handleSend("schedule strategy sync tomorrow at 10 AM with team@example.com")}
                    disabled={isRunning}
                  >
                    <span className="directive-icon">📅</span>
                    <div className="directive-text">
                      <strong>Schedule Meeting</strong>
                      <small>Create calendar invite with Chronos</small>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={() => handleSend("open notepad with system capabilities")}
                    disabled={isRunning}
                  >
                    <span className="directive-icon">📝</span>
                    <div className="directive-text">
                      <strong>Generate Notes</strong>
                      <small>Create capability notes in Notepad</small>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={() => handleSend("search for latest AI agent innovations")}
                    disabled={isRunning}
                  >
                    <span className="directive-icon">🔍</span>
                    <div className="directive-text">
                      <strong>Live Web Intel</strong>
                      <small>Search real-time Google tech intel</small>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="directive-card"
                    onClick={handleTriggerAssemble}
                    disabled={isRunning || isAssembling}
                  >
                    <span className="directive-icon">🚀</span>
                    <div className="directive-text">
                      <strong>Assemble Protocol</strong>
                      <small>Multi-agent status voice briefing</small>
                    </div>
                  </button>
                </div>
              </div>
            )}

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
              <div className="mic-wrapper">
                {isListening && (
                  <div className="recording-wave-visualizer" title="Recording audio...">
                    <span className="wave-bar-anim"></span>
                    <span className="wave-bar-anim"></span>
                    <span className="wave-bar-anim"></span>
                    <span className="wave-bar-anim"></span>
                  </div>
                )}
                <button 
                  type="button"
                  className={`mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  title={isListening ? "Stop listening" : "Voice input"}
                  aria-label="Voice input"
                >
                  <MicIcon size={18} />
                </button>
              </div>
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

        {/* Cute Wandering Mascot Companion */}
        <CuteAvatarCompanion 
          isRunning={isRunning}
          isListening={isListening}
          isAssembling={isAssembling}
          activeAgent={activeAgent}
        />

        {/* Full-Screen Multi-Agent Briefing Room Modal */}
        <AssembleBriefingModal 
          isOpen={isAssembleModalOpen}
          onClose={() => setIsAssembleModalOpen(false)}
          briefingItems={assembleBriefingItems}
          activeSpeakingAgent={activeAgent}
          onReplayBriefing={() => playAssembleSequence(assembleBriefingItems, (agent) => setActiveAgent(agent))}
          onSelectAgent={handleSelectAgent}
        />
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
