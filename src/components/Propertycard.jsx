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
import DirectCallModal from './DirectCallModal';
import LegalDocumentModal from './LegalDocumentModal';
import { getPropertyRoomList } from '../utils/propertyRooms';

function Propertycard({ property, onSelectProperty, onEnquire, onBookProperty, showLegalDocuments = false, maxRoomImages }) {
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [show3DTour, setShow3DTour] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Automatically reset to Room 1 (Main Elevation / Exterior) whenever property changes
  React.useEffect(() => {
    setCurrentImageIdx(0);
  }, [property?.id, property?.title, property?.image]);

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
    return getPropertyRoomList(property, { maxRooms: maxRoomImages });
  }, [property, maxRoomImages]);

  const safeIdx = (currentImageIdx >= 0 && currentImageIdx < roomItems.length) ? currentImageIdx : 0;
  const currentRoom = roomItems[safeIdx] || roomItems[0] || { 
    name: 'Main View', 
    tag: '🏢 Main Elevation', 
    image: image || property?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80' 
  };
  const displayImage = currentRoom.image || image || property?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';

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
    <div 
      className="glass-property-card glass-panel glass-panel-hover" 
      style={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
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

      {activeLegalDoc && (
        <LegalDocumentModal
          property={property}
          docType={activeLegalDoc}
          onClose={() => setActiveLegalDoc(null)}
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
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          cursor: 'pointer',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={displayImage} 
          alt={title} 
          className="property-img" 
          loading="eager"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
          }}
          style={{ 
            width: '100%', 
            maxWidth: '100%',
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center', 
            display: 'block', 
            transition: 'all 0.3s ease' 
          }}
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
        <div className="room-count-banner">
          <Camera size={12} />
          <span>{roomItems.length} ROOMS • TAP ◄ ► TO TOUR</span>
        </div>

        {/* Floating 3D Icon Badge in Top Right Corner */}
        <button
          className="card-3d-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShow3DTour(true);
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
            className="room-nav-arrow room-nav-arrow-left"
            onClick={handlePrevImage}
            aria-label="Previous Room"
            title="Previous Room: Living, Bed, Kitchen, Bath"
          >
            <ChevronLeft size={22} strokeWidth={2.8} />
          </button>
        )}

        {/* Right Side Arrow Button (One by one room view - next) */}
        {roomItems.length > 1 && (
          <button 
            className="room-nav-arrow room-nav-arrow-right"
            onClick={handleNextImage}
            aria-label="Next Room"
            title="Next Room: Living, Bed, Kitchen, Bath"
          >
            <ChevronRight size={22} strokeWidth={2.8} />
          </button>
        )}

        {/* Active Room Title Pill Overlay */}
        <div className="room-active-title-pill">
          <span style={{ color: '#38bdf8' }}>{currentRoom.tag || currentRoom.name}</span>
          <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 800, background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '6px' }}>
            Room {currentImageIdx + 1} of {roomItems.length}
          </span>
        </div>

        {/* Clickable Room Dots Indicator */}
        {roomItems.length > 1 && (
          <div className="room-dots-indicator">
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
          className="room-pills-strip hide-scrollbar"
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            padding: '8px 12px',
            background: 'rgba(15, 23, 42, 0.75)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box'
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
      <div className="property-card-body" style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
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
        <div className="property-price-banner" style={{
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
              <strong className="property-price-val" style={{ fontSize: '19px', color: '#38bdf8', fontWeight: 900 }}>
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

        {showLegalDocuments && (
          <div className="legal-docs-strip">
            <button
              type="button"
              className="legal-doc-chip legal-doc-patta"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLegalDoc('patta');
              }}
            >
              📄 e-Patta
              <span className="legal-doc-hint">Tap to View • VAO Sealed</span>
            </button>
            <button
              type="button"
              className="legal-doc-chip legal-doc-dtcp"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLegalDoc('dtcp');
              }}
            >
              🏛️ DTCP Approval
              <span className="legal-doc-hint">Tap to View • VAO Signed</span>
            </button>
          </div>
        )}

        {/* Card Footer Actions - Compact 1-Row Responsive Layout */}
        <div className="property-card-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
          {onBookProperty && (
            <button 
              className="glass-btn property-token-btn"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '9px 10px',
                fontSize: '12px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onBookProperty(property);
              }}
              title={`Reserve token slot for ${title}`}
            >
              <DollarSign size={13} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Book Slot (₹{property.tokenAmount?.toLocaleString('en-IN') || '25K'})
              </span>
            </button>
          )}

          <button 
            className="glass-btn-details"
            style={{
              flex: onBookProperty ? '0 0 auto' : 1,
              padding: '9px 12px',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              whiteSpace: 'nowrap'
            }}
            onClick={() => onSelectProperty && onSelectProperty(property)}
          >
            <span>{onBookProperty ? 'Details' : 'View Details & Offer'}</span>
            <ArrowUpRight size={14} />
          </button>
          
          <button 
            className="glass-btn-enquire"
            style={{
              padding: '9px 10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowCallModal(true);
            }}
            title="View Direct Mobile Numbers & Call Advisor (+91 73971 35792)"
          >
            <PhoneCall size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Propertycard;
