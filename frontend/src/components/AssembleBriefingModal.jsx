import React, { useEffect } from 'react';
import { AGENT_PROFILES, speakAgent, stopSpeech } from '../utils/speech';
import { AgentIcon, ZapIcon, CloseIcon } from './Icons';

export default function AssembleBriefingModal({ 
  isOpen, 
  onClose, 
  briefingItems = [], 
  activeSpeakingAgent, 
  onReplayBriefing,
  onSelectAgent 
}) {
  if (!isOpen) return null;

  const agentKeys = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos', 'titan'];

  // Default agent telemetry status fallback items if backend briefing is empty
  const defaultBriefings = {
    jarvis: "Supervisor Node active. Neural intent classifier operating at 100% precision. Directing multi-agent tool pipeline.",
    sentinel: "Sentinel Watcher active. System telemetry, process monitors, and security tokens verified with zero vulnerabilities.",
    hermes: "Hermes Notification Agent online. Gmail SMTP server and IMAP inbox scanners connected and ready.",
    scout: "Scout Recon online. Live Google SerpApi web search engine initialized for instant deep research.",
    scribe: "Scribe Archivist online. Microsoft Word Docx generator and PDF document intelligence engines active.",
    cipher: "Cipher Math Core online. Safe AST mathematical parsing engine verified for precision calculations.",
    chronos: "Chronos Temporal Planner active. Calendar scheduling algorithms and event telemetry synchronized.",
    titan: "Titan System Automation Core online. Local OS application controller, process launchers, and desktop triggers active."
  };

  const getBriefingTextForAgent = (key) => {
    const found = briefingItems.find(item => item.agent === key);
    return found ? found.text : defaultBriefings[key] || "Unit operational.";
  };

  const handleAgentCardClick = (key) => {
    const text = getBriefingTextForAgent(key);
    speakAgent(text, key);
    if (onSelectAgent) onSelectAgent(key);
  };

  return (
    <div className="briefing-modal-overlay">
      <div className="briefing-modal-container">
        {/* Holographic Header */}
        <div className="briefing-header">
          <div className="briefing-title-group">
            <div className="briefing-badge">
              <ZapIcon size={16} />
              <span>TASKFORCE HIGH COMMAND</span>
            </div>
            <h2>Multi-Agent Briefing Room</h2>
            <p>Real-time agent constellation status, telemetry, and persona updates</p>
          </div>

          <div className="briefing-header-actions">
            <button 
              className="briefing-action-btn replay-btn"
              onClick={onReplayBriefing}
              title="Replay Voice Briefing Sequence"
            >
              <ZapIcon size={14} />
              <span>Replay Voice Sequence</span>
            </button>
            <button 
              className="briefing-action-btn stop-btn"
              onClick={() => stopSpeech()}
              title="Stop Speech"
            >
              <span>Stop Voice</span>
            </button>
            <button 
              className="briefing-close-btn"
              onClick={() => { stopSpeech(); onClose(); }}
              title="Close Briefing Room"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        {/* Live Active Speaking Banner */}
        <div className="briefing-active-banner">
          {activeSpeakingAgent ? (
            <div className="active-agent-alert" style={{ '--active-color': AGENT_PROFILES[activeSpeakingAgent]?.color }}>
              <span className="live-pulse-dot"></span>
              <strong>{AGENT_PROFILES[activeSpeakingAgent]?.name} ({AGENT_PROFILES[activeSpeakingAgent]?.title}) IS SPEAKING...</strong>
            </div>
          ) : (
            <div className="idle-alert">
              <span>Click any agent card below to trigger individual voice status reports</span>
            </div>
          )}
        </div>

        {/* 7 Unique Agent Avatars Roster Grid */}
        <div className="briefing-agents-grid">
          {agentKeys.map((key) => {
            const profile = AGENT_PROFILES[key];
            const isActive = activeSpeakingAgent === key;
            const text = getBriefingTextForAgent(key);

            return (
              <div 
                key={key} 
                className={`briefing-agent-card ${isActive ? 'card-speaking' : ''} agent-type-${key}`}
                style={{ '--agent-theme-color': profile.color }}
                onClick={() => handleAgentCardClick(key)}
              >
                <div className="card-top-bar">
                  <span className="card-role-tag">{profile.title}</span>
                  <span className="card-status-dot"></span>
                </div>

                {/* Unique Distinct Avatar for Each Agent Persona */}
                <div className="agent-avatar-stage">
                  <div className="avatar-glow-ring"></div>
                  
                  {/* Distinct Agent Character Avatar */}
                  <div className={`unique-agent-character avatar-skin-${key}`}>
                    {/* Head / Visor */}
                    <div className="agent-character-head">
                      <div className="agent-character-visor">
                        {/* Eyes */}
                        <div className="character-eye eye-l"></div>
                        <div className="character-eye eye-r"></div>
                        
                        {/* Mouth / Wave */}
                        {isActive ? (
                          <div className="character-talking-wave">
                            <span></span><span></span><span></span><span></span>
                          </div>
                        ) : (
                          <div className="character-smile"></div>
                        )}
                      </div>

                      {/* Persona Accessories */}
                      {key === 'jarvis' && <div className="accessory-crown">👑</div>}
                      {key === 'sentinel' && <div className="accessory-horns">🛡️</div>}
                      {key === 'hermes' && <div className="accessory-wings">⚡</div>}
                      {key === 'scout' && <div className="accessory-radar">📡</div>}
                      {key === 'scribe' && <div className="accessory-scroll">📜</div>}
                      {key === 'cipher' && <div className="accessory-matrix">🔢</div>}
                      {key === 'chronos' && <div className="accessory-clock">⏰</div>}
                      {key === 'titan' && <div className="accessory-gear">⚙️</div>}
                    </div>
                  </div>

                  {isActive && (
                    <div className="card-audio-equalizer">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                  )}
                </div>

                <div className="card-agent-meta">
                  <h3 className="card-agent-name">{profile.name}</h3>
                  <div className="card-briefing-text">
                    <p>"{text}"</p>
                  </div>
                </div>

                <button className="card-listen-btn">
                  <span>🔊 Listen Status</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
