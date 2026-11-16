import React, { useState } from 'react';
import '../Home.css';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA, CATEGORIES_DATA } from '../data/propertiesData';
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Sparkles,
  Home as HomeIcon,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Bed,
  Bath,
  Maximize2,
  Sliders,
  Compass,
  ArrowUpRight,
  Filter,
  Check
} from 'lucide-react';
import GoogleMapView from '../components/GoogleMapView';
import GlassStepBar from '../components/GlassStepBar';

function Home({
  setActivePage,
  setSelectedCategory,
  onSelectProperty,
  onBookProperty,
  onOpenAuthModal,
  onEnquire
}) {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');

  // Handle Search submit: navigate to properties page with exact category
  const handleSearchSubmit = (e) => {
    e && e.preventDefault();

    if (setSelectedCategory) {
      if (selectedType !== 'All') {
        const typeMap = {
          'Apartment': 'apartment',
          'Luxury Villa': 'villa',
          'Penthouse': 'penthouse',
          'Commercial': 'commercial',
          'Commercial Office': 'commercial',
          'Residential Plot': 'plot'
        };

        setSelectedCategory(typeMap[selectedType] || 'all');
      } else {
        setSelectedCategory('all');
      }
    }

    setActivePage('properties');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCategoryClick = (categoryId) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryId);
    }

    setActivePage('properties');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-glass-wrapper">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <GlassStepBar 
          currentStepId="home"
          setActivePage={setActivePage}
          onPrev={() => setActivePage('auth')}
          prevLabel="Step 1: Front Login"
          onNext={() => setActivePage('properties')}
          nextLabel="Step 3: Properties Catalog"
        />
      </div>

      {/* =========================================================================
          HERO SECTION (GLASS SEARCH MATRIX)
         ========================================================================= */}
      <section className="hero-section" id="home">

        {/* Glow Pill Badge */}
        <div className="hero-pill-badge">
          <Sparkles size={16} />

          <span>
            #1 AI-POWERED GLASSMORPHIC REAL ESTATE PLATFORM • AGS NEST
          </span>
        </div>

        {/* Hero Typography */}
        <h1 className="hero-headline">
          FIND YOUR DREAM HOME WITH{' '}
          <span className="gradient-text">
            AGS NEST
          </span>
        </h1>

        <p className="hero-subtitle">
          Discover verified luxury properties, explore category collections,
          compare real-time price trends, and book securely with Razorpay
          or Cash on Visit.
        </p>

        {/* HERO SEARCH CONTAINER */}
        <div className="hero-search-container">

          {/* Tab Selector */}
          <div className="search-tabs-row">

            <button
              className={`search-tab-btn ${
                activeTab === 'buy'
                  ? 'search-tab-active'
                  : ''
              }`}
              onClick={() => setActiveTab('buy')}
            >
              Buy Properties
            </button>

            <button
              className={`search-tab-btn ${
                activeTab === 'rent'
                  ? 'search-tab-active'
                  : ''
              }`}
              onClick={() => setActiveTab('rent')}
            >
              Rentals & PG
            </button>

            <button
              className={`search-tab-btn ${
                activeTab === 'commercial'
                  ? 'search-tab-active'
                  : ''
              }`}
              onClick={() => setActiveTab('commercial')}
            >
              Commercial
            </button>

          </div>

          {/* Frosted Search Glass Card */}
          <div className="glass-search-matrix glass-panel">

            <div className="search-fields-grid">

              {/* Location Select */}
              <div className="search-field-item">

                <label className="field-label">
                  <MapPin size={14} />
                  Location
                </label>

                <select
                  className="glass-input"
                  value={selectedLocation}
                  onChange={(e) =>
                    setSelectedLocation(e.target.value)
                  }
                >
                  <option value="All">
                    All Chennai Hotspots
                  </option>

                  <option value="Anna Nagar">
                    Anna Nagar
                  </option>

                  <option value="OMR">
                    OMR IT Corridor
                  </option>

                  <option value="Velachery">
                    Velachery
                  </option>

                  <option value="ECR">
                    ECR Coastal Beach
                  </option>

                  <option value="Tambaram">
                    Tambaram
                  </option>

                  <option value="Adyar">
                    Adyar & Besant Nagar
                  </option>

                  <option value="Guindy">
                    Guindy
                  </option>

                  <option value="Porur">
                    Porur
                  </option>
                </select>

              </div>

              {/* Property Type Dropdown */}
              <div className="search-field-item">

                <label className="field-label">
                  <Building size={14} />
                  Property Type
                </label>

                <select
                  className="glass-input"
                  value={selectedType}
                  onChange={(e) => {

                    const newType = e.target.value;

                    setSelectedType(newType);

                    const typeMap = {
                      'Apartment': 'apartment',
                      'Luxury Villa': 'villa',
                      'Penthouse': 'penthouse',
                      'Commercial': 'commercial',
                      'Commercial Office': 'commercial',
                      'Residential Plot': 'plot'
                    };

                    if (setSelectedCategory) {
                      setSelectedCategory(
                        typeMap[newType] || 'all'
                      );
                    }

                  }}
                >
                  <option value="All">
                    All Types
                  </option>

                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="Luxury Villa">
                    Luxury Villa
                  </option>

                  <option value="Penthouse">
                    Penthouse
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>

                  <option value="Residential Plot">
                    Residential Plot
                  </option>

                </select>

              </div>

              {/* Bedrooms */}
              <div className="search-field-item">

                <label className="field-label">
                  <Bed size={14} />
                  Bedrooms (BHK)
                </label>

                <select className="glass-input">

                  <option value="all">
                    Any BHK
                  </option>

                  <option value="1">
                    1 BHK
                  </option>

                  <option value="2">
                    2 BHK
                  </option>

                  <option value="3">
                    3 BHK
                  </option>

                  <option value="4">
                    4+ BHK
                  </option>

                </select>

              </div>

              {/* Budget Range Amount */}
              <div className="search-field-item">

                <label className="field-label">
                  <DollarSign size={14} />
                  Budget Range Amount
                </label>

                <select
                  className="glass-input"
                  value={selectedBudget}
                  onChange={(e) =>
                    setSelectedBudget(e.target.value)
                  }
                >

                  <option value="All">
                    Any Budget (All Amounts)
                  </option>

                  <option value="< 50L">
                    Under ₹50 Lakhs (Budget Friendly)
                  </option>

                  <option value="50L - 1Cr">
                    ₹50 Lakhs - ₹1 Crore (Mid Segment)
                  </option>

                  <option value="1Cr - 2Cr">
                    ₹1 Crore - ₹2 Crore (Luxury)
                  </option>

                  <option value="2Cr - 3.5Cr">
                    ₹2 Crore - ₹3.5 Crore (Ultra Luxury)
                  </option>

                  <option value="> 3.5Cr">
                    Above ₹3.5 Crore (Mansions)
                  </option>

                </select>

              </div>

              {/* Search Submit Button */}
              <button
                className="glass-btn search-submit-btn"
                onClick={handleSearchSubmit}
              >
                <Search size={18} />
                <span>Search</span>
              </button>

            </div>

          </div>

        </div>

        {/* LIVE GLASS STATS BANNER */}
        <div className="stats-banner glass-panel">

          <div className="stats-grid">

            <div className="stat-item">

              <div className="stat-icon-wrapper">
                <HomeIcon size={24} />
              </div>

              <div>
                <div className="stat-number">
                  12,500+
                </div>

                <div className="stat-label">
                  Verified Listings
                </div>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon-wrapper">
                <Users size={24} />
              </div>

              <div>
                <div className="stat-number">
                  9,800+
                </div>

                <div className="stat-label">
                  Happy Homeowners
                </div>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon-wrapper">
                <ShieldCheck size={24} />
              </div>

              <div>
                <div className="stat-number">
                  450+
                </div>

                <div className="stat-label">
                  RERA Verified Agents
                </div>
              </div>

            </div>

            <div className="stat-item">

              <div className="stat-icon-wrapper">
                <Award size={24} />
              </div>

              <div>
                <div className="stat-number">
                  99.4%
                </div>

                <div className="stat-label">
                  Satisfaction Score
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          VISUAL CATEGORIES EXPLORER
         ========================================================================= */}
      <section className="section-wrapper">

        <div className="section-top-header">

          <div className="section-title-group">

            <span className="section-tag">
              <Sparkles size={14} />
              BROWSE BY PROPERTY TYPE
            </span>

            <h2 className="section-main-heading">
              Explore Curated{' '}
              <span className="gradient-text">
                Collections
              </span>
            </h2>

            <p className="section-subtext">
              Click any property category below to isolate and
              view matching homes with distinct architecture &
              photography.
            </p>

          </div>

          <button
            className="glass-btn-secondary"
            onClick={() => {

              if (setSelectedCategory) {
                setSelectedCategory('all');
              }

              setActivePage('properties');

            }}
          >
            <span>
              View All Categories
            </span>

            <ArrowRight size={16} />

          </button>

        </div>

        {/* Visual Category Cards Grid */}
        <div className="home-category-grid">

          {CATEGORIES_DATA.map((category) => (

            <div
              key={category.id}
              className="glass-panel glass-panel-hover"
              onClick={() =>
                handleCategoryClick(category.id)
              }
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                height: '200px'
              }}
            >

              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(10,11,20,0.88) 100%)'
                }}
              ></div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '18px',
                  right: '18px',
                  textAlign: 'left'
                }}
              >

                <span
                  style={{
                    fontSize: '11px',
                    color: '#38bdf8',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                >
                  {category.count}
                </span>

                <h3
                  style={{
                    fontSize: '20px',
                    margin: '2px 0 4px',
                    color: '#fff'
                  }}
                >
                  {category.name}
                </h3>

                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                  }}
                >
                  {category.tagline}
                </p>

              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <ArrowUpRight size={16} />
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================================================================
          NEXT STEPS GATEWAY CARDS (ORDERLY 1-BY-1 PROCESS PREVIEW)
         ========================================================================= */}
      <section className="section-wrapper">
        <div className="section-top-header" style={{ marginBottom: '20px' }}>
          <div className="section-title-group">
            <span className="section-tag" style={{ color: '#38bdf8' }}>
              <Compass size={14} /> DEDICATED ONE-BY-ONE RESIDENCE PROCESS
            </span>
            <h2 className="section-main-heading">
              Your Next Process <span className="gradient-text">Milestones</span>
            </h2>
            <p className="section-subtext">
              Each stage in AGS NEST is a dedicated step. Move forward one by one to find, inspect, analyze, and book your dream home.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Card 1: Step 3 Properties */}
          <div 
            className="glass-panel glass-panel-hover"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '3px 10px', borderRadius: '10px' }}>
                  STEP 3
                </span>
                <Building size={20} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: '20px', color: '#fff', margin: '0 0 8px' }}>
                Properties Catalog
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Explore 26+ verified luxury villas, apartments, penthouses, and commercial spaces across Chennai.
              </p>
            </div>
            <button
              className="glass-btn"
              onClick={() => {
                setActivePage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '10px 16px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)'
              }}
            >
              <span>Explore Step 3: Properties →</span>
            </button>
          </div>

          {/* Card 2: Step 4 AI Matcher */}
          <div 
            className="glass-panel glass-panel-hover"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#c084fc', background: 'rgba(168, 85, 247, 0.15)', padding: '3px 10px', borderRadius: '10px' }}>
                  STEP 4
                </span>
                <Sparkles size={20} color="#c084fc" />
              </div>
              <h3 style={{ fontSize: '20px', color: '#fff', margin: '0 0 8px' }}>
                AI Property Matcher
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Type your budget, BHK, and location in natural language. Our AI instantly surfaces your ideal matches.
              </p>
            </div>
            <button
              className="glass-btn"
              onClick={() => {
                setActivePage('ai-finder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '10px 16px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)'
              }}
            >
              <span>Launch Step 4: AI Matcher →</span>
            </button>
          </div>

          {/* Card 3: Step 5 Price Trends */}
          <div 
            className="glass-panel glass-panel-hover"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '3px 10px', borderRadius: '10px' }}>
                  STEP 5
                </span>
                <TrendingUp size={20} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '20px', color: '#fff', margin: '0 0 8px' }}>
                Price Trends & ROI
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Compare ₹/sq.ft price history, YoY growth, and 5-year ROI forecasts across Chennai's premier corridors.
              </p>
            </div>
            <button
              className="glass-btn"
              onClick={() => {
                setActivePage('trends');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '10px 16px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)'
              }}
            >
              <span>Open Step 5: Price Trends →</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE GOOGLE MAP & CHENNAI PRIME CORRIDORS
         ========================================================================= */}
      <section className="section-wrapper" style={{ marginTop: '10px' }}>
        <GoogleMapView
          locationName="Porur, Chennai"
          title="🗺️ Explore Chennai Prime Locations & Corridors on Google Map"
          height="400px"
          showTransitDetails={true}
        />
      </section>

      {/* =========================================================================
          ORDERLY STEP 2 BOTTOM NAVIGATION BAR
         ========================================================================= */}
      <section className="section-wrapper" style={{ marginTop: '20px' }}>
        <div
          className="glass-panel"
          style={{
            padding: '24px 20px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                color: '#38bdf8',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              CURRENT STEP: 2 OF 10 • HOME DISCOVERY HUB
            </span>
            <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
              Ready to view the curated properties catalog?
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="glass-btn-secondary"
              onClick={() => {
                setActivePage('auth');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={15} /> <span>Previous: Step 1. Login</span>
            </button>

            <button
              className="glass-btn"
              onClick={() => {
                setActivePage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                padding: '10px 22px',
                fontSize: '13px',
                fontWeight: 800,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Next: Step 3. Properties Catalog →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;