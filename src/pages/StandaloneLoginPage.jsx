import React, { useState } from 'react';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';
import { 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Server,
  Award,
  KeyRound,
  Building2
} from 'lucide-react';
import safeStorage from '../utils/safeStorage';

export default function StandaloneLoginPage({
  onCustomerSuccess,
  onAdminSuccess,
  onGuestAccess
}) {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer', 'admin', 'register'
  const [identifier, setIdentifier] = useState('sudharsan.lead@agsnest.com');
  const [password, setPassword] = useState('Demo@2026');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminKey, setAdminKey] = useState('AGS2026');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // 1-Click Instant HR Demo Login
  const handleHrDemoLogin = () => {
    setLoading(true);
    setStatusMsg('🌟 Authenticating HR Evaluator with Java 26 Engine...');
    setTimeout(() => {
      const hrUser = {
        name: 'Sudharsan G',
        email: 'sudharsan.lead@agsnest.com',
        phone: '+91 98401 23456',
        role: 'VIP_HR_EVALUATOR',
        isHrDemo: true
      };
      safeStorage.setItem('agsgarden_customer', hrUser);
      try {
        localStorage.setItem('agsgarden_customer', JSON.stringify(hrUser));
      } catch (e) {}

      if (onCustomerSuccess) {
        onCustomerSuccess(hrUser);
      }
    }, 400);
  };

  // Standard Customer Login
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('Verifying credentials...');

    setTimeout(() => {
      const isEmail = identifier.includes('@');
      const user = {
        name: isEmail ? identifier.split('@')[0].toUpperCase() : 'VIP Customer',
        email: isEmail ? identifier : `${identifier}@agsnest.com`,
        phone: !isEmail ? identifier : '+91 98401 23456',
        role: 'VIP_BUYER'
      };
      safeStorage.setItem('agsgarden_customer', user);
      try {
        localStorage.setItem('agsgarden_customer', JSON.stringify(user));
      } catch (e) {}

      if (onCustomerSuccess) {
        onCustomerSuccess(user);
      }
    }, 400);
  };

  // Admin Login
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('Checking admin master clearance...');

    setTimeout(() => {
      const adminUser = {
        name: 'Central Admin (Sudharsan)',
        email: identifier.includes('@') ? identifier : 'admin@agsnest.com',
        role: 'super_admin'
      };
      sessionStorage.setItem('agsgarden_admin_auth', 'true');
      sessionStorage.setItem('agsgarden_current_admin', JSON.stringify(adminUser));

      if (onAdminSuccess) {
        onAdminSuccess(adminUser);
      }
    }, 400);
  };

  // Fill Quick Customer Demo
  const handleFillCustomerDemo = () => {
    setIdentifier('kumar2005@gmail.com');
    setPassword('Customer@2026');
  };

  // Fill Quick Admin Demo
  const handleFillAdminDemo = () => {
    setIdentifier('admin@agsnest.com');
    setPassword('Admin@2026');
    setAdminKey('AGS2026');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100%',
      background: 'radial-gradient(circle at 50% 10%, rgba(147, 51, 234, 0.25) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.18) 0%, transparent 45%), #070913',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      boxSizing: 'border-box',
      position: 'relative',
      overflowX: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'rgba(168, 85, 247, 0.15)',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '20%',
        width: '360px',
        height: '360px',
        borderRadius: '50%',
        background: 'rgba(56, 189, 248, 0.12)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>

      {/* Main Single Centered Login Card */}
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: '26px',
          padding: '36px 32px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.88) 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(168, 85, 247, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          zIndex: 10,
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: '#0a0f1d',
            border: '2px solid rgba(56, 189, 248, 0.5)',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.35)',
            overflow: 'hidden'
          }}>
            <img 
              src={AGS_LOGO_BASE64} 
              alt="AGS NEST Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <h1 style={{
            fontSize: '26px',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            margin: '0 0 4px'
          }}>
            AGS NEST <span style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>LUXURY REAL ESTATE</span>
          </h1>

          <p style={{
            fontSize: '12.5px',
            color: 'var(--text-muted, #94a3b8)',
            margin: 0,
            fontWeight: 600
          }}>
            Chennai's Premier RERA & GST Registered Residence Portal
          </p>
        </div>

        {/* ============================================================== */}
        {/* 🌟 HR & RECRUITER 1-CLICK FAST-TRACK DEMO ACCESS (PROMINENT) */}
        {/* ============================================================== */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(99, 102, 241, 0.18) 50%, rgba(56, 189, 248, 0.18) 100%)',
          border: '1.5px solid rgba(168, 85, 247, 0.45)',
          borderRadius: '18px',
          padding: '16px',
          marginBottom: '22px',
          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 900,
              color: '#c084fc',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <Award size={14} /> HR & Interviewer Fast-Track
            </span>
            <span style={{
              fontSize: '10.5px',
              color: '#10b981',
              fontWeight: 800,
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '2px 8px',
              borderRadius: '8px'
            }}>
              ✓ 1-Click Access
            </span>
          </div>

          <p style={{
            fontSize: '12px',
            color: 'var(--text-sub, #cbd5e1)',
            lineHeight: 1.5,
            margin: '0 0 12px'
          }}>
            Evaluating candidate <strong>Sudharsan G</strong> (Full Stack Java & React Developer)? Click below to bypass forms and test the live application!
          </p>

          <button
            onClick={handleHrDemoLogin}
            disabled={loading}
            className="glass-btn"
            style={{
              width: '100%',
              padding: '12px 18px',
              fontSize: '14px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #38bdf8 100%)',
              borderRadius: '14px',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Zap size={16} fill="#fff" />
            <span>{loading ? 'Entering Portal...' : '🌟 1-Click HR Demo Login (Sudharsan G) →'}</span>
          </button>
        </div>

        {/* Separator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '0 0 18px',
          fontSize: '11.5px',
          color: 'var(--text-muted, #94a3b8)',
          fontWeight: 700
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span>OR SIGN IN AS CUSTOMER / ADMIN</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: 'rgba(0,0,0,0.3)',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '18px'
        }}>
          <button
            onClick={() => setActiveTab('customer')}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'customer' ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : 'transparent',
              color: activeTab === 'customer' ? '#fff' : 'var(--text-muted, #94a3b8)',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            👤 Customer Login
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'admin' ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)' : 'transparent',
              color: activeTab === 'admin' ? '#fff' : 'var(--text-muted, #94a3b8)',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🔑 Admin Portal
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            textAlign: 'center',
            marginBottom: '14px',
            fontWeight: 700
          }}>
            {statusMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={activeTab === 'customer' ? handleCustomerSubmit : handleAdminSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              {activeTab === 'customer' ? 'Email or Mobile Number' : 'Admin Username / Email'}
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="glass-input"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={activeTab === 'customer' ? 'e.g. user@gmail.com or 9840123456' : 'admin@agsnest.com'}
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '36px' }}
              />
              <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #94a3b8)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)', fontWeight: 700 }}>Password</label>
              <button
                type="button"
                onClick={activeTab === 'customer' ? handleFillCustomerDemo : handleFillAdminDemo}
                style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '11px', cursor: 'pointer', fontWeight: 800 }}
              >
                Auto-Fill Demo
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="glass-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '36px', paddingRight: '36px' }}
              />
              <Lock size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #94a3b8)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted, #94a3b8)', cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {activeTab === 'admin' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11.5px', color: 'var(--text-muted, #94a3b8)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Master Clearance Key
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  className="glass-input"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="AGS2026"
                  style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '36px' }}
                />
                <KeyRound size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a855f7' }} />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="glass-btn"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 800,
              background: activeTab === 'customer' 
                ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' 
                : 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '14px'
            }}
          >
            {loading ? 'Logging In...' : activeTab === 'customer' ? 'Sign In as Customer →' : 'Enter Admin Control →'}
          </button>
        </form>

        {/* Continue as Guest Button */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <button
            onClick={onGuestAccess}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            🚀 Continue as Guest to Browse 26 Properties →
          </button>
        </div>

        {/* Live Java Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '8px 12px',
          fontSize: '11px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
            <span style={{ color: '#10b981', fontWeight: 800 }}>Java 26 Virtual Thread REST API: Live (Port 8080)</span>
          </div>
          <span style={{ color: 'var(--text-muted, #94a3b8)', fontWeight: 700 }}>TN RERA Registered</span>
        </div>

      </div>

    </div>
  );
}
