import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  ShieldCheck, 
  MapPin, 
  Percent, 
  Building2, 
  Calendar, 
  Sparkles, 
  Award, 
  Download, 
  Layers, 
  Compass, 
  ArrowRight,
  Flame,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

const LOCALITY_DATA = {
  omr: {
    name: 'OMR IT Expressway',
    subTitle: 'Sholinganallur, Thoraipakkam, Navalur, Siruseri',
    currentRate: '₹7,200 / sq.ft',
    yoyGrowth: '+18.5%',
    fiveYearGrowth: '+74.2%',
    rentalYield: '6.2%',
    hotnessScore: '9.6/10',
    riskLevel: 'Low',
    bhk2Avg: '₹65L - ₹85L',
    bhk3Avg: '₹95L - ₹1.4Cr',
    villaAvg: '₹1.8Cr - ₹3.2Cr',
    catalysts: [
      'Metro Phase-2 Corridor 3 line construction along OMR median',
      'Expansion of AI & Fintech tech hubs at SIPCOT Siruseri',
      'Multi-tier elevated road connectivity'
    ],
    history: [
      { year: '2021', rate: 4150, pct: 'Base' },
      { year: '2022', rate: 4800, pct: '+15.6%' },
      { year: '2023', rate: 5450, pct: '+13.5%' },
      { year: '2024', rate: 6100, pct: '+11.9%' },
      { year: '2025', rate: 6800, pct: '+11.5%' },
      { year: '2026 (Live)', rate: 7200, pct: '+18.5%' },
      { year: '2027 (Forecast)', rate: 8400, pct: '+16.7%' }
    ]
  },
  annanagar: {
    name: 'Anna Nagar (Central & West)',
    subTitle: 'Shanti Colony, Roundtana, West Extension',
    currentRate: '₹11,400 / sq.ft',
    yoyGrowth: '+14.2%',
    fiveYearGrowth: '+62.8%',
    rentalYield: '4.8%',
    hotnessScore: '9.2/10',
    riskLevel: 'Very Low',
    bhk2Avg: '₹1.1Cr - ₹1.4Cr',
    bhk3Avg: '₹1.6Cr - ₹2.5Cr',
    villaAvg: '₹3.5Cr - ₹6.5Cr',
    catalysts: [
      'Established high-net-worth commercial & retail district',
      'Double Metro access (Green line & Upcoming Phase 2)',
      'Limited land supply driving steep redevelopment premiums'
    ],
    history: [
      { year: '2021', rate: 7000, pct: 'Base' },
      { year: '2022', rate: 7800, pct: '+11.4%' },
      { year: '2023', rate: 8600, pct: '+10.2%' },
      { year: '2024', rate: 9450, pct: '+9.9%' },
      { year: '2025', rate: 10200, pct: '+7.9%' },
      { year: '2026 (Live)', rate: 11400, pct: '+14.2%' },
      { year: '2027 (Forecast)', rate: 12800, pct: '+12.3%' }
    ]
  },
  ecr: {
    name: 'ECR Coastal Luxury Belt',
    subTitle: 'Palavakkam, Neelankarai, Akkarai, Muttukadu',
    currentRate: '₹13,800 / sq.ft',
    yoyGrowth: '+16.0%',
    fiveYearGrowth: '+82.5%',
    rentalYield: '5.4%',
    hotnessScore: '9.5/10',
    riskLevel: 'Low',
    bhk2Avg: '₹95L - ₹1.3Cr',
    bhk3Avg: '₹1.8Cr - ₹2.8Cr',
    villaAvg: '₹2.8Cr - ₹9.0Cr',
    catalysts: [
      'ECR 4-Lane Widening & Elevated Beach Expressway',
      'Ultra-luxury villa demand from NRI & C-suite executives',
      'Exclusive private beaches & Coastal Regulation zoning'
    ],
    history: [
      { year: '2021', rate: 7550, pct: 'Base' },
      { year: '2022', rate: 8600, pct: '+13.9%' },
      { year: '2023', rate: 9800, pct: '+13.9%' },
      { year: '2024', rate: 11200, pct: '+14.3%' },
      { year: '2025', rate: 12200, pct: '+8.9%' },
      { year: '2026 (Live)', rate: 13800, pct: '+16.0%' },
      { year: '2027 (Forecast)', rate: 15600, pct: '+13.0%' }
    ]
  },
  velachery: {
    name: 'Velachery & South Hub',
    subTitle: 'Bypass Road, Vijaya Nagar, Madipakkam Link',
    currentRate: '₹8,500 / sq.ft',
    yoyGrowth: '+11.8%',
    fiveYearGrowth: '+56.4%',
    rentalYield: '5.1%',
    hotnessScore: '8.8/10',
    riskLevel: 'Low',
    bhk2Avg: '₹70L - ₹95L',
    bhk3Avg: '₹1.1Cr - ₹1.7Cr',
    villaAvg: '₹2.0Cr - ₹3.5Cr',
    catalysts: [
      'Twin flyovers operational reducing commute times to airport',
      'Proximity to Phoenix Marketcity & MRTS railway network',
      'High rental occupancy from both IT and industrial workers'
    ],
    history: [
      { year: '2021', rate: 5400, pct: 'Base' },
      { year: '2022', rate: 6050, pct: '+12.0%' },
      { year: '2023', rate: 6700, pct: '+10.7%' },
      { year: '2024', rate: 7300, pct: '+8.9%' },
      { year: '2025', rate: 7800, pct: '+6.8%' },
      { year: '2026 (Live)', rate: 8500, pct: '+11.8%' },
      { year: '2027 (Forecast)', rate: 9400, pct: '+10.6%' }
    ]
  },
  adyar: {
    name: 'Adyar & Besant Nagar',
    subTitle: 'Gandhi Nagar, Kasturba Nagar, Beach Road',
    currentRate: '₹14,500 / sq.ft',
    yoyGrowth: '+13.0%',
    fiveYearGrowth: '+58.9%',
    rentalYield: '4.2%',
    hotnessScore: '9.1/10',
    riskLevel: 'Very Low',
    bhk2Avg: '₹1.4Cr - ₹1.9Cr',
    bhk3Avg: '₹2.2Cr - ₹3.8Cr',
    villaAvg: '₹4.5Cr - ₹12Cr',
    catalysts: [
      'Historic prime central heritage neighborhood',
      'Premier schools, universities (IIT/Anna Univ) and hospitals',
      'High demand for sea-facing redeveloped penthouses'
    ],
    history: [
      { year: '2021', rate: 9100, pct: 'Base' },
      { year: '2022', rate: 10100, pct: '+10.9%' },
      { year: '2023', rate: 11200, pct: '+10.8%' },
      { year: '2024', rate: 12400, pct: '+10.7%' },
      { year: '2025', rate: 13200, pct: '+6.5%' },
      { year: '2026 (Live)', rate: 14500, pct: '+13.0%' },
      { year: '2027 (Forecast)', rate: 16200, pct: '+11.7%' }
    ]
  },
  tambaram: {
    name: 'Tambaram & GST Corridor',
    subTitle: 'Tambaram East/West, Chromepet, Perungalathur',
    currentRate: '₹5,800 / sq.ft',
    yoyGrowth: '+9.4%',
    fiveYearGrowth: '+48.5%',
    rentalYield: '4.5%',
    hotnessScore: '8.5/10',
    riskLevel: 'Moderate',
    bhk2Avg: '₹45L - ₹65L',
    bhk3Avg: '₹70L - ₹1.1Cr',
    villaAvg: '₹1.2Cr - ₹2.2Cr',
    catalysts: [
      'Kilambakkam (KCBT) Bus Terminal fully operational',
      'Chennai Outer Ring Road & Airport expansion corridor',
      'Massive affordable housing and plot developments'
    ],
    history: [
      { year: '2021', rate: 3900, pct: 'Base' },
      { year: '2022', rate: 4300, pct: '+10.2%' },
      { year: '2023', rate: 4700, pct: '+9.3%' },
      { year: '2024', rate: 5050, pct: '+7.4%' },
      { year: '2025', rate: 5350, pct: '+5.9%' },
      { year: '2026 (Live)', rate: 5800, pct: '+9.4%' },
      { year: '2027 (Forecast)', rate: 6400, pct: '+10.3%' }
    ]
  }
};

function PriceTrends({ setActivePage, onSelectPropertyForBooking }) {
  const [activeLocalityKey, setActiveLocalityKey] = useState('omr');
  const [calcInvestment, setCalcInvestment] = useState(5000000); // 50 Lakhs
  const [calcYears, setCalcYears] = useState(5);

  const locality = LOCALITY_DATA[activeLocalityKey] || LOCALITY_DATA.omr;

  // Calculate projected return
  const annualGrowthRate = parseFloat(locality?.yoyGrowth || '15%') / 100;
  const projectedFutureVal = Math.round(calcInvestment * Math.pow(1 + annualGrowthRate, calcYears));
  const estimatedProfit = projectedFutureVal - calcInvestment;

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left' }}>
      
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
          <button onClick={() => { if (setActivePage) setActivePage('home'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            1. 🏠 Home
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('properties'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            2. 🏘️ Properties
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('price-drop'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            4. 🔔 Price Drop
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#38bdf8', fontWeight: 800, background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            5. 📈 Price Trends (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button onClick={() => { if (setActivePage) setActivePage('saved'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            6. ❤️ Saved
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (setActivePage) setActivePage('price-drop');
              window.scrollTo(0, 0);
            }}
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '16px' }}
          >
            ← Step 4: Price Drop
          </button>
          <button 
            className="glass-btn" 
            onClick={() => {
              if (setActivePage) setActivePage('saved');
              window.scrollTo(0, 0);
            }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' }}
          >
            Step 6: Saved Properties →
          </button>
        </div>
      </div>

      {/* Top Banner Header */}
      <div className="section-top-header" style={{ marginBottom: '28px' }}>
        <div className="section-title-group">
          <span className="section-tag">
            <TrendingUp size={14} /> EXCLUSIVE REAL ESTATE INTELLIGENCE
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '38px' }}>
            Chennai Property <span className="gradient-text">Price Trends & Market Growth</span>
          </h1>
          <p className="section-subtext">
            Verified micro-market valuations, 5-year historical appreciation charts, rental yield indices, and infrastructure growth catalysts for 2026.
          </p>
        </div>

        <button 
          className="glass-btn no-print"
          onClick={() => window.print()}
        >
          <Download size={16} /> Export Q3 2026 Market Report (PDF)
        </button>
      </div>

      {/* High-Level Market Statistics Grid */}
      <div className="stats-banner glass-panel" style={{ margin: '0 0 35px', padding: '24px' }}>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ color: '#38bdf8' }}>
              <Building2 size={24} />
            </div>
            <div>
              <div className="stat-number">₹9,850/sq.ft</div>
              <div className="stat-label">Chennai Overall Avg. Rate</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ color: '#10b981' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="stat-number">+14.6% YoY</div>
              <div className="stat-label">Annual City Growth Rate</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ color: '#ec4899' }}>
              <Percent size={24} />
            </div>
            <div>
              <div className="stat-number">5.6% p.a.</div>
              <div className="stat-label">Avg. Gross Rental Yield</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ color: '#c084fc' }}>
              <Flame size={24} />
            </div>
            <div>
              <div className="stat-number">+68.4%</div>
              <div className="stat-label">5-Year Cumulative ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Locality Selector Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
          Select Micro-Market Locality:
        </span>
        <div className="filter-pills-row" style={{ marginBottom: 0 }}>
          {Object.keys(LOCALITY_DATA).map((key) => {
            const item = LOCALITY_DATA[key];
            const isActive = activeLocalityKey === key;
            return (
              <button
                key={key}
                className={`filter-pill ${isActive ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveLocalityKey(key)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={13} />
                <span>{item.name}</span>
                <span style={{ fontSize: '11px', color: isActive ? '#fff' : '#10b981', fontWeight: 800 }}>
                  ({item.yoyGrowth})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Locality Analytics Dashboard Grid */}
      <div className="trends-layout-grid" style={{ marginBottom: '40px' }}>
        
        {/* Left Column: Historical Appreciation Graph Visualizer */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="property-type-tag">MICRO-MARKET ANALYSIS</span>
              <h2 style={{ fontSize: '24px', margin: '4px 0' }}>{locality.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{locality.subTitle}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="trend-growth-badge growth-positive" style={{ fontSize: '14px', padding: '6px 14px' }}>
                <TrendingUp size={16} /> {locality.yoyGrowth} YoY Appreciation
              </span>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Investment Score: <strong style={{ color: '#c084fc' }}>{locality.hotnessScore}</strong>
              </div>
            </div>
          </div>

          {/* Visual Bar Chart for Historical Prices */}
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={16} /> Capital Price Growth Trajectory (₹ per sq.ft)
            </h4>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', padding: '16px 8px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', gap: '12px' }}>
              {locality.history.map((item, idx) => {
                // Max rate in range is around 18000
                const heightPct = Math.min(100, Math.round((item.rate / 16000) * 100));
                const isLive = item.year.includes('Live');
                const isForecast = item.year.includes('Forecast');
                
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: isLive ? '#c084fc' : isForecast ? '#38bdf8' : '#fff', marginBottom: '6px' }}>
                      ₹{item.rate}
                    </span>
                    <div 
                      style={{
                        width: '100%',
                        maxWidth: '44px',
                        height: `${heightPct}%`,
                        borderRadius: '8px 8px 0 0',
                        background: isLive 
                          ? 'linear-gradient(180deg, #a855f7 0%, #ec4899 100%)' 
                          : isForecast 
                            ? 'linear-gradient(180deg, rgba(56, 189, 248, 0.7) 0%, rgba(99, 102, 241, 0.4) 100%)'
                            : 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
                        border: isLive ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.15)',
                        boxShadow: isLive ? '0 0 15px rgba(168, 85, 247, 0.5)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    ></div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      {item.year.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: '9px', color: isLive ? '#10b981' : 'var(--text-sub)', fontWeight: 600 }}>
                      {item.pct}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Growth Catalysts */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#c084fc" /> Infrastructure & Market Catalysts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {locality.catalysts.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-sub)' }}>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Key Metrics & ROI Predictor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Key Metrics Snapshot */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '17px', marginBottom: '16px' }}>Pricing & Returns Snapshot</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Rate</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8' }}>{locality.currentRate}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>5-Yr Total ROI</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>{locality.fiveYearGrowth}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gross Rental Yield</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#c084fc' }}>{locality.rentalYield}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Investment Risk</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>{locality.riskLevel}</div>
              </div>
            </div>

            {/* Typical Property Budget In this Area */}
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>2 BHK Luxury Apartment:</span>
                <strong>{locality.bhk2Avg}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>3 BHK Premium Apartment:</span>
                <strong>{locality.bhk3Avg}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Luxury Gated Villa:</span>
                <strong style={{ color: '#38bdf8' }}>{locality.villaAvg}</strong>
              </div>
            </div>
          </div>

          {/* Interactive ROI Calculator for this Area */}
          <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(15, 17, 32, 0.9) 0%, rgba(30, 27, 75, 0.7) 100%)' }}>
            <h3 style={{ fontSize: '17px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={18} color="#10b981" /> Projected Investment Growth Estimator
            </h3>

            <div className="slider-group" style={{ marginBottom: '16px' }}>
              <div className="slider-header-row">
                <span className="slider-title" style={{ fontSize: '12px' }}>Initial Capital Investment</span>
                <span className="slider-val-box">₹{(calcInvestment / 100000).toFixed(0)} Lakhs</span>
              </div>
              <input 
                type="range" 
                min="2000000" 
                max="30000000" 
                step="1000000"
                value={calcInvestment}
                onChange={(e) => setCalcInvestment(Number(e.target.value))}
                className="custom-range-slider"
              />
            </div>

            <div className="slider-group" style={{ marginBottom: '18px' }}>
              <div className="slider-header-row">
                <span className="slider-title" style={{ fontSize: '12px' }}>Holding Horizon (Years)</span>
                <span className="slider-val-box">{calcYears} Years</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1"
                value={calcYears}
                onChange={(e) => setCalcYears(Number(e.target.value))}
                className="custom-range-slider"
              />
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Projected Asset Valuation in {2026 + calcYears}</span>
              <div className="gradient-accent-text" style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0' }}>
                ₹{projectedFutureVal.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                Estimated Wealth Gain: +₹{estimatedProfit.toLocaleString('en-IN')}
              </div>
            </div>

            <button 
              className="glass-btn" 
              style={{ width: '100%', marginTop: '16px', fontSize: '13px' }}
              onClick={() => {
                if (setActivePage) setActivePage('properties');
              }}
            >
              Browse Properties in {locality.name} <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>

      {/* Mega City Infrastructure Overview */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>
          Major Infrastructure Catalysts Powering Chennai 2026 - 2030
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Key government transit and industrial projects expected to drive 15% - 25% annual appreciation across corridors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '14px' }}>
            <span style={{ color: '#c084fc', fontWeight: 800, fontSize: '13px' }}>🚇 METRO PHASE-2 (118.9 KM)</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px' }}>Corridors 3, 4 & 5</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Connecting Madhavaram to SIPCOT (OMR), Lighthouse to Poonamallee, and Madhavaram to Sholinganallur. High price surge across all station nodes.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '14px' }}>
            <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '13px' }}>✈️ PARANDUR GREENFIELD AIRPORT</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px' }}>₹20,000 Cr Mega Project</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Second international airport driving land and housing appreciation across West Chennai, Sriperumbudur, and Bangalore Highway corridors.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '14px' }}>
            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '13px' }}>🌊 ECR 4-LANE COASTAL CORRIDOR</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px' }}>Sholinganallur to Mahabalipuram</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Elevated corridors and seamless 4-laning making ECR beachfront luxury villas accessible in under 25 mins from Adyar and South IT parks.
            </p>
          </div>
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
          <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Step: 5 of 9 in AGS NEST Journey
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Inspect your shortlisted Saved Properties & Wishlist!
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (setActivePage) setActivePage('price-drop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            <ArrowLeft size={15} /> Previous: 4. 🔔 Price Drop
          </button>

          <button 
            className="glass-btn" 
            onClick={() => {
              if (setActivePage) setActivePage('saved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' }}
          >
            <span>Next: 6. ❤️ Saved Properties →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default PriceTrends;
