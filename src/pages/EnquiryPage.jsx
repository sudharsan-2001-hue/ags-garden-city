import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  DollarSign, 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Printer, 
  Download, 
  Headphones,
  Check,
  UserCheck
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/propertiesData';
import safeStorage from '../utils/safeStorage';
import GoogleMapView from '../components/GoogleMapView';

function EnquiryPage({ 
  selectedProperty, 
  setActivePage, 
  onSelectProperty,
  currentUser 
}) {
  const [enquiryType, setEnquiryType] = useState('site-visit'); // 'site-visit', 'callback', 'documents', 'price-negotiation', 'home-loan'
  const [activePropId, setActivePropId] = useState(selectedProperty?.id || (PROPERTIES_DATA[0]?.id || '1'));
  
  const currentSelectedProp = PROPERTIES_DATA.find(p => p.id === activePropId) || selectedProperty || PROPERTIES_DATA[0];

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    visitDate: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    pickupRequired: true,
    pickupAddress: '',
    message: '',
    budget: '₹50 Lakhs - ₹1 Crore'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enquiryRefId, setEnquiryRefId] = useState('');

  const handleEnquirySubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your full name and mobile number.');
      return;
    }

    setLoading(true);

    const refId = `AGS-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnquiryRefId(refId);

    // Prepare visit/enquiry alert for Admin Dashboard
    const alertData = {
      id: refId,
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      clientEmail: formData.email.trim() || 'AGSGARDENCITY@gmail.com',
      propertyId: currentSelectedProp?.id,
      propertyTitle: currentSelectedProp?.title || 'General Enquiry',
      propertyLocation: currentSelectedProp?.location || 'Chennai',
      enquiryType: enquiryType,
      slotTime: `${formData.visitDate || 'Today'} (${formData.timeSlot})`,
      pickupAddress: formData.pickupRequired ? (formData.pickupAddress || 'Doorstep Pickup Requested') : 'Self-Drive',
      message: formData.message.trim(),
      budget: formData.budget,
      source: 'Dedicated Enquiry Page',
      createdAt: new Date().toISOString()
    };

    // Save alert into safeStorage so Shop Admin gets notified instantly
    safeStorage.addVisitAlert(alertData);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'left', padding: '0 16px 60px' }}>
      
      {/* Top 9-Step Workflow Breadcrumb */}
      <div 
        className="glass-panel"
        style={{
          padding: '12px 18px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(15, 17, 32, 0.9)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} 
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}
          >
            1. 🏠 Home
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button 
            onClick={() => { setActivePage('properties'); window.scrollTo(0, 0); }} 
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}
          >
            2. 🏘️ Properties
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            📝 Dedicated Property Enquiry (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>
            📞 24/7 Hotline: +91 73971 35792
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('properties'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            ← Properties Catalog
          </button>
          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('ai-finder'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}
          >
            3. AI Matcher →
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="section-tag" style={{ color: '#10b981', borderColor: '#10b981' }}>
          <Headphones size={13} /> 24/7 DEDICATED PROPERTY ENQUIRY & VIP SITE VISIT DESK
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '10px 0 8px', color: '#fff' }}>
          Enquire About <span className="gradient-text">AGS Garden City Residences</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Connect directly with our senior property advisors. Request instant 2-minute callbacks, book free doorstep luxury AC cabs for family site inspections, or receive verified RERA legal title documents.
        </p>

        {/* 24/7 Quick Contact Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          <a 
            href="tel:7397135792"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              textDecoration: 'none'
            }}
          >
            <Phone size={14} color="#10b981" /> 24 Hours Call: +91 73971 35792
          </a>

          <a 
            href="https://wa.me/917397135792?text=Hello%20AGS%20Garden%20City,%20I%20have%20an%20enquiry%20regarding%20properties"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(56, 189, 248, 0.2)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              textDecoration: 'none'
            }}
          >
            <MessageSquare size={14} color="#38bdf8" /> WhatsApp Specialist
          </a>

          <a 
            href="mailto:AGSGARDENCITY@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(168, 85, 247, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              textDecoration: 'none'
            }}
          >
            <Mail size={14} color="#c084fc" /> AGSGARDENCITY@gmail.com
          </a>
        </div>
      </div>

      {submitted ? (
        /* =========================================================================
            CONFIRMED ENQUIRY DIGITAL ACKNOWLEDGMENT PASS
           ========================================================================= */
        <div className="glass-panel" style={{ padding: '40px 30px', borderRadius: '24px', maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#10b981' }}>
            <CheckCircle2 size={40} />
          </div>

          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            OFFICIAL DIGITAL ACKNOWLEDGMENT PASS
          </span>
          <h2 style={{ fontSize: '28px', color: '#fff', margin: '6px 0 10px' }}>
            Enquiry Dispatched Successfully!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '560px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>! Your enquiry has been received and routed to our dedicated Senior Property Consultant.
          </p>

          {/* Reference Pass Summary Box */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '18px', padding: '24px', textAlign: 'left', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reference Pass Number</span>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#38bdf8' }}>{enquiryRefId}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</span>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>● Active & Assigned</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Client Name & Mobile:</span>
                <strong style={{ color: '#fff' }}>{formData.name} ({formData.phone})</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Selected Property:</span>
                <strong style={{ color: '#38bdf8' }}>{currentSelectedProp?.title || 'General Enquiry'}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Enquiry Category:</span>
                <strong style={{ color: '#c084fc', textTransform: 'capitalize' }}>{enquiryType.replace('-', ' ')}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Preferred Time Slot:</span>
                <strong style={{ color: '#fff' }}>{formData.visitDate || 'Immediate'} ({formData.timeSlot})</strong>
              </div>
            </div>

            {formData.pickupRequired && formData.pickupAddress && (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Complimentary Cab Pickup Address:</span>
                <strong style={{ color: '#10b981' }}>{formData.pickupAddress}</strong>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="glass-btn" 
              onClick={() => window.print()}
              style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '12px' }}
            >
              <Printer size={15} />
              <span>Print Acknowledgment Slip</span>
            </button>

            <button 
              className="glass-btn-secondary" 
              onClick={() => { setSubmitted(false); }}
              style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '12px' }}
            >
              <span>Submit Another Enquiry</span>
            </button>

            <button 
              className="glass-btn" 
              onClick={() => { setActivePage('properties'); window.scrollTo(0, 0); }}
              style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}
            >
              <span>Explore More Properties →</span>
            </button>
          </div>
        </div>
      ) : (
        /* =========================================================================
            MAIN 2-COLUMN INTERACTIVE ENQUIRY FORM
           ========================================================================= */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px', marginBottom: '40px' }}>
          
          {/* Left Column: Form & Enquiry Purpose Tabs */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '22px' }}>
            
            {/* Step 1: Select Enquiry Intent */}
            <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              STEP 1: SELECT YOUR ENQUIRY PURPOSE
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '24px' }}>
              {[
                { id: 'site-visit', label: '🚗 Free Cab Site Visit', icon: Car, desc: 'Doorstep AC pickup' },
                { id: 'callback', label: '📞 2-Min Callback', icon: Phone, desc: 'Senior advisor call' },
                { id: 'documents', label: '📄 RERA & Patta Docs', icon: FileText, desc: 'Legal verification' },
                { id: 'price-negotiation', label: '💰 Best Price Offer', icon: DollarSign, desc: 'Custom discount' },
                { id: 'home-loan', label: '🏦 Home Loan EMI', icon: Building2, desc: 'Bank pre-approval' }
              ].map((t) => {
                const isSelected = enquiryType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEnquiryType(t.id)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      background: isSelected ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(56, 189, 248, 0.25) 100%)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                      color: isSelected ? '#fff' : '#cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: isSelected ? '#10b981' : '#fff', marginBottom: '2px' }}>
                      {t.label}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 2: Target Residence Selector */}
            <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              STEP 2: SELECT RESIDENCE OR PROJECT
            </span>

            <div style={{ marginBottom: '20px' }}>
              <select
                className="glass-input"
                value={activePropId}
                onChange={(e) => setActivePropId(e.target.value)}
                style={{ width: '100%', fontSize: '13px', padding: '10px 14px' }}
              >
                {PROPERTIES_DATA.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} • {p.type} ({p.location}) - {p.offerPrice || p.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Contact & Visit Timing Details */}
            <form onSubmit={handleEnquirySubmit}>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                STEP 3: YOUR CONTACT & APPOINTMENT DETAILS
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="auth-field-group">
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

                <div className="auth-field-group">
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="auth-field-group">
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

                <div className="auth-field-group">
                  <label className="field-label">Preferred Date of Visit / Inspection</label>
                  <input 
                    type="date" 
                    className="glass-input"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="auth-field-group">
                  <label className="field-label">Preferred Time Slot</label>
                  <select 
                    className="glass-input"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Immediate 24/7 Callback">Immediate 24/7 Callback (Within 2 Mins)</option>
                  </select>
                </div>

                <div className="auth-field-group">
                  <label className="field-label">Target Investment Budget</label>
                  <select 
                    className="glass-input"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                    <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                    <option value="₹2 Crore - ₹3.5 Crore">₹2 Crore - ₹3.5 Crore</option>
                    <option value="Above ₹3.5 Crore (Ultra Luxury)">Above ₹3.5 Crore (Ultra Luxury)</option>
                  </select>
                </div>
              </div>

              {/* Free Doorstep Cab Toggle */}
              {enquiryType === 'site-visit' && (
                <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '16px', borderRadius: '14px', border: '1px dashed rgba(56, 189, 248, 0.3)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Car size={18} color="#38bdf8" />
                      <strong style={{ fontSize: '13px', color: '#fff' }}>Complimentary Doorstep Luxury AC Cab Pickup</strong>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.pickupRequired} 
                        onChange={(e) => setFormData({ ...formData, pickupRequired: e.target.checked })}
                      />
                      <span>Yes, arrange cab</span>
                    </label>
                  </div>
                  
                  {formData.pickupRequired && (
                    <input 
                      type="text" 
                      placeholder="Enter pickup address / landmark (e.g. Near Porur Roundtana, Chennai)"
                      className="glass-input"
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                      style={{ width: '100%', fontSize: '12px' }}
                    />
                  )}
                </div>
              )}

              {/* Specific Requirements / Notes */}
              <div className="auth-field-group" style={{ marginBottom: '20px' }}>
                <label className="field-label">Special Requirements / Questions for Property Specialist</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Interested in high floor east-facing 3 BHK. Want to check CMDA legal documents and flexible bank payment schedule."
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
                <span>{loading ? 'Transmitting Enquiry...' : 'Dispatch VIP Enquiry & Schedule Inspection →'}</span>
              </button>
            </form>

          </div>

          {/* Right Column: Selected Property Showcase & 24/7 Guarantees */}
          <div>
            
            {/* Selected Property Preview Card */}
            {currentSelectedProp && (
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>
                  Target Residence Selected
                </span>
                
                <div style={{ position: 'relative', height: '160px', borderRadius: '14px', overflow: 'hidden', margin: '10px 0' }}>
                  <img 
                    src={currentSelectedProp.image} 
                    alt={currentSelectedProp.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, color: '#38bdf8' }}>
                    {currentSelectedProp.type}
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', color: '#fff', margin: '4px 0 6px' }}>
                  {currentSelectedProp.title}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '10px' }}>
                  <MapPin size={13} color="#38bdf8" />
                  <span>{currentSelectedProp.location}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Valuation:</span>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>
                    {currentSelectedProp.offerPrice || currentSelectedProp.price}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="glass-btn-secondary"
                    onClick={() => {
                      if (onSelectProperty) onSelectProperty(currentSelectedProp);
                      setActivePage('property-detail');
                      window.scrollTo(0, 0);
                    }}
                    style={{ width: '100%', padding: '8px', fontSize: '12px', justifyContent: 'center' }}
                  >
                    <span>View 3D Rooms & Specs</span>
                  </button>
                </div>
              </div>
            )}

            {/* 24/7 Service Guarantees Card */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#10b981" /> AGS Garden City Guarantees
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={16} />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'block' }}>100% CMDA & RERA Approved</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Clean legal titles, zero encumbrance Patta guaranteed</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}>
                    <Car size={16} />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'block' }}>Complimentary Family Cab Pickup</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Doorstep luxury pickup & drop across Chennai</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', flexShrink: 0, marginTop: '2px' }}>
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'block' }}>Direct Builder Pricing & Zero Brokerage</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Transparent pricing with zero hidden consultancy fees</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Embedded Google Map Section for Prime Chennai Hubs */}
      <div style={{ marginTop: '20px' }}>
        <GoogleMapView 
          locationName={currentSelectedProp?.location || 'Porur, Chennai'}
          title="📍 AGS Garden City Inspection Locations on Google Maps"
          height="380px"
          showTransitDetails={true}
        />
      </div>

    </div>
  );
}

export default EnquiryPage;
