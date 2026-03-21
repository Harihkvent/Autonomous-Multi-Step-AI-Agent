import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'Hello! I am an autonomous multi-agent system powered by LangGraph. How can I help you today?' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const logEndRef = useRef(null)

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
    
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });
      
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      
      if (data.messages && data.messages.length > 0) {
        setMessages(prev => [...prev, ...data.messages]);
      } else {
        setMessages(prev => [...prev, { role: 'agent', content: 'No response from agents.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: `Error: ${err.message}` }]);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Multi-Agent Chat</h1>
      </div>
      
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'agent-bubble'}`}>
            <div className="bubble-label">{msg.role === 'user' ? 'You' : 'Agent'}</div>
            <pre className="bubble-content">{msg.content}</pre>
          </div>
        ))}
        {isRunning && (
          <div className="chat-bubble agent-bubble typing-indicator">
            Agents are collaborating...
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
          placeholder="Ask the agent to plan or book a meeting..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isRunning}
        />
        <button 
          className="chat-submit-btn" 
          onClick={handleSend}
          disabled={isRunning || !inputVal.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
