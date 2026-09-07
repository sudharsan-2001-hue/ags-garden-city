import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Globe, Sparkles } from 'lucide-react';
import { speakMessage, PAGE_VOICE_SCRIPTS } from '../utils/voiceUtils';

function VoiceAssistant({ activePage, voiceLanguage = 'ta', setVoiceLanguage, voiceEnabled = true, setVoiceEnabled }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Play voice when activePage changes if voice is enabled
  useEffect(() => {
    if (!voiceEnabled) return;

    const scriptObj = PAGE_VOICE_SCRIPTS[activePage] || PAGE_VOICE_SCRIPTS.home;
    const textToSpeak = scriptObj ? (scriptObj[voiceLanguage] || scriptObj.en) : '';

    if (textToSpeak) {
      setIsSpeaking(true);
      speakMessage(textToSpeak, voiceLanguage);

      const timer = setTimeout(() => {
        setIsSpeaking(false);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [activePage, voiceLanguage, voiceEnabled]);

  const handleManualSpeak = () => {
    const scriptObj = PAGE_VOICE_SCRIPTS[activePage] || PAGE_VOICE_SCRIPTS.home;
    const textToSpeak = scriptObj ? (scriptObj[voiceLanguage] || scriptObj.en) : '';
    if (textToSpeak) {
      setIsSpeaking(true);
      speakMessage(textToSpeak, voiceLanguage);
      setTimeout(() => setIsSpeaking(false), 4500);
    }
  };

  return (
    <div 
      className="voice-assistant-bar glass-panel" 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '5px', 
        padding: '3px 8px', 
        borderRadius: '20px',
        flexShrink: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Mic / Speak Button */}
      <button 
        className={`voice-mic-btn ${isSpeaking ? 'voice-speaking-active' : ''}`}
        onClick={handleManualSpeak}
        title={voiceLanguage === 'ta' ? 'குரல் வழிகாட்டியை இயக்கவும்' : 'Speak Voice Greeting'}
        style={{
          background: isSpeaking ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isSpeaking ? '0 0 12px rgba(236, 72, 153, 0.6)' : 'none',
          transition: 'all 0.2s ease',
          padding: 0
        }}
      >
        <Mic size={13} />
      </button>

      {/* Audio Wave Visualizer Animation */}
      {isSpeaking && (
        <div className="audio-wave-container" style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
          <div className="audio-bar bar-1"></div>
          <div className="audio-bar bar-2"></div>
          <div className="audio-bar bar-3"></div>
          <div className="audio-bar bar-4"></div>
        </div>
      )}

      {/* Language Switcher */}
      <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.4)', padding: '2px', borderRadius: '16px' }}>
        <button
          className="voice-lang-btn"
          onClick={() => setVoiceLanguage && setVoiceLanguage('ta')}
          style={{
            background: voiceLanguage === 'ta' ? 'var(--gradient-primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1.2
          }}
        >
          <span className="desktop-only-item">🇮🇳 </span>தமிழ்
        </button>
        <button
          className="voice-lang-btn"
          onClick={() => setVoiceLanguage && setVoiceLanguage('en')}
          style={{
            background: voiceLanguage === 'en' ? 'var(--gradient-primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1.2
          }}
        >
          ENG
        </button>
      </div>

      {/* Mute Toggle */}
      <button
        onClick={() => {
          if (voiceEnabled) {
            window.speechSynthesis && window.speechSynthesis.cancel();
          }
          if (setVoiceEnabled) setVoiceEnabled(!voiceEnabled);
        }}
        title={voiceEnabled ? 'Mute AI Voice' : 'Unmute AI Voice'}
        style={{
          background: 'none',
          border: 'none',
          color: voiceEnabled ? '#10b981' : 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '2px'
        }}
      >
        {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </button>
    </div>
  );
}

export default VoiceAssistant;
