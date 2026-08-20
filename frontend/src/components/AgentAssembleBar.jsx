import React from 'react';
import { AGENT_PROFILES } from '../utils/speech';
import { AgentIcon, ZapIcon } from './Icons';

export default function AgentAssembleBar({ activeAgent, isAssembling, onTriggerAssemble, onSelectAgent }) {
  const agentKeys = ['jarvis', 'sentinel', 'hermes', 'scout', 'scribe', 'cipher', 'chronos'];

  return (
    <div className={`assemble-container ${isAssembling ? 'assembling-mode' : ''}`}>
      {/* Heroic Convergence Banner during Assemble Protocol */}
      {isAssembling && (
        <div className="assemble-convergence-banner">
          <div className="banner-glow"></div>
          <div className="banner-text">
            <span className="banner-pulse"></span>
            <strong>TASKFORCE ASSEMBLE PROTOCOL ACTIVATED</strong>
            <span className="banner-sub">— All specialized agents connecting</span>
          </div>
        </div>
      )}

      <div className="assemble-top-bar">
        <div className="assemble-brand">
          <span className="assemble-badge">TASKFORCE</span>
          <span className="assemble-sub">AI Agent Constellation</span>
        </div>

        <button 
          className={`assemble-btn ${isAssembling ? 'assembling' : ''}`}
          onClick={onTriggerAssemble}
          disabled={isAssembling}
          title="Trigger Synchronous Multi-Agent Voice Briefing"
        >
          <ZapIcon size={14} className="assemble-btn-icon" />
          <span>{isAssembling ? 'Briefing Active...' : 'Assemble Protocol'}</span>
        </button>
      </div>

      <div className="assemble-roster">
        {agentKeys.map((key, index) => {
          const profile = AGENT_PROFILES[key];
          const isActive = activeAgent === key;

          return (
            <button
              key={key} 
              type="button"
              className={`agent-node ${isActive ? 'active-speaking' : ''} ${isAssembling ? 'assembling-node' : ''}`}
              style={{ '--agent-color': profile.color, '--node-delay': `${index * 0.1}s` }}
              onClick={() => onSelectAgent(key)}
              title={`${profile.name} — ${profile.title} (Click for status)`}
            >
              <div className="node-avatar-wrapper">
                <div className="node-ring"></div>
                <div className="node-avatar">
                  <AgentIcon agentKey={key} size={16} />
                </div>
                {isActive && (
                  <div className="audio-wave-container">
                    <span className="wave-bar"></span>
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
