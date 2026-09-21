import React, { useState } from 'react';
import { X, PhoneCall, Phone, MessageSquare, Copy, Check, MapPin } from 'lucide-react';

function DirectCallModal({ property, onClose, onScheduleInspection }) {
  const [copiedNumber, setCopiedNumber] = useState(null);
  const title = property?.title || 'Selected Luxury Residence';
  const location = property?.location || 'Chennai';
  const price = property?.price || '';

  const contacts = [
    {
      role: 'VIP Sales & Deals Advisor',
      name: 'K. Rajesh (Senior Executive Specialist)',
      number: '+91 73971 35792',
      rawNumber: '+917397135792',
      badge: '24/7 VERIFIED DESK',
      badgeColor: '#10b981',
      status: '🟢 Online Now • Instant Answer',
      whatsappText: 'Hi Rajesh, I am interested in inspecting ' + title + ' in ' + location + ' (Price: ' + price + '). Please share verified documents and schedule a visit.'
    },
    {
      role: 'On-Site Field Inspection Officer',
      name: 'M. Senthil Nathan (Site Coordinator)',
      number: '+91 98401 23456',
      rawNumber: '+919840123456',
      badge: 'FIELD INSPECTION',
      badgeColor: '#38bdf8',
      status: '🚗 Active in Chennai Metro Zone',
      whatsappText: 'Hello Senthil, I want to book a physical site inspection with free cab for ' + title + '. When is the earliest slot available today?'
    }
  ];

  const handleCopy = (num) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(num).then(() => {
        setCopiedNumber(num);
        setTimeout(() => setCopiedNumber(null), 2000);
      }).catch(() => {
        setCopiedNumber(num);
        setTimeout(() => setCopiedNumber(null), 2000);
      });
    } else {
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2000);
    }
  };

  return (
    <div 
      className="glass-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 11, 20, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '24px',
          padding: '24px 20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.25)',
          position: 'relative',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}
      >
        <button 
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '18px', paddingRight: '36px' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#10b981',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}
          >
            <PhoneCall size={12} />
            DIRECT MOBILE CALLING & NUMBERS
          </span>
          <h2 style={{ fontSize: '20px', color: '#fff', fontWeight: 800, margin: '4px 0 6px' }}>
            Property Advisor Contact Numbers
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--text-sub)', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} color="#38bdf8" style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {title} • {location}
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {contacts.map((c, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '16px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {c.role}
                </span>
                <span 
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: c.badgeColor,
                    background: c.badgeColor + '18',
                    border: '1px solid ' + c.badgeColor + '40',
                    padding: '2px 8px',
                    borderRadius: '8px'
                  }}
                >
                  {c.badge}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {c.name}
              </div>
              <div style={{ fontSize: '11.5px', color: '#10b981', marginBottom: '12px' }}>
                {c.status}
              </div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1.5px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="#38bdf8" />
                  <span style={{ fontSize: '17px', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.04em' }}>
                    {c.number}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(c.number)}
                  title="Copy Phone Number"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: copiedNumber === c.number ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    border: copiedNumber === c.number ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: copiedNumber === c.number ? '#10b981' : '#fff',
                    borderRadius: '8px',
                    padding: '5px 9px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copiedNumber === c.number ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <a 
                  href={'tel:' + c.rawNumber}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <PhoneCall size={14} /> Call Direct
                </a>
                <a 
                  href={'https://wa.me/' + c.rawNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(c.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {onScheduleInspection && (
          <div 
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '14px',
              padding: '12px 14px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>🚕 Free AC Cab Site Inspection</div>
              <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>Doorstep pickup & return anywhere in Chennai</div>
            </div>
            <button
              className="glass-btn"
              onClick={() => {
                onClose();
                onScheduleInspection(property);
              }}
              style={{ padding: '6px 12px', fontSize: '11.5px', borderRadius: '10px', whiteSpace: 'nowrap' }}
            >
              Book Cab Visit
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button 
            className="glass-btn-secondary"
            onClick={onClose}
            style={{ width: '100%', padding: '10px', borderRadius: '12px', fontSize: '13px' }}
          >
            Close Numbers View
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectCallModal;
