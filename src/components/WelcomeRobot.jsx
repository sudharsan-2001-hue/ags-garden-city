import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Heart, X, Volume2, CheckCircle2, Award, ArrowRight, RotateCcw, Globe } from 'lucide-react';
import { speakMessage } from './VoiceAssistant';

function WelcomeRobot({ voiceLanguage = 'ta', setVoiceLanguage, onAcceptGift }) {
  const [stage, setStage] = useState('walking'); // 'walking' -> 'bowing' -> 'offering' -> 'gift_opened' -> 'minimized'
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [currentLang, setCurrentLang] = useState(voiceLanguage || 'ta');

  const speakCurrentGreeting = (lang) => {
    const greetingText = lang === 'ta'
      ? 'வணக்கம் சார்! உங்களை ஏஜிஎஸ் கார்டனுக்கு அன்புடன் வரவேற்கிறோம் சார்! தங்களுக்கான சிறப்பு வரவேற்பு மலர் மற்றும் விஐபி பரிசு கூப்பன் இதோ சார்!'
      : "You are welcome Sir! Welcome to AGS Garden, Sir! We warmly welcome you to AGS Garden Sir! Please accept this respect flower and VIP gift voucher, Sir!";
    speakMessage(greetingText, lang);
  };

  useEffect(() => {
    // Stage 1: Robot walks in for 1.6s
    const walkTimer = setTimeout(() => {
      setStage('bowing');
      speakCurrentGreeting(currentLang);
    }, 1600);

    // Stage 2: Robot finishes bow and offers flower & gift after 3.6s
    const offerTimer = setTimeout(() => {
      setStage('offering');
    }, 3600);

    return () => {
      clearTimeout(walkTimer);
      clearTimeout(offerTimer);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    if (setVoiceLanguage) setVoiceLanguage(lang);
    speakCurrentGreeting(lang);
  };

  const handleClaimGift = () => {
    setGiftClaimed(true);
    setStage('gift_opened');
    if (onAcceptGift) onAcceptGift();

    const claimText = currentLang === 'ta'
      ? 'வாழ்த்துகள் சார்! உங்கள் ஏஜிஎஸ் கார்டன் ஐம்பதாயிரம் ரூபாய் விஐபி தள்ளுபடி கூப்பன் வெற்றிகரமாக செயல்படுத்தப்பட்டது!'
      : "Congratulations Sir! Your AGS Garden fifty thousand rupees VIP luxury discount voucher is now active!";
    
    speakMessage(claimText, currentLang);
  };

  const handleReplay = () => {
    setMinimized(false);
    setStage('walking');
    setGiftClaimed(false);
    setTimeout(() => {
      setStage('bowing');
      speakCurrentGreeting(currentLang);
    }, 1600);
    setTimeout(() => {
      setStage('offering');
    }, 3600);
  };

  if (minimized) {
    return (
      <div 
        className="floating-robo-pill glass-panel"
        onClick={handleReplay}
        title="Replay AI Robot Welcome Ceremony"
        style={{
          position: 'fixed',
          bottom: '85px',
          right: '24px',
          zIndex: 950,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '30px',
          background: 'rgba(15, 17, 32, 0.92)',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          animation: 'pulse-glow 2s infinite ease-in-out'
        }}
      >
        <span style={{ fontSize: '20px' }}>🤖🌸</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#c084fc' }}>
          {currentLang === 'ta' ? 'AGS கார்டன் ரோபோ வரவேற்பு' : "You're Welcome Sir (AGS Garden)"}
        </span>
      </div>
    );
  }

  return (
    <div className="robot-welcome-overlay">
      <div className="robot-welcome-modal glass-panel">
        {/* Close / Minimize Button */}
        <button 
          className="modal-close-btn"
          onClick={() => setMinimized(true)}
          title="Minimize Robot"
          style={{ top: '16px', right: '16px' }}
        >
          <X size={18} />
        </button>

        {/* Header & Language Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="hero-pill-badge" style={{ margin: 0, fontSize: '11px', padding: '4px 12px' }}>
            <Sparkles size={13} /> AGS GARDEN AI ROBOTIC AMBASSADOR
          </span>

          {/* Explicit Language Controls */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <button
              onClick={() => handleLanguageChange('ta')}
              style={{
                background: currentLang === 'ta' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Volume2 size={12} /> 🇮🇳 வரவேற்கிறோம் சார் (தமிழ்)
            </button>

            <button
              onClick={() => handleLanguageChange('en')}
              style={{
                background: currentLang === 'en' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Volume2 size={12} /> 🇬🇧 You're Welcome Sir (English)
            </button>
          </div>
        </div>

        {/* Robot & Animation Stage */}
        <div className="robot-stage-container">
          
          {/* Holographic Speech Bubble */}
          <div className={`robo-speech-bubble glass-panel ${stage !== 'walking' ? 'bubble-visible' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', color: '#c084fc', fontSize: '11px', fontWeight: 800 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={13} />
                <span>AGS GARDEN AI HOST</span>
              </div>
              <span style={{ fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '6px' }}>
                {currentLang === 'ta' ? 'தமிழ் ஆடியோ' : 'English Audio'}
              </span>
            </div>

            {stage === 'bowing' && (
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
                {currentLang === 'ta' ? (
                  <>🙏 <strong>வணக்கம் சார்!</strong> உங்களை <strong>ஏஜிஎஸ் கார்டனுக்கு (AGS GARDEN) அன்புடன் வரவேற்கிறோம் சார்!</strong></>
                ) : (
                  <>🙏 <strong>You're Welcome Sir!</strong> Welcome to <strong>AGS Garden, Sir!</strong></>
                )}
              </p>
            )}

            {(stage === 'offering' || stage === 'walking') && (
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
                {currentLang === 'ta' ? (
                  <>🌸 தங்களுக்கான சிறப்பு <strong>வரவேற்பு மலர்</strong> மற்றும் <strong>AGS GARDEN VIP பரிசு கூப்பன்</strong> இதோ சார்! பெற்றுக்கொள்ளவும்.</>
                ) : (
                  <>🌸 Please accept this <strong>Respect Welcome Flower</strong> and exclusive <strong>AGS GARDEN VIP Gift Voucher</strong>, Sir!</>
                )}
              </p>
            )}

            {stage === 'gift_opened' && (
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', lineHeight: 1.4 }}>
                🎉 {currentLang === 'ta' 
                  ? 'பரிசு ஏற்கப்பட்டது சார்! ₹50,000 முன்பதிவு தள்ளுபடி மற்றும் இலவச VIP Cab பார்வை பாஸ் செயல்படுத்தப்பட்டது!' 
                  : 'Gift Activated Sir! ₹50,000 token discount code and free VIP site cab pass granted!'}
              </p>
            )}
          </div>

          {/* SVG Animated Humanoid AI Robot Character */}
          <div className={`ai-robot-character ${stage}`}>
            <svg 
              viewBox="0 0 240 320" 
              className="robot-svg"
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 10px 25px rgba(168, 85, 247, 0.4))' }}
            >
              {/* Glow filter definition */}
              <defs>
                <linearGradient id="cyberBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="50%" stopColor="#312e81" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="cyberNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>

                <linearGradient id="goldFlower" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Shadow Base */}
              <ellipse cx="120" cy="305" rx="65" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(4px)" className="robo-shadow" />

              {/* Robot Legs (Animated Walking) */}
              <g className="robo-legs">
                <rect x="92" y="225" width="18" height="65" rx="9" fill="url(#cyberBody)" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" className="robo-left-leg" />
                <ellipse cx="101" cy="295" rx="14" ry="6" fill="#38bdf8" />
                <rect x="130" y="225" width="18" height="65" rx="9" fill="url(#cyberBody)" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" className="robo-right-leg" />
                <ellipse cx="139" cy="295" rx="14" ry="6" fill="#38bdf8" />
              </g>

              {/* Robot Torso with Cyber Reactor Core (Continuously Spinning & Touch Fast-Spin) */}
              <g className="robo-torso">
                <rect x="75" y="125" width="90" height="105" rx="20" fill="url(#cyberBody)" stroke="url(#cyberNeon)" strokeWidth="3" />
                <rect x="85" y="135" width="70" height="46" rx="12" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" />
                
                {/* Concentric Spinning Core System (Touch / Click Fast Spin) */}
                <g 
                  className="robot-reactor-spinning-group" 
                  transform="translate(120, 158)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const text = currentLang === 'ta'
                      ? 'வணக்கம் சார்! ஏஜிஎஸ் கார்டன் AI ரோபோ உங்களை அன்புடன் வரவேற்கிறது!'
                      : "Welcome Sir! AGS Garden AI Robot is happy to guide your luxury dream home search!";
                    speakMessage(text, currentLang);
                  }}
                >
                  {/* Outer Purple Ring */}
                  <circle cx="0" cy="0" r="17" fill="#a855f7" className="reactor-outer-spin" />
                  
                  {/* Middle Cyan Ring */}
                  <circle cx="0" cy="0" r="10" fill="#38bdf8" className="reactor-middle-spin" />
                  
                  {/* Center Spinning White Triangle (Continuously Rotating & Touch Turbo-Spin) */}
                  <g className="reactor-triangle-continuous-spin">
                    <polygon points="0,-7 6,4 -6,4" fill="#ffffff" />
                  </g>
                </g>

                {/* Waist connector */}
                <rect x="88" y="210" width="64" height="15" rx="6" fill="#1e1b4b" stroke="rgba(255,255,255,0.2)" />
              </g>

              {/* Respect Bowing Head Group */}
              <g className="robo-head-group">
                <rect x="110" y="105" width="20" height="22" rx="4" fill="#312e81" stroke="#a855f7" />
                <rect x="75" y="45" width="90" height="68" rx="24" fill="url(#cyberBody)" stroke="url(#cyberNeon)" strokeWidth="3" />
                <rect x="63" y="60" width="12" height="38" rx="6" fill="#a855f7" />
                <circle cx="69" cy="55" r="4" fill="#38bdf8" />
                <rect x="165" y="60" width="12" height="38" rx="6" fill="#a855f7" />
                <circle cx="171" cy="55" r="4" fill="#38bdf8" />
                <rect x="85" y="58" width="70" height="38" rx="12" fill="#090a13" stroke="#38bdf8" strokeWidth="2" />
                <g className="robo-eyes">
                  <circle cx="104" cy="76" r="6" fill="#38bdf8" />
                  <circle cx="104" cy="74" r="2" fill="#fff" />
                  <circle cx="136" cy="76" r="6" fill="#38bdf8" />
                  <circle cx="136" cy="74" r="2" fill="#fff" />
                  <path d="M 112 84 Q 120 90 128 84" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
              </g>

              {/* Robotic Arms Offering Flower & Gift */}
              <g className="robo-arms-group">
                <g className="robo-left-arm">
                  <rect x="45" y="130" width="30" height="16" rx="8" fill="#312e81" stroke="#a855f7" />
                  <rect x="35" y="140" width="18" height="55" rx="8" fill="url(#cyberBody)" stroke="#38bdf8" />
                  <circle cx="44" cy="200" r="10" fill="#a855f7" />
                </g>

                <g className="robo-right-arm">
                  <rect x="165" y="130" width="30" height="16" rx="8" fill="#312e81" stroke="#a855f7" />
                  <rect x="187" y="140" width="18" height="55" rx="8" fill="url(#cyberBody)" stroke="#38bdf8" />
                  <circle cx="196" cy="200" r="10" fill="#a855f7" />
                </g>

                {/* Respect Welcome Flower 🌸 */}
                <g className="robo-flower" transform="translate(30, 185)">
                  <path d="M 18 20 Q 22 5 28 -15" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <ellipse cx="20" cy="5" rx="8" ry="4" fill="#10b981" transform="rotate(-30 20 5)" />
                  <circle cx="30" cy="-20" r="16" fill="url(#goldFlower)" className="flower-glow" />
                  <circle cx="24" cy="-24" r="10" fill="#f43f5e" opacity="0.85" />
                  <circle cx="36" cy="-24" r="10" fill="#f43f5e" opacity="0.85" />
                  <circle cx="30" cy="-14" r="10" fill="#ec4899" opacity="0.9" />
                  <circle cx="30" cy="-20" r="6" fill="#fef08a" />
                </g>

                {/* VIP Gift Box 🎁 */}
                <g className="robo-gift-box" transform="translate(165, 175)">
                  <rect x="0" y="0" width="46" height="42" rx="8" fill="linear-gradient(135deg, #ec4899 0%, #a855f7 100%)" stroke="#fff" strokeWidth="1.5" className="gift-box-glow" />
                  <rect x="20" y="0" width="7" height="42" fill="#fde047" />
                  <rect x="0" y="18" width="46" height="7" fill="#fde047" />
                  <ellipse cx="23" cy="-2" rx="8" ry="6" fill="#fde047" />
                  <circle cx="23" cy="-2" r="3" fill="#ef4444" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Gift Card & Claim Action */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          {!giftClaimed ? (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '20px' }}>🌸</span>
                    <strong style={{ fontSize: '15px', color: '#fff' }}>
                      {currentLang === 'ta' ? 'வரவேற்பு மலர் & VIP பரிசு கூப்பன்' : 'Welcome Flower & VIP Token Pass'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {currentLang === 'ta' 
                      ? '₹50,000 உடனடி முன்பதிவு தள்ளுபடி + இலவச VIP சொத்து பார்வை கேப் பாஸ்' 
                      : 'Flat ₹50,000 Instant Token Discount + Free VIP Chauffeur Cab Site Visit Pass'}
                  </p>
                </div>

                <button 
                  className="glass-btn"
                  onClick={handleClaimGift}
                  style={{ padding: '10px 22px', fontSize: '14px' }}
                >
                  <Gift size={16} /> 
                  <span>{currentLang === 'ta' ? 'பரிசை பெற்றுக்கொள் 🎁' : 'Accept Welcome Gift 🎁'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', fontWeight: 800, fontSize: '16px' }}>
                <CheckCircle2 size={20} />
                <span>VIP VOUCHER UNLOCKED: <strong>LUXURY50K</strong></span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {currentLang === 'ta' 
                  ? 'இந்த கூப்பன் உங்கள் அனைத்து சொத்து முன்பதிவுகளிலும் தானாக பயன்படுத்தப்படும்!' 
                  : 'Coupon applied to all property reservations automatically with free cab inspection!'}
              </p>
              
              <button 
                className="glass-btn" 
                style={{ marginTop: '12px', padding: '8px 20px', fontSize: '13px' }}
                onClick={() => setMinimized(true)}
              >
                Start Exploring Properties <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Bottom Action bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            <button 
              onClick={handleReplay}
              style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={13} /> {currentLang === 'ta' ? 'மீண்டும் வணங்கு' : 'Replay Bow & Greeting'}
            </button>
            
            <button 
              onClick={() => setMinimized(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}
            >
              {currentLang === 'ta' ? 'தளத்திற்கு செல் →' : 'Continue to Website →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WelcomeRobot;
