import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  LogIn, 
  User,
  Sparkles, 
  Building2, 
  AlertCircle, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldAlert,
  Phone
} from 'lucide-react';

function AdminLogin({ onLoginSuccess, onSwitchToCustomer, onCancel }) {
  const [identifier, setIdentifier] = useState(''); // Email or Phone number
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanIdentifier) {
      setIsLoading(false);
      setErrorMessage('Please enter Admin Email ID or Phone Number.');
      return;
    }

    if (!cleanPass) {
      setIsLoading(false);
      setErrorMessage('Please enter Admin Password.');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      const isEmail = cleanIdentifier.includes('@');
      const adminName = isEmail 
        ? cleanIdentifier.split('@')[0].toUpperCase() + ' (Admin)'
        : `Admin (${cleanIdentifier.slice(-4)})`;

      const adminUser = {
        role: 'super_admin',
        email: isEmail ? cleanIdentifier : `${cleanIdentifier}@admin.agsgarden.com`,
        phone: !isEmail ? cleanIdentifier : '+91 98402 33445',
        name: adminName
      };

      if (onLoginSuccess) {
        onLoginSuccess(adminUser);
      }
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    const adminUser = {
      role: 'super_admin',
      email: 'admin@agsgarden.com',
      phone: '+91 98402 33445',
      name: 'AGS Central Admin'
    };
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(adminUser);
      }
    }, 400);
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '520px', margin: '40px auto', padding: '0 16px' }}>
      
      {/* Dual Portal Switcher Tabs on Top */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px',
          background: 'rgba(255,255,255,0.04)', 
          padding: '6px', 
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '18px'
        }}
      >
        <button
          type="button"
          onClick={() => onSwitchToCustomer && onSwitchToCustomer()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '13px'
          }}
        >
          <User size={16} /> 👤 CUSTOMER PORTAL
        </button>

        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid #a855f7',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.25) 100%)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '13px'
          }}
        >
          <ShieldCheck size={16} color="#c084fc" /> 🛡️ ADMIN PORTAL
        </button>
      </div>

      {/* Admin Login Card */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '40px 32px', 
          borderRadius: '24px', 
          border: '1px solid rgba(168, 85, 247, 0.4)',
          background: 'linear-gradient(145deg, rgba(15, 17, 32, 0.98) 0%, rgba(30, 27, 75, 0.9) 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(168, 85, 247, 0.25)'
        }}
      >
        {/* Top Header Badge & Icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div 
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '20px', 
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 14px',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)'
            }}
          >
            <ShieldAlert size={32} color="#ffffff" />
          </div>

          <span 
            className="section-tag" 
            style={{ 
              color: '#c084fc', 
              border: '1px solid rgba(168, 85, 247, 0.4)',
              background: 'rgba(168, 85, 247, 0.15)',
              padding: '4px 14px',
              fontSize: '11px',
              fontWeight: 800
            }}
          >
            <ShieldCheck size={13} /> RESTRICTED ADMIN ACCESS
          </span>

          <h2 style={{ fontSize: '26px', marginTop: '8px', color: '#fff' }}>
            Admin Control Gateway
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            Login with Admin Email ID or Mobile Phone Number to manage live client visit alerts & properties.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div 
            style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              border: '1px solid rgba(239, 68, 68, 0.4)', 
              borderRadius: '12px', 
              padding: '12px 16px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#f87171',
              fontSize: '13px'
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleAdminLogin} className="auth-form" autoComplete="off" data-lpignore="true" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" name="b_adm_user_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
          <input type="password" name="b_adm_pass_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />
          
          <div>
            <label className="field-label" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#c084fc" /> Admin Email Address OR Phone Number *
            </label>
            <input 
              type="text" 
              name="ags_admin_standalone_account"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              data-lpignore="true"
              placeholder="admin@agsgarden.com" 
              className="glass-input"
              style={{ width: '100%', padding: '14px 16px' }}
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div>
            <label className="field-label" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} color="#c084fc" /> Admin Security Key / Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="ags_admin_standalone_key"
                autoComplete="new-password"
                data-lpignore="true"
                placeholder="••••••••••••" 
                className="glass-input"
                style={{ width: '100%', padding: '14px 44px 14px 16px' }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="glass-btn" 
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: '15px', 
              marginTop: '8px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              fontWeight: 700
            }} 
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating Admin...' : 'Authenticate & Enter Admin Portal'}
            <LogIn size={18} />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div 
          style={{ 
            marginTop: '24px', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '16px', 
            padding: '16px',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            <KeyRound size={14} /> Quick Demo Access Credentials
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Enter your Email/Phone & Password or Click below:
          </p>
          <button 
            type="button" 
            className="glass-btn-secondary" 
            style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px' }}
            onClick={handleQuickDemoLogin}
          >
            ⚡ 1-Click Demo Admin Login
          </button>
        </div>

        {/* Back to website */}
        {onCancel && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={onCancel}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}
            >
              ← Back to Customer Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminLogin;
