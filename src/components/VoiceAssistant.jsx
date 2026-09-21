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
    >
      {/* Mic / Speak Button */}
      <button 
        className={`voice-mic-btn ${isSpeaking ? 'voice-speaking-active' : ''}`}
        onClick={handleManualSpeak}
        title={voiceLanguage === 'ta' ? 'குரல் வழிகாட்டியை இயக்கவும்' : 'Speak Voice Greeting'}
        aria-label="Voice Assistant"
      >
        <Mic className="voice-mic-icon" size={13} />
      </button>

      {/* Audio Wave Visualizer Animation */}
      {isSpeaking && (
        <div className="audio-wave-container">
          <div className="audio-bar bar-1"></div>
          <div className="audio-bar bar-2"></div>
          <div className="audio-bar bar-3"></div>
          <div className="audio-bar bar-4"></div>
        </div>
      )}

      {/* Language Switcher */}
      <div className="voice-lang-wrapper">
        <button
          className={`voice-lang-btn ${voiceLanguage === 'ta' ? 'voice-lang-active' : ''}`}
          onClick={() => setVoiceLanguage && setVoiceLanguage('ta')}
        >
          <span className="desktop-only-item">🇮🇳 </span>தமிழ்
        </button>
        <button
          className={`voice-lang-btn ${voiceLanguage === 'en' ? 'voice-lang-active' : ''}`}
          onClick={() => setVoiceLanguage && setVoiceLanguage('en')}
        >
          ENG
        </button>
      </div>

      {/* Mute Toggle */}
      <button
        className="voice-vol-btn"
        onClick={() => {
          if (voiceEnabled) {
            window.speechSynthesis && window.speechSynthesis.cancel();
          }
          if (setVoiceEnabled) setVoiceEnabled(!voiceEnabled);
        }}
        title={voiceEnabled ? 'Mute AI Voice' : 'Unmute AI Voice'}
        aria-label="Toggle Voice Mute"
      >
        {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
      </button>
    </div>
  );
}

export default VoiceAssistant;
