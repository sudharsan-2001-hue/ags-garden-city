import React, { useState, useEffect } from 'react';
import VoiceAssistant from './VoiceAssistant';
import agsLogo from '../assets/ags_logo.jpg';
import { 
  Building2, 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  Home, 
  Search, 
  User, 
  Menu, 
  X, 
  Compass, 
  ShieldAlert, 
  Flame, 
  LogOut, 
  ChevronDown, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Phone, 
  PhoneCall, 
  Mail, 
  MessageSquare,
  Bell,
  Heart
} from 'lucide-react';

function Navbar({ 
  activePage = 'home', 
  setActivePage, 
  onBack, 
  onOpenAuthModal, 
  currentUser, 
  onLogoutCustomer, 
  isAdminLoggedIn, 
  onLogoutAdmin, 
  voiceLanguage, 
  setVoiceLanguage, 
  voiceEnabled, 
  setVoiceEnabled 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exact 9-Step Sequence Requested by User Screenshot (Concise labels for perfect container fit)
  const navItems = [
    { id: 'home', label: '1. Home', icon: Home },
    { id: 'properties', label: '2. Properties', icon: Compass },
    { id: 'ai-finder', label: '3. AI Match', icon: Sparkles, badge: 'AI' },
    { id: 'price-drop', label: '4. Price Drop', icon: Bell, badge: 'HOT' },
    { id: 'trends', label: '5. Trends', icon: TrendingUp },
    { id: 'saved', label: '6. Saved', icon: Heart },
    { id: 'verified', label: '7. Verified', icon: CheckCircle2, badge: 'RERA' },
    { id: 'auth', label: '8. Login', icon: Lock },
    { id: 'property-detail', label: '9. Details', icon: Building2 }
  ];

  const handleNavClick = (pageId) => {
    if (pageId === 'auth') {
      if (onOpenAuthModal) onOpenAuthModal('customer');
    } else {
      setActivePage(pageId);
    }
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      if (activePage === 'property-detail') {
        setActivePage('properties');
      } else if (activePage === 'checkout') {
        setActivePage('property-detail');
      } else if (activePage === 'verified') {
        setActivePage('saved');
      } else if (activePage === 'saved') {
        setActivePage('trends');
      } else if (activePage === 'trends') {
        setActivePage('price-drop');
      } else if (activePage === 'price-drop') {
        setActivePage('ai-finder');
      } else if (activePage === 'ai-finder') {
        setActivePage('properties');
      } else if (activePage === 'properties') {
        setActivePage('home');
      } else if (activePage === 'home') {
        if (onLogoutCustomer) onLogoutCustomer();
      } else {
        setActivePage('home');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
        
        {/* 24/7 Direct Contact Top Strip */}
        <div 
          className="navbar-top-contact-strip"
          style={{
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.25) 0%, rgba(56, 189, 248, 0.25) 50%, rgba(168, 85, 247, 0.25) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '5px 14px',
            fontSize: '11px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            color: '#fff',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span className="desktop-only-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 800, color: '#10b981' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              24/7 HOTLINE:
            </span>

            <a 
              href="tel:7397135792" 
              style={{ color: '#fff', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.25)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.45)' }}
              title="Click to Call 24/7 Hotline"
            >
              <Phone size={12} color="#10b981" /> +91 73971 35792
            </a>

            <a 
              href="mailto:AGSGARDENCITY@gmail.com" 
              className="desktop-only-item"
              style={{ color: '#c084fc', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Click to Email AGS Garden City"
            >
              <Mail size={12} /> AGSGARDENCITY@gmail.com
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a 
              href="https://wa.me/917397135792?text=Hello%20AGS%20Garden%20City,%20I%20want%20to%20enquire%20about%20properties" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}
            >
              <MessageSquare size={11} /> WhatsApp
            </a>

            <button 
              type="button" 
              className="desktop-only-item"
              onClick={() => handleNavClick('enquiry')}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                color: '#fff',
                padding: '2px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              📝 Enquire Now
            </button>

            <button 
              type="button" 
              className="desktop-only-item"
              onClick={() => handleNavClick('contact')}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
                border: 'none',
                color: '#fff',
                padding: '2px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              24/7 Desk →
            </button>

            <button 
              type="button" 
              onClick={() => handleNavClick('admin')}
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 100%)',
                border: 'none',
                color: '#fff',
                padding: '2px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Admin Portal
            </button>
          </div>
        </div>

        <div className="navbar-container glass-panel">
          
          {/* Left Section: Back Button + Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Universal Top Corner Back Button with Arrow Symbol (shown when navigated away from home) */}
            {activePage !== 'home' && (
              <button 
                className="glass-btn-secondary" 
                onClick={handleBackClick}
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  borderRadius: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap'
                }}
                title="Go Back"
              >
                <ArrowLeft size={14} color="#38bdf8" />
                <span style={{ fontWeight: 700 }}>Back</span>
              </button>
            )}

            {/* Brand Logo & Title (Trending Real Estate Branding) */}
            <div 
              className="navbar-brand" 
              onClick={() => handleNavClick('home')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div 
                className="brand-icon-box"
                style={{
                  overflow: 'hidden',
                  boxShadow: '0 0 16px rgba(16, 185, 129, 0.4), 0 0 8px rgba(6, 182, 212, 0.3)',
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  background: '#0a0f1d',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={agsLogo} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${import.meta.env.BASE_URL}ags_logo.jpg`;
                  }}
                  alt="AGS Garden City Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div className="brand-text">
                <span className="brand-title gradient-text">
                  AGS GARDEN CITY
                </span>
                <span className="brand-subtitle">
                  LUXURY REAL ESTATE
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Exact 9-Step Sequence) */}
          <nav className="navbar-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ padding: '5px 7px', fontSize: '11.5px', whiteSpace: 'nowrap', gap: '4px' }}
                >
                  <Icon size={13} color={item.id === 'price-drop' ? '#ef4444' : item.id === 'saved' ? '#ec4899' : item.id === 'verified' ? '#10b981' : undefined} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span 
                      className="nav-ai-badge"
                      style={{
                        padding: '1px 4px',
                        fontSize: '8.5px',
                        background: item.badge === 'HOT' 
                          ? 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' 
                          : item.badge === 'RERA'
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area (Fits 100% inside container box) */}
          <div className="navbar-actions" style={{ gap: '6px', position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0, paddingRight: '2px' }}>
            
            {/* AI Voice Assistant Bar */}
            <VoiceAssistant 
              activePage={activePage}
              voiceLanguage={voiceLanguage}
              setVoiceLanguage={setVoiceLanguage}
              voiceEnabled={voiceEnabled}
              setVoiceEnabled={setVoiceEnabled}
            />

            {/* Customer Profile Pill or Sign In Button */}
            {currentUser ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <button 
                  className="glass-btn"
                  style={{ 
                    padding: '4px 8px', 
                    fontSize: '11px', 
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800 }}>
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="desktop-only-item" style={{ maxWidth: '65px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name || 'VIP'}
                  </span>
                  <ChevronDown size={11} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div 
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '220px',
                      padding: '14px',
                      borderRadius: '16px',
                      zIndex: 1000,
                      background: 'rgba(15, 17, 32, 0.98)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                        {currentUser.name || 'VIP Customer'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {currentUser.email || currentUser.phone}
                      </div>
                      <div style={{ fontSize: '10px', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={11} /> Verified VIP Buyer
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button
                        className="nav-link"
                        onClick={() => handleNavClick('saved')}
                        style={{ width: '100%', justifyContent: 'flex-start', padding: '6px 8px', fontSize: '12px', color: '#ec4899' }}
                      >
                        <Heart size={13} /> <span>6. Saved Properties</span>
                      </button>
                      <button
                        className="nav-link"
                        onClick={() => handleNavClick('verified')}
                        style={{ width: '100%', justifyContent: 'flex-start', padding: '6px 8px', fontSize: '12px', color: '#10b981' }}
                      >
                        <CheckCircle2 size={13} /> <span>7. Verified Properties</span>
                      </button>
                      <button
                        className="nav-link"
                        onClick={() => handleNavClick('auth')}
                        style={{ width: '100%', justifyContent: 'flex-start', padding: '6px 8px', fontSize: '12px', color: '#38bdf8' }}
                      >
                        <Lock size={13} /> <span>8. Switch Account / Portal</span>
                      </button>
                      <button
                        className="nav-link"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onLogoutCustomer) onLogoutCustomer();
                        }}
                        style={{ width: '100%', justifyContent: 'flex-start', padding: '6px 8px', color: '#ef4444', fontSize: '12px' }}
                      >
                        <LogOut size={13} /> <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="glass-btn nav-signin-btn"
                style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => onOpenAuthModal && onOpenAuthModal('customer')}
                title="Sign In / Register"
              >
                <User size={13} />
                <span className="desktop-only-item">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '6px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Menu (Exact 9-Step Sequence) */}
        {mobileMenuOpen && (
          <div 
            className="mobile-drawer glass-panel"
            style={{
              margin: '8px 10px 0',
              padding: '12px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
                >
                  <Icon size={16} color={item.id === 'price-drop' ? '#ef4444' : item.id === 'saved' ? '#ec4899' : item.id === 'verified' ? '#10b981' : undefined} />
                  <span style={{ fontSize: '13px' }}>{item.label}</span>
                  {item.badge && (
                    <span className="nav-ai-badge" style={{ marginLeft: 'auto', fontSize: '9px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                className="nav-link"
                onClick={() => handleNavClick('contact')}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px', color: '#10b981' }}
              >
                <PhoneCall size={16} /> <span>📞 24/7 Hotline (+91 73971 35792)</span>
              </button>
              <button
                className="nav-link"
                onClick={() => handleNavClick('admin')}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px', color: '#c084fc' }}
              >
                <ShieldAlert size={16} /> <span>🛡️ Central Admin Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Thumb Dock Bar */}
      <nav className="mobile-bottom-dock glass-panel">
        <button 
          className={`mobile-dock-btn ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <Home size={18} />
          <span>1. Home</span>
        </button>

        <button 
          className={`mobile-dock-btn ${activePage === 'properties' ? 'active' : ''}`}
          onClick={() => handleNavClick('properties')}
        >
          <Compass size={18} />
          <span>2. Props</span>
        </button>

        <button 
          className={`mobile-dock-btn ${activePage === 'price-drop' ? 'active' : ''}`}
          onClick={() => handleNavClick('price-drop')}
        >
          <Bell size={18} color="#ef4444" />
          <span style={{ color: '#ef4444' }}>4. Drop</span>
        </button>

        <button 
          className={`mobile-dock-btn ${activePage === 'saved' ? 'active' : ''}`}
          onClick={() => handleNavClick('saved')}
        >
          <Heart size={18} color="#ec4899" />
          <span style={{ color: '#ec4899' }}>6. Saved</span>
        </button>

        <button 
          className={`mobile-dock-btn ${activePage === 'verified' ? 'active' : ''}`}
          onClick={() => handleNavClick('verified')}
        >
          <CheckCircle2 size={18} color="#10b981" />
          <span style={{ color: '#10b981' }}>7. Verify</span>
        </button>

        <button 
          className={`mobile-dock-btn ${activePage === 'admin' ? 'active' : ''}`}
          onClick={() => handleNavClick('admin')}
        >
          <ShieldAlert size={18} color="#a855f7" />
          <span>Admin</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
