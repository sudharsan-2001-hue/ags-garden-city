import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowLeft,
  CheckCircle2,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  X,
  RotateCcw
} from 'lucide-react';
import safeStorage from '../utils/safeStorage';
import { API_ENDPOINTS } from '../utils/api';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';

function UnifiedAuthPortal({ 
  initialRole = 'customer', // 'customer' or 'admin'
  onCustomerSuccess, 
  onAdminSuccess, 
  onClose,
  onGuestAccess
}) {
  const [activePortal, setActivePortal] = useState(initialRole); // 'customer' or 'admin'
  
  // Customer Form State ('login', 'register', 'forgot')
  const [customerMode, setCustomerMode] = useState('login'); 
  const [customerIdentifier, setCustomerIdentifier] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerConfirmPass, setCustomerConfirmPass] = useState('');
  const [rememberCustomer, setRememberCustomer] = useState(true);
  const [showCustomerPass, setShowCustomerPass] = useState(false);
  const [showCustomerConfirmPass, setShowCustomerConfirmPass] = useState(false);

  // Admin Form State ('login', 'register', 'forgot')
  const [adminMode, setAdminMode] = useState('login'); 
  const [adminIdentifier, setAdminIdentifier] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminConfirmPass, setAdminConfirmPass] = useState('');
  const [adminMasterKey, setAdminMasterKey] = useState('AGS2026');
  const [rememberAdmin, setRememberAdmin] = useState(true);
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showAdminConfirmPass, setShowAdminConfirmPass] = useState(false);

  // Recently Registered Real Estate accounts (0 Mach Mart)
  const [recentRegisteredCustomer, setRecentRegisteredCustomer] = useState(() => {
    return safeStorage.getItem('agsgarden_recent_registered_user', null);
  });
  const [recentRegisteredAdmin, setRecentRegisteredAdmin] = useState(() => {
    return safeStorage.getItem('agsgarden_recent_registered_admin', null);
  });

  // Forgot Password Flow State
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isBackendDown, setIsBackendDown] = useState(false);
  const [pendingCustomer, setPendingCustomer] = useState(null);
  const [pendingAdmin, setPendingAdmin] = useState(null);

  // Fallback Handlers for GitHub Pages / Offline Mode
  const handleBypassCustomer = () => {
    const isEmail = customerIdentifier.includes('@');
    const user = pendingCustomer || {
      name: isEmail ? customerIdentifier.split('@')[0].toUpperCase() : (customerName || 'VIP Customer'),
      email: isEmail ? customerIdentifier : `${customerIdentifier || 'customer'}@agsgarden.com`,
      phone: !isEmail ? customerIdentifier : '+91 98401 23456',
      role: 'buyer'
    };
    safeStorage.setItem('agsgarden_customer', user);
    try { localStorage.setItem('agsgarden_customer', JSON.stringify(user)); } catch (err) {}
    if (onCustomerSuccess) onCustomerSuccess(user);
  };

  const handleBypassAdmin = () => {
    const isEmail = adminIdentifier.includes('@');
    const adminUser = pendingAdmin || {
      role: 'super_admin',
      email: isEmail ? adminIdentifier : 'admin@agsgarden.com',
      phone: '+91 73971 35792',
      name: isEmail ? adminIdentifier.split('@')[0].toUpperCase() + ' (Admin)' : 'Central Admin'
    };
    sessionStorage.setItem('agsgarden_admin_auth', 'true');
    sessionStorage.setItem('agsgarden_current_admin', JSON.stringify(adminUser));
    if (onAdminSuccess) onAdminSuccess(adminUser);
  };

  const handleQuickDemoCustomer = () => {
    const demoUser = {
      name: 'Kumar (Customer Demo)',
      email: 'kumar2005@gmail.com',
      phone: '+91 98401 23456',
      role: 'buyer'
    };
    safeStorage.setItem('agsgarden_customer', demoUser);
    try { localStorage.setItem('agsgarden_customer', JSON.stringify(demoUser)); } catch (err) {}
    if (onCustomerSuccess) onCustomerSuccess(demoUser);
  };

  const handleQuickDemoAdmin = () => {
    const demoAdmin = {
      name: 'Kumar (Estate Admin)',
      email: 'kumar2005@gmail.com',
      role: 'super_admin'
    };
    sessionStorage.setItem('agsgarden_admin_auth', 'true');
    sessionStorage.setItem('agsgarden_current_admin', JSON.stringify(demoAdmin));
    if (onAdminSuccess) onAdminSuccess(demoAdmin);
  };

  // Auto-fetch latest registered Real Estate customer from MongoDB backend on mount if not in local storage
  useEffect(() => {
    if (!recentRegisteredCustomer) {
      fetch(API_ENDPOINTS.AUTH_USERS)
        .then(res => res.json())
        .then(data => {
          if (data && data.users && data.users.length > 0) {
            const latest = data.users[0];
            const recentObj = {
              name: latest.name,
              email: latest.email,
              phone: latest.phone
            };
            setRecentRegisteredCustomer(recentObj);
            safeStorage.setItem('agsgarden_recent_registered_user', recentObj);
          }
        })
        .catch(() => {});
    }
  }, []);

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // CUSTOMER AUTH HANDLERS
  // -------------------------------------------------------------
  const handleCustomerLogin = async (e, directId, directPass) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    const identifier = (directId !== undefined ? directId : customerIdentifier).trim();
    const pass = (directPass !== undefined ? directPass : customerPassword).trim();

    if (!identifier) {
      setErrorMessage('Please enter your Email or Phone Number.');
      return;
    }
    if (!pass) {
      setErrorMessage('Please enter your Password.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Logging in to Customer Portal...');

    const isEmail = identifier.includes('@');
    let user = {
      name: isEmail ? identifier.split('@')[0].toUpperCase() : 'VIP Customer',
      email: isEmail ? identifier : `${identifier}@customer.agsgarden.com`,
      phone: !isEmail ? identifier : '+91 98401 23456',
      role: 'buyer'
    };

    // Attempt MongoDB authentication strictly against realestate database
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password: pass })
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok && resData.success && resData.user) {
        user = { ...user, ...resData.user };
      } else {
        setIsLoading(false);
        setErrorMessage(resData.message || 'Invalid email/phone or password. If you are a new customer, please register.');
        return;
      }
    } catch (err) {
      console.warn('Backend customer login error:', err);
      setIsLoading(false);
      setIsBackendDown(true);
      setPendingCustomer(user);
      setErrorMessage('Cannot connect to Real Estate backend server (http://localhost:5002).');
      return;
    }

    if (rememberCustomer) {
      safeStorage.setItem('agsgarden_customer', user);
      try {
        localStorage.setItem('agsgarden_customer', JSON.stringify(user));
      } catch (err) {}
    }

    setIsLoading(false);
    if (onCustomerSuccess) onCustomerSuccess(user);
  };

  const handleCustomerRegister = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    const name = customerName.trim();
    const email = customerIdentifier.trim().toLowerCase();
    const phone = customerPhone.trim();
    const pass = customerPassword.trim();
    const confirmPass = customerConfirmPass.trim();

    if (!name) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid Email Address.');
      return;
    }
    if (!phone || phone.length < 8) {
      setErrorMessage('Please enter a valid Phone Number.');
      return;
    }
    if (!pass || pass.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }
    if (confirmPass && pass !== confirmPass) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Creating customer account in database...');

    let user = {
      name: name,
      email: email,
      phone: phone,
      role: 'buyer',
      password: pass,
      joinedAt: new Date().toISOString()
    };

    // Store strictly in MongoDB realestate backend
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password: pass, role: 'buyer' })
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok && resData.success && resData.user) {
        user = { ...user, ...resData.user };
        const recentReg = { name: user.name, email: user.email, phone: user.phone };
        safeStorage.setItem('agsgarden_recent_registered_user', recentReg);
        setRecentRegisteredCustomer(recentReg);
        setStatusMessage('Registration successful! Accessing Real Estate portal...');
      } else {
        setIsLoading(false);
        setErrorMessage(resData.message || 'Registration failed. Please try again with valid details.');
        return;
      }
    } catch (err) {
      console.warn('Backend customer register offline fallback:', err);
      // Safe offline fallback: store locally so visitor is never blocked
      const recentReg = { name: user.name, email: user.email, phone: user.phone };
      safeStorage.setItem('agsgarden_recent_registered_user', recentReg);
      setRecentRegisteredCustomer(recentReg);
      safeStorage.setItem('agsgarden_customer', user);
      try {
        localStorage.setItem('agsgarden_customer', JSON.stringify(user));
      } catch (err2) {}
      setIsLoading(false);
      if (onCustomerSuccess) onCustomerSuccess(user);
      return;
    }

    safeStorage.setItem('agsgarden_customer', user);
    try {
      localStorage.setItem('agsgarden_customer', JSON.stringify(user));
    } catch (err) {}

    setIsLoading(false);
    if (onCustomerSuccess) onCustomerSuccess(user);
  };

  // -------------------------------------------------------------
  // ADMIN AUTH HANDLERS
  // -------------------------------------------------------------
  const handleAdminLogin = async (e, directId, directPass) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    const identifier = (directId !== undefined ? directId : adminIdentifier).trim().toLowerCase();
    const pass = (directPass !== undefined ? directPass : adminPassword).trim();

    if (!identifier) {
      setErrorMessage('Please enter your Admin Email or ID.');
      return;
    }
    if (!pass) {
      setErrorMessage('Please enter your Admin Passcode.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Authenticating Admin Portal Access...');

    const isEmail = identifier.includes('@');
    let adminUser = {
      role: 'super_admin',
      email: isEmail ? identifier : `${identifier}@admin.agsgarden.com`,
      phone: '+91 73971 35792',
      name: isEmail ? identifier.split('@')[0].toUpperCase() + ' (Admin)' : 'Central Admin'
    };

    // Verify with MongoDB backend
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_ADMIN_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password: pass })
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok && resData.success && resData.admin) {
        adminUser = { ...adminUser, ...resData.admin };
      } else {
        setIsLoading(false);
        setErrorMessage(resData.message || 'Invalid Admin Passcode or ID');
        return;
      }
    } catch (err) {
      console.warn('Backend admin login error:', err);
      setIsLoading(false);
      setIsBackendDown(true);
      setPendingAdmin(adminUser);
      setErrorMessage('Cannot connect to Real Estate backend server (http://localhost:5002).');
      return;
    }

    sessionStorage.setItem('agsgarden_admin_auth', 'true');
    sessionStorage.setItem('agsgarden_current_admin', JSON.stringify(adminUser));

    setIsLoading(false);
    if (onAdminSuccess) onAdminSuccess(adminUser);
  };

  const handleAdminRegister = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    const name = adminName.trim();
    const email = adminIdentifier.trim().toLowerCase();
    const phone = adminPhone.trim();
    const pass = adminPassword.trim();
    const confirmPass = adminConfirmPass.trim();
    const masterKey = adminMasterKey.trim();

    if (!name) {
      setErrorMessage('Please enter Admin Full Name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid Official Admin Email.');
      return;
    }
    if (!pass || pass.length < 4) {
      setErrorMessage('Security Passcode must be at least 4 characters.');
      return;
    }
    if (confirmPass && pass !== confirmPass) {
      setErrorMessage('Security Passcodes do not match.');
      return;
    }
    if (masterKey && masterKey !== 'AGS2026' && masterKey !== 'admin123') {
      setErrorMessage('Invalid Master Clearance Key. (Default: AGS2026)');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Registering Admin in database...');

    let adminUser = {
      name: name,
      email: email,
      phone: phone || '+91 73971 35792',
      role: 'admin',
      registeredAt: new Date().toISOString()
    };

    // Store in MongoDB realestate database
    try {
      const res = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password: pass, role: 'admin' })
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok && resData.success && resData.user) {
        adminUser = { ...adminUser, ...resData.user };
      }
      const recentAdm = { name: adminUser.name, email: adminUser.email, phone: adminUser.phone };
      safeStorage.setItem('agsgarden_recent_registered_admin', recentAdm);
      setRecentRegisteredAdmin(recentAdm);
    } catch (e) {
      console.warn('Backend admin register notice:', e);
    }

    safeStorage.setItem('agsgarden_admin_user', adminUser);
    sessionStorage.setItem('agsgarden_admin_auth', 'true');
    sessionStorage.setItem('agsgarden_current_admin', JSON.stringify(adminUser));

    setIsLoading(false);
    if (onAdminSuccess) onAdminSuccess(adminUser);
  };

  // -------------------------------------------------------------
  // FORGOT PASSWORD FLOW
  // -------------------------------------------------------------
  const handleForgotSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (forgotStep === 1) {
      if (!forgotIdentifier.trim()) {
        setErrorMessage('Please enter your registered Email or Phone Number.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setForgotStep(2);
        setForgotOtp('2026');
        setStatusMessage('Demo OTP: 2026 has been generated.');
      }, 500);
    } else {
      if (forgotOtp !== '2026') {
        setErrorMessage('Invalid OTP code. Please enter 2026.');
        return;
      }
      if (!forgotNewPass || forgotNewPass.length < 4) {
        setErrorMessage('New password must be at least 4 characters.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStatusMessage('Password updated successfully! Redirecting...');
        
        const user = {
          name: 'VIP Customer',
          email: forgotIdentifier.includes('@') ? forgotIdentifier : `${forgotIdentifier}@customer.agsgarden.com`,
          phone: !forgotIdentifier.includes('@') ? forgotIdentifier : '+91 98401 23456',
          role: 'buyer'
        };
        safeStorage.setItem('agsgarden_customer', user);
        
        setTimeout(() => {
          if (onCustomerSuccess) onCustomerSuccess(user);
        }, 300);
      }, 600);
    }
  };

  // 1-Click Quick Demo Handlers
  const handleQuickCustomerDemo = () => {
    setCustomerIdentifier('client@agsgarden.com');
    setCustomerPassword('client123');
    handleCustomerLogin(null, 'client@agsgarden.com', 'client123');
  };

  const handleQuickAdminDemo = () => {
    setAdminIdentifier('admin@agsgarden.com');
    setAdminPassword('admin123');
    handleAdminLogin(null, 'admin@agsgarden.com', 'admin123');
  };

  return (
    <div 
      className={onClose ? "glass-modal-overlay" : "mach-login-wrapper"}
      style={{
        position: onClose ? 'fixed' : 'relative',
        inset: onClose ? 0 : 'auto',
        zIndex: onClose ? 100000 : 1,
        background: onClose ? 'rgba(5, 7, 15, 0.92)' : undefined,
        backdropFilter: onClose ? 'blur(16px)' : undefined
      }}
      onClick={() => onClose && onClose()}
    >
      <div 
        className="mach-login-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional Close Button if in modal mode */}
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              right: '18px', 
              top: '18px', 
              background: 'none', 
              border: 'none', 
              color: '#94a3b8', 
              cursor: 'pointer',
              padding: '6px'
            }}
            title="Close modal"
          >
            <X size={20} />
          </button>
        )}

        
       {/* Top Glowing Real Estate Logo Emblem */}
<div
  style={{
    width: '68px',
    height: '68px',
    borderRadius: '18px',
    overflow: 'hidden',
    margin: '0 auto 16px',
    boxShadow: '0 0 25px rgba(16, 185, 129, 0.5), 0 0 12px rgba(56, 189, 248, 0.35)',
    border: '2px solid rgba(56, 189, 248, 0.5)',
    background: '#0a0f1d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <img
    src={AGS_LOGO_BASE64}
    alt="AGS Garden City"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</div>

        {/* Title Header */}
        <h1 className="mach-header-title">
          AGS Garden City
        </h1>

        {/* Subtitle depending on active tab & mode */}
        <p className="mach-header-subtitle">
          {activePortal === 'customer' 
            ? (customerMode === 'login' 
                ? 'Welcome! Please sign in to your Customer Panel' 
                : customerMode === 'register' 
                  ? 'Create your Customer Account to explore luxury homes' 
                  : 'Reset your Customer Password')
            : (adminMode === 'login' 
                ? 'Welcome! Please sign in to Real Estate Admin' 
                : adminMode === 'register'
                  ? 'Register a new Central Admin or Property Manager'
                  : 'Reset your Admin Passcode')
          }
        </p>

        {/* Segmented Toggle Control (Customer vs Estate Admin) */}
        {customerMode === 'login' && adminMode === 'login' && (
          <div className="mach-segmented-toggle">
            <button
              type="button"
              className={`mach-tab-btn ${activePortal === 'customer' ? 'active' : 'inactive'}`}
              onClick={() => {
                setActivePortal('customer');
                setErrorMessage('');
                setStatusMessage('');
              }}
            >
              Customer
            </button>

            <button
              type="button"
              className={`mach-tab-btn ${activePortal === 'admin' ? 'active' : 'inactive'}`}
              onClick={() => {
                setActivePortal('admin');
                setErrorMessage('');
                setStatusMessage('');
              }}
            >
              Estate Admin
            </button>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '16px',
            color: '#fca5a5',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>

            {/* Offline/Demo Fallback Action Button when backend connection fails */}
            {isBackendDown && (
              <div style={{
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ fontSize: '11.5px', color: '#fecaca', lineHeight: 1.4 }}>
                  💡 <strong>GitHub Pages Notice:</strong> Online HTTPS cannot reach local HTTP (localhost:5002). Click below to proceed in Demo / Offline Mode:
                </div>
                <button
                  type="button"
                  onClick={activePortal === 'customer' ? handleBypassCustomer : handleBypassAdmin}
                  style={{
                    padding: '8px 14px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} /> Continue in Offline / Demo Mode →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status Notification */}
        {statusMessage && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '16px',
            color: '#6ee7b7',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* 👤 CUSTOMER SECTION                                       */}
        {/* ========================================================= */}
        {activePortal === 'customer' && (
          <>
            {/* 1. CUSTOMER LOGIN MODE */}
            {customerMode === 'login' && (
              <form onSubmit={handleCustomerLogin} autoComplete="off" data-lpignore="true">
                {/* Hidden dummy fields to prevent Chrome/Edge aggressive browser password autofill popup */}
                <input type="text" name="b_cust_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <input type="password" name="b_pass_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />

                {/* ✨ RECENTLY REGISTERED REAL ESTATE CUSTOMER CHIP (0 Mach Mart) */}
                {recentRegisteredCustomer && (
                  <div 
                    onClick={() => {
                      setCustomerIdentifier(recentRegisteredCustomer.email || recentRegisteredCustomer.phone);
                    }}
                    style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1.5px solid rgba(16, 185, 129, 0.45)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    title="Click to auto-fill recently registered customer"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '13px',
                        flexShrink: 0
                      }}>
                        {(recentRegisteredCustomer.name || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#6ee7b7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Sparkles size={11} /> Recently Registered Real Estate Customer
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                          {recentRegisteredCustomer.name} <span style={{ color: '#38bdf8', fontWeight: 500, fontSize: '12px' }}>({recentRegisteredCustomer.email})</span>
                        </div>
                      </div>
                    </div>
                    <span style={{
                      background: '#10b981',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      Use Account →
                    </span>
                  </div>
                )}

                {/* Field: EMAIL OR PHONE NUMBER */}
                <div className="mach-field-group">
                  <label className="mach-field-label">
                    EMAIL OR PHONE NUMBER
                  </label>
                  <div className="mach-input-container">
                    <input 
                      type="text"
                      name="ags_realestate_cust_account_id"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      data-lpignore="true"
                      data-form-type="other"
                      className="mach-input-box"
                      placeholder="client@agsgarden.com"
                      value={customerIdentifier}
                      onChange={(e) => setCustomerIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                {/* Field: PASSWORD */}
                <div className="mach-field-group">
                  <label className="mach-field-label">
                    PASSWORD
                  </label>
                  <div className="mach-input-container">
                    <input 
                      type={showCustomerPass ? "text" : "password"}
                      name="ags_realestate_cust_security_key"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      data-lpignore="true"
                      data-form-type="other"
                      className="mach-input-box"
                      placeholder="••••••••••"
                      value={customerPassword}
                      onChange={(e) => setCustomerPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowCustomerPass(!showCustomerPass)}
                      title={showCustomerPass ? "Hide password" : "Show password"}
                    >
                      {showCustomerPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="mach-remember-forgot-row">
                  <label className="mach-remember-label">
                    <input 
                      type="checkbox"
                      className="mach-checkbox"
                      checked={rememberCustomer}
                      onChange={(e) => setRememberCustomer(e.target.checked)}
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    className="mach-forgot-link"
                    onClick={() => {
                      setCustomerMode('forgot');
                      setForgotStep(1);
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Log In Button */}
                <button
                  type="submit"
                  className="mach-btn-login"
                  disabled={isLoading}
                >
                  <LogIn size={18} />
                  <span>{isLoading ? 'Signing In...' : 'Log In'}</span>
                </button>

                {/* Quick Demo & Guest Shortcuts */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '10px',
                  marginBottom: '6px'
                }}>
                  <button
                    type="button"
                    onClick={handleQuickDemoCustomer}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '8px',
                      color: '#38bdf8',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Sparkles size={13} /> ⚡ Quick Demo Customer
                  </button>
                  {onGuestAccess && (
                    <button
                      type="button"
                      onClick={onGuestAccess}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        color: '#94a3b8',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Browse as Guest →
                    </button>
                  )}
                </div>

                {/* Footer Switcher to Register */}
                <div className="mach-footer-text">
                  New customer?
                  <button
                    type="button"
                    className="mach-footer-link"
                    onClick={() => {
                      setCustomerMode('register');
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Register here
                  </button>
                </div>
              </form>
            )}

            {/* 2. CUSTOMER REGISTER MODE */}
            {customerMode === 'register' && (
              <form onSubmit={handleCustomerRegister} autoComplete="off" data-lpignore="true">
                <input type="text" name="b_reg_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <input type="password" name="b_reg_pass_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />

                <div className="mach-field-group">
                  <label className="mach-field-label">FULL NAME</label>
                  <input 
                    type="text"
                    name="ags_reg_fullname"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. Hariharan G"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">EMAIL ADDRESS</label>
                  <input 
                    type="email"
                    name="ags_reg_email_val"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. client@agsgarden.com"
                    value={customerIdentifier}
                    onChange={(e) => setCustomerIdentifier(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">MOBILE PHONE NUMBER</label>
                  <input 
                    type="tel"
                    name="ags_reg_phone_val"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. +91 98401 23456"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">CREATE PASSWORD</label>
                  <div className="mach-input-container">
                    <input 
                      type={showCustomerPass ? "text" : "password"}
                      name="ags_reg_key_new"
                      autoComplete="new-password"
                      data-lpignore="true"
                      className="mach-input-box"
                      placeholder="Minimum 4 characters"
                      value={customerPassword}
                      onChange={(e) => setCustomerPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowCustomerPass(!showCustomerPass)}
                    >
                      {showCustomerPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">CONFIRM PASSWORD</label>
                  <div className="mach-input-container">
                    <input 
                      type={showCustomerConfirmPass ? "text" : "password"}
                      name="ags_reg_confirm_key"
                      autoComplete="new-password"
                      data-lpignore="true"
                      className="mach-input-box"
                      placeholder="Re-enter password"
                      value={customerConfirmPass}
                      onChange={(e) => setCustomerConfirmPass(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowCustomerConfirmPass(!showCustomerConfirmPass)}
                    >
                      {showCustomerConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mach-btn-login"
                  disabled={isLoading}
                >
                  <UserPlus size={18} />
                  <span>{isLoading ? 'Creating Account...' : 'Register Customer Account'}</span>
                </button>

                <div className="mach-footer-text">
                  Already have an account?
                  <button
                    type="button"
                    className="mach-footer-link"
                    onClick={() => {
                      setCustomerMode('login');
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Log In
                  </button>
                </div>
              </form>
            )}

            {/* 3. CUSTOMER FORGOT PASSWORD MODE */}
            {customerMode === 'forgot' && (
              <form onSubmit={handleForgotSubmit}>
                {forgotStep === 1 ? (
                  <div className="mach-field-group">
                    <label className="mach-field-label">REGISTERED EMAIL OR PHONE</label>
                    <input 
                      type="text"
                      className="mach-input-box"
                      placeholder="e.g. client@agsgarden.com"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mach-field-group">
                      <label className="mach-field-label">4-DIGIT OTP (DEMO: 2026)</label>
                      <input 
                        type="text"
                        className="mach-input-box"
                        placeholder="Enter 2026"
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                      />
                    </div>

                    <div className="mach-field-group">
                      <label className="mach-field-label">NEW PASSWORD</label>
                      <div className="mach-input-container">
                        <input 
                          type={showForgotPass ? "text" : "password"}
                          className="mach-input-box"
                          placeholder="New password (min 4 chars)"
                          value={forgotNewPass}
                          onChange={(e) => setForgotNewPass(e.target.value)}
                        />
                        <button
                          type="button"
                          className="mach-input-eye-btn"
                          onClick={() => setShowForgotPass(!showForgotPass)}
                        >
                          {showForgotPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="mach-btn-login"
                  disabled={isLoading}
                >
                  <RotateCcw size={18} />
                  <span>{isLoading ? 'Processing...' : (forgotStep === 1 ? 'Send OTP Code' : 'Reset & Log In')}</span>
                </button>

                <div className="mach-footer-text">
                  Remember your password?
                  <button
                    type="button"
                    className="mach-footer-link"
                    onClick={() => {
                      setCustomerMode('login');
                      setForgotStep(1);
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Back to Log In
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* 🛡️ REAL ESTATE ADMIN SECTION                              */}
        {/* ========================================================= */}
        {activePortal === 'admin' && (
          <>
            {/* 1. ADMIN LOGIN MODE */}
            {adminMode === 'login' && (
              <form onSubmit={handleAdminLogin} autoComplete="off" data-lpignore="true">
                <input type="text" name="b_admin_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <input type="password" name="b_admin_pass_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />

                {/* 🛡️ RECENTLY REGISTERED / OFFICIAL ESTATE ADMIN CHIP (0 Mach Mart) */}
                <div 
                  onClick={() => {
                    if (recentRegisteredAdmin) {
                      setAdminIdentifier(recentRegisteredAdmin.email || recentRegisteredAdmin.phone);
                    } else {
                      setAdminIdentifier('admin@agsgarden.com');
                      setAdminPassword('admin123');
                    }
                  }}
                  style={{
                    background: 'rgba(168, 85, 247, 0.12)',
                    border: '1.5px solid rgba(168, 85, 247, 0.45)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  title="Click to auto-fill Real Estate Admin"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '10.5px', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={11} /> {recentRegisteredAdmin ? 'Recently Registered Real Estate Admin' : 'Official Real Estate Estate Admin'}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                        {recentRegisteredAdmin ? recentRegisteredAdmin.name : 'Central Admin'} <span style={{ color: '#38bdf8', fontWeight: 500, fontSize: '12px' }}>({recentRegisteredAdmin ? recentRegisteredAdmin.email : 'admin@agsgarden.com'})</span>
                      </div>
                    </div>
                  </div>
                  <span style={{
                    background: '#a855f7',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    Use Account →
                  </span>
                </div>

                {/* Field: EMAIL OR PHONE NUMBER / ADMIN ID */}
                <div className="mach-field-group">
                  <label className="mach-field-label">
                    EMAIL OR PHONE NUMBER
                  </label>
                  <div className="mach-input-container">
                    <input 
                      type="text"
                      name="ags_admin_login_account_id"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      data-lpignore="true"
                      data-form-type="other"
                      className="mach-input-box"
                      placeholder="admin@agsgarden.com"
                      value={adminIdentifier}
                      onChange={(e) => setAdminIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                {/* Field: PASSWORD */}
                <div className="mach-field-group">
                  <label className="mach-field-label">
                    PASSWORD
                  </label>
                  <div className="mach-input-container">
                    <input 
                      type={showAdminPass ? "text" : "password"}
                      name="ags_admin_login_security_key"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      data-lpignore="true"
                      data-form-type="other"
                      className="mach-input-box"
                      placeholder="••••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                      title={showAdminPass ? "Hide passcode" : "Show passcode"}
                    >
                      {showAdminPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="mach-remember-forgot-row">
                  <label className="mach-remember-label">
                    <input 
                      type="checkbox"
                      className="mach-checkbox"
                      checked={rememberAdmin}
                      onChange={(e) => setRememberAdmin(e.target.checked)}
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    className="mach-forgot-link"
                    onClick={() => {
                      setAdminPassword('admin123');
                      setStatusMessage('Admin Passcode reset to: admin123');
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Log In Button */}
                <button
                  type="submit"
                  className="mach-btn-login"
                  disabled={isLoading}
                >
                  <LogIn size={18} />
                  <span>{isLoading ? 'Authorizing...' : 'Log In'}</span>
                </button>

                {/* Quick Demo & Guest Shortcuts */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '10px',
                  marginBottom: '6px'
                }}>
                  <button
                    type="button"
                    onClick={handleQuickDemoAdmin}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '8px',
                      color: '#c084fc',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Sparkles size={13} /> ⚡ Quick Demo Admin
                  </button>
                  {onGuestAccess && (
                    <button
                      type="button"
                      onClick={onGuestAccess}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        color: '#94a3b8',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Browse as Guest →
                    </button>
                  )}
                </div>

                {/* Footer Switcher: Direct Admin Register Page */}
                <div className="mach-footer-text">
                  Need new Admin access?
                  <button
                    type="button"
                    className="mach-footer-link"
                    onClick={() => {
                      setAdminMode('register');
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Register Admin Account
                  </button>
                </div>
              </form>
            )}

            {/* 2. ADMIN REGISTER MODE (Dedicated Admin Registration) */}
            {adminMode === 'register' && (
              <form onSubmit={handleAdminRegister} autoComplete="off" data-lpignore="true">
                <input type="text" name="b_admin_reg_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <input type="password" name="b_admin_reg_pass_off" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="new-password" />

                <div className="mach-field-group">
                  <label className="mach-field-label">ADMIN FULL NAME</label>
                  <input 
                    type="text"
                    name="ags_admin_reg_name"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. AGS Executive Admin"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">OFFICIAL ADMIN EMAIL</label>
                  <input 
                    type="email"
                    name="ags_admin_reg_email"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. admin@agsgarden.com"
                    value={adminIdentifier}
                    onChange={(e) => setAdminIdentifier(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">ADMIN MOBILE NUMBER</label>
                  <input 
                    type="tel"
                    name="ags_admin_reg_phone"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="e.g. +91 73971 35792"
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                  />
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">CREATE SECURITY PASSCODE</label>
                  <div className="mach-input-container">
                    <input 
                      type={showAdminPass ? "text" : "password"}
                      name="ags_admin_reg_passcode"
                      autoComplete="new-password"
                      data-lpignore="true"
                      className="mach-input-box"
                      placeholder="Minimum 4 characters"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                    >
                      {showAdminPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">CONFIRM SECURITY PASSCODE</label>
                  <div className="mach-input-container">
                    <input 
                      type={showAdminConfirmPass ? "text" : "password"}
                      name="ags_admin_reg_confirm_passcode"
                      autoComplete="new-password"
                      data-lpignore="true"
                      className="mach-input-box"
                      placeholder="Re-enter security passcode"
                      value={adminConfirmPass}
                      onChange={(e) => setAdminConfirmPass(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mach-input-eye-btn"
                      onClick={() => setShowAdminConfirmPass(!showAdminConfirmPass)}
                    >
                      {showAdminConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mach-field-group">
                  <label className="mach-field-label">MASTER CLEARANCE KEY (DEFAULT: AGS2026)</label>
                  <input 
                    type="text"
                    name="ags_admin_reg_master_clearance"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-lpignore="true"
                    className="mach-input-box"
                    placeholder="AGS2026"
                    value={adminMasterKey}
                    onChange={(e) => setAdminMasterKey(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="mach-btn-login"
                  disabled={isLoading}
                  style={{ background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)' }}
                >
                  <ShieldCheck size={18} />
                  <span>{isLoading ? 'Authorizing Admin...' : 'Register Admin Account'}</span>
                </button>

                <div className="mach-footer-text">
                  Already an authorized Admin?
                  <button
                    type="button"
                    className="mach-footer-link"
                    onClick={() => {
                      setAdminMode('login');
                      setErrorMessage('');
                      setStatusMessage('');
                    }}
                  >
                    Admin Sign In
                  </button>
                </div>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default UnifiedAuthPortal;
