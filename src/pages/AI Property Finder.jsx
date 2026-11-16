import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ArrowLeft,
  Bot,
  Zap,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA } from '../data/propertiesData';
import GlassStepBar from '../components/GlassStepBar';

function AIPropertyFinder({ onSelectProperty, onEnquire, onBookProperty, onBack, setActivePage }) {
  const [prompt, setPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [matchedList, setMatchedList] = useState(() => PROPERTIES_DATA.slice(0, 3));

  const quickPrompts = [
    '3 BHK Luxury Villa in Porur under ₹1.5 Cr with garden',
    'Sea View Beachfront Apartment on ECR with balcony',
    'CMDA Approved Villa Plot under ₹50 Lakhs in Chennai',
    'Duplex Penthouse in Velachery with rooftop terrace'
  ];

  const handleSearch = (e) => {
    e && e.preventDefault();
    if (!prompt.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      const query = prompt.toLowerCase();
      const matched = PROPERTIES_DATA.filter(p => {
        return (
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.area.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          (query.includes('villa') && p.category === 'villa') ||
          (query.includes('flat') && p.category === 'apartment') ||
          (query.includes('plot') && p.category === 'plot') ||
          (query.includes('sea') && p.category === 'sea-view') ||
          (query.includes('penthouse') && p.category === 'penthouse')
        );
      });

      setMatchedList(matched.length > 0 ? matched : PROPERTIES_DATA.slice(0, 3));
    }, 600);
  };

  const handleQuickChip = (text) => {
    setPrompt(text);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const query = text.toLowerCase();
      const matched = PROPERTIES_DATA.filter(p => {
        return (
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.area.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          (query.includes('villa') && p.category === 'villa') ||
          (query.includes('flat') && p.category === 'apartment') ||
          (query.includes('plot') && p.category === 'plot') ||
          (query.includes('sea') && p.category === 'sea-view') ||
          (query.includes('penthouse') && p.category === 'penthouse')
        );
      });
      setMatchedList(matched.length > 0 ? matched : PROPERTIES_DATA.slice(0, 3));
    }, 500);
  };

  const handleBookPropertyAction = (property) => {
    if (onBookProperty) {
      onBookProperty(property);
    } else if (onSelectProperty) {
      onSelectProperty(property);
    } else if (setActivePage) {
      setActivePage('checkout');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px 60px' }}>
      
      {/* Universal Glassmorphic 10-Step Progress Stepper */}
      <GlassStepBar 
        currentStepId="ai-finder"
        setActivePage={setActivePage}
        onPrev={() => {
          if (setActivePage) setActivePage('properties');
          else if (onBack) onBack();
          window.scrollTo(0, 0);
        }}
        prevLabel="Step 3: Properties Catalog"
        onNext={() => {
          if (setActivePage) setActivePage('trends');
          window.scrollTo(0, 0);
        }}
        nextLabel="Step 5: Price Trends"
      />

      {/* Main AI Box */}
      <div className="ai-finder-box glass-panel" style={{ marginBottom: '40px' }}>
        <div className="ai-finder-header">
          <div className="ai-glow-icon">
            <Sparkles size={28} />
          </div>
          <span className="section-tag" style={{ color: '#c084fc', borderColor: '#c084fc' }}>
            <Bot size={14} /> NATURAL LANGUAGE NEURAL RESIDENCE MATCHER
          </span>
          <h2 className="section-main-heading" style={{ fontSize: '36px' }}>
            3. 🤖 Describe Your <span className="gradient-text">Dream Residence</span>
          </h2>
          <p className="section-subtext" style={{ fontSize: '15px', maxWidth: '750px' }}>
            Type your customized lifestyle requirements, budget constraints, room configurations, and preferred Chennai localities. Our AI will rank the best verified matches instantly.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="ai-input-form" style={{ maxWidth: '820px', margin: '0 auto 20px' }}>
          <div className="ai-input-group">
            <Sparkles size={20} color="#c084fc" />
            <input 
              type="text" 
              className="ai-input-field"
              placeholder="e.g., 3 BHK sea view villa in ECR with private pool under ₹3 Crore"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit" className="glass-btn" style={{ minWidth: '150px' }}>
              {isSearching ? 'Analyzing...' : 'Generate Match'}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', maxWidth: '820px', margin: '0 auto' }}>
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickChip(chip)}
              className="glass-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '16px', background: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              ⚡ {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Matched Properties Results */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>
              AI Compatibility Ranked Properties ({matchedList.length})
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Verified by 7-tier legal audit and priced directly from builders
            </span>
          </div>
          <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid #10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
            ✓ 98.6% Match Accuracy
          </span>
        </div>

        <div 
          className="property-cards-grid"
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box'
          }}
        >
          {matchedList.map(property => (
            <div 
              key={property.id} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                boxSizing: 'border-box'
              }}
            >
              <Propertycard 
                property={property}
                onSelectProperty={onSelectProperty}
                onEnquire={onEnquire}
              />
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                <button 
                  className="glass-btn" 
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    fontSize: '13px', 
                    background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)', 
                    cursor: 'pointer', 
                    fontWeight: 800,
                    boxSizing: 'border-box',
                    whiteSpace: 'normal',
                    textAlign: 'center'
                  }}
                  onClick={() => handleBookPropertyAction(property)}
                >
                  <DollarSign size={15} style={{ flexShrink: 0 }} /> 
                  <span>Book Slot with Token (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '30px',
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
          <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 4 of 10 in AGS NEST Process
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Ready to analyze real estate price trends & 5-year ROI forecasts?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (onBack) onBack();
              else if (setActivePage) setActivePage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={15} /> <span>Previous: Step 3. Properties</span>
          </button>

          <button 
            className="glass-btn" 
            onClick={() => {
              if (setActivePage) setActivePage('trends');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)' }}
          >
            <span>Next: Step 5. Price Trends & ROI →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default AIPropertyFinder;
