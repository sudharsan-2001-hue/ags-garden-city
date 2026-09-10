import React, { useState } from 'react';
import { 
  Bell, 
  Flame, 
  Sparkles, 
  TrendingDown, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  Tag, 
  MapPin, 
  ShieldCheck, 
  Send,
  Zap,
  Building2,
  Calendar
} from 'lucide-react';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA } from '../data/propertiesData';
import safeStorage from '../utils/safeStorage';

function PriceDropAlert({ 
  setActivePage, 
  onSelectProperty, 
  onBookProperty, 
  onEnquire 
}) {
  const [alertForm, setAlertForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredArea: 'Porur',
    targetBudget: '₹1 Crore - ₹2 Crore'
  });
  const [subscribed, setSubscribed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Flash Price Drop Properties (Filtered / Highlighted)
  const priceDropProperties = PROPERTIES_DATA.map((p, idx) => {
    // Generate attractive price drop metadata if not existing
    const discountAmount = idx % 2 === 0 ? '₹8,00,000' : '₹12,50,000';
    const oldPriceVal = p.priceVal + (idx % 2 === 0 ? 800000 : 1250000);
    const oldPrice = `₹${(oldPriceVal / 100000).toFixed(0)} Lakhs`;
    return {
      ...p,
      originalPrice: p.originalPrice || oldPrice,
      offerPrice: p.price,
      offerDiscount: discountAmount,
      offerNote: 'Flash Festival Price Drop - 48 Hours Left',
      badge: 'PRICE DROP 🔥'
    };
  });

  const filteredItems = selectedFilter === 'all' 
    ? priceDropProperties 
    : priceDropProperties.filter(p => p.category === selectedFilter || p.area.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleSubscribeAlert = (e) => {
    e.preventDefault();
    if (!alertForm.phone.trim()) {
      alert('Please enter your phone number to receive instant SMS & WhatsApp Price Drop alerts.');
      return;
    }

    // Save alert request
    safeStorage.addVisitAlert({
      clientName: alertForm.name || 'VIP Subscriber',
      clientPhone: alertForm.phone,
      clientEmail: alertForm.email || 'AGSGARDENCITY@gmail.com',
      propertyTitle: `Price Drop Alert Subscription (${alertForm.preferredArea} - ${alertForm.targetBudget})`,
      slotTime: 'Instant SMS & WhatsApp Alerts',
      source: 'Price Drop Alert Page',
      createdAt: new Date().toISOString()
    });

    setSubscribed(true);
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
          <button onClick={() => { setActivePage('ai-finder'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            3. 🤖 AI Finder
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#ef4444', fontWeight: 800, background: 'rgba(239, 68, 68, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            4. 🔔 Price Drop Alert (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            5. 📈 Trends
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('ai-finder'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            <ArrowLeft size={13} /> Step 3: AI Finder
          </button>
          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' }}
          >
            Step 5: Price Trends →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="section-top-header" style={{ marginBottom: '28px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
            <Flame size={14} /> LIVE EXCLUSIVE OFF-MARKET PRICE CUTS
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '36px' }}>
            4. 🔔 Real-Time <span className="gradient-text">Price Drop Alerts</span>
          </h1>
          <p className="section-subtext" style={{ fontSize: '15px', maxWidth: '800px' }}>
            Get instant notifications when verified residences in Porur, Anna Nagar, OMR & ECR drop below market value. Save up to <strong>₹15 Lakhs</strong> with limited-time direct builder discounts.
          </p>
        </div>
      </div>

      {/* Hero Banner: Instant WhatsApp & SMS Alert Subscription */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.12) 50%, rgba(15, 17, 32, 0.95) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.15)',
          marginBottom: '36px'
        }}
      >
        <div className="price-drop-layout-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
              <Zap size={14} /> INSTANT NOTIFICATION ENGINE
            </div>
            <h2 style={{ fontSize: '24px', color: '#fff', margin: '0 0 10px' }}>
              Never Miss a Price Cut in Chennai
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Subscribe your phone number to receive instant SMS, WhatsApp & Email alerts the moment a seller drops prices by ₹5L or more in your preferred locality.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
              <span>✓ 100% Free VIP Service</span>
              <span>✓ Instant WhatsApp Ping</span>
              <span>✓ Zero Spam Guarantee</span>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {subscribed ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', margin: '0 auto 10px' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: '16px' }}>Alert Activated!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>
                  We'll message you on <strong>{alertForm.phone}</strong> as soon as prices drop.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribeAlert} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text"
                  placeholder="Your Name (e.g. Anand)"
                  className="glass-input"
                  value={alertForm.name}
                  onChange={(e) => setAlertForm({ ...alertForm, name: e.target.value })}
                  style={{ width: '100%', fontSize: '13px' }}
                />
                <input 
                  type="tel"
                  placeholder="WhatsApp Mobile (+91) *"
                  className="glass-input"
                  value={alertForm.phone}
                  onChange={(e) => setAlertForm({ ...alertForm, phone: e.target.value })}
                  style={{ width: '100%', fontSize: '13px' }}
                  required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <select 
                    className="glass-input"
                    value={alertForm.preferredArea}
                    onChange={(e) => setAlertForm({ ...alertForm, preferredArea: e.target.value })}
                    style={{ fontSize: '12px' }}
                  >
                    <option value="Porur">Porur Hub</option>
                    <option value="Anna Nagar">Anna Nagar</option>
                    <option value="OMR">OMR Corridor</option>
                    <option value="ECR">ECR Coastal</option>
                  </select>
                  <select 
                    className="glass-input"
                    value={alertForm.targetBudget}
                    onChange={(e) => setAlertForm({ ...alertForm, targetBudget: e.target.value })}
                    style={{ fontSize: '12px' }}
                  >
                    <option value="Under 50L">Under 50L</option>
                    <option value="50L - 1Cr">50L - 1Cr</option>
                    <option value="1Cr - 2Cr">1Cr - 2Cr</option>
                    <option value="Above 2Cr">Above 2Cr</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="glass-btn"
                  style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 800, background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' }}
                >
                  <Bell size={14} /> Subscribe to Instant Price Drops
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        {[
          { id: 'all', label: '🔥 All Price Cuts' },
          { id: 'apartment', label: '🏢 Apartments' },
          { id: 'villa', label: '🏡 Villas & Houses' },
          { id: 'sea-view', label: '🌊 Sea View' },
          { id: 'penthouse', label: '✨ Penthouses' },
          { id: 'plot', label: '🌳 Land & Plots' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`glass-btn-secondary ${selectedFilter === tab.id ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: '20px',
              background: selectedFilter === tab.id ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.05)',
              borderColor: selectedFilter === tab.id ? '#ef4444' : 'rgba(255,255,255,0.1)',
              color: selectedFilter === tab.id ? '#fff' : 'var(--text-muted)',
              fontWeight: selectedFilter === tab.id ? 800 : 500,
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Property Cards Grid */}
      <div className="property-cards-grid" style={{ marginBottom: '48px' }}>
        {filteredItems.map(property => (
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
                <DollarSign size={15} /> Lock Discount with Token (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'})
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
          <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 4 of 9 in AGS NEST Journey
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Ready to explore Chennai's 2026 Price Growth Trends?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { setActivePage('ai-finder'); window.scrollTo(0, 0); }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            <ArrowLeft size={15} /> Previous: 3. 🤖 AI Finder
          </button>

          <button 
            className="glass-btn" 
            onClick={() => { setActivePage('trends'); window.scrollTo(0, 0); }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)' }}
          >
            <span>Next: 5. 📈 Property Price Trends →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default PriceDropAlert;
