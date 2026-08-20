// Multi-Agent Voice Synthesis Engine (100% Free HTML5 Web Speech API)

export const AGENT_PROFILES = {
  jarvis: {
    name: 'JARVIS',
    title: 'Supreme Orchestrator',
    color: '#06b6d4', // Electric Cyan
    pitch: 0.72, // Deep, calm, resonant baritone
    rate: 0.90,  // Steady, authoritative pace
    iconKey: 'jarvis',
    gender: 'male',
    accentKeywords: ['uk english male', 'george', 'david', 'james', 'google uk english male', 'natural male', 'daniel', 'male']
  },
  sentinel: {
    name: 'SENTINEL',
    title: 'System Guardian',
    color: '#f43f5e', // Crimson Rose
    pitch: 0.65, // Deep bass tactical tone
    rate: 0.88,
    iconKey: 'sentinel',
    gender: 'male',
    accentKeywords: ['mark', 'ryan', 'steffan', 'guy', 'male']
  },
  hermes: {
    name: 'HERMES',
    title: 'Communications',
    color: '#f59e0b', // Vibrant Gold
    pitch: 1.05,
    rate: 1.02,
    iconKey: 'hermes',
    gender: 'female',
    accentKeywords: ['sonia', 'jenny', 'aria', 'zira', 'female', 'natural']
  },
  scout: {
    name: 'SCOUT',
    title: 'Web Recon',
    color: '#10b981', // Emerald Green
    pitch: 0.82, // Deep recon male tone
    rate: 1.0,
    iconKey: 'scout',
    gender: 'male',
    accentKeywords: ['guy', 'eric', 'australia', 'au', 'male']
  },
  scribe: {
    name: 'SCRIBE',
    title: 'Master Archivist',
    color: '#a855f7', // Neon Purple
    pitch: 0.98,
    rate: 0.95,
    iconKey: 'scribe',
    gender: 'female',
    accentKeywords: ['libby', 'hazel', 'susan', 'female', 'uk']
  },
  cipher: {
    name: 'CIPHER',
    title: 'Math & Logic Core',
    color: '#3b82f6', // Sapphire Blue
    pitch: 0.75, // Deep logic engine tone
    rate: 1.05,
    iconKey: 'cipher',
    gender: 'male',
    accentKeywords: ['roger', 'james', 'canada', 'male']
  },
  chronos: {
    name: 'CHRONOS',
    title: 'Temporal Planner',
    color: '#ec4899', // Hot Pink
    pitch: 1.02,
    rate: 1.0,
    iconKey: 'chronos',
    gender: 'female',
    accentKeywords: ['catherine', 'clara', 'female', 'natural']
  },
  titan: {
    name: 'TITAN',
    title: 'OS & System Automation',
    color: '#f97316', // Vibrant Neon Orange
    pitch: 0.70, // Deep male OS control tone
    rate: 0.92,
    iconKey: 'titan',
    gender: 'male',
    accentKeywords: ['mark', 'david', 'james', 'george', 'male']
  }
};

let cachedVoices = [];

// Initialize and index available browser voices
function initVoices() {
  if (!('speechSynthesis' in window)) return;
  
  cachedVoices = window.speechSynthesis.getVoices();
  
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  }
}

initVoices();

/**
 * Intelligently pick distinct natural human voices for each agent persona,
 * prioritizing deep male baritone voices for JARVIS and male agent personas.
 */
function getBestVoiceForAgent(agentKey) {
  if (!cachedVoices || cachedVoices.length === 0) {
    if ('speechSynthesis' in window) cachedVoices = window.speechSynthesis.getVoices();
  }

  if (!cachedVoices || cachedVoices.length === 0) return null;

  const englishVoices = cachedVoices.filter(v => v.lang && v.lang.startsWith('en'));
  const pool = englishVoices.length > 0 ? englishVoices : cachedVoices;

  const profile = AGENT_PROFILES[agentKey] || AGENT_PROFILES.jarvis;
  const keywords = profile.accentKeywords || [];

  // 1. Try matching specific deep male keyword voices (e.g. "UK English Male", "David", "George")
  for (const kw of keywords) {
    const match = pool.find(v => v.name.toLowerCase().includes(kw));
    if (match) return match;
  }

  // 2. Try gender distribution fallback for deep male voices
  if (profile.gender === 'male') {
    const deepMaleVoice = pool.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('male') || name.includes('david') || name.includes('george') || name.includes('james') || name.includes('daniel') || name.includes('guy');
    });
    if (deepMaleVoice) return deepMaleVoice;
  } else {
    const femaleVoice = pool.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('female') || name.includes('zira') || name.includes('jenny') || name.includes('aria') || name.includes('sonia');
    });
    if (femaleVoice) return femaleVoice;
  }

  // 3. Fallback: distribute different index voices across the roster
  const keys = Object.keys(AGENT_PROFILES);
  const agentIndex = keys.indexOf(agentKey);
  if (agentIndex >= 0 && pool.length > 0) {
    return pool[agentIndex % pool.length];
  }

  return pool[0];
}

/**
 * Synthesize speech for a single agent with a distinct human-like voice.
 */
export function speakAgent(text, agentKey = 'jarvis', onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (onStart) onStart();
    setTimeout(() => { if (onEnd) onEnd(); }, 2000);
    return;
  }

  window.speechSynthesis.cancel(); // Clear any queued speech

  const profile = AGENT_PROFILES[agentKey] || AGENT_PROFILES.jarvis;
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set pitch & rate for deep baritone effect
  utterance.pitch = profile.pitch;
  utterance.rate = profile.rate;

  const selectedVoice = getBestVoiceForAgent(agentKey);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => { if (onEnd) onEnd(); };

  window.speechSynthesis.speak(utterance);
}

/**
 * Sequential Briefing Player: Steps through each agent's report one by one.
 */
export function playAssembleSequence(briefingItems, onAgentActive, onComplete) {
  if (!briefingItems || briefingItems.length === 0) {
    if (onComplete) onComplete();
    return;
  }

  let index = 0;

  function next() {
    if (index >= briefingItems.length) {
      if (onAgentActive) onAgentActive(null);
      if (onComplete) onComplete();
      return;
    }

    const item = briefingItems[index];
    index++;

    if (onAgentActive) onAgentActive(item.agent);

    speakAgent(
      item.text,
      item.agent,
      null,
      () => {
        // Natural pause between agent hand-offs
        setTimeout(next, 500);
      }
    );
  }

  next();
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
