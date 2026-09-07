import React, { useState, useEffect, useMemo } from 'react';
import Propertycard from '../components/Propertycard';
import { CATEGORIES_DATA, PROPERTIES_DATA } from '../data/propertiesData';
import { API_ENDPOINTS } from '../utils/api';

import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  SlidersHorizontal, 
  Sparkles, 
  Home, 
  Waves, 
  Briefcase, 
  Trees, 
  ArrowUpDown,
  CheckCircle2,
  PhoneCall,
  RotateCcw,
  Tag,
  Coins,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Database
} from 'lucide-react';

const BUDGET_PILLS = [
  { id: 'All', label: 'All Budgets', desc: 'All Amounts' },
  { id: '< 50L', label: 'Under ₹50L', desc: '₹36L - ₹48L' },
  { id: '50L - 1Cr', label: '₹50L - ₹1 Crore', desc: '₹58L - ₹92L' },
  { id: '1Cr - 2Cr', label: '₹1Cr - ₹2 Crore', desc: '₹1.25Cr - ₹1.95Cr' },
  { id: '2Cr - 3.5Cr', label: '₹2Cr - ₹3.5 Crore', desc: '₹2.10Cr - ₹3.20Cr' },
  { id: '> 3.5Cr', label: 'Above ₹3.5Cr', desc: '₹3.5Cr+' }
];

function Properties({ 
  initialCategory = 'all', 
  onSelectProperty, 
  onBookProperty,
  onEnquire,
  onBack,
  setActivePage 
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Sync with prop when parent updates initialCategory
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(API_ENDPOINTS.PROPERTIES);

        if (!response.ok) {
          throw new Error('Failed to fetch properties from Real Estate Backend');
        }

        const data = await response.json();

        // If backend returns { properties: [...] } or direct array
        const rawList = Array.isArray(data)
          ? data
          : data.properties || data.data || [];

        // Normalize MongoDB properties to match UI components
        const normalizedList = rawList.map((p, idx) => {
          const priceNum = typeof p.price === 'number' 
            ? p.price 
            : (p.priceVal || Number(String(p.price).replace(/[^0-9]/g, '')) || 0);

          const type = p.propertyType || p.type || 'Apartment';
          let category = p.category;
          if (!category) {
            const t = type.toLowerCase();
            const l = (p.location || '').toLowerCase();
            if (t.includes('sea') || l.includes('ecr')) category = 'sea-view';
            else if (t.includes('villa') || t.includes('house')) category = 'villa';
            else if (t.includes('penthouse')) category = 'penthouse';
            else if (t.includes('commercial') || t.includes('office')) category = 'commercial';
            else if (t.includes('plot') || t.includes('land')) category = 'plot';
            else category = 'apartment';
          }

          const areaNum = p.area || p.sqft || 1200;

          return {
            ...p,
            id: p._id || p.id || `prop-${idx}`,
            _id: p._id || p.id || `prop-${idx}`,
            type: type,
            propertyType: type,
            category: category,
            priceVal: priceNum,
            price: typeof p.price === 'string' && p.price.includes('₹') ? p.price : `₹${priceNum.toLocaleString('en-IN')}`,
            beds: p.bhk || p.beds || 2,
            baths: p.baths || p.bhk || 2,
            sqft: String(areaNum),
            area: String(areaNum),
            pricePerSqft: p.pricePerSqft || `₹${Math.round(priceNum / (Number(areaNum) || 1)).toLocaleString('en-IN')}/sq.ft`,
            tokenAmount: p.tokenAmount || Math.round(priceNum * 0.005) || 25000,
            verified: p.verified !== undefined ? p.verified : true,
            status: p.status || 'For Sale',
            badge: p.badge || 'VERIFIED',
            rating: p.rating || 4.8,
            image: p.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
          };
        });

        if (normalizedList.length > 0) {
          setProperties(normalizedList);
        } else {
          setProperties(PROPERTIES_DATA);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Unable to load properties from server. Falling back to verified listings.');
        setProperties(PROPERTIES_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {

      // Category / Type filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'apartment' && p.category !== 'apartment' && p.type !== 'Apartment') return false;
        if (activeCategory === 'villa' && p.category !== 'villa' && p.type !== 'Luxury Villa' && !p.type?.toLowerCase().includes('villa')) return false;
        if (activeCategory === 'sea-view' && p.category !== 'sea-view' && !p.type?.toLowerCase().includes('sea') && !p.location?.toLowerCase().includes('ecr')) return false;
        if (activeCategory === 'penthouse' && p.category !== 'penthouse' && p.type !== 'Penthouse') return false;
        if (activeCategory === 'commercial' && p.category !== 'commercial' && !p.type?.toLowerCase().includes('commercial')) return false;
        if (activeCategory === 'plot' && p.category !== 'plot' && !p.type?.toLowerCase().includes('plot')) return false;
      }

      // Location filter
      if (selectedLocation !== 'All') {
        const locMatch = (p.location || '').toLowerCase().includes(selectedLocation.toLowerCase()) || 
                         (p.area || '').toLowerCase().includes(selectedLocation.toLowerCase());
        if (!locMatch) return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches = (p.title || '').toLowerCase().includes(term) || 
                        (p.location || '').toLowerCase().includes(term) ||
                        (p.type || '').toLowerCase().includes(term) ||
                        String(p.price || '').toLowerCase().includes(term) ||
                        String(p.area || '').toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Budget filter
      if (selectedBudget !== 'All') {
        const pVal = p.priceVal || 0;
        if (selectedBudget === '< 50L' && pVal > 5000000) return false;
        if (selectedBudget === '50L - 1Cr' && (pVal < 4500000 || pVal > 10000000)) return false;
        if (selectedBudget === '1Cr - 2Cr' && (pVal < 10000000 || pVal > 20000000)) return false;
        if (selectedBudget === '2Cr - 3.5Cr' && (pVal < 20000000 || pVal > 35000000)) return false;
        if (selectedBudget === 'Above 3.5Cr' && pVal < 30000000) return false;
        if (selectedBudget === '> 3.5Cr' && pVal < 30000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.priceVal || 0) - (b.priceVal || 0);
      if (sortBy === 'price-high') return (b.priceVal || 0) - (a.priceVal || 0);
      if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
      return String(a.id || a._id).localeCompare(String(b.id || b._id));
    });
  }, [properties, activeCategory, selectedLocation, selectedBudget, searchTerm, sortBy]);

  const currentCategoryInfo = CATEGORIES_DATA.find(c => c.id === activeCategory);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedBudget('All');
    setSortBy('featured');
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'left', padding: '0 16px' }}>
      
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
          <button onClick={() => { if (setActivePage) setActivePage('home'); else if (onBack) onBack(); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            1. 🏠 Home
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#38bdf8', fontWeight: 800, background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            2. 🏘️ Properties ({filteredProperties.length}) (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('ai-finder'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            3. 🤖 AI Finder
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('price-drop'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            4. 🔔 Price Drop
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('trends'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            5. 📈 Trends
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (onBack) onBack();
              else if (setActivePage) setActivePage('home');
              window.scrollTo(0, 0);
            }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            ← Step 1: Home
          </button>
          <button 
            className="glass-btn" 
            onClick={() => {
              if (setActivePage) setActivePage('ai-finder');
              window.scrollTo(0, 0);
            }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}
          >
            Step 3: AI Finder →
          </button>
        </div>
      </div>

      {/* Category Hero / Header */}
      <div className="section-top-header" style={{ marginBottom: '20px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#38bdf8' }}>
            <Building2 size={14} /> EXCLUSIVE REAL ESTATE CATALOGUE
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '34px' }}>
            {currentCategoryInfo ? currentCategoryInfo.name : 'All Verified'}{' '}
            <span className="gradient-text">Properties</span>
          </h1>
          <p className="section-subtext">
            {currentCategoryInfo 
              ? `${currentCategoryInfo.tagline} • ${filteredProperties.length} verified listings available with distinct architectural imagery.`
              : `Explore ${filteredProperties.length} handpicked luxury apartments, beachfront villas, penthouses, commercial suites, and gated plots across Chennai.`
            }
          </p>
        </div>
      </div>

      {/* Visual Category Selection Cards Grid (Click to Isolate Specific Type) */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {/* All option */}
          <div 
            className={`glass-panel glass-panel-hover ${activeCategory === 'all' ? 'glass-panel-active' : ''}`}
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '14px 10px',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              border: activeCategory === 'all' ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
              background: activeCategory === 'all' ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)' : 'rgba(255,255,255,0.04)',
              boxShadow: activeCategory === 'all' ? '0 0 20px rgba(56, 189, 248, 0.35)' : 'none'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <Sparkles size={20} />
            </div>
            <strong style={{ fontSize: '13px', display: 'block', color: '#fff' }}>All Properties</strong>
            <span style={{ fontSize: '11px', color: '#c084fc', fontWeight: 700 }}>{(properties.length || PROPERTIES_DATA.length)} Listed</span>
          </div>

          {/* Category Cards */}
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeCategory === cat.id;
            const sourceList = properties.length > 0 ? properties : PROPERTIES_DATA;
            const countInCat = sourceList.filter(p => {
              const catType = (p.type || p.propertyType || '').toLowerCase();
              const catCategory = (p.category || '').toLowerCase();
              const catLoc = (p.location || '').toLowerCase();
              if (cat.id === 'apartment') return catCategory === 'apartment' || catType.includes('apartment') || catType.includes('flat');
              if (cat.id === 'villa') return catCategory === 'villa' || catType.includes('villa') || catType.includes('house');
              if (cat.id === 'sea-view') return catCategory === 'sea-view' || catLoc.includes('ecr') || catType.includes('sea');
              if (cat.id === 'penthouse') return catCategory === 'penthouse' || catType.includes('penthouse');
              if (cat.id === 'commercial') return catCategory === 'commercial' || catType.includes('commercial') || catType.includes('office');
              if (cat.id === 'plot') return catCategory === 'plot' || catType.includes('plot') || catType.includes('land');
              return catCategory === cat.id;
            }).length;
            return (
              <div 
                key={cat.id}
                className={`glass-panel glass-panel-hover ${isActive ? 'glass-panel-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: isActive ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                  background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)' : 'rgba(255,255,255,0.04)',
                  boxShadow: isActive ? '0 0 20px rgba(56, 189, 248, 0.35)' : 'none',
                  position: 'relative'
                }}
              >
                <div style={{ height: '70px', position: 'relative', overflow: 'hidden' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(10,11,20,0.85) 100%)' }}></div>
                </div>
                <div style={{ padding: '8px 6px 12px' }}>
                  <strong style={{ fontSize: '12px', display: 'block', color: isActive ? '#fff' : 'var(--text-sub)' }}>
                    {cat.shortName}
                  </strong>
                  <span style={{ fontSize: '10px', color: isActive ? '#38bdf8' : 'var(--text-muted)', fontWeight: 700 }}>
                    {countInCat} Available
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick 1-Click Budget Range Filter Buttons */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '12px 18px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
          <Coins size={15} /> QUICK BUDGET:
        </span>
        {BUDGET_PILLS.map((pill) => {
          const isSelected = selectedBudget === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setSelectedBudget(pill.id)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)' 
                  : 'rgba(255, 255, 255, 0.06)',
                border: isSelected ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
                color: isSelected ? '#fff' : 'var(--text-sub)',
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: isSelected ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.35)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '18px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'center' }}>
          {/* Keyword Search */}
          <div className="search-field-item">
            <label className="field-label"><Search size={13} /> Search Title or Area</label>
            <input 
              type="text" 
              placeholder="e.g. Anna Nagar, Porur, 2 BHK..." 
              className="glass-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Location Filter */}
          <div className="search-field-item">
            <label className="field-label"><MapPin size={13} /> Corridor / Location</label>
            <select 
              className="glass-input"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="All">All Locations (Chennai)</option>
              <option value="Porur">Porur & Kundrathur</option>
              <option value="Anna Nagar">Anna Nagar & Nungambakkam</option>
              <option value="OMR">OMR IT Expressway</option>
              <option value="ECR">ECR Coastal Beach</option>
              <option value="Velachery">Velachery & South</option>
              <option value="Adyar">Adyar & Besant Nagar</option>
              <option value="Tambaram">Tambaram & GST</option>
              <option value="Guindy">Guindy Hub</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div className="search-field-item">
            <label className="field-label"><DollarSign size={13} /> Budget Range Amount</label>
            <select 
              className="glass-input"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="All">Any Budget (All Amounts)</option>
              <option value="< 50L">Under ₹50 Lakhs (Budget Friendly)</option>
              <option value="50L - 1Cr">₹50 Lakhs - ₹1 Crore (Mid Segment)</option>
              <option value="1Cr - 2Cr">₹1 Crore - ₹2 Crore (Luxury)</option>
              <option value="2Cr - 3.5Cr">₹2 Crore - ₹3.5 Crore (Ultra Luxury)</option>
              <option value="> 3.5Cr">Above ₹3.5 Crore (Mansions)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="search-field-item">
            <label className="field-label"><ArrowUpDown size={13} /> Sort By Price / Rating</label>
            <select 
              className="glass-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High (₹)</option>
              <option value="price-high">Price: High to Low (₹)</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags Strip */}
        {(activeCategory !== 'all' || selectedLocation !== 'All' || selectedBudget !== 'All' || searchTerm.trim()) && (
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Filter:</span>
              {activeCategory !== 'all' && (
                <span style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                  Category: {currentCategoryInfo?.name || activeCategory}
                </span>
              )}
              {selectedLocation !== 'All' && (
                <span style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#c084fc', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                  Location: {selectedLocation}
                </span>
              )}
              {selectedBudget !== 'All' && (
                <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                  Budget: {selectedBudget}
                </span>
              )}
            </div>
            <button 
              onClick={resetAllFilters}
              style={{ background: 'none', border: 'none', color: '#f43f5e', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
            >
              <RotateCcw size={13} /> Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Properties Grid with Clear Amount */}
      {loading ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '20px', margin: '20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', marginBottom: '16px', color: '#38bdf8' }}>
            <Loader2 size={28} className="animate-spin" />
          </div>
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '6px' }}>Connecting to Real Estate Database...</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            Fetching verified properties from MongoDB Atlas (realestate database).
          </p>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="property-cards-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <Propertycard 
                property={property}
                onSelectProperty={(p) => onSelectProperty && onSelectProperty(p)}
                onEnquire={onEnquire}
              />
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button 
                  className="glass-btn" 
                  style={{ width: '100%', padding: '10px', fontSize: '13px' }}
                  onClick={() => onBookProperty && onBookProperty(property)}
                >
                  <DollarSign size={15} /> Book with Token (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '20px', margin: '20px 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
            <Search size={32} />
          </div>
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>No Matching Properties Found for Selected Combination</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', maxWidth: '450px', margin: '0 auto 20px' }}>
            We could not find any properties for "{selectedLocation}" in the "{selectedBudget}" bracket. Try selecting "All Locations" or clicking below to view all available listings.
          </p>
          <button 
            className="glass-btn"
            onClick={resetAllFilters}
          >
            <RotateCcw size={16} /> Reset All Filters & View All Residences ({properties.length || PROPERTIES_DATA.length})
          </button>
        </div>
      )}

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '40px',
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
          <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 2 of 9 in AGS Garden City Journey
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Want AI to match your exact customized requirements?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (onBack) onBack();
              else if (setActivePage) setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            <ArrowLeft size={15} /> Previous: 1. 🏠 Home
          </button>

          <button 
            className="glass-btn" 
            onClick={() => {
              if (setActivePage) setActivePage('ai-finder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}
          >
            <span>Next: 3. 🤖 AI Property Finder →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Properties;
