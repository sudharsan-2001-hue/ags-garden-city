import React, { useState } from 'react';
import { Mail, Lock, User, Phone, UserPlus, Sparkles, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/api';

function Register({ onSwitchToLogin, onClose, onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // 'buyer', 'owner', 'agent'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setErrorMessage('Please fill in your Name, Email ID, Phone Number, and Password.');
      return;
    }

    // Clean phone validation
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid mobile phone number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          password: password.trim(),
          role
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.user) {
        const userData = {
          ...data.user,
          registeredAt: new Date().toISOString()
        };
        localStorage.setItem('agsgarden_customer', JSON.stringify(userData));
        setIsLoading(false);
        if (onRegisterSuccess) {
          onRegisterSuccess(userData);
        }
      } else {
        setIsLoading(false);
        setErrorMessage(data.message || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      console.warn('Register offline fallback triggered:', err);
      setIsLoading(false);
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        role,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem('agsgarden_customer', JSON.stringify(userData));
      if (onRegisterSuccess) {
        onRegisterSuccess(userData);
      }
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '36px 28px', maxWidth: '460px', margin: '20px auto', borderRadius: '20px' }}>
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
        <h2 style={{ fontSize: '24px', color: '#fff' }}>VIP Customer Registration</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
          Enter your details to explore luxury properties, schedule visits & unlock ₹50,000 token vouchers.
        </p>
      </div>

      {errorMessage && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#f87171', fontSize: '12px' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Role Toggle */}
        <div>
          <label className="field-label" style={{ marginBottom: '6px', fontSize: '11px' }}>
            I am a:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '10px' }}>
            <button 
              type="button" 
              className={`filter-pill ${role === 'buyer' ? 'filter-pill-active' : ''}`}
              style={{ borderRadius: '8px', fontSize: '12px', padding: '6px' }}
              onClick={() => setRole('buyer')}
            >
              Buyer / Investor
            </button>
            <button 
              type="button" 
              className={`filter-pill ${role === 'owner' ? 'filter-pill-active' : ''}`}
              style={{ borderRadius: '8px', fontSize: '12px', padding: '6px' }}
              onClick={() => setRole('owner')}
            >
              Property Owner
            </button>
            <button 
              type="button" 
              className={`filter-pill ${role === 'agent' ? 'filter-pill-active' : ''}`}
              style={{ borderRadius: '8px', fontSize: '12px', padding: '6px' }}
              onClick={() => setRole('agent')}
            >
              Channel Partner
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} color="#c084fc" /> Customer Full Name *
          </label>
          <input 
            type="text" 
            placeholder="e.g. Ramesh Kumar" 
            className="glass-input"
            style={{ width: '100%' }}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} color="#c084fc" /> Email Address *
          </label>
          <input 
            type="email" 
            placeholder="e.g. ramesh@example.com" 
            className="glass-input"
            style={{ width: '100%' }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} color="#c084fc" /> Mobile Phone Number (+91) *
          </label>
          <input 
            type="tel" 
            placeholder="e.g. 98401 23456" 
            className="glass-input"
            style={{ width: '100%' }}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="field-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#c084fc" /> Password
          </label>
          <input 
            type="password" 
            placeholder="Create strong password" 
            className="glass-input"
            style={{ width: '100%' }}
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
            marginTop: '8px', 
            padding: '13px', 
            fontSize: '15px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
          }} 
          disabled={isLoading}
        >
          {isLoading ? 'Creating VIP Customer Account...' : 'Register & Enter AGS Garden'}
          <UserPlus size={16} />
        </button>
      </form>

      <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <button 
          onClick={onSwitchToLogin}
          style={{ background: 'none', border: 'none', color: '#c084fc', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Customer Sign In
        </button>
      </div>
    </div>
  );
}

export default Register;
