import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Trash2, 
  DollarSign, 
  Compass, 
  ShieldCheck, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA } from '../data/propertiesData';
import safeStorage from '../utils/safeStorage';

function SavedProperties({ 
  setActivePage, 
  onSelectProperty, 
  onBookProperty, 
  onEnquire 
}) {
  const [savedIds, setSavedIds] = useState(() => {
    return safeStorage.getItem('agsgarden_saved_properties', [1, 2, 20, 22]); // Default initial curated wishlist
  });

  const savedListings = PROPERTIES_DATA.filter(p => savedIds.includes(p.id));

  const handleRemoveSaved = (id, e) => {
    e.stopPropagation();
    const updated = savedIds.filter(savedId => savedId !== id);
    setSavedIds(updated);
    safeStorage.setItem('agsgarden_saved_properties', updated);
  };

  const handleAddDemoSaved = () => {
    const allIds = PROPERTIES_DATA.map(p => p.id);
    setSavedIds(allIds.slice(0, 6));
    safeStorage.setItem('agsgarden_saved_properties', allIds.slice(0, 6));
  };

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
          <button onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            5. 📈 Trends
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#ec4899', fontWeight: 800, background: 'rgba(236, 72, 153, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            6. ❤️ Saved Properties (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { setActivePage('verified'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            7.  Verified
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            <ArrowLeft size={13} /> Step 5: Trends
          </button>
          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('verified'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            Step 7: Verified Properties →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="section-top-header" style={{ marginBottom: '28px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#ec4899', borderColor: '#ec4899' }}>
            <Heart size={14} /> YOUR PERSONALIZED SHORTLIST
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '36px' }}>
            6. ❤️ Saved <span className="gradient-text">Dream Residences</span>
          </h1>
          <p className="section-subtext" style={{ fontSize: '15px', maxWidth: '800px' }}>
            Manage your shortlisted luxury apartments, beachfront villas, and gated plots. Compare amenities, inspect floor plans, and lock booking slots directly.
          </p>
        </div>
      </div>

      {/* Wishlist Status Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '16px 20px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '32px',
          background: 'rgba(236, 72, 153, 0.08)',
          border: '1px solid rgba(236, 72, 153, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
            <Heart size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
              {savedListings.length} Residences in Your Shortlist
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Auto-saved to your profile • 24/7 direct advisor callback ready
            </div>
          </div>
        </div>

        <button 
          className="glass-btn-secondary"
          onClick={handleAddDemoSaved}
          style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '14px' }}
        >
          ✨ Refresh Curated Top Picks
        </button>
      </div>

      {/* Grid of Saved Properties */}
      {savedListings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px 20px', textAlign: 'center', borderRadius: '20px', marginBottom: '40px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', margin: '0 auto 16px' }}>
            <Heart size={30} />
          </div>
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Your Saved Wishlist is Empty</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 20px' }}>
            Browse our verified inventory in Step 2 and tap the heart icon on any property to save it here for fast comparison.
          </p>
          <button 
            className="glass-btn"
            onClick={() => { setActivePage('properties'); window.scrollTo(0, 0); }}
            style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '14px' }}
          >
            <Compass size={16} /> Explore Properties Now
          </button>
        </div>
      ) : (
        <div className="property-cards-grid" style={{ marginBottom: '48px' }}>
          {savedListings.map(property => (
            <div key={property.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <Propertycard 
                property={property}
                onSelectProperty={(p) => onSelectProperty && onSelectProperty(p)}
                onEnquire={onEnquire}
              />
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button 
                  className="glass-btn" 
                  style={{ flex: 1, padding: '10px', fontSize: '13px', background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)' }}
                  onClick={() => onBookProperty && onBookProperty(property)}
                >
                  <DollarSign size={15} /> Book Slot (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'})
                </button>
                <button 
                  className="glass-btn-secondary" 
                  style={{ padding: '10px 14px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                  onClick={(e) => handleRemoveSaved(property.id, e)}
                  title="Remove from saved"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
          <div style={{ fontSize: '11px', color: '#ec4899', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 6 of 9 in AGS Garden City Journey
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Ready to inspect 100% CMDA & RERA Approved Properties?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            <ArrowLeft size={15} /> Previous: 5. 📈 Price Trends
          </button>

          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('verified'); window.scrollTo(0, 0); }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <span>Next: 7.  Verified Properties →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default SavedProperties;
