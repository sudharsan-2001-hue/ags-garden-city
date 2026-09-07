import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Gift, 
  DollarSign, 
  ShieldCheck, 
  Percent, 
  ArrowUpRight,
  Filter,
  Building2,
  Tag,
  PhoneCall
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/propertiesData';

export const TRENDING_METRICS = {
  1: { rank: '#1 TRENDING IN CHENNAI', viewsToday: 2420, demandScore: '9.9/10', appreciation: '+18.5% YoY', hotReason: 'High demand near Anna Nagar Metro & Shanti Colony' },
  2: { rank: '#2 LUXURY BEACHFRONT', viewsToday: 1890, demandScore: '9.7/10', appreciation: '+16.0% YoY', hotReason: 'Direct ECR beach access & private infinity pool' },
  3: { rank: '#3 FAST SELLING IT HUB', viewsToday: 3150, demandScore: '9.8/10', appreciation: '+19.2% YoY', hotReason: 'Walking distance to ELCOT SEZ & SIPCOT Tech corridor' },
  4: { rank: '#4 HIGH RENTAL YIELD', viewsToday: 1420, demandScore: '9.4/10', appreciation: '+14.2% YoY', hotReason: 'Duplex Penthouse near Phoenix Marketcity & MRTS' },
  5: { rank: '#5 BEST VALUE VILLA', viewsToday: 1680, demandScore: '9.5/10', appreciation: '+12.8% YoY', hotReason: 'Gated community villa with 100% Vastu compliance' },
  6: { rank: '#6 TOP COMMERCIAL ROI', viewsToday: 940, demandScore: '9.3/10', appreciation: '+15.4% YoY', hotReason: 'Grade-A office space with 8.2% gross rental return' }
};

function Trending({ 
  onSelectProperty, 
  onBookProperty, 
  onEnquire,
  setActivePage 
}) {
  const [filterCorridor, setFilterCorridor] = useState('all'); // 'all', 'annanagar', 'ecr', 'omr', 'velachery'
  const [sortBy, setSortBy] = useState('trending'); // 'trending', 'views', 'price-low', 'price-high'

  const trendingList = useMemo(() => {
    let list = PROPERTIES_DATA.map((p, idx) => {
      const metric = TRENDING_METRICS[p.id] || {
        rank: `#${idx + 1} TRENDING`,
        viewsToday: 1000 + (6 - idx) * 250,
        demandScore: '9.2/10',
        appreciation: '+14.0% YoY',
        hotReason: 'Verified title deeds & prime arterial road access'
      };
      return {
        ...p,
        trendingRank: idx + 1,
        trendingBadge: metric.rank,
        viewsToday: metric.viewsToday,
        demandScore: metric.demandScore,
        appreciation: metric.appreciation,
        hotReason: metric.hotReason
      };
    });

    if (filterCorridor !== 'all') {
      list = list.filter(p => p.area?.toLowerCase().includes(filterCorridor) || p.location?.toLowerCase().includes(filterCorridor));
    }

    if (sortBy === 'views') {
      list.sort((a, b) => b.viewsToday - a.viewsToday);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.priceVal - a.priceVal);
    } else {
      list.sort((a, b) => a.trendingRank - b.trendingRank);
    }

    return list;
  }, [filterCorridor, sortBy]);

  return (
    <div className="section-wrapper" style={{ maxWidth: '1340px', margin: '0 auto', textAlign: 'left', padding: '0 20px' }}>
      
      {/* Customer Journey Stepper Progress Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: '12px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(15, 17, 32, 0.9)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', flexWrap: 'wrap' }}>
          <span style={{ color: '#ef4444', fontWeight: 800 }}>🔥 Trending Properties (Current)</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: 'var(--text-muted)' }}>2. Property Details & Offer</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: 'var(--text-muted)' }}>3. Book Slot & Payment</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: 'var(--text-muted)' }}>4. Confirmed Invoice</span>
        </div>

        <button 
          className="glass-btn-secondary" 
          onClick={() => {
            if (setActivePage) setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px' }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Top Banner Header */}
      <div className="section-top-header" style={{ marginBottom: '28px' }}>
        <div className="section-title-group">
          <span 
            className="section-tag" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#f87171'
            }}
          >
            <Flame size={15} color="#ef4444" /> LIVE REAL-TIME PROPERTY DEMAND
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '38px' }}>
            🔥 Trending Properties <span className="gradient-text">in Chennai 2026</span>
          </h1>
          <p className="section-subtext">
            Handpicked hottest residential and luxury investment properties with maximum buyer inquiries, rapid appreciation rates, and exclusive direct-developer discounts.
          </p>
        </div>

        {/* Quick CTA to Price Trends */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="glass-btn"
            onClick={() => {
              if (setActivePage) setActivePage('trends');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <TrendingUp size={16} /> View Locality Price Index
          </button>
        </div>
      </div>

      {/* Real-Time Demand Highlights Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '20px 28px', 
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(168, 85, 247, 0.12) 50%, rgba(56, 189, 248, 0.1) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>12,840+</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Buyer Views Today</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Percent size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>+18.5% YoY</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Peak Chennai Appreciation</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#c084fc' }}>48 Sites</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Inspections Booked This Week</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
            <Gift size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>₹50,000 Off</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Instant Online Token Discount</div>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
        
        {/* Locality Corridor Pills */}
        <div className="filter-pills-row" style={{ margin: 0 }}>
          <button 
            className={`filter-pill ${filterCorridor === 'all' ? 'filter-pill-active' : ''}`}
            onClick={() => setFilterCorridor('all')}
          >
            🔥 All Trending ({PROPERTIES_DATA.length})
          </button>
          <button 
            className={`filter-pill ${filterCorridor === 'anna nagar' ? 'filter-pill-active' : ''}`}
            onClick={() => setFilterCorridor('anna nagar')}
          >
            📍 Anna Nagar Hotspots
          </button>
          <button 
            className={`filter-pill ${filterCorridor === 'ecr' ? 'filter-pill-active' : ''}`}
            onClick={() => setFilterCorridor('ecr')}
          >
            🌊 ECR Coastal Luxury
          </button>
          <button 
            className={`filter-pill ${filterCorridor === 'omr' ? 'filter-pill-active' : ''}`}
            onClick={() => setFilterCorridor('omr')}
          >
            💻 OMR IT Expressway
          </button>
          <button 
            className={`filter-pill ${filterCorridor === 'velachery' ? 'filter-pill-active' : ''}`}
            onClick={() => setFilterCorridor('velachery')}
          >
            🏢 Velachery & South Hub
          </button>
        </div>

        {/* Sort dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sort by:</span>
          <select 
            className="glass-input"
            style={{ padding: '6px 14px', fontSize: '13px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="trending">🏆 Trending Rank</option>
            <option value="views">🔥 Most Viewed Today</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Main Trending Properties Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '28px', marginBottom: '48px' }}>
        {trendingList.map((property) => {
          return (
            <div 
              key={property.id} 
              className="glass-panel glass-panel-hover"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: property.trendingRank === 1 ? '2px solid rgba(239, 68, 68, 0.6)' : '1px solid rgba(255,255,255,0.12)',
                position: 'relative'
              }}
            >
              {/* Image Container with Badges */}
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <img 
                  src={property.image} 
                  alt={property.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="property-card-img"
                  onClick={() => onSelectProperty && onSelectProperty(property)}
                />

                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />

                {/* Top Rank Badge */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                  <span 
                    style={{
                      background: property.trendingRank === 1 
                        ? 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' 
                        : property.trendingRank === 2
                          ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Flame size={13} fill="#fff" /> {property.trendingBadge}
                  </span>
                </div>

                {/* Live Views Today Pill */}
                <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2 }}>
                  <span 
                    style={{
                      background: 'rgba(15, 17, 32, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#38bdf8',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '16px',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={12} /> {property.viewsToday} views
                  </span>
                </div>

                {/* Price in Bottom Image Area */}
                <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Verified Price
                    </span>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                      {property.price}
                    </div>
                  </div>

                  <span 
                    style={{
                      background: 'rgba(16, 185, 129, 0.25)',
                      border: '1px solid #10b981',
                      color: '#10b981',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {property.appreciation}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>
                  <MapPin size={14} color="#c084fc" />
                  <span>{property.location}</span>
                </div>

                {/* Title */}
                <h3 
                  style={{ fontSize: '18px', color: '#fff', marginBottom: '10px', cursor: 'pointer', lineHeight: 1.3 }}
                  onClick={() => onSelectProperty && onSelectProperty(property)}
                >
                  {property.title}
                </h3>

                {/* Trending Catalyst reason */}
                <div 
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    marginBottom: '14px',
                    fontSize: '12px',
                    color: 'var(--text-sub)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <span>{property.hotReason}</span>
                </div>

                {/* Property Specs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '18px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bed size={15} color="#38bdf8" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bath size={15} color="#38bdf8" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Maximize2 size={15} color="#38bdf8" />
                    <span>{property.sqft} sq.ft</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                  <button 
                    className="glass-btn-secondary"
                    style={{ flex: 1, padding: '10px', fontSize: '12px', borderRadius: '10px' }}
                    onClick={() => onEnquire && onEnquire(property)}
                  >
                    <PhoneCall size={13} /> VIP Visit
                  </button>

                  <button 
                    className="glass-btn"
                    style={{ 
                      flex: 1.4, 
                      padding: '10px', 
                      fontSize: '12px', 
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                    }}
                    onClick={() => onBookProperty && onBookProperty(property)}
                  >
                    ⚡ Token ₹{(property.tokenAmount || 25000).toLocaleString('en-IN')}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Insights Section */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '8px', color: '#fff' }}>
          Why Chennai Real Estate is Booming in 2026
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Discover the key infrastructure developments driving consistent 14% - 19% yearly appreciation across top corridors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '13px' }}>🚇 METRO PHASE 2 CORRIDORS</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px', color: '#fff' }}>Unmatched Connectivity</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Rapid travel from Central Anna Nagar directly to OMR IT Corridor and SIPCOT Siruseri is driving exponential land appreciation.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '13px' }}>🌊 ECR COASTAL HIGHWAY EXPANSION</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px', color: '#fff' }}>Luxury Villa Boom</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              4-lane widening and elevated beach expressway making beachfront residences accessible in under 20 mins from prime city hubs.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '13px' }}>💼 GLOBAL IT & AI CENTRES</span>
            <h4 style={{ fontSize: '16px', margin: '8px 0 6px', color: '#fff' }}>High Rental Yields</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Multinational tech companies expanding operations creating record high rental occupancy and 6.2% annual rental yields.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Trending;
