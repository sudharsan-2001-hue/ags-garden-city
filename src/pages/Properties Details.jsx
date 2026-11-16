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
  Sun,
  PhoneCall
} from 'lucide-react';
import Virtual3DTourModal from '../components/Virtual3DTourModal';
import DirectCallModal from '../components/DirectCallModal';
import GoogleMapView from '../components/GoogleMapView';
import { getPropertyRoomList } from '../utils/propertyRooms';
import GlassStepBar from '../components/GlassStepBar';

function PropertyDetails({ property, onBack, onBookProperty, onEnquire, setActivePage }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [show3DTour, setShow3DTour] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

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
    <div className="section-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left', padding: '0 16px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* 3D Virtual Tour Walkthrough Modal */}
      {show3DTour && (
        <Virtual3DTourModal 
          property={property} 
          onClose={() => setShow3DTour(false)} 
        />
      )}

      {/* Direct Mobile Call & Verified Numbers View Modal */}
      {showCallModal && (
        <DirectCallModal 
          property={property} 
          onClose={() => setShowCallModal(false)} 
          onScheduleInspection={onEnquire}
        />
      )}

      {/* Universal Glassmorphic 10-Step Progress Stepper */}
      <GlassStepBar 
        currentStepId="property-detail"
        setActivePage={setActivePage}
        onPrev={() => {
          if (setActivePage) setActivePage('verified');
          else onBack();
          window.scrollTo(0, 0);
        }}
        prevLabel="Step 7: Verified Properties"
        onNext={() => {
          if (onBookProperty) onBookProperty(property);
          else if (setActivePage) setActivePage('checkout');
          window.scrollTo(0, 0);
        }}
        nextLabel={`Step 9: Slot Booking (₹${property.tokenAmount?.toLocaleString('en-IN') || '20,000'})`}
      />

      {/* Special Offer Highlight Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '16px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: '0 8px 30px rgba(239, 68, 68, 0.2)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(239,68,68,0.6)', flexShrink: 0 }}>
            <Gift size={20} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '10.5px', color: '#fca5a5', fontWeight: 800, letterSpacing: '0.04em' }}>
              🔥 EXCLUSIVE OFFER DEAL & VERIFIED PRICING
            </div>
            <strong style={{ fontSize: '14px', color: '#fff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {property.offerNote || 'Direct Developer Verified Deal: 0% Brokerage + Free Legal Documentation & VIP Site Visit Cab Assistance Included!'}
            </strong>
          </div>
        </div>

        <span style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
          {property.offerDiscount || 'SPECIAL OFFER'}
        </span>
      </div>

      {/* Main Grid: Gallery & Information */}
      <div className="property-details-layout">
        
        {/* Left Column: Multi-Room Gallery with Corner Arrows & 3D Icon */}
        <div style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
          {/* Main Image Stage */}
          <div className="glass-panel property-details-main-stage" style={{ overflow: 'hidden', height: 'clamp(260px, 52vw, 440px)', borderRadius: '20px', marginBottom: '14px', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
            <img 
              src={currentRoom.image || property.image} 
              alt={currentRoom.name || property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
            />
            
            {/* Top Badges */}
            <div className="card-top-badges" style={{ zIndex: 5, top: '12px', left: '12px' }}>
              {property.offerDiscount ? (
                <span className="card-badge badge-featured" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', fontSize: '11px', padding: '4px 8px' }}>
                  <Tag size={11} /> {property.offerDiscount}
                </span>
              ) : (
                <span className="card-badge badge-featured" style={{ fontSize: '11px', padding: '4px 8px' }}>
                  <Sparkles size={11} /> {property.badge || 'VERIFIED'}
                </span>
              )}
              <span className="card-badge badge-status" style={{ fontSize: '11px', padding: '4px 8px' }}>{property.status}</span>
            </div>

            {/* Glowing 3D Virtual Tour Button in Top Right Corner */}
            <button
              onClick={() => setShow3DTour(true)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '12px',
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(56, 189, 248, 0.6)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              title="Launch 3D / 360° Virtual Walkthrough"
            >
              <Box size={14} />
              <span>🧊 3D Tour</span>
            </button>

            {/* Left Corner Carousel Arrow Button (Backside Move) */}
            {roomsList.length > 1 && (
              <button 
                onClick={handlePrevImage}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), 0 0 15px rgba(56, 189, 248, 0.4)',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                title="Previous Room View"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Right Corner Carousel Arrow Button (Frontside Move) */}
            {roomsList.length > 1 && (
              <button 
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), 0 0 15px rgba(56, 189, 248, 0.4)',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                title="Next Room View"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Bottom Room Title & Description Banner Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              zIndex: 8,
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <strong style={{ fontSize: '13px', color: '#38bdf8', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentRoom.tag || currentRoom.name}
                </strong>
                <span style={{ fontSize: '10.5px', color: 'var(--text-sub)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentRoom.desc || 'Verified room interior view.'}
                </span>
              </div>
              <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 7px', borderRadius: '6px', flexShrink: 0 }}>
                {activeImageIdx + 1}/{roomsList.length}
              </span>
            </div>
          </div>

          {/* Room-by-Room Direct Jump Chips Bar */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap',
            paddingBottom: '4px',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box'
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
                    padding: '6px 10px',
                    color: isActive ? '#38bdf8' : 'var(--text-sub)',
                    fontWeight: isActive ? 800 : 500,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={room.image} alt={room.name} style={{ width: '26px', height: '20px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span>{room.tag || room.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Room Specifications & Plumbing Breakdown */}
          <div className="glass-panel" style={{ padding: 'clamp(16px, 3vw, 24px)', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={17} color="#38bdf8" /> Room Architecture & Interior Specs
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '12.5px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Bed size={13} /> Bedrooms
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                  {property.beds} Bedrooms with Italian teakwood wardrobe & acoustic glass.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '12.5px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Utensils size={13} /> Modular Kitchen
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                  L-shaped quartz countertop, chimney & soft-touch pullout drawers.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '12.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Droplets size={13} /> Bathrooms & Water
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                  High-pressure CPVC pipes, rain shower & anti-skid ceramic tiles.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: '12.5px', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Sun size={13} /> Balcony & Terrace
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-sub)', lineHeight: 1.4 }}>
                  Toughened glass safety railings with open skyline breeze view.
                </p>
              </div>
            </div>
          </div>

          {/* Property Overview */}
          <div className="glass-panel" style={{ padding: 'clamp(16px, 3vw, 28px)', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Property Overview</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6 }}>
              {property.description}
            </p>

            {/* Specifications Grid */}
            <div className="property-specs-grid" style={{ margin: '16px 0' }}>
              <div className="spec-item"><Bed size={15} /> <span>{property.beds} Bedrooms</span></div>
              <div className="spec-item"><Bath size={15} /> <span>{property.baths} Bathrooms</span></div>
              <div className="spec-item"><Maximize2 size={15} /> <span>{property.sqft} sq.ft</span></div>
              <div className="spec-item"><ShieldCheck size={15} /> <span>RERA Verified</span></div>
            </div>

            {/* Amenities List */}
            <h4 style={{ fontSize: '15px', margin: '20px 0 10px' }}>Amenities & Facilities</h4>
            <div className="modal-prop-amenities-grid">
              {(property.amenities || ['Power Backup', 'Security', 'Covered Parking', 'Elevators', 'Gym']).map((item, idx) => (
                <div key={idx} className="amenity-item">
                  <CheckCircle2 size={14} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Map Section */}
          <GoogleMapView 
            locationName={property.location || property.area}
            title={`📍 ${property.title} on Google Map`}
            height="320px"
            showTransitDetails={true}
          />
        </div>

        {/* Right Column: Pricing & Booking Action Card */}
        <div style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
          
          <div className="glass-panel" style={{ padding: 'clamp(18px, 3vw, 32px)', textAlign: 'left', background: 'rgba(15, 17, 32, 0.95)', border: '1px solid rgba(168, 85, 247, 0.35)', width: '100%', boxSizing: 'border-box' }}>
            <span className="property-type-tag" style={{ fontSize: '11px' }}>{property.type} • {property.location}</span>
            <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', margin: '6px 0 8px' }}>{property.title}</h1>
            
            <div className="property-location" style={{ marginBottom: '14px', fontSize: '12.5px' }}>
              <MapPin size={15} className="location-icon" />
              <span>{property.location}</span>
            </div>

            {/* Price Box with Offer Highlight */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {property.offerPrice ? 'Special Discounted Price' : 'Property Valuation'}
              </span>

              {property.originalPrice && (
                <div style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through', marginTop: '2px' }}>
                  {property.originalPrice}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0 6px', flexWrap: 'wrap' }}>
                <span className="gradient-accent-text" style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 900 }}>
                  {displayPrice}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  ({property.pricePerSqft || '₹7,800/sq.ft'})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '11px', fontWeight: 600 }}>
                <CheckCircle2 size={13} style={{ flexShrink: 0 }} /> 100% Verified Legal CMDA Approved
              </div>
            </div>

            {/* Step-by-Step Direct Action Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <button 
                className="glass-btn" 
                style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                onClick={() => onBookProperty && onBookProperty(property)}
              >
                <span>Reserve Token & Pick Slot</span>
                <ArrowRight size={15} />
              </button>

              <button 
                className="glass-btn-secondary" 
                style={{ width: '100%', padding: '10px 12px', justifyContent: 'center', fontSize: '12.5px', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                onClick={() => setShowCallModal(true)}
              >
                <PhoneCall size={14} />
                <span>📞 Call Advisor (+91 73971 35792)</span>
              </button>

              <button 
                className="glass-btn-secondary" 
                style={{ width: '100%', padding: '10px 12px', justifyContent: 'center', fontSize: '12.5px' }}
                onClick={() => onEnquire && onEnquire(property)}
              >
                <Phone size={14} />
                <span>Schedule Inspection & Free Cab</span>
              </button>

              <button 
                className="glass-btn-secondary" 
                style={{ width: '100%', padding: '10px 12px', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)', border: '1px solid #38bdf8', color: '#38bdf8', fontSize: '12.5px' }}
                onClick={() => setShow3DTour(true)}
              >
                <Box size={15} />
                <span>Open 3D Virtual Walkthrough</span>
              </button>
            </div>

            {/* Security Assurance Badges */}
            <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-sub)' }}>
                <ShieldCheck size={15} color="#10b981" style={{ flexShrink: 0 }} />
                <span>Token (₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'}) 100% refundable on cancellation.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-sub)' }}>
                <Calendar size={15} color="#38bdf8" style={{ flexShrink: 0 }} />
                <span>Private Chauffeur cab dispatched for your site visit.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '28px',
          marginBottom: '20px',
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
            Current Step: 8 of 10 in AGS NEST Process
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Ready to secure this residence with an official token advance?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => {
              if (onBack) onBack();
              else if (setActivePage) setActivePage('verified');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={15} /> <span>Previous: Step 7. Verified</span>
          </button>

          <button 
            className="glass-btn-secondary" 
            onClick={() => onEnquire && onEnquire(property)}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            📝 Free Site Visit Cab
          </button>

          <button 
            className="glass-btn" 
            onClick={() => onBookProperty && onBookProperty(property)}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <span>Next: Step 9. 💳 Token Booking & GST →</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default PropertyDetails;
