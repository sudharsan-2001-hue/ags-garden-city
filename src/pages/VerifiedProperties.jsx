import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Building2, 
  Lock, 
  Award, 
  Compass, 
  DollarSign, 
  MapPin, 
  Check,
  Zap,
  PhoneCall
} from 'lucide-react';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA } from '../data/propertiesData';

function VerifiedProperties({ 
  setActivePage, 
  onSelectProperty, 
  onBookProperty, 
  onEnquire 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter 100% verified properties
  const verifiedListings = PROPERTIES_DATA.filter(p => p.verified === true);
  const filteredListings = selectedCategory === 'all'
    ? verifiedListings
    : verifiedListings.filter(p => p.category === selectedCategory);

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px 60px' }}>
      
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
          <button onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            1. 🏠 Home
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { setActivePage('properties'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            2. 🏘️ Properties
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { setActivePage('saved'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            6. ❤️ Saved
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            7.  Verified Properties (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { setActivePage('property-detail'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            9. 🏡 Details
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('saved'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            <ArrowLeft size={13} /> Step 6: Saved
          </button>
          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}
          >
            Go to Details / Home →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="section-top-header" style={{ marginBottom: '28px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#10b981', borderColor: '#10b981' }}>
            <ShieldCheck size={14} /> 100% CMDA & TN RERA LEGAL DUE DILIGENCE
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '36px' }}>
            7.  100% Legally <span className="gradient-text">Verified Residences</span>
          </h1>
          <p className="section-subtext" style={{ fontSize: '15px', maxWidth: '800px' }}>
            Every home, villa, plot, and penthouse on this page has passed our 7-tier legal audit including Patta clearance, EC verification, structural certification, and bank pre-approval.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Verification */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '12px' }}>
            <FileText size={20} />
          </div>
          <h4 style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px' }}>Clear Legal Title & Patta</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            30-year Encumbrance Certificate verified with zero disputes or litigations.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '12px' }}>
            <Award size={20} />
          </div>
          <h4 style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px' }}>CMDA / DTCP & RERA</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            Official government layout sanctions with approved FSI and building permits.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '12px' }}>
            <Building2 size={20} />
          </div>
          <h4 style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px' }}>90% Bank Pre-Approved</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            Instant home loan approvals via SBI, HDFC, ICICI, and Axis Bank.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '12px' }}>
            <ShieldCheck size={20} />
          </div>
          <h4 style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px' }}>Architectural Quality</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            On-site physical inspection of CPVC plumbing, electrical wiring & finishings.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        {[
          { id: 'all', label: ' All Verified ({verifiedListings.length})' },
          { id: 'apartment', label: '🏢 Apartments' },
          { id: 'villa', label: '🏡 Luxury Villas' },
          { id: 'sea-view', label: '🌊 Sea View' },
          { id: 'penthouse', label: '✨ Penthouses' },
          { id: 'plot', label: '🌳 CMDA Plots' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`glass-btn-secondary ${selectedCategory === tab.id ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: '20px',
              background: selectedCategory === tab.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.05)',
              borderColor: selectedCategory === tab.id ? '#10b981' : 'rgba(255,255,255,0.1)',
              color: selectedCategory === tab.id ? '#fff' : 'var(--text-muted)',
              fontWeight: selectedCategory === tab.id ? 800 : 500,
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Property Cards Grid */}
      <div className="property-cards-grid" style={{ marginBottom: '48px' }}>
        {filteredListings.map(property => (
          <div key={property.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <Propertycard 
              property={property}
              onSelectProperty={(p) => onSelectProperty && onSelectProperty(p)}
              onEnquire={onEnquire}
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button 
                className="glass-btn" 
                style={{ width: '100%', padding: '10px', fontSize: '13px', background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)' }}
                onClick={() => onBookProperty && onBookProperty(property)}
              >
                <DollarSign size={15} /> Book Slot with Token (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(15, 17, 32, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 7 of 9 in AGS Garden City Journey
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Select any property card above to inspect Room-by-Room Multi-Angles & 3D Tour!
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('saved'); window.scrollTo(0, 0); }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            <ArrowLeft size={15} /> Previous: 6. ❤️ Saved
          </button>

          <button 
            className="glass-btn" 
            onClick={() => { 
              const firstProp = verifiedListings[0];
              if (onSelectProperty && firstProp) onSelectProperty(firstProp);
              else setActivePage('properties');
              window.scrollTo(0, 0);
            }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}
          >
            <span>Next: 9. 🏡 Property Details & Tour →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default VerifiedProperties;
