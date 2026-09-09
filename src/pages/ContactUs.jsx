import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Car, 
  ArrowLeft,
  Headphones,
  Zap,
  Globe
} from 'lucide-react';
import safeStorage from '../utils/safeStorage';
import GoogleMapView from '../components/GoogleMapView';

function ContactUs({ setActivePage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredArea: 'Porur',
    visitDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    setLoading(true);

    // Create client visit alert for Admin
    const alertData = {
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      clientEmail: formData.email.trim() || 'AGSGARDENCITY@gmail.com',
      propertyTitle: `Direct 24/7 Enquiry (${formData.preferredArea})`,
      slotTime: formData.visitDate || 'Immediate 24/7 Callback',
      source: 'Contact 24/7 Page',
      message: formData.message.trim(),
      createdAt: new Date().toISOString()
    };

    safeStorage.addVisitAlert(alertData);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px 60px' }}>
      
      {/* Top Customer Journey Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: '12px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(15, 17, 32, 0.9)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', flexWrap: 'wrap' }}>
          <span style={{ color: '#10b981', fontWeight: 800 }}>📞 24/7 Direct Contact Desk</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#38bdf8' }}>Hotline: +91 73971 35792</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#c084fc' }}>Email: AGSGARDENCITY@gmail.com</span>
        </div>

        <button 
          className="glass-btn-secondary" 
          onClick={() => {
            if (setActivePage) setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px' }}
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>

      {/* Main Header */}
      <div className="section-top-header" style={{ marginBottom: '32px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#10b981', borderColor: '#10b981' }}>
            <Headphones size={14} /> 24 HOURS ROUND-THE-CLOCK VIP ASSISTANCE
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '38px' }}>
            Connect with <span className="gradient-text">AGS Garden City</span>
          </h1>
          <p className="section-subtext" style={{ fontSize: '16px', maxWidth: '800px' }}>
            Our expert property advisors are available <strong>24 Hours a Day, 7 Days a Week</strong> to arrange instant site visits, free cab pickups, video walkthroughs, and customized property consultations.
          </p>
        </div>
      </div>

      {/* 4 Glowing Contact Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        {/* 1. 24/7 Phone Hotline */}
        <div 
          className="glass-panel"
          style={{
            padding: '28px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 17, 32, 0.95) 100%)',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <Phone size={24} />
            </div>
            <span style={{ fontSize: '11px', background: '#10b981', color: '#000', padding: '4px 10px', borderRadius: '20px', fontWeight: 900 }}>
              🔴 24 HOURS LIVE
            </span>
          </div>
          <h3 style={{ fontSize: '20px', margin: '0 0 6px', color: '#fff' }}>24/7 Direct Hotline</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>
            Call anytime for instant booking assistance, price negotiation, and emergency queries.
          </p>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981', letterSpacing: '0.5px', marginBottom: '18px' }}>
            +91 73971 35792
          </div>
          <a 
            href="tel:7397135792" 
            className="glass-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              width: '100%', 
              padding: '12px', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              fontWeight: 800,
              borderRadius: '12px'
            }}
          >
            <Phone size={16} /> Call Hotline Now
          </a>
        </div>

        {/* 2. WhatsApp Advisor */}
        <div 
          className="glass-panel"
          style={{
            padding: '28px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 17, 32, 0.95) 100%)',
            boxShadow: '0 10px 30px rgba(56, 189, 248, 0.15)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <MessageSquare size={24} />
            </div>
            <span style={{ fontSize: '11px', background: '#38bdf8', color: '#000', padding: '4px 10px', borderRadius: '20px', fontWeight: 900 }}>
              ⚡ &lt; 2 MIN REPLY
            </span>
          </div>
          <h3 style={{ fontSize: '20px', margin: '0 0 6px', color: '#fff' }}>24/7 WhatsApp Chat</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>
            Receive property photos, floor plans, video walkthroughs, and pricing brochures directly on WhatsApp.
          </p>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.5px', marginBottom: '18px' }}>
            +91 73971 35792
          </div>
          <a 
            href="https://wa.me/917397135792?text=Hello%20AGS%20Garden%20City,%20I%20want%20to%20enquire%20about%20luxury%20properties%20in%20Chennai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              width: '100%', 
              padding: '12px', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              fontWeight: 800,
              borderRadius: '12px'
            }}
          >
            <MessageSquare size={16} /> Chat on WhatsApp
          </a>
        </div>

        {/* 3. Official Email Support */}
        <div 
          className="glass-panel"
          style={{
            padding: '28px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(15, 17, 32, 0.95) 100%)',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.15)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Mail size={24} />
            </div>
            <span style={{ fontSize: '11px', background: '#c084fc', color: '#000', padding: '4px 10px', borderRadius: '20px', fontWeight: 900 }}>
              ✉️ OFFICIAL INBOX
            </span>
          </div>
          <h3 style={{ fontSize: '20px', margin: '0 0 6px', color: '#fff' }}>Official Email Desk</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>
            Send legal verification queries, investor proposals, and customized luxury requirements.
          </p>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#c084fc', wordBreak: 'break-all', marginBottom: '18px' }}>
            AGSGARDENCITY@gmail.com
          </div>
          <a 
            href="mailto:AGSGARDENCITY@gmail.com?subject=Enquiry%20for%20AGS%20Garden%20City%20Properties" 
            className="glass-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              width: '100%', 
              padding: '12px', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 100%)',
              fontWeight: 800,
              borderRadius: '12px'
            }}
          >
            <Mail size={16} /> Compose Official Email
          </a>
        </div>

        {/* 4. Experience Center & Headquarters */}
        <div 
          className="glass-panel"
          style={{
            padding: '28px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 17, 32, 0.95) 100%)',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.15)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Building2 size={24} />
            </div>
            <span style={{ fontSize: '11px', background: '#f59e0b', color: '#000', padding: '4px 10px', borderRadius: '20px', fontWeight: 900 }}>
              📍 24/7 OFFICE
            </span>
          </div>
          <h3 style={{ fontSize: '20px', margin: '0 0 6px', color: '#fff' }}>Central Experience Hub</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>
            AGS Garden City Towers, Mount-Poonamallee Highway, Porur Junction, Chennai - 600116.
          </p>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fcd34d', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Car size={16} /> Free AC Cab Pickup from Airport & Railway Station
          </div>
          <button 
            type="button"
            className="glass-btn-secondary"
            onClick={() => {
              const formElem = document.getElementById('quick-callback-form');
              if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ width: '100%', padding: '12px', fontSize: '13px', fontWeight: 700, justifyContent: 'center', borderRadius: '12px' }}
          >
            🚗 Request Free Site Visit Cab
          </button>
        </div>

      </div>

      {/* Direct Interactive Callback & VIP Site Visit Booking Form */}
      <div id="quick-callback-form" className="glass-panel" style={{ padding: '36px 32px', borderRadius: '24px', position: 'relative' }}>
        <div className="contact-layout-grid">
          
          {/* Left Column: Why Connect with AGS Garden City */}
          <div>
            <span className="section-tag" style={{ color: '#38bdf8' }}>
              <Zap size={13} /> 24/7 GUARANTEED VIP SERVICE
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 16px', color: '#fff' }}>
              Book an Instant <span className="gradient-text">Site Visit or Callback</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Enter your details below to receive an instant call from our senior property specialist within 2 minutes. We will arrange free doorstep AC cab pickup for your family to visit any project in Porur, Anna Nagar, OMR, or ECR.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>24 Hours Live Calling (+91 73971 35792)</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Never wait on hold — direct senior advisor connection</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  <Car size={18} />
                </div>
                <div>
                  <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>Complimentary Doorstep Cab Service</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Comfortable luxury SUV pickup for you & family</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>Official Email Dispatch (AGSGARDENCITY@gmail.com)</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Direct verified documentation & RERA legal copy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Form */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Enquiry Dispatched Successfully!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>! Our 24/7 Senior Property Consultant is reviewing your request and will call you on <strong>{formData.phone}</strong> shortly.
                </p>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#6ee7b7', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>
                  📞 24/7 Helpline: +91 73971 35792 | ✉️ AGSGARDENCITY@gmail.com
                </div>
                <button 
                  type="button"
                  className="glass-btn"
                  onClick={() => setSubmitted(false)}
                  style={{ padding: '10px 24px', borderRadius: '14px' }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
                  Request Instant 24/7 Callback
                </h3>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Your Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ramesh Kumar"
                    className="glass-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Mobile Phone Number (+91) *</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 73971 35792"
                    className="glass-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    placeholder="e.g. ramesh@example.com"
                    className="glass-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Preferred Location / Project</label>
                  <select 
                    className="glass-input"
                    value={formData.preferredArea}
                    onChange={(e) => setFormData({ ...formData, preferredArea: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Porur">Porur Luxury Apartments & Plots</option>
                    <option value="Anna Nagar">Anna Nagar High-Rise Flats</option>
                    <option value="OMR">OMR Tech Corridor Apartments & Land</option>
                    <option value="ECR">ECR Coastal Beachfront Villas & Plots</option>
                    <option value="Velachery">Velachery Duplex Penthouses</option>
                    <option value="Tambaram">Tambaram Green Gated Villas & Plots</option>
                  </select>
                </div>

                <div className="auth-field-group" style={{ marginBottom: '16px' }}>
                  <label className="field-label">Your Requirement / Preferred Timing</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Looking for a 2/3 BHK flat in Porur within 80 Lakhs, free cab pickup on Saturday morning."
                    className="glass-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', resize: 'none' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="glass-btn" 
                  disabled={loading}
                  style={{
                    width: '100%', 
                    padding: '14px', 
                    fontSize: '15px', 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Transmitting Request...' : 'Dispatch 24/7 Callback Request →'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Corporate Experience Center Google Map */}
      <div style={{ marginTop: '30px' }}>
        <GoogleMapView 
          locationName="Porur, Chennai"
          title="📍 AGS Garden City Corporate Experience Gallery on Google Maps"
          height="420px"
          showTransitDetails={true}
        />
      </div>

    </div>
  );
}

export default ContactUs;
