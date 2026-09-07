import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Phone, 
  Mail, 
  Calendar, 
  Send, 
  Star, 
  Share2, 
  Heart,
  CreditCard,
  Banknote,
  Gift,
  Flame,
  Tag,
  Compass,
  ChevronLeft,
  ChevronRight,
  Box,
  Droplets,
  Layers,
  Check,
  Utensils,
  Sun
} from 'lucide-react';
import Virtual3DTourModal from '../components/Virtual3DTourModal';
import GoogleMapView from '../components/GoogleMapView';
import { getPropertyRoomList } from '../utils/propertyRooms';

function PropertyDetails({ property, onBack, onBookProperty, onEnquire }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [show3DTour, setShow3DTour] = useState(false);

  if (!property) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <button className="glass-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Properties
        </button>
      </div>
    );
  }

  // Room items for corner navigation and room-by-room breakdown: Guaranteed full room sequence
  const roomsList = React.useMemo(() => {
    return getPropertyRoomList(property);
  }, [property]);

  const currentRoom = roomsList[activeImageIdx] || roomsList[0] || { name: 'Main View', tag: '📸 Exterior', image: property.image, desc: 'Verified property photograph.' };
  const displayPrice = property.offerPrice || property.price;

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % roomsList.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + roomsList.length) % roomsList.length);
  };

  return (
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px' }}>
      
      {/* 3D Virtual Tour Walkthrough Modal */}
      {show3DTour && (
        <Virtual3DTourModal 
          property={property} 
          onClose={() => setShow3DTour(false)} 
        />
      )}

      {/* Top 9-Step Workflow Breadcrumb */}
      <div 
        className="glass-panel"
        style={{
          padding: '12px 18px',
          marginBottom: '20px',
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
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            2. 🏘️ Properties
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#38bdf8', fontWeight: 800, background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            9. 🏡 Property Details & 3D Tour (Active)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: '#10b981', fontWeight: 700 }}>
            Slot Booking & Confirmed Invoice
          </span>
        </div>

        <button 
          className="glass-btn-secondary" 
          onClick={onBack}
          style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px' }}
        >
          <ArrowLeft size={14} /> Back to Catalog
        </button>
      </div>

      {/* Special Offer Highlight Banner if Offer Note Exists */}
      {property.offerNote && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 8px 30px rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(239,68,68,0.6)' }}>
              <Gift size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 800, letterSpacing: '0.05em' }}>
                🔥 EXCLUSIVE LIMITED PERIOD OFFER DEAL
              </div>
              <strong style={{ fontSize: '15px', color: '#fff' }}>
                {property.offerNote}
              </strong>
            </div>
          </div>

          {property.offerDiscount && (
            <span style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
              {property.offerDiscount}
            </span>
          )}
        </div>
      )}

      {/* Main Grid: Gallery & Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Column: Multi-Room Gallery with Corner Arrows & 3D Icon */}
        <div>
          {/* Main Image Stage */}
          <div className="glass-panel" style={{ overflow: 'hidden', height: '440px', borderRadius: '20px', marginBottom: '14px', position: 'relative' }}>
            <img 
              src={currentRoom.image || property.image} 
              alt={currentRoom.name || property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
            />
            
            {/* Top Badges */}
            <div className="card-top-badges" style={{ zIndex: 5 }}>
              {property.offerDiscount ? (
                <span className="card-badge badge-featured" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
                  <Tag size={12} /> {property.offerDiscount}
                </span>
              ) : (
                <span className="card-badge badge-featured">
                  <Sparkles size={12} /> {property.badge || 'VERIFIED'}
                </span>
              )}
              <span className="card-badge badge-status">{property.status}</span>
            </div>

            {/* Glowing 3D Virtual Tour Button in Top Right Corner */}
            <button
              onClick={() => setShow3DTour(true)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '14px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(56, 189, 248, 0.6)',
                transition: 'all 0.2s ease'
              }}
              title="Launch 3D / 360° Virtual Walkthrough"
            >
              <Box size={16} />
              <span>🧊 3D / 360° VIRTUAL TOUR</span>
            </button>

            {/* Left Corner Carousel Arrow Button (Backside Move) */}
            {roomsList.length > 1 && (
              <button 
                onClick={handlePrevImage}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), 0 0 15px rgba(56, 189, 248, 0.4)',
                  transition: 'all 0.2s ease'
                }}
                title="Previous Room View (Backside Move)"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Right Corner Carousel Arrow Button (Frontside Move) */}
            {roomsList.length > 1 && (
              <button 
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), 0 0 15px rgba(56, 189, 248, 0.4)',
                  transition: 'all 0.2s ease'
                }}
                title="Next Room View (Frontside Move)"
              >
                <ChevronRight size={26} />
              </button>
            )}

            {/* Bottom Room Title & Description Banner Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 8,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '14px',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#38bdf8', display: 'block' }}>
                  {currentRoom.tag || currentRoom.name}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--text-sub)' }}>
                  {currentRoom.desc || 'Verified room interior and architectural view.'}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '3px 8px', borderRadius: '8px' }}>
                Room {activeImageIdx + 1} of {roomsList.length}
              </span>
            </div>
          </div>

          {/* Room-by-Room Direct Jump Chips Bar */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap',
            paddingBottom: '4px'
          }}>
            {roomsList.map((room, idx) => {
              const isActive = activeImageIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)' : 'rgba(255,255,255,0.04)',
                    border: isActive ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    color: isActive ? '#38bdf8' : 'var(--text-sub)',
                    fontWeight: isActive ? 800 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={room.image} alt={room.name} style={{ width: '28px', height: '22px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span>{room.tag || room.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Room Specifications & Plumbing Breakdown */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#38bdf8" /> Room Architecture & Interior Specifications
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '13px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Bed size={14} /> Bedroom Layouts
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                  {property.beds} Bedrooms with Italian teakwood wardrobe, wooden flooring, acoustic glass windows.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '13px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Utensils size={14} /> Modular Kitchen Model
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                  L-shaped quartz countertop, chimney, soft-touch pullout drawers & separate utility wash sink.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Droplets size={14} /> Bathroom & Water Pipes
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                  High-pressure CPVC concealed pipes, rain shower, wall-hung commode & anti-skid ceramic tiles.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '13px', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Sun size={14} /> Top Balcony & Terrace
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                  Toughened glass safety railings with open skyline breeze view and weather-proof flooring.
                </p>
              </div>
            </div>
          </div>

          {/* Property Overview */}
          <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Property Overview</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7 }}>
              {property.description}
            </p>

            {/* Specifications Grid */}
            <div className="property-specs-grid" style={{ margin: '20px 0', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="spec-item"><Bed size={16} /> <span>{property.beds} Bedrooms</span></div>
              <div className="spec-item"><Bath size={16} /> <span>{property.baths} Bathrooms</span></div>
              <div className="spec-item"><Maximize2 size={16} /> <span>{property.sqft} sq.ft</span></div>
              <div className="spec-item"><ShieldCheck size={16} /> <span>RERA Verified</span></div>
            </div>

            {/* Amenities List */}
            <h4 style={{ fontSize: '16px', margin: '24px 0 12px' }}>Amenities & Facilities</h4>
            <div className="modal-prop-amenities-grid">
              {(property.amenities || ['Power Backup', 'Security', 'Covered Parking', 'Elevators', 'Gym']).map((item, idx) => (
                <div key={idx} className="amenity-item">
                  <CheckCircle2 size={15} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Map Section */}
          <GoogleMapView 
            locationName={property.location || property.area}
            title={`📍 ${property.title} on Google Map`}
            height="380px"
            showTransitDetails={true}
          />
        </div>

        {/* Right Column: Pricing & Booking Action Card */}
        <div style={{ position: 'sticky', top: '90px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', background: 'rgba(15, 17, 32, 0.95)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            <span className="property-type-tag">{property.type} • {property.location}</span>
            <h1 style={{ fontSize: '24px', margin: '6px 0 10px' }}>{property.title}</h1>
            
            <div className="property-location" style={{ marginBottom: '18px' }}>
              <MapPin size={16} className="location-icon" />
              <span>{property.location}</span>
            </div>

            {/* Price Box with Offer Highlight */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {property.offerPrice ? 'Special Discounted Price' : 'Property Valuation'}
              </span>

              {property.originalPrice && (
                <div style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through', marginTop: '2px' }}>
                  {property.originalPrice}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0 8px' }}>
                <span className="gradient-accent-text" style={{ fontSize: '28px', fontWeight: 900 }}>
                  {displayPrice}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  ({property.pricePerSqft || '₹7,800/sq.ft'})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '12px', fontWeight: 600 }}>
                <CheckCircle2 size={14} /> 100% Verified Legal Documents & CMDA Approved
              </div>
            </div>

            {/* Step-by-Step Direct Action Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="glass-btn" 
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                onClick={() => onBookProperty && onBookProperty(property)}
              >
                <span>Next Step: Reserve Token & Pick Slot</span>
                <ArrowRight size={16} />
              </button>

              <button 
                className="glass-btn-secondary" 
                style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                onClick={() => onEnquire && onEnquire(property)}
              >
                <Phone size={15} />
                <span>Schedule Site Inspection & Free Cab</span>
              </button>

              <button 
                className="glass-btn-secondary" 
                style={{ width: '100%', padding: '12px', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)', border: '1px solid #38bdf8', color: '#38bdf8' }}
                onClick={() => setShow3DTour(true)}
              >
                <Box size={16} />
                <span>Open 3D Virtual Walkthrough</span>
              </button>
            </div>

            {/* Security Assurance Badges */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-sub)' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>Token amount (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'}) is 100% refundable on cancellation.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-sub)' }}>
                <Calendar size={16} color="#38bdf8" />
                <span>Private Chauffeur cab dispatched for your scheduled site visit.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PropertyDetails;
