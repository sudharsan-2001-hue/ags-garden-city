import React, { useState } from 'react';
import { speakMessage } from '../utils/voiceUtils';
import { Volume2, Sparkles, X, MessageSquare, Compass, RotateCw } from 'lucide-react';

function PulseRingBeacon({ voiceLanguage = 'ta', onNavigate }) {
  const [isRinging, setIsRinging] = useState(false);
  const [isTouchSpinning, setIsTouchSpinning] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const handleBeaconTouchOrClick = () => {
    // Trigger ultra fast turbo spin
    setIsTouchSpinning(true);
    setIsRinging(true);
    
    // Play synthesizer chime audio using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio API not allowed before interaction');
    }

    // Speak greeting
    const text = voiceLanguage === 'ta'
      ? 'வணக்கம் சார்! ஏஜிஎஸ் கார்டன் AI உதவி மையம் தயார் நிலையில் உள்ளது. உங்களுக்கு என்ன உதவி வேண்டும் சார்?'
      : 'Welcome Sir! AGS Garden AI Pulse Assistant is ready. How may we assist your property search, Sir?';
    
    speakMessage(text, voiceLanguage);

    setShowQuickMenu(!showQuickMenu);

    // Keep turbo spin active for 2.5 seconds
    setTimeout(() => {
      setIsTouchSpinning(false);
      setIsRinging(false);
    }, 2500);
  };

  return (
    <div className="pulse-ring-beacon-container no-print" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 940, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
      
      {/* Quick Menu Popup */}
      {showQuickMenu && (
        <div 
          className="glass-panel no-print" 
          style={{
            padding: '16px 20px',
            borderRadius: '20px',
            background: 'rgba(15, 17, 32, 0.95)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6), 0 0 25px rgba(168, 85, 247, 0.3)',
            maxWidth: '280px',
            textAlign: 'left',
            animation: 'fadeIn 0.3s ease-out',
            marginBottom: '6px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em' }}>
              AGS GARDEN AI BEACON
            </span>
            <button 
              onClick={() => setShowQuickMenu(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#fff', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.4 }}>
            {voiceLanguage === 'ta' 
              ? '🙏 வணக்கம் சார்! உங்கள் கனவு இல்லத்தை கண்டறிய ஏதேனும் ஒரு விருப்பத்தை தேர்வு செய்யவும்:' 
              : '🙏 Welcome Sir! Choose an option below to assist your luxury property discovery:'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className="glass-btn" 
              style={{ padding: '8px 12px', fontSize: '12px', justifyContent: 'flex-start', background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' }}
              onClick={() => {
                setShowQuickMenu(false);
                if (onNavigate) onNavigate('trending');
              }}
            >
              <span>🔥</span> {voiceLanguage === 'ta' ? 'டிரெண்டிங் வீடுகள்' : 'Trending Hot Deals'}
            </button>

            <button 
              className="glass-btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '12px', justifyContent: 'flex-start' }}
              onClick={() => {
                setShowQuickMenu(false);
                if (onNavigate) onNavigate('properties');
              }}
            >
              <Compass size={14} /> {voiceLanguage === 'ta' ? 'அனைத்து வீடுகள்' : 'Explore Properties'}
            </button>

            <button 
              className="glass-btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '12px', justifyContent: 'flex-start' }}
              onClick={() => {
                setShowQuickMenu(false);
                if (onNavigate) onNavigate('trends');
              }}
            >
              <Sparkles size={14} /> {voiceLanguage === 'ta' ? 'விலை உயர்வு விவரங்கள்' : 'Price Trends & ROI'}
            </button>

            <button 
              className="glass-btn-secondary" 
              style={{ padding: '8px 12px', fontSize: '12px', justifyContent: 'flex-start' }}
              onClick={() => {
                setShowQuickMenu(false);
                if (onNavigate) onNavigate('ai-finder');
              }}
            >
              <MessageSquare size={14} /> {voiceLanguage === 'ta' ? 'AI மேட்சர்' : 'AI Property Matcher'}
            </button>
          </div>
        </div>
      )}

      {/* Main Animated Pulse Ring Button with Touch / Click Fast Spin */}
      <div 
        className={`pulse-ring-beacon-wrapper ${isRinging ? 'ringing-active' : ''} ${isTouchSpinning ? 'touch-spinning' : ''}`}
        onClick={handleBeaconTouchOrClick}
        onTouchStart={handleBeaconTouchOrClick}
        title="Touch / Click to spin fast & speak greeting!"
        style={{ position: 'relative', width: '72px', height: '72px', cursor: 'pointer' }}
      >
        {/* Outward Ringing Radar Shockwaves */}
        <div className="radar-wave wave-1"></div>
        <div className="radar-wave wave-2"></div>
        <div className="radar-wave wave-3"></div>

        {/* Concentric SVG Graphic matching user uploaded image */}
        <svg 
          viewBox="0 0 100 100" 
          className="pulse-beacon-svg"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 0 14px rgba(168, 85, 247, 0.6))',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Outer Ring (Purple / Magenta) */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="#a855f7" 
            className="beacon-outer-circle"
          />

          {/* Middle Ring (Sky Blue / Cyan) */}
          <circle 
            cx="50" 
            cy="50" 
            r="28" 
            fill="#38bdf8" 
            className="beacon-middle-circle"
          />

          {/* Center Continuous & Touch Fast-Spinning Triangle Layer */}
          <g className={`beacon-continuous-spin-layer ${isTouchSpinning ? 'turbo-active' : ''}`}>
            <polygon 
              points="50,32 64,58 36,58" 
              fill="#ffffff" 
              className="beacon-center-triangle"
            />
          </g>
        </svg>

        {/* Live Audio Glow Badge */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            background: '#10b981',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            border: '2px solid #0f1120',
            boxShadow: '0 0 8px #10b981'
          }}
        >
          <Volume2 size={10} />
        </div>
      </div>

    </div>
  );
}

export default PulseRingBeacon;
