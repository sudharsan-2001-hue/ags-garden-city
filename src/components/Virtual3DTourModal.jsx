import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles, 
  Bed, 
  Utensils, 
  Bath, 
  Compass, 
  Sun, 
  CheckCircle2, 
  Layers, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { getPropertyRoomList } from '../utils/propertyRooms';

function Virtual3DTourModal({ property, onClose }) {
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const rooms = React.useMemo(() => {
    return getPropertyRoomList(property);
  }, [property]);

  const currentRoom = rooms[activeRoomIdx] || rooms[0];

  // Auto 360 rotation effect
  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.4) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleNextRoom = () => {
    setActiveRoomIdx((prev) => (prev + 1) % rooms.length);
    setActiveHotspot(null);
  };

  const handlePrevRoom = () => {
    setActiveRoomIdx((prev) => (prev - 1 + rooms.length) % rooms.length);
    setActiveHotspot(null);
  };

  return (
    <div 
      className="glass-modal-overlay" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 99999, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(3, 4, 10, 0.94)',
        backdropFilter: 'blur(20px)',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '92vh',
          maxHeight: '820px',
          borderRadius: '24px',
          border: '1px solid rgba(56, 189, 248, 0.5)',
          background: 'linear-gradient(145deg, rgba(10, 12, 26, 0.98) 0%, rgba(18, 24, 48, 0.95) 100%)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Strip */}
        <div style={{
          padding: '14px 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.6)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '16px', color: '#fff' }}>
                  {property?.title || 'Interactive 3D Virtual Walkthrough'}
                </strong>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  🧊 3D 360° ACTIVE
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {property?.location} • Total Area: {property?.sqft} sq.ft
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 3D Panoramic Canvas Stage */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#030712',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          {/* Main 360 Rotatable Image Layer */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            overflow: 'hidden'
          }}>
            <img 
              src={currentRoom.image} 
              alt={currentRoom.name} 
              style={{
                width: '115%',
                height: '115%',
                objectFit: 'cover',
                position: 'absolute',
                top: '-7.5%',
                left: '-7.5%',
                transform: `scale(${zoomLevel}) rotate(${isRotating ? (rotationAngle * 0.05) : 0}deg)`,
                transition: isRotating ? 'none' : 'transform 0.4s ease-out',
                filter: 'brightness(0.95) contrast(1.05)'
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)' }}></div>
          </div>

          {/* Floating Left Corner Navigation Arrow Button */}
          <button 
            onClick={handlePrevRoom}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '50px',
              height: '50px',
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
            title="Previous Room (Backside Move)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Floating Right Corner Navigation Arrow Button */}
          <button 
            onClick={handleNextRoom}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '50px',
              height: '50px',
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
            title="Next Room (Front Side Move)"
          >
            <ChevronRight size={28} />
          </button>

          {/* Top Room Name & Step Counter Badge */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(56, 189, 248, 0.5)',
            borderRadius: '20px',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#38bdf8' }}>
              {currentRoom.tag}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              ({activeRoomIdx + 1} / {rooms.length})
            </span>
          </div>

          {/* Interactive Inspection Hotspots in 3D */}
          <div 
            onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
            style={{
              position: 'absolute',
              top: '40%',
              left: '35%',
              zIndex: 25,
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#38bdf8',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #38bdf8',
              animation: 'pulse-ring 1.5s infinite',
              fontWeight: 900
            }}>
              +
            </div>
            {activeHotspot === 1 && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '40px',
                left: '0',
                width: '240px',
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid #38bdf8',
                color: '#fff',
                fontSize: '12px',
                zIndex: 30,
                textAlign: 'left'
              }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '4px' }}>⚡ Premium Specification</strong>
                <span>{currentRoom.desc || 'High-grade premium architectural fixture with verified warranty.'}</span>
              </div>
            )}
          </div>

          {/* Bottom Floating 3D Controls Bar */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button 
              onClick={() => setIsRotating(!isRotating)}
              style={{
                background: isRotating ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: isRotating ? '#38bdf8' : '#fff',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700
              }}
            >
              <RotateCw size={14} /> {isRotating ? 'Auto 360° ON' : 'Auto 360° OFF'}
            </button>

            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>

            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.9))}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Horizontal Room Selector Tabs Bar */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(15, 17, 32, 0.95)',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          whiteSpace: 'nowrap'
        }}>
          {rooms.map((room, idx) => {
            const isActive = activeRoomIdx === idx;
            return (
              <div 
                key={idx}
                onClick={() => {
                  setActiveRoomIdx(idx);
                  setActiveHotspot(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '44px', height: '36px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <strong style={{ fontSize: '12px', color: isActive ? '#38bdf8' : '#fff', display: 'block' }}>
                    {room.tag}
                  </strong>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {room.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Virtual3DTourModal;
