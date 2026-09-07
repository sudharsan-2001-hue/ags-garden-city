import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Gift, 
  CheckCircle2,
  LogIn,
  UserPlus
} from 'lucide-react';

function CustomerGateModal({ onCustomerEntered }) {
  const [mode, setMode] = useState('register'); // 'register' or 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid Email Address.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Phone Number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        role: 'buyer',
        joinedAt: new Date().toISOString()
      };
      localStorage.setItem('agsgarden_customer', JSON.stringify(user));
      if (onCustomerEntered) onCustomerEntered(user);
    }, 600);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your Email or Phone Number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isEmail = email.includes('@');
      const user = {
        name: isEmail ? email.split('@')[0] : 'VIP Customer',
        email: isEmail ? email.trim() : `${email.trim()}@customer.agsgarden.com`,
        phone: !isEmail ? email.trim() : '+91 98401 23456',
        role: 'buyer'
      };
      localStorage.setItem('agsgarden_customer', JSON.stringify(user));
      if (onCustomerEntered) onCustomerEntered(user);
    }, 600);
  };

  const handleDemoAccess = () => {
    const demoUser = {
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@example.com',
      phone: '+91 98401 23456',
      role: 'buyer'
    };
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('agsgarden_customer', JSON.stringify(demoUser));
      if (onCustomerEntered) onCustomerEntered(demoUser);
    }, 500);
  };

  return (
    <div 
      className="glass-modal-overlay" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(5, 6, 15, 0.88)',
        backdropFilter: 'blur(16px)',
        padding: '20px'
      }}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px 30px',
          borderRadius: '24px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          background: 'linear-gradient(145deg, rgba(15, 17, 32, 0.96) 0%, rgba(30, 27, 75, 0.88) 100%)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.7), 0 0 35px rgba(168, 85, 247, 0.3)'
        }}
      >
        {/* Brand Icon & Welcome Tag */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '18px', 
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 12px',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)'
            }}
          >
            <Building2 size={30} color="#fff" />
          </div>

          <span 
            className="section-tag" 
            style={{ 
              color: '#38bdf8', 
              border: '1px solid rgba(56, 189, 248, 0.4)', 
              background: 'rgba(56, 189, 248, 0.15)',
              padding: '3px 12px',
              fontSize: '11px',
              fontWeight: 800
            }}
          >
            <Sparkles size={12} /> WELCOME TO AGS GARDEN REAL ESTATE
          </span>

          <h2 style={{ fontSize: '24px', color: '#fff', marginTop: '8px' }}>
            {mode === 'register' ? 'Customer Entry & VIP Registration' : 'Customer Account Login'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            {mode === 'register' 
              ? 'Please enter your details below to access luxury properties & trending deals.' 
              : 'Enter your credentials to continue to your AGS Garden account.'}
          </p>
        </div>

        {/* Mode Toggle Switcher */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            background: 'rgba(255,255,255,0.06)', 
            padding: '4px', 
            borderRadius: '12px',
            marginBottom: '20px'
          }}
        >
          <button
            type="button"
            className={`filter-pill ${mode === 'register' ? 'filter-pill-active' : ''}`}
            style={{ borderRadius: '10px', fontSize: '13px', padding: '8px' }}
            onClick={() => { setMode('register'); setErrorMessage(''); }}
          >
            <UserPlus size={14} /> New Customer Entry
          </button>
          <button
            type="button"
            className={`filter-pill ${mode === 'login' ? 'filter-pill-active' : ''}`}
            style={{ borderRadius: '10px', fontSize: '13px', padding: '8px' }}
            onClick={() => { setMode('login'); setErrorMessage(''); }}
          >
            <LogIn size={14} /> Existing Sign In
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div 
            style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              border: '1px solid rgba(239, 68, 68, 0.4)', 
              borderRadius: '10px', 
              padding: '10px 14px', 
              marginBottom: '16px', 
              color: '#f87171', 
              fontSize: '12px' 
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Form: Register (First Open Details) */}
        {mode === 'register' ? (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Customer Full Name */}
            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#c084fc" /> Customer Full Name *
              </label>
              <input 
                type="text" 
                placeholder="e.g. Ramesh Kumar" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Customer Email ID */}
            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="#c084fc" /> Email Address *
              </label>
              <input 
                type="email" 
                placeholder="e.g. ramesh@example.com" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Customer Phone Number */}
            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="#c084fc" /> Mobile Phone Number (+91) *
              </label>
              <input 
                type="tel" 
                placeholder="e.g. 98401 23456" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#c084fc" /> Password (Optional / Passcode)
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="glass-btn"
              style={{ 
                width: '100%', 
                padding: '13px', 
                fontSize: '15px', 
                marginTop: '6px',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                fontWeight: 700
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving & Entering...' : 'Register & Enter AGS Garden'}
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          /* Form: Login */
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="#c084fc" /> Email ID or Phone Number (+91)
              </label>
              <input 
                type="text" 
                placeholder="ramesh@example.com or 9840123456" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#c084fc" /> Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="glass-input"
                style={{ width: '100%', padding: '12px 14px' }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="glass-btn"
              style={{ 
                width: '100%', 
                padding: '13px', 
                fontSize: '15px', 
                marginTop: '6px',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                fontWeight: 700
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In & Enter'}
              <LogIn size={16} />
            </button>
          </form>
        )}

        {/* 1-Click Demo VIP Access Button */}
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button 
            type="button" 
            className="glass-btn-secondary"
            style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={handleDemoAccess}
          >
            <Zap size={14} color="#f59e0b" /> ⚡ 1-Click Quick VIP Entry (Demo)
          </button>
        </div>

        {/* Benefits footer */}
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} color="#10b981" /> Free VIP Site Visit
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Gift size={12} color="#c084fc" /> ₹50K Token Voucher
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={12} color="#38bdf8" /> 100% Verified Titles
          </span>
        </div>

      </div>
    </div>
  );
}

export default CustomerGateModal;
