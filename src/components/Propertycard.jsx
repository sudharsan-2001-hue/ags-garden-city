import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  PhoneCall, 
  Tag, 
  Flame, 
  Gift, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Box,
  Eye,
  Camera
} from 'lucide-react';
import Virtual3DTourModal from './Virtual3DTourModal';
import { getPropertyRoomList } from '../utils/propertyRooms';

function Propertycard({ property, onSelectProperty, onEnquire }) {
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [show3DTour, setShow3DTour] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const {
    id,
    title,
    price,
    originalPrice,
    offerPrice,
    offerNote,
    offerDiscount,
    pricePerSqft,
    location,
    type,
    beds,
    baths,
    sqft,
    image,
    badge = 'FEATURED',
    status = 'For Sale',
    verified = true,
    roomsGallery = []
  } = property || {};

  const displayPrice = offerPrice || price || '₹64,00,000';

  // Build guaranteed 6-room suite: 1. Elevation -> 2. Living Hall -> 3. Master Bed -> 4. Kitchen -> 5. Bath -> 6. Balcony
  const roomItems = React.useMemo(() => {
    return getPropertyRoomList(property);
  }, [property]);

  const currentRoom = roomItems[currentImageIdx] || roomItems[0] || { name: 'Main View', tag: '🏢 Main Elevation', image: image };

  const handleNextImage = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % roomItems.length);
  };

  const handlePrevImage = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + roomItems.length) % roomItems.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      handleNextImage(e);
    } else if (distance < -40) {
      handlePrevImage(e);
    }
  };

  return (
    <div className="glass-property-card glass-panel glass-panel-hover" style={{ position: 'relative' }}>
      
      {/* 3D Virtual Tour Walkthrough Modal */}
      {show3DTour && (
        <Virtual3DTourModal 
          property={property} 
          onClose={() => setShow3DTour(false)} 
        />
      )}

      {/* Special Offer Ribbon / Tag if Offer Note exists */}
      {offerNote && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '14px',
          zIndex: 10,
          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 800,
          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          letterSpacing: '0.03em'
        }}>
          <Flame size={12} fill="#fff" />
          <span>SPECIAL OFFER DEAL</span>
        </div>
      )}

      {/* Image & Side Arrow Room-by-Room Navigation Section */}
      <div 
        className="property-img-wrapper" 
        style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={currentRoom.image || image} 
          alt={title} 
          className="property-img" 
          loading="lazy"
          style={{ transition: 'all 0.3s ease' }}
        />
        <div className="property-img-gradient"></div>

        {/* Top Badges */}
        <div className="card-top-badges" style={{ zIndex: 5 }}>
          {offerDiscount ? (
            <span className="card-badge badge-featured" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
              <Tag size={12} /> {offerDiscount}
            </span>
          ) : badge ? (
            <span className="card-badge badge-featured">
              <Sparkles size={12} />
              {badge}
            </span>
          ) : null}
          <span className="card-badge badge-status">{status}</span>
        </div>

        {/* Total Rooms & Side-Arrow Navigation Guide Banner */}
        <div style={{
          position: 'absolute',
          top: '46px',
          left: '12px',
          zIndex: 6,
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(56, 189, 248, 0.6)',
          borderRadius: '10px',
          padding: '3px 8px',
          fontSize: '10.5px',
          fontWeight: 800,
          color: '#38bdf8',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.6)'
        }}>
          <Camera size={12} />
          <span>{roomItems.length} ROOMS • TAP ◄ ► TO TOUR</span>
        </div>

        {/* Floating 3D Icon Badge in Top Right Corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShow3DTour(true);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '48px',
            zIndex: 6,
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.95) 0%, rgba(56, 189, 248, 0.95) 100%)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(56, 189, 248, 0.5)',
            transition: 'all 0.2s ease'
          }}
          title="Open Interactive 3D Room Walkthrough"
        >
          <Box size={12} />
          <span>🧊 3D VIEW</span>
        </button>

        {/* Heart Bookmark Button */}
        <button 
          className={`card-heart-btn ${isSaved ? 'heart-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          aria-label="Save property"
          style={{ zIndex: 6 }}
        >
          <Heart size={16} fill={isSaved ? '#ec4899' : 'none'} color={isSaved ? '#ec4899' : '#fff'} />
        </button>

        {/* Left Side Arrow Button (One by one room view - previous) */}
        {roomItems.length > 1 && (
          <button 
            onClick={handlePrevImage}
            aria-label="Previous Room"
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 12,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #38bdf8',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 16px rgba(56, 189, 248, 0.6)',
              transition: 'all 0.15s ease'
            }}
            title="Previous Room: Living, Bed, Kitchen, Bath"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
        )}

        {/* Right Side Arrow Button (One by one room view - next) */}
        {roomItems.length > 1 && (
          <button 
            onClick={handleNextImage}
            aria-label="Next Room"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 12,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #38bdf8',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 16px rgba(56, 189, 248, 0.6)',
              transition: 'all 0.15s ease'
            }}
            title="Next Room: Living, Bed, Kitchen, Bath"
          >
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        )}

        {/* Active Room Title Pill Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          zIndex: 8,
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #38bdf8',
          borderRadius: '12px',
          padding: '5px 12px',
          fontSize: '11.5px',
          fontWeight: 800,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.7)'
        }}>
          <span style={{ color: '#38bdf8' }}>{currentRoom.tag || currentRoom.name}</span>
          <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 800, background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '6px' }}>
            Room {currentImageIdx + 1} of {roomItems.length}
          </span>
        </div>

        {/* Clickable Room Dots Indicator */}
        {roomItems.length > 1 && (
          <div 
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 8,
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '6px 10px',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            {roomItems.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(i);
                }}
                style={{
                  width: currentImageIdx === i ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: currentImageIdx === i ? '#38bdf8' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: currentImageIdx === i ? '0 0 10px #38bdf8' : 'none'
                }}
                title={roomItems[i]?.name || `Room ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Room-by-Room Direct Explorer Pills Strip */}
      {roomItems.length > 1 && (
        <div 
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            padding: '8px 12px',
            background: 'rgba(15, 23, 42, 0.75)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            scrollbarWidth: 'none'
          }}
        >
          {roomItems.map((room, idx) => {
            const isActive = idx === currentImageIdx;
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(idx);
                }}
                style={{
                  padding: '4px 9px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.4) 0%, rgba(56, 189, 248, 0.4) 100%)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isActive ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#fff' : 'var(--text-sub)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: isActive ? '0 0 10px rgba(56, 189, 248, 0.35)' : 'none',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
                title={`View ${room.name}`}
              >
                <span>{room.tag ? room.tag.split(' ')[0] : '📸'}</span>
                <span>{room.name || `Room ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Card Body */}
      <div className="property-card-body">
        <div className="property-header-row">
          <span className="property-type-tag">{type}</span>
          {verified && (
            <span className="verified-tag">
              <ShieldCheck size={14} /> Verified
            </span>
          )}
        </div>

        <h3 className="property-title" onClick={() => onSelectProperty && onSelectProperty(property)}>
          {title}
        </h3>

        <div className="property-location">
          <MapPin size={15} className="location-icon" />
          <span>{location}</span>
        </div>

        {/* Clear Highlighted Price Amount Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '12px',
          padding: '10px 12px',
          margin: '10px 0'
        }}>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', fontWeight: 600, letterSpacing: '0.05em' }}>
              TOTAL AMOUNT
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              {originalPrice && (
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>
                  {originalPrice}
                </span>
              )}
              <strong style={{ fontSize: '19px', color: '#38bdf8', fontWeight: 900 }}>
                {displayPrice}
              </strong>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ 
              fontSize: '11px', 
              color: '#10b981', 
              background: 'rgba(16, 185, 129, 0.15)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '3px 8px', 
              borderRadius: '8px', 
              fontWeight: 800,
              display: 'inline-block'
            }}>
              Token: ₹{property.tokenAmount?.toLocaleString('en-IN') || '25,000'}
            </span>
            {pricePerSqft && (
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {pricePerSqft}
              </div>
            )}
          </div>
        </div>

        {/* Highlighted Special Offer Note Box */}
        {offerNote && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '10px',
            padding: '8px 10px',
            margin: '8px 0',
            fontSize: '11px',
            color: '#fca5a5',
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px'
          }}>
            <Gift size={14} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff' }}>Offer Note: </strong>
              <span>{offerNote}</span>
            </div>
          </div>
        )}

        {/* Specs Grid */}
        <div className="property-specs-grid">
          <div className="spec-item" title={`${beds} Bedrooms`}>
            <Bed size={15} />
            <span>{beds > 0 ? `${beds} Beds` : 'Plot / Comm'}</span>
          </div>
          <div className="spec-item" title={`${baths} Bathrooms`}>
            <Bath size={15} />
            <span>{baths > 0 ? `${baths} Baths` : 'Clear Title'}</span>
          </div>
          <div className="spec-item" title={`${sqft} Square Feet`}>
            <Maximize2 size={15} />
            <span>{sqft} sq.ft</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="property-card-actions">
          <button 
            className="glass-btn-details"
            onClick={() => onSelectProperty && onSelectProperty(property)}
          >
            <span>View Details & Offer</span>
            <ArrowUpRight size={15} />
          </button>
          
          <button 
            className="glass-btn-enquire"
            onClick={() => onEnquire && onEnquire(property)}
            title="Schedule Free Inspection & Cab"
          >
            <PhoneCall size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Propertycard;
