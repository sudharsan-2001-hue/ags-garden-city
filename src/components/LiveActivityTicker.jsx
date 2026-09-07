import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Flame, Users, X, ShieldCheck } from 'lucide-react';

const LIVE_ACTIVITIES = [
  {
    id: 1,
    title: 'Ramesh K. (Anna Nagar)',
    action: 'booked a VIP Site Visit Slot for',
    property: 'Emerald Luxe 3 BHK',
    time: '2 mins ago',
    icon: Flame,
    color: '#ec4899',
    tag: 'SITE VISIT'
  },
  {
    id: 2,
    title: 'Priya Sundaram (ECR)',
    action: 'reserved with ₹50,000 Token via Razorpay for',
    property: 'Azure Bay Sea View Villa',
    time: '5 mins ago',
    icon: Sparkles,
    color: '#10b981',
    tag: 'TOKEN PAID'
  },
  {
    id: 3,
    title: 'Senthil Nathan (OMR)',
    action: 'scheduled Cash on Site Visit for',
    property: 'Cyber Horizon Smart Flat',
    time: '8 mins ago',
    icon: CheckCircle2,
    color: '#38bdf8',
    tag: 'INSPECTION'
  },
  {
    id: 4,
    title: 'High Buyer Demand',
    action: '18 active buyers are currently inspecting',
    property: 'Chennai Sea View Villas',
    time: 'Just now',
    icon: Users,
    color: '#c084fc',
    tag: 'TRENDING'
  }
];

function LiveActivityTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [closed]);

  if (closed) return null;

  const current = LIVE_ACTIVITIES[currentIdx];
  const Icon = current.icon;

  return (
    <div 
      className="live-activity-popup glass-panel"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 900,
        maxWidth: '340px',
        padding: '12px 16px',
        borderRadius: '16px',
        background: 'rgba(15, 17, 32, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(168, 85, 247, 0.2)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'left'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: `rgba(255,255,255,0.06)`,
            border: `1px solid ${current.color}`,
            color: current.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 0 10px ${current.color}40`
          }}
        >
          <Icon size={16} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: current.color, letterSpacing: '0.05em' }}>
              {current.tag}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{current.time}</span>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
            {current.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
            {current.action} <strong style={{ color: '#c084fc' }}>{current.property}</strong>
          </div>
        </div>

        <button 
          onClick={() => setClosed(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px'
          }}
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default LiveActivityTicker;
