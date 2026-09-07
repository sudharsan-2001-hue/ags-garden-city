import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, Building2, Phone, Zap } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/api';

function Login({ onSwitchToRegister, onClose, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter your Email/Phone and Password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password.trim()
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.user) {
        if (rememberMe) {
          localStorage.setItem('agsgarden_customer', JSON.stringify(data.user));
        }
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      } else {
        setIsLoading(false);
        setErrorMessage(data.message || 'Invalid email/phone or password. If you are a new customer, please register.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Cannot connect to Real Estate backend server (http://localhost:5002). Please ensure backend is running.');
    }
  };

  const handleDemoCustomerLogin = () => {
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
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 500);
  };

  return (
    <div className="glass-panel" style={{ padding: '36px 28px', maxWidth: '440px', margin: '20px auto', borderRadius: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
        <div 
          className="brand-icon-box" 
          style={{ 
            margin: '0 auto 12px',
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}
        >
          <Building2 size={26} />
        </div>
        <h2 style={{ fontSize: '24px', color: '#fff' }}>Customer Sign In</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
          Sign in to access saved properties, bookings & VIP prices
        </p>
      </div>

      {errorMessage && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#f87171', fontSize: '12px' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" autoComplete="off" data-lpignore="true" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input type="text" name="b_off_user" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
        <input type="password" name="b_off_pass" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />
        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} color="#c084fc" /> Email ID or Phone Number (+91)
          </label>
          <input 
            type="text" 
            name="ags_standalone_login_user"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            data-lpignore="true"
            placeholder="e.g. ramesh@example.com or 9840123456" 
            className="glass-input"
            style={{ width: '100%' }}
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#c084fc" /> Password
          </label>
          <input 
            type="password" 
            name="ags_standalone_login_pass"
            autoComplete="new-password"
            data-lpignore="true"
            placeholder="••••••••••••" 
            className="glass-input"
            style={{ width: '100%' }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <span style={{ color: '#c084fc', cursor: 'pointer' }}>Forgot Password?</span>
        </div>

        <button 
          type="submit" 
          className="glass-btn" 
          style={{ 
            width: '100%', 
            marginTop: '6px', 
            padding: '13px', 
            fontSize: '15px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
          }} 
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In To Account'}
          <LogIn size={16} />
        </button>
      </form>

      {/* 1-Click Demo Customer Login */}
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button 
          type="button" 
          className="glass-btn-secondary" 
          style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          onClick={handleDemoCustomerLogin}
        >
          <Zap size={14} color="#f59e0b" /> Quick 1-Click Demo Customer Login
        </button>
      </div>

      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
        Don't have an account?{' '}
        <button 
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', color: '#c084fc', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Register VIP Account
        </button>
      </div>
    </div>
  );
}

export default Login;
