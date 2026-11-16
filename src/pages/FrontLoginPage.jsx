import React, { useState } from 'react';
import GlassStepBar from '../components/GlassStepBar';
import UnifiedAuthPortal from '../components/UnifiedAuthPortal';
import { 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  Award,
  Zap,
  Building2,
  Server
} from 'lucide-react';

export default function FrontLoginPage({
  setActivePage,
  onCustomerSuccess,
  onAdminSuccess,
  currentUser
}) {
  const [fastTrackLoading, setFastTrackLoading] = useState(false);

  // 1-Click Instant HR Demo Login Handler
  const handleHrFastTrackLogin = () => {
    setFastTrackLoading(true);
    setTimeout(() => {
      const hrUser = {
        name: 'Sudharsan G',
        email: 'sudharsan.lead@agsnest.com',
        phone: '+91 98401 23456',
        role: 'VIP_HR_EVALUATOR',
        isHrDemo: true
      };
      
      try {
        localStorage.setItem('agsgarden_customer', JSON.stringify(hrUser));
      } catch (e) {}

      if (onCustomerSuccess) {
        onCustomerSuccess(hrUser);
      }
      
      setFastTrackLoading(false);
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleGuestBypass = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px 80px' }}>
      
      {/* Top Glassmorphic 10-Step Progress Stepper */}
      <GlassStepBar 
        currentStepId="auth"
        setActivePage={setActivePage}
        onNext={() => setActivePage('home')}
        nextLabel="Step 2: Home & Categories"
      />

      {/* Main Glass Container Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: HR Fast Track & Project Highlights */}
        <div>
          {/* Card 1: HR 1-Click Fast Track Card (Specially for Interviewers) */}
          <div 
            className="glass-panel"
            style={{
              padding: '28px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(56, 189, 248, 0.15) 100%)',
              border: '1.5px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 12px 35px rgba(168, 85, 247, 0.2)',
              marginBottom: '20px'
            }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              padding: '4px 12px',
              borderRadius: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Award size={14} /> HR & Technical Recruiter Fast-Track
            </div>

            <h2 style={{
              fontSize: '22px',
              fontWeight: 900,
              color: '#fff',
              margin: '0 0 10px',
              lineHeight: 1.3
            }}>
              1-Click Recruiter Demo Access
            </h2>

            <p style={{
              fontSize: '13.5px',
              color: 'var(--text-sub)',
              lineHeight: 1.6,
              margin: '0 0 20px'
            }}>
              Evaluating for a <strong>Full Stack Java & React Developer</strong> role? 
              Skip manual registration and auto-login with instant VIP credentials to inspect 
              the full 10-step property journey and Java Spring Boot REST API.
            </p>

            {/* Fast Track Action Button */}
            <button
              onClick={handleHrFastTrackLogin}
              disabled={fastTrackLoading}
              className="glass-btn"
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: '14.5px',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #38bdf8 100%)',
                boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              <Zap size={18} fill="#fff" />
              <span>{fastTrackLoading ? 'Authenticating HR...' : '🌟 1-Click HR Demo Login (Sudharsan G) →'}</span>
            </button>

            {/* HR Features Preview Pills */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginTop: '16px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '8px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                color: '#38bdf8',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Server size={13} /> Java 26 REST API
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '8px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                color: '#10b981',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={13} /> TN RERA Verified
              </div>
            </div>
          </div>

          {/* Card 2: 10-Step Customer Pathway Overview */}
          <div 
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="#38bdf8" /> Orderly 10-Step Journey Map
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-sub)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', fontWeight: 800 }}>
                <span>➔ 1. 🔐 Front Login & Welcome Gate (Current)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 2. 🏠 Luxury Home & Curated Residences</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 3. 🔍 Search & Multi-Filter Catalog</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 4. 🤖 AI Budget & BHK Matcher Wizard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 5. 📈 Market Price Appreciation Analytics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 7. 🛡️ 100% Legal Title RERA Verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 8. 🏡 3D Virtual Tour & Floor Specs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• 9. 💳 Token Checkout & 1-Page A4 GST Invoice</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 800 }}>
                <span>★ 10. 🎯 HR Showcase & Architecture Conclusion</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                className="glass-btn-secondary"
                onClick={handleGuestBypass}
                style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 800 }}
              >
                🚀 Continue as Guest to Step 2: Properties →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Unified Glass Auth Portal */}
        <div>
          <UnifiedAuthPortal 
            initialRole="customer"
            onCustomerSuccess={onCustomerSuccess}
            onAdminSuccess={onAdminSuccess}
            onGuestAccess={handleGuestBypass}
            onClose={handleGuestBypass}
            isModal={false}
          />
        </div>

      </div>

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '32px',
          padding: '20px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Current Step: 1 of 10 in Customer Pipeline
          </div>
          <h4 style={{ margin: '4px 0 0', color: '#fff', fontSize: '16px' }}>
            Login or proceed as guest to unlock verified listings!
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setActivePage('conclusion'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              padding: '10px 18px',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            👔 HR Project Showcase →
          </button>

          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Next: Step 2: Home & Categories</span> <ArrowRight size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}
