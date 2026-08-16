import React from 'react';
import { AGENT_PROFILES } from '../utils/speech';

export default function AgentAssembleBar({ activeAgent, isAssembling, onTriggerAssemble, onSelectAgent }) {
  const agentKeys = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos'];

  return (
    <div className="assemble-container">
      <div className="assemble-top-bar">
        <div className="assemble-brand">
          <span className="assemble-badge">TASKFORCE PROTOCOL</span>
          <span className="assemble-sub">AI Agent Constellation</span>
        </div>

        <button 
          className={`assemble-btn ${isAssembling ? 'assembling' : ''}`}
          onClick={onTriggerAssemble}
          disabled={isAssembling}
          title="Trigger Synchronous Multi-Agent Voice Briefing"
        >
          <span className="assemble-icon">⚡</span>
          <span>{isAssembling ? 'ASSEMBLING...' : 'AGENTS ASSEMBLE'}</span>
        </button>
      </div>

      <div className="assemble-roster">
        {agentKeys.map((key) => {
          const profile = AGENT_PROFILES[key];
          const isActive = activeAgent === key;

          return (
            <div 
              key={key} 
              className={`agent-node ${isActive ? 'active-speaking' : ''}`}
              style={{ '--agent-color': profile.color }}
              onClick={() => onSelectAgent(key)}
              title={`${profile.name} — ${profile.title} (Click for solo report)`}
            >
              <div className="node-avatar-wrapper">
                <div className="node-ring"></div>
                <div className="node-avatar">{profile.icon}</div>
                {isActive && (
                  <div className="audio-wave-container">
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                  </div>
                )}
              </div>
              <div className="node-meta">
                <span className="node-name">{profile.name}</span>
                <span className="node-role">{profile.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
