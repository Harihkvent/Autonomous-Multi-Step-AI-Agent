// Multi-Agent Voice Synthesis Engine (100% Free HTML5 Web Speech API)

export const AGENT_PROFILES = {
  jarvis: {
    name: 'JARVIS',
    title: 'Supreme Orchestrator',
    color: '#00f3ff',
    pitch: 0.95,
    rate: 0.95,
    icon: '🛡️',
    gender: 'male',
    accentKeywords: ['uk', 'great britain', 'george', 'christopher', 'david', 'male']
  },
  sentinel: {
    name: 'SENTINEL',
    title: 'System Guardian',
    color: '#ff3366',
    pitch: 0.82,
    rate: 0.90,
    icon: '👁️',
    gender: 'male',
    accentKeywords: ['mark', 'ryan', 'steffan', 'male']
  },
  hermes: {
    name: 'HERMES',
    title: 'Communications Courier',
    color: '#ffaa00',
    pitch: 1.05,
    rate: 1.05,
    icon: '📬',
    gender: 'female',
    accentKeywords: ['sonia', 'jenny', 'aria', 'zira', 'female', 'natural']
  },
  scout: {
    name: 'SCOUT',
    title: 'Web Recon',
    color: '#00ffaa',
    pitch: 1.12,
    rate: 1.10,
    icon: '🔭',
    gender: 'male',
    accentKeywords: ['guy', 'eric', 'australia', 'au', 'male']
  },
  scribe: {
    name: 'SCRIBE',
    title: 'Archivist',
    color: '#9d00ff',
    pitch: 0.98,
    rate: 0.95,
    icon: '📜',
    gender: 'female',
    accentKeywords: ['libby', 'hazel', 'susan', 'female', 'uk']
  },
  cipher: {
    name: 'CIPHER',
    title: 'Math Core',
    color: '#0066ff',
    pitch: 0.88,
    rate: 1.15,
    icon: '🔢',
    gender: 'male',
    accentKeywords: ['roger', 'james', 'canada', 'male']
  },
  chronos: {
    name: 'CHRONOS',
    title: 'Temporal Coordinator',
    color: '#e6ff00',
    pitch: 1.02,
    rate: 1.0,
    icon: '⏳',
    gender: 'female',
    accentKeywords: ['catherine', 'clara', 'female', 'natural']
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
 * Intelligently pick distinct natural human voices for each agent persona.
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

  // 1. Try matching high quality Natural/Online keyword voices
  for (const kw of keywords) {
    const match = pool.find(v => v.name.toLowerCase().includes(kw));
    if (match) return match;
  }

  // 2. Try gender distribution fallback
  if (profile.gender === 'female') {
    const femaleVoice = pool.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('jenny'));
    if (femaleVoice) return femaleVoice;
  } else {
    const maleVoice = pool.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('mark'));
    if (maleVoice) return maleVoice;
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
