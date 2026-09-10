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

  // Dynamic filtered properties on Home page based on selectedType
  const displayedProperties = React.useMemo(() => {
    if (selectedType === 'All') {
      return PROPERTIES_DATA.slice(0, 6);
    }

    const typeMap = {
      'Apartment': 'apartment',
      'Luxury Villa': 'villa',
      'Penthouse': 'penthouse',
      'Commercial': 'commercial',
      'Commercial Office': 'commercial',
      'Residential Plot': 'plot'
    };

    const targetCategory = typeMap[selectedType];

    const filtered = PROPERTIES_DATA.filter(
      (p) =>
        p.category === targetCategory ||
        p.type === selectedType
    );

    return filtered.length > 0
      ? filtered
      : PROPERTIES_DATA.slice(0, 6);
  }, [selectedType]);

  return (
    <div className="home-glass-wrapper">

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
          DYNAMIC RESIDENCES SHOWCASE
         ========================================================================= */}
      <section className="section-wrapper">

        <div className="section-top-header">

          <div className="section-title-group">

            <span className="section-tag">

              <Award size={14} />

              {selectedType !== 'All'
                ? `SHOWING: ${selectedType.toUpperCase()}`
                : 'HANDPICKED FOR YOU'}

            </span>

            <h2 className="section-main-heading">

              {selectedType !== 'All'
                ? `${selectedType} `
                : 'Trending '}

              <span className="gradient-text">
                Properties
              </span>

            </h2>

            <p className="section-subtext">

              {selectedType !== 'All'
                ? `Showing ${displayedProperties.length} verified ${selectedType} listings with unique architecture and dedicated specifications.`
                : 'High-demand residences available for instant reservation with verified RERA documentation.'}

            </p>

          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >

            <button
              className="glass-btn"
              style={{
                background:
                  'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)'
              }}
              onClick={() => {

                setActivePage('trending');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });

              }}
            >
              <span>
                🔥 View All Trending Deals
              </span>

              <ArrowRight size={16} />

            </button>

            <button
              className="glass-btn-secondary"
              onClick={() => {

                setActivePage('properties');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });

              }}
            >
              <span>
                All Listings ({PROPERTIES_DATA.length})
              </span>
            </button>

          </div>

        </div>

        <div className="property-cards-grid">

          {displayedProperties.map((property) => (

            <div
              key={property.id}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >

              <Propertycard
                property={property}
                onSelectProperty={(p) =>
                  onSelectProperty &&
                  onSelectProperty(p)
                }
                onEnquire={onEnquire}
              />

              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  gap: '8px'
                }}
              >

                <button
                  className="glass-btn"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '13px'
                  }}
                  onClick={() =>
                    onBookProperty &&
                    onBookProperty(property)
                  }
                >

                  <DollarSign size={15} />

                  Book with Token
                  {' '}
                  (₹
                  {property.tokenAmount?.toLocaleString(
                    'en-IN'
                  ) || '25,000'}
                  )

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================================================================
          STANDALONE PRICE TRENDS TEASER
         ========================================================================= */}
      <section className="section-wrapper">

        <div
          className="ai-finder-box glass-panel"
          style={{
            background:
              'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(56, 189, 248, 0.1) 100%)',
            border:
              '1px solid rgba(16, 185, 129, 0.3)'
          }}
        >

          <div className="trends-teaser-grid">

            <div>

              <span
                className="section-tag"
                style={{ color: '#10b981' }}
              >
                <TrendingUp size={14} />
                DEDICATED MARKET INTELLIGENCE
              </span>

              <h2
                style={{
                  fontSize: '32px',
                  margin: '8px 0 12px'
                }}
              >
                Chennai Real Estate{' '}
                <span className="gradient-text">
                  Price Index & Trends
                </span>
              </h2>

              <p
                style={{
                  color: 'var(--text-sub)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                Explore live ₹/sq.ft historical appreciation
                rates, upcoming corridor hotspots (OMR, ECR,
                Porur, Guindy), and calculated ROI forecast data.
              </p>

              <button
                className="glass-btn"
                onClick={() => {

                  setActivePage('trends');

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });

                }}
                style={{
                  background:
                    'linear-gradient(135deg, #10b981 0%, #0284c7 100%)'
                }}
              >

                <span>
                  📊 View Comprehensive Price Trends & Forecast
                </span>

                <ArrowRight size={16} />

              </button>

            </div>

            <div
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.3)'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >

                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)'
                  }}
                >
                  Top Appreciating Corridor
                </span>

                <span
                  style={{
                    color: '#10b981',
                    fontWeight: 'bold'
                  }}
                >
                  +18.4% YoY
                </span>

              </div>

              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}
              >
                ECR & OMR Tech Corridor
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)'
                }}
              >
                Avg Price: ₹8,400/sq.ft • High Demand
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          AI PROPERTY MATCHER BANNER
         ========================================================================= */}
      <section className="section-wrapper">

        <div className="ai-finder-box glass-panel">

          <div className="ai-finder-header">

            <div className="ai-glow-icon">
              <Sparkles size={28} />
            </div>

            <h2 className="section-main-heading">

              Let AI Find Your{' '}

              <span className="gradient-text">
                Dream Residence
              </span>

            </h2>

            <p className="section-subtext">
              Type your exact natural language requirements and
              our intelligent algorithm will match the best
              verified properties in seconds.
            </p>

          </div>

          <div
            style={{
              textAlign: 'center',
              marginTop: '16px'
            }}
          >

            <button
              className="glass-btn"
              style={{
                padding: '14px 28px',
                fontSize: '15px'
              }}
              onClick={() => {

                setActivePage('ai-finder');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });

              }}
            >

              <Sparkles size={18} />

              <span>
                Launch AI Property Finder
              </span>

            </button>

          </div>

        </div>

      </section>

      {/* =========================================================================
          INTERACTIVE GOOGLE MAP & CHENNAI PRIME CORRIDORS
         ========================================================================= */}
      <section
        className="section-wrapper"
        style={{ marginTop: '10px' }}
      >

        <GoogleMapView
          locationName="Porur, Chennai"
          title="🗺️ Explore Chennai Prime Locations & Corridors on Google Map"
          height="440px"
          showTransitDetails={true}
        />

      </section>

      {/* =========================================================================
          ORDERLY 9-STEP WORKFLOW JOURNEY MAP
         ========================================================================= */}
      <section
        className="section-wrapper"
        style={{ marginTop: '10px' }}
      >

        <div
          className="glass-panel"
          style={{
            padding: '28px 20px',
            borderRadius: '22px',
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
            border:
              '1px solid rgba(56, 189, 248, 0.3)'
          }}
        >

          <div
            style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}
          >

            <span
              className="section-tag"
              style={{ color: '#38bdf8' }}
            >
              <Compass size={13} />
              ORDER-WISE 9-PAGE RESIDENCE JOURNEY
            </span>

            <h2
              style={{
                fontSize: '28px',
                margin: '8px 0 6px',
                color: '#fff'
              }}
            >
              Step-by-Step Experience in{' '}

              <span className="gradient-text">
                AGS NEST
              </span>

            </h2>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '13px',
                maxWidth: '650px',
                margin: '0 auto'
              }}
            >
              Follow the official order-wise sequence from Home
              Dashboard to Properties, AI Matcher, Price Drops,
              Trends, Wishlists, Legal Audit, and Room-by-Room
              3D Tour!
            </p>

          </div>

          {/* 9-Step Grid */}
          <div className="journey-steps-grid">

            {[
              {
                num: '1',
                title: 'Home Page',
                sub: 'Hub Dashboard',
                icon: '🏠',
                page: 'home',
                active: true
              },
              {
                num: '2',
                title: 'Properties',
                sub: '26 Residences',
                icon: '🏘️',
                page: 'properties'
              },
              {
                num: '3',
                title: 'AI Finder',
                sub: 'Smart Match',
                icon: '🤖',
                page: 'ai-finder'
              },
              {
                num: '4',
                title: 'Price Drop',
                sub: 'Flash Deals',
                icon: '🔔',
                page: 'price-drop'
              },
              {
                num: '5',
                title: 'Price Trends',
                sub: 'ROI Index',
                icon: '📈',
                page: 'trends'
              },
              {
                num: '6',
                title: 'Saved',
                sub: 'Wishlist',
                icon: '❤️',
                page: 'saved'
              },
              {
                num: '7',
                title: 'Verified',
                sub: 'CMDA & RERA',
                icon: '🛡️',
                page: 'verified'
              },
              {
                num: '8',
                title: 'Login/Register',
                sub: 'Portal Switch',
                icon: '🔐',
                page: 'auth'
              },
              {
                num: '9',
                title: 'Property Detail',
                sub: '3D Room Tour',
                icon: '🏡',
                page: 'properties'
              }
            ].map((st) => (

              <div
                key={st.num}
                className="glass-panel"
                onClick={() => {

                  if (
                    st.page === 'auth' &&
                    onOpenAuthModal
                  ) {
                    onOpenAuthModal('customer');
                  } else {
                    setActivePage(st.page);
                  }

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });

                }}
                style={{
                  padding: '14px 10px',
                  borderRadius: '14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: st.active
                    ? 'rgba(56, 189, 248, 0.15)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: st.active
                    ? '1px solid #38bdf8'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >

                <div
                  style={{
                    fontSize: '11px',
                    color: st.active
                      ? '#38bdf8'
                      : '#94a3b8',
                    fontWeight: 800
                  }}
                >
                  STEP {st.num}
                </div>

                <div
                  style={{
                    fontSize: '18px',
                    margin: '4px 0 2px'
                  }}
                >
                  {st.icon}
                </div>

                <strong
                  style={{
                    color: '#fff',
                    fontSize: '12px',
                    display: 'block',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {st.title}
                </strong>

                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '10px'
                  }}
                >
                  {st.sub}
                </span>

              </div>

            ))}

          </div>

          {/* Primary Step-Forward Action Banner */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '16px',
              background: 'rgba(56, 189, 248, 0.08)',
              border:
                '1px dashed rgba(56, 189, 248, 0.3)'
            }}
          >

            <div>

              <span
                style={{
                  fontSize: '11px',
                  color: '#38bdf8',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}
              >
                CURRENT: 1. 🏠 HOME DASHBOARD
              </span>

              <h4
                style={{
                  margin: '4px 0 0',
                  color: '#fff',
                  fontSize: '16px'
                }}
              >
                Ready to explore all 26 luxury properties
                across Chennai?
              </h4>

            </div>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >

              <button
                className="glass-btn"
                onClick={() => {

                  setActivePage('properties');

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });

                }}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)'
                }}
              >
                <span>
                  Next: 2. 🏘️ Properties Catalog →
                </span>
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;