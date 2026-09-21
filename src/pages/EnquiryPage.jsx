import React, { useState, useEffect } from 'react';
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
  UserCheck,
  Eye,
  X,
  Award,
  ExternalLink
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/propertiesData';
import safeStorage from '../utils/safeStorage';
import GoogleMapView from '../components/GoogleMapView';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';

function EnquiryPage({ 
  selectedProperty, 
  setActivePage, 
  onSelectProperty,
  currentUser 
}) {
  const [enquiryType, setEnquiryType] = useState('site-visit'); // 'site-visit', 'callback', 'documents', 'price-negotiation', 'home-loan'
  const [showDocsModal, setShowDocsModal] = useState(false);
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

  const customerDisplayName = formData.name.trim() || currentUser?.name || 'Marish';
  const [showLoanModal, setShowLoanModal] = useState(false);

  // Dynamic calculation for SBI Home Loan Sanction
  const propertyPriceVal = React.useMemo(() => {
    const rawPrice = currentSelectedProp?.offerPrice || currentSelectedProp?.price || '₹48,00,000';
    const num = parseInt(rawPrice.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) || num <= 0 ? 4800000 : num;
  }, [currentSelectedProp]);

  // 85% Pre-Approved Loan Amount
  const sanctionedLoanAmount = Math.round(propertyPriceVal * 0.85);
  // 15% Margin Money (Down Payment)
  const marginMoneyAmount = propertyPriceVal - sanctionedLoanAmount;

  // Monthly EMI for 20 years (240 months) @ 8.35% p.a.
  const monthlyEmiVal = React.useMemo(() => {
    const P = sanctionedLoanAmount;
    const r = (8.35 / 12) / 100;
    const n = 240;
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return isNaN(emi) ? 35000 : emi;
  }, [sanctionedLoanAmount]);

  // Manage dossier-modal-active class on body for clean A4 print view
  useEffect(() => {
    if (showDocsModal || showLoanModal) {
      document.body.classList.add('dossier-modal-active');
    } else {
      document.body.classList.remove('dossier-modal-active');
    }
    return () => {
      document.body.classList.remove('dossier-modal-active');
    };
  }, [showDocsModal, showLoanModal]);

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
          Enquire About <span className="gradient-text">AGS NEST Residences</span>
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

          <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        <div className="enquiry-layout-grid" style={{ marginBottom: '40px' }}>
          
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
                    onClick={() => {
                      setEnquiryType(t.id);
                      if (t.id === 'documents') {
                        setShowDocsModal(true);
                      }
                      if (t.id === 'home-loan') {
                        setShowLoanModal(true);
                      }
                    }}
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

            {/* Interactive RERA & Patta Quick Action Preview Banner */}
            {enquiryType === 'documents' && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(56, 189, 248, 0.18) 100%)',
                  border: '1.5px solid #10b981',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}>
                    <FileText size={22} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.04em' }}>
                      ✓ OFFICIAL RERA & PATTA LEGAL VERIFICATION KIT
                    </div>
                    <strong style={{ fontSize: '14px', color: '#fff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Prepared For Customer: <span style={{ color: '#38bdf8' }}>{customerDisplayName}</span>
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {currentSelectedProp?.title} • TN RERA Reg: TN/29/Building/0189/2026 • e-Patta #4892
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="glass-btn"
                  onClick={() => setShowDocsModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontSize: '12px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 800,
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <Eye size={15} />
                  <span>View Full RERA & Patta Details ↗</span>
                </button>
              </div>
            )}

            {/* Interactive SBI Home Loan Sanction Quick Action Preview Banner */}
            {enquiryType === 'home-loan' && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 114, 188, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                  border: '1.5px solid #00b5ef',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 4px 20px rgba(0, 114, 188, 0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0072bc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 15px rgba(0, 114, 188, 0.6)' }}>
                    <Building2 size={22} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.04em' }}>
                      ✓ STATE BANK OF INDIA PRE-APPROVED HOME LOAN
                    </div>
                    <strong style={{ fontSize: '14px', color: '#fff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Sanctioned For Applicant: <span style={{ color: '#38bdf8' }}>{customerDisplayName}</span>
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Pre-Approved: ₹{(sanctionedLoanAmount / 100000).toFixed(2)} Lakhs (85%) @ 8.35% p.a. • EMI: ₹{monthlyEmiVal.toLocaleString('en-IN')}/mo • 0% Proc Fee
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="glass-btn"
                  onClick={() => setShowLoanModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #0072bc 0%, #0284c7 100%)',
                    fontSize: '12px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 800,
                    boxShadow: '0 4px 15px rgba(0, 114, 188, 0.4)'
                  }}
                >
                  <Eye size={15} />
                  <span>View SBI Sanction & Manager Seal ↗</span>
                </button>
              </div>
            )}

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

              <div className="form-row-2col" style={{ marginBottom: '14px' }}>
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

              <div className="form-row-2col" style={{ marginBottom: '14px' }}>
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

              <div className="form-row-2col" style={{ marginBottom: '14px' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))', gap: '6px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="glass-btn-secondary"
                    onClick={() => {
                      if (onSelectProperty) onSelectProperty(currentSelectedProp);
                      setActivePage('property-detail');
                      window.scrollTo(0, 0);
                    }}
                    style={{ padding: '8px 4px', fontSize: '11px', justifyContent: 'center' }}
                  >
                    <span>3D Rooms</span>
                  </button>

                  <button
                    type="button"
                    className="glass-btn"
                    onClick={() => setShowDocsModal(true)}
                    style={{ 
                      padding: '8px 4px', 
                      fontSize: '11px', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 700
                    }}
                    title="View Certified RERA & Patta Documents"
                  >
                    <FileText size={13} />
                    <span>RERA Docs</span>
                  </button>

                  <button
                    type="button"
                    className="glass-btn"
                    onClick={() => setShowLoanModal(true)}
                    style={{ 
                      padding: '8px 4px', 
                      fontSize: '11px', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #0072bc 0%, #0284c7 100%)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 700
                    }}
                    title="View State Bank of India Home Loan Approval & Seal"
                  >
                    <Building2 size={13} />
                    <span>SBI Loan ↗</span>
                  </button>
                </div>
              </div>
            )}

            {/* 24/7 Service Guarantees Card */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#10b981" /> AGS NEST Guarantees
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
          title="📍 AGS NEST Inspection Locations on Google Maps"
          height="380px"
          showTransitDetails={true}
        />
      </div>

      {/* =========================================================================
          MODAL: OFFICIAL RERA & PATTA LEGAL DOCUMENTS & CLEARANCE DOSSIER
         ========================================================================= */}
      {showDocsModal && (
        <div className="glass-modal-overlay" onClick={() => setShowDocsModal(false)}>
          <div 
            className="glass-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '840px', 
              padding: '16px',
              background: 'rgba(15, 23, 42, 0.96)',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            {/* Top Action Controls Bar (Hidden in Print) */}
            <div 
              className="dossier-modal-top-bar no-print"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="section-tag" style={{ color: '#10b981', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} /> 100% CMDA & TN RERA VERIFIED LEGAL DOSSIER
                </span>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800 }}>
                  👤 Issued To: {customerDisplayName}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="glass-btn" 
                  onClick={() => window.print()}
                  style={{
                    padding: '6px 14px', 
                    fontSize: '12px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontWeight: 700
                  }}
                  title="Print Official TN RERA & Patta Legal Certificate"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>

                <button 
                  className="modal-close-btn" 
                  onClick={() => setShowDocsModal(false)}
                  style={{ position: 'static', padding: '6px' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Customer Name Quick Edit / Confirm Strip (Hidden in Print) */}
            <div 
              className="no-print"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '12px',
                padding: '8px 14px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Customer Name:</span>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter customer name (e.g. Marish)"
                  className="glass-input"
                  style={{ padding: '4px 10px', fontSize: '12px', height: 'auto', flex: 1, color: '#38bdf8', fontWeight: 800 }}
                />
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                ✓ Live synchronized with legal certificate
              </span>
            </div>

            {/* ===================================================================
                OFFICIAL A4 PRINTABLE LEGAL DOSSIER PAPER CONTAINER
               =================================================================== */}
            <div 
              id="printableDossier" 
              className="dossier-paper-container"
              style={{
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '2px solid #0f172a',
                boxSizing: 'border-box'
              }}
            >
              {/* Top Letterhead Bar */}
              <div className="dossier-letterhead">
                <div className="dossier-brand-group">
                  <div className="dossier-logo-box">
                    <img 
                      src={AGS_LOGO_BASE64} 
                      alt="AGS NEST Logo" 
                      className="dossier-logo-img" 
                    />
                  </div>
                  <div>
                    <h1 className="dossier-main-title">AGS NEST REAL ESTATE DEVELOPERS</h1>
                    <div className="dossier-sub-tag">GOVERNMENT OF TAMIL NADU • STATUTORY RERA & REVENUE PATTA DISCLOSURE</div>
                    <div className="dossier-meta-text">Corporate Reg: U70109TN2026PTC148921 • GSTIN: 33AAACG8941K1Z8 • Chennai HQ: Mount Road, Guindy</div>
                  </div>
                </div>

                <div className="dossier-ref-badge-box">
                  <div className="dossier-doc-type">LEGAL TITLE DOSSIER REF</div>
                  <div className="dossier-ref-number">TNRERA/DOC-{(currentSelectedProp?.id || '101')}89</div>
                  <div className="dossier-issue-date">Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <span className="dossier-status-pill">✓ 100% CLEAR TITLE & PATTA</span>
                </div>
              </div>

              {/* Customer Allotment & Statutory Bar */}
              <div className="dossier-license-bar">
                <span>CLIENT / BUYER: <strong style={{ color: '#0284c7', fontSize: '12.5px' }}>{customerDisplayName.toUpperCase()}</strong></span>
                <span>MOBILE: <strong>{formData.phone || '+91 73971 35792'}</strong></span>
                <span>PURPOSE: <strong>RERA & Patta Legal Due Diligence</strong></span>
                <span>STATUS: <strong style={{ color: '#047857' }}>✓ CERTIFIED ALLOTTEE COPY</strong></span>
              </div>

              {/* Middle 2-Column Expanding Legal Clearances Grid */}
              <div className="dossier-grid">
                {/* Card 1: Statutory RERA Registration */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>1. TN RERA Registration & Project Sanction</span>
                    <span className="dossier-chip" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' }}>
                      ✓ RERA REGISTERED
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">TNRERA Reg No:</span>
                      <span className="dossier-val bold" style={{ color: '#0284c7' }}>TN/29/Building/0189/2026</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Registered Project:</span>
                      <span className="dossier-val bold">{currentSelectedProp?.title}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Project Location:</span>
                      <span className="dossier-val">{currentSelectedProp?.location}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Sanction Validity:</span>
                      <span className="dossier-val">Through 31-Dec-2030 (Active)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">RERA Dedicated Escrow:</span>
                      <span className="dossier-val">State Bank of India A/C #4102984129</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Public Portal Verification:</span>
                      <span className="dossier-val" style={{ color: '#047857' }}>https://rera.tn.gov.in</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: CMDA / DTCP Planning Permission */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>2. CMDA & GCC Planning Authority Clearance</span>
                    <span className="dossier-chip" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #3b82f6' }}>
                      ✓ CMDA APPROVED
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Planning Permit (PP) No:</span>
                      <span className="dossier-val bold">CMDA/PP/MSB/2026/0491</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Local Body Order:</span>
                      <span className="dossier-val">Greater Chennai Corp #4412/2026</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Zoning Classification:</span>
                      <span className="dossier-val">Residential Mixed Development Zone</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Layout Sanction No:</span>
                      <span className="dossier-val">P.P.D/L.O. No. 84/2026</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">OSR Gift Deed:</span>
                      <span className="dossier-val">10% OSR Park Land Gifted to GCC</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Access Road Width:</span>
                      <span className="dossier-val">40 Feet Blacktop Tar Road Handed Over</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Revenue e-Patta & Survey Records */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>3. Revenue Department e-Patta & Land Records</span>
                    <span className="dossier-chip" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' }}>
                      ✓ e-PATTA ISSUED
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Revenue Patta Passbook:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>e-Patta #4892 (Zonal Tahsildar Verified)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Survey / T.S. Numbers:</span>
                      <span className="dossier-val">Survey No. 284/3A, 284/3B, Ward D</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Revenue Taluk / District:</span>
                      <span className="dossier-val">Kundrathur Taluk, Chennai South</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Land Title Tenure:</span>
                      <span className="dossier-val bold">Ryotwari Manai (Freehold Land)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Chitta & Adangal Extract:</span>
                      <span className="dossier-val">Verified Clean on TN e-Services Portal</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Sub-Registrar Jurisdiction:</span>
                      <span className="dossier-val">SRO Kundrathur / Chennai South</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: 30-Year Encumbrance Certificate & Bank APF */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>4. 30-Year EC & Bank Project Approvals</span>
                    <span className="dossier-chip" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' }}>
                      ✓ NIL ENCUMBRANCE
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">EC Search Period:</span>
                      <span className="dossier-val bold">1996 to 2026 (30 Consecutive Years)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">SRO EC Certificate No:</span>
                      <span className="dossier-val">EC-CHN-2026-90412 (Sub-Registrar)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Encumbrance Finding:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>NIL (Zero Liens / Zero Mortgages)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">High Court Legal Opinion:</span>
                      <span className="dossier-val">Cleared by M/s. Sundaram & Partners</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Approved Home Loan Banks:</span>
                      <span className="dossier-val bold">SBI (APF #8821), HDFC, ICICI, Axis</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Certified Valuation:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>{currentSelectedProp?.offerPrice || currentSelectedProp?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Signatures, Seal & Barcode Bar */}
              <div className="dossier-seal-section">
                {/* Left: Customer / Buyer Signature (Personalized for customerDisplayName) */}
                <div className="dossier-sign-block dossier-sign-left">
                  <div className="dossier-signature-img-box customer-sig-box">
                    <svg width="150" height="38" viewBox="0 0 150 38" style={{ overflow: 'visible' }}>
                      <text 
                        x="5" 
                        y="26" 
                        fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', 'Dancing Script', 'Great Vibes', cursive" 
                        fontSize="23" 
                        fontStyle="italic" 
                        fontWeight="600" 
                        fill="#1d4ed8"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {customerDisplayName}
                      </text>
                      <path 
                        d="M6 30 Q 55 36 135 28" 
                        fill="none" 
                        stroke="#1d4ed8" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Verified Customer / Allottee</div>
                  <div className="dossier-sign-sub">{customerDisplayName}</div>
                </div>

                {/* Center: Official AGS NEST Corporate Stamp Seal */}
                <div className="dossier-stamp-box">
                  <div className="dossier-stamp-seal">
                    <span>AGS NEST</span>
                    <strong>OFFICIALLY SEALED</strong>
                    <span>CHENNAI • 2026</span>
                  </div>
                </div>

                {/* Right: Authorized Legal Director Signature */}
                <div className="dossier-sign-block dossier-sign-right">
                  <div className="dossier-signature-img-box director-sig-box">
                    <svg width="160" height="38" viewBox="0 0 160 38" style={{ overflow: 'visible' }}>
                      <text 
                        x="15" 
                        y="25" 
                        fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', 'Dancing Script', 'Great Vibes', cursive" 
                        fontSize="22" 
                        fontStyle="italic" 
                        fontWeight="700" 
                        fill="#0f172a"
                        style={{ letterSpacing: '0.03em' }}
                      >
                        S. Rajendran
                      </text>
                      <path 
                        d="M14 28 Q 70 36 148 27 C 154 25, 156 18, 144 22" 
                        fill="none" 
                        stroke="#0f172a" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Authorized Legal Officer / Director</div>
                  <div className="dossier-sign-sub">AGS Real Estate Developers Pvt Ltd</div>
                </div>
              </div>

              {/* Barcode & Legal Clearance Footnote */}
              <div className="dossier-footnote">
                <div className="dossier-barcode-text">
                  ||||| | |||| ||||| |||| || ||||| |||||| ||||| ||||||| TN-RERA-PATTA-{(currentSelectedProp?.id || '101')}89-2026 |||||
                </div>
                <p>
                  This official statutory RERA registration and Patta title verification dossier is electronically certified for prospective buyer <strong>{customerDisplayName}</strong> under Section 11(4) of the Real Estate (Regulation & Development) Act, 2016. Guaranteed 100% clean marketable freehold title.
                </p>
              </div>
            </div>

            {/* Bottom Modal Close / Print Actions (Hidden in Print) */}
            <div className="no-print" style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="glass-btn" 
                onClick={() => window.print()}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  fontWeight: 700,
                  padding: '10px 22px'
                }}
              >
                <Printer size={16} /> Print Official Legal Certificate
              </button>

              <button 
                className="glass-btn-secondary" 
                onClick={() => setShowDocsModal(false)}
                style={{ padding: '10px 20px' }}
              >
                Close & Continue Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: STATE BANK OF INDIA (SBI) OFFICIAL HOME LOAN PRE-APPROVAL SANCTION
         ========================================================================= */}
      {showLoanModal && (
        <div className="glass-modal-overlay" onClick={() => setShowLoanModal(false)}>
          <div 
            className="glass-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '840px', 
              padding: '16px',
              background: 'rgba(15, 23, 42, 0.96)',
              borderRadius: '20px',
              border: '1.5px solid #0072bc',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            {/* Top Action Controls Bar (Hidden in Print) */}
            <div 
              className="dossier-modal-top-bar no-print"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="section-tag" style={{ color: '#00b5ef', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={14} /> STATE BANK OF INDIA OFFICIAL HOME LOAN PRE-APPROVAL
                </span>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800 }}>
                  👤 Applicant: {customerDisplayName} • CIBIL: 785
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="glass-btn" 
                  onClick={() => window.print()}
                  style={{
                    padding: '6px 14px', 
                    fontSize: '12px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: 'linear-gradient(135deg, #0072bc 0%, #0284c7 100%)',
                    fontWeight: 700
                  }}
                  title="Print Official State Bank of India Sanction Letter"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>

                <button 
                  className="modal-close-btn" 
                  onClick={() => setShowLoanModal(false)}
                  style={{ position: 'static', padding: '6px' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Customer Name Quick Edit / Confirm Strip (Hidden in Print) */}
            <div 
              className="no-print"
              style={{
                background: 'rgba(0, 114, 188, 0.1)',
                border: '1px solid rgba(0, 181, 239, 0.3)',
                borderRadius: '12px',
                padding: '8px 14px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Applicant Name:</span>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter applicant name (e.g. Marish)"
                  className="glass-input"
                  style={{ padding: '4px 10px', fontSize: '12px', height: 'auto', flex: 1, color: '#38bdf8', fontWeight: 800 }}
                />
              </div>
              <span style={{ fontSize: '11px', color: '#00b5ef', fontWeight: 700 }}>
                ✓ Synchronized with SBI Sanction Letter & Cursive Signature
              </span>
            </div>

            {/* ===================================================================
                OFFICIAL A4 PRINTABLE SBI HOME LOAN SANCTION PAPER CONTAINER
               =================================================================== */}
            <div 
              id="printableDossier" 
              className="dossier-paper-container"
              style={{
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '2px solid #002868',
                boxSizing: 'border-box'
              }}
            >
              {/* Top Letterhead Bar */}
              <div className="dossier-letterhead" style={{ borderBottom: '2px solid #002868' }}>
                <div className="dossier-brand-group">
                  <div className="dossier-logo-box" style={{ border: '2px solid #0072bc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Official State Bank of India Keyhole Vector Emblem */}
                    <svg width="44" height="44" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="#0072bc" />
                      <circle cx="50" cy="40" r="16" fill="#ffffff" />
                      <rect x="44" y="40" width="12" height="38" fill="#ffffff" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="dossier-main-title" style={{ color: '#002868' }}>STATE BANK OF INDIA (भारतीय स्टेट बैंक)</h1>
                    <div className="dossier-sub-tag" style={{ color: '#0072bc' }}>RETAIL ASSETS CENTRAL PROCESSING CENTRE (RACPC) — SOUTH CHENNAI</div>
                    <div className="dossier-meta-text">No. 24, Whites Road, Royapettah, Chennai 600014 • Branch Code: 04819 • IFSC: SBIN0004819 • Call: 1800 1234</div>
                  </div>
                </div>

                <div className="dossier-ref-badge-box">
                  <div className="dossier-doc-type">SBI SANCTION ADVICE REF</div>
                  <div className="dossier-ref-number" style={{ color: '#002868' }}>SBI/RACPC/HL-SAN-{(currentSelectedProp?.id || '101')}941/2026</div>
                  <div className="dossier-issue-date">Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <span className="dossier-status-pill" style={{ background: '#eff6ff', color: '#002868', borderColor: '#0072bc' }}>
                    ✓ 100% PRE-APPROVED SANCTION
                  </span>
                </div>
              </div>

              {/* Customer Allotment & Loan Parameter Bar */}
              <div className="dossier-license-bar" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
                <span>APPLICANT / BORROWER: <strong style={{ color: '#002868', fontSize: '12.5px' }}>{customerDisplayName.toUpperCase()}</strong></span>
                <span>MOBILE: <strong>{formData.phone || '+91 73971 35792'}</strong></span>
                <span>CIBIL SCORE: <strong style={{ color: '#047857' }}>785 (Tier-1 Prime)</strong></span>
                <span>APPROVAL: <strong style={{ color: '#0072bc' }}>✓ IN-PRINCIPLE SANCTIONED</strong></span>
              </div>

              {/* Middle 2-Column Expanding Legal Clearances Grid */}
              <div className="dossier-grid">
                {/* Card 1: Property Cost & Sanctioned Loan Limit */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>1. Property Cost & Sanctioned Loan Limit</span>
                    <span className="dossier-chip" style={{ background: '#eff6ff', color: '#0072bc', border: '1px solid #0072bc' }}>
                      ✓ 85% FUNDING
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Financed Project:</span>
                      <span className="dossier-val bold">{currentSelectedProp?.title}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Total Agreement Value:</span>
                      <span className="dossier-val bold">{currentSelectedProp?.offerPrice || currentSelectedProp?.price}</span>
                    </div>
                    <div className="dossier-row highlight-amount" style={{ background: '#eff6ff', borderColor: '#93c5fd' }}>
                      <span className="dossier-lbl" style={{ color: '#002868', fontWeight: 800 }}>In-Principle Sanctioned Loan:</span>
                      <span className="dossier-amount" style={{ color: '#002868' }}>₹{sanctionedLoanAmount.toLocaleString('en-IN')} (85%)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Margin Money (Borrower 15%):</span>
                      <span className="dossier-val bold">₹{marginMoneyAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">SBI Project APF Sanction Code:</span>
                      <span className="dossier-val bold" style={{ color: '#0072bc' }}>APF #SBI/CHN/2026/88419 (AGS NEST Approved)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Disbursement Mode:</span>
                      <span className="dossier-val">Staged Escrow Payment to Builder</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Concessional Interest Rate & Charges */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>2. Special SBI Corporate Interest Rate</span>
                    <span className="dossier-chip" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' }}>
                      ✓ 8.35% p.a.
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Concessional Interest Rate:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>8.35% p.a. (Special Tie-Up Scheme)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Benchmark Index Spread:</span>
                      <span className="dossier-val">EBLR 8.20% + 0.15% Spread (Floating)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Loan Processing Charges:</span>
                      <span className="dossier-val bold" style={{ color: '#0072bc' }}>₹0 (100% Processing Fee WAIVED)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Prepayment / Foreclosure Penalty:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>NIL (Zero Foreclosure Charges)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Legal & Technical Valuation Fee:</span>
                      <span className="dossier-val">NIL (Absorbed under AGS NEST Tie-Up)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Income Tax Rebate:</span>
                      <span className="dossier-val">Eligible under Sec 24(b) & Sec 80C</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Repayment Tenure & Monthly EMI Schedule */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>3. Repayment Tenure & Monthly EMI Schedule</span>
                    <span className="dossier-chip" style={{ background: '#eff6ff', color: '#002868', border: '1px solid #0072bc' }}>
                      ✓ 20 YEARS TENURE
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Repayment Tenure:</span>
                      <span className="dossier-val bold">240 Months (20 Years) / Max 360 Months</span>
                    </div>
                    <div className="dossier-row highlight-amount" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                      <span className="dossier-lbl" style={{ color: '#047857', fontWeight: 800 }}>Monthly Calculated EMI:</span>
                      <span className="dossier-amount" style={{ color: '#047857' }}>₹{monthlyEmiVal.toLocaleString('en-IN')} / month</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Repayment Mode:</span>
                      <span className="dossier-val">SBI NACH E-Mandate / Auto-Debit</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">First EMI Due Date:</span>
                      <span className="dossier-val">5th of Next Calendar Month Post-Disbursal</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Online Part-Payment Facility:</span>
                      <span className="dossier-val">Unlimited Free Part-Payments via YONO</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Branch Credit Officer:</span>
                      <span className="dossier-val">K. Ramaswamy (RACPC South Chennai)</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Property Mortgage & Legal Title Clearances */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>4. Property Mortgage & Legal Title Clearances</span>
                    <span className="dossier-chip" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' }}>
                      ✓ 100% TITLE APPROVED
                    </span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Security / Collateral:</span>
                      <span className="dossier-val bold">Equitable Mortgage of {currentSelectedProp?.title}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">SBI Panel Legal Opinion:</span>
                      <span className="dossier-val bold" style={{ color: '#047857' }}>Clear Title by M/s. Sundaram & Partners</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Technical Site Valuation:</span>
                      <span className="dossier-val">100% Verified by SBI Panel Engineers</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Loan Protection Insurance:</span>
                      <span className="dossier-val">SBI Life RiNn Raksha Comprehensive Coverage</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Sanction Validity Period:</span>
                      <span className="dossier-val bold" style={{ color: '#002868' }}>60 Days (Valid Through 10-Nov-2026)</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Next Step for Disbursal:</span>
                      <span className="dossier-val">Execute Builder Agreement & Submit KYC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Signatures, SBI Seal & Barcode Bar */}
              <div className="dossier-seal-section" style={{ borderTop: '2px solid #002868' }}>
                {/* Left: Customer / Borrower Acceptance Block */}
                <div className="dossier-sign-block dossier-sign-left">
                  <div className="dossier-signature-img-box customer-sig-box">
                    <svg width="150" height="38" viewBox="0 0 150 38" style={{ overflow: 'visible' }}>
                      <text 
                        x="5" 
                        y="26" 
                        fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', 'Dancing Script', 'Great Vibes', cursive" 
                        fontSize="23" 
                        fontStyle="italic" 
                        fontWeight="600" 
                        fill="#1d4ed8"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {customerDisplayName}
                      </text>
                      <path 
                        d="M6 30 Q 55 36 135 28" 
                        fill="none" 
                        stroke="#1d4ed8" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Borrower / Applicant Acceptance</div>
                  <div className="dossier-sign-sub">{customerDisplayName}</div>
                </div>

                {/* Center: Official State Bank of India Stamp Seal */}
                <div className="dossier-stamp-box">
                  <div 
                    className="dossier-stamp-seal"
                    style={{
                      borderColor: '#0072bc',
                      color: '#0072bc',
                      boxShadow: 'inset 0 0 0 2px #0072bc, 0 0 15px rgba(0, 114, 188, 0.25)',
                      transform: 'rotate(-2deg)'
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 100 100" style={{ marginBottom: '2px' }}>
                      <circle cx="50" cy="50" r="48" fill="#0072bc" />
                      <circle cx="50" cy="40" r="16" fill="#ffffff" />
                      <rect x="44" y="40" width="12" height="38" fill="#ffffff" />
                    </svg>
                    <span style={{ fontSize: '7.5px', letterSpacing: '0.06em', color: '#0072bc' }}>STATE BANK OF INDIA</span>
                    <strong style={{ fontSize: '9px', color: '#002868' }}>OFFICIALLY SANCTIONED</strong>
                    <span style={{ fontSize: '7.5px', color: '#0072bc' }}>RACPC CHENNAI • 2026</span>
                  </div>
                </div>

                {/* Right: SBI Chief Manager Signature Block */}
                <div className="dossier-sign-block dossier-sign-right">
                  <div className="dossier-signature-img-box director-sig-box">
                    <svg width="170" height="38" viewBox="0 0 170 38" style={{ overflow: 'visible' }}>
                      <text 
                        x="10" 
                        y="26" 
                        fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', 'Dancing Script', 'Great Vibes', cursive" 
                        fontSize="23" 
                        fontStyle="italic" 
                        fontWeight="700" 
                        fill="#002868"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        K. Ramaswamy
                      </text>
                      <path 
                        d="M10 29 Q 75 38 155 26 C 162 24, 160 16, 146 20" 
                        fill="none" 
                        stroke="#002868" 
                        strokeWidth="2.2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Chief Manager & Branch Head</div>
                  <div className="dossier-sign-sub">RACPC South Chennai, State Bank of India</div>
                </div>
              </div>

              {/* Barcode & Banking Disbursal Footnote */}
              <div className="dossier-footnote">
                <div className="dossier-barcode-text">
                  ||||| | |||| ||||| |||| || ||||| |||||| ||||| ||||||| SBI-HL-SAN-{(currentSelectedProp?.id || '101')}941-2026 |||||
                </div>
                <p>
                  This official in-principle home loan sanction letter is electronically issued by State Bank of India for applicant <strong>{customerDisplayName}</strong> for the purchase of <strong>{currentSelectedProp?.title}</strong>. Loan disbursal is subject to execution of standard SBI loan documents and verification of original title deeds.
                </p>
              </div>
            </div>

            {/* Bottom Modal Close / Print Actions (Hidden in Print) */}
            <div className="no-print" style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="glass-btn" 
                onClick={() => window.print()}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'linear-gradient(135deg, #0072bc 0%, #0284c7 100%)', 
                  fontWeight: 700,
                  padding: '10px 22px'
                }}
              >
                <Printer size={16} /> Print Official SBI Sanction Letter
              </button>

              <button 
                className="glass-btn-secondary" 
                onClick={() => setShowLoanModal(false)}
                style={{ padding: '10px 20px' }}
              >
                Close & Continue Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EnquiryPage;
