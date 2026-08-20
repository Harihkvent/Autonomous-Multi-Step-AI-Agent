import React, { useState, useEffect, useRef } from 'react';

export default function CuteAvatarCompanion({ 
  isRunning = false, 
  isListening = false, 
  isAssembling = false, 
  activeAgent = null,
  onTriggerAction 
}) {
  const [mood, setMood] = useState('idle'); // 'idle', 'listening', 'thinking', 'assembling', 'happy', 'curious'
  const [bubbleText, setBubbleText] = useState('Hi! I am your AI Companion. Ready to help!');
  const [showBubble, setShowBubble] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Position & Wander State (Coordinates offset from default bottom-right home)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Pupil & Cursor Tracking State
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [isHoveredNear, setIsHoveredNear] = useState(false);

  const containerRef = useRef(null);

  // 1. Dynamic mood & speech bubble text updates based on system state
  useEffect(() => {
    if (isAssembling) {
      setMood('assembling');
      setBubbleText('⚡ TASKFORCE ASSEMBLE! All agents uniting!');
      setShowBubble(true);
    } else if (isListening) {
      setMood('listening');
      setBubbleText('🎙️ Listening... Speak your objective now!');
      setShowBubble(true);
    } else if (isRunning) {
      setMood('thinking');
      setBubbleText(activeAgent ? `🧠 ${activeAgent.toUpperCase()} is executing your task...` : '⚡ Processing objective...');
      setShowBubble(true);
    } else {
      setMood('idle');
      const idlePhrases = [
        "Wandering around! Ready to conquer objectives!",
        "Click 'Assemble Protocol' for a voice briefing!",
        "Try asking me to research, analyze documents, or schedule!",
        "I follow your cursor! Move your mouse around me 😊"
      ];
      const timer = setInterval(() => {
        const randomPhrase = idlePhrases[Math.floor(Math.random() * idlePhrases.length)];
        setBubbleText(randomPhrase);
      }, 14000);
      return () => clearInterval(timer);
    }
  }, [isRunning, isListening, isAssembling, activeAgent]);

  // 2. Cute Eye Blink Loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // 3. Autonomous Wander AI (Periodically moves around on its own)
  useEffect(() => {
    if (isDragging || isAssembling || isListening) return;

    const wanderInterval = setInterval(() => {
      // Pick a random target delta within [-180px, 40px] horizontal and [-250px, 40px] vertical
      const targetX = Math.floor(Math.random() * 220) - 180;
      const targetY = Math.floor(Math.random() * 260) - 200;
      
      setPos({ x: targetX, y: targetY });

      // Tilt slightly in motion direction
      setHeadTilt(targetX < pos.x ? -6 : 6);
      setTimeout(() => setHeadTilt(0), 1200);
    }, 8000);

    return () => clearInterval(wanderInterval);
  }, [isDragging, isAssembling, isListening, pos.x]);

  // 4. Cursor Tracking & Proximity Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Pupil offset scaling (max ±3.5px inside eye socket)
      const maxPupilMove = 3.5;
      const pX = dist > 0 ? (dx / dist) * Math.min(dist / 30, maxPupilMove) : 0;
      const pY = dist > 0 ? (dy / dist) * Math.min(dist / 30, maxPupilMove) : 0;
      setPupilOffset({ x: pX, y: pY });

      // Proximity check (within 160px)
      if (dist < 160) {
        if (!isHoveredNear) {
          setIsHoveredNear(true);
          setHeadTilt(dx > 0 ? 8 : -8);
        }
      } else {
        if (isHoveredNear) {
          setIsHoveredNear(false);
          setHeadTilt(0);
        }
      }

      // Dragging logic
      if (isDragging) {
        setPos({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isHoveredNear]);

  // Handle Drag Start
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  const handleMascotClick = (e) => {
    if (isDragging) return;
    setMood('happy');
    const funResponses = [
      "Greetings, Commander! Tracking your cursor!",
      "All systems operational at 100% capacity!",
      "I wander around on my own! Drag me anywhere!",
      "Need a research report, email, or math check?"
    ];
    setBubbleText(funResponses[Math.floor(Math.random() * funResponses.length)]);
    setShowBubble(true);
    if (onTriggerAction) onTriggerAction();
  };

  return (
    <div 
      ref={containerRef}
      className={`cute-avatar-container mood-${mood} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)`,
        transition: isDragging ? 'none' : 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
      }}
    >
      {/* Speech Bubble */}
      {showBubble && (
        <div className="avatar-speech-bubble">
          <span>{bubbleText}</span>
          <button 
            className="bubble-close-btn"
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            title="Dismiss bubble"
          >
            ×
          </button>
        </div>
      )}

      {/* Cute Wandering Mascot */}
      <div 
        className="avatar-mascot-body" 
        onMouseDown={handleMouseDown}
        onClick={handleMascotClick}
        style={{ transform: `rotate(${headTilt}deg)` }}
        title="AI Companion — Drag to move or click to chat!"
      >
        {/* Antenna / Sensor */}
        <div className={`mascot-antenna ${mood === 'listening' || mood === 'assembling' || isHoveredNear ? 'pulsing' : ''}`}>
          <div className="antenna-ball"></div>
          <div className="antenna-stem"></div>
        </div>

        {/* Head */}
        <div className="mascot-head">
          {/* Visor Screen */}
          <div className="mascot-face">
            {/* Eyes with Cursor Pupil Tracking */}
            <div className={`mascot-eye eye-left ${isBlinking ? 'blinking' : ''}`}>
              <div 
                className="pupil"
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
                }}
              ></div>
            </div>
            <div className={`mascot-eye eye-right ${isBlinking ? 'blinking' : ''}`}>
              <div 
                className="pupil"
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
                }}
              ></div>
            </div>

            {/* Expression Mouth / Wave Indicator */}
            {mood === 'listening' ? (
              <div className="mascot-soundwave-mouth">
                <span className="v-bar"></span>
                <span className="v-bar"></span>
                <span className="v-bar"></span>
                <span className="v-bar"></span>
              </div>
            ) : mood === 'thinking' ? (
              <div className="mascot-thinking-dots">
                <span></span><span></span><span></span>
              </div>
            ) : isHoveredNear ? (
              <div className="mascot-mouth happy-smile"></div>
            ) : (
              <div className="mascot-mouth"></div>
            )}
          </div>
        </div>

        {/* Floating Halo Ring */}
        <div className="mascot-ring"></div>

        {/* Floating Shadow */}
        <div className="mascot-shadow"></div>
      </div>
    </div>
  );
}
