import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Compass, 
  Train, 
  Plane, 
  Briefcase, 
  Hospital, 
  GraduationCap, 
  Waves,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

const CHENNAI_LOCATIONS = {
  porur: {
    name: 'Porur & Kundrathur Hub',
    lat: '13.0382',
    lng: '80.1565',
    zoom: 14,
    description: 'Prime Western Chennai transit hub connected to DLF IT Park, Mount Poonamallee Road & upcoming Metro Line 4.',
    transit: [
      { icon: Train, label: 'Porur Junction Metro', time: '3 mins' },
      { icon: Briefcase, label: 'DLF & L&T Infotech', time: '6 mins' },
      { icon: Hospital, label: 'Sri Ramachandra Hospital', time: '5 mins' },
      { icon: Plane, label: 'Chennai International Airport', time: '18 mins' }
    ]
  },
  omr: {
    name: 'OMR IT Expressway (Sholinganallur)',
    lat: '12.9010',
    lng: '80.2279',
    zoom: 14,
    description: 'Chennai premier technology corridor housing TCS, Infosys, Cognizant, ELCOT SEZ & Metro Line 3.',
    transit: [
      { icon: Train, label: 'Sholinganallur Metro Node', time: '2 mins' },
      { icon: Briefcase, label: 'SIPCOT Siruseri IT Park', time: '8 mins' },
      { icon: Hospital, label: 'Gleneagles Global Health', time: '7 mins' },
      { icon: GraduationCap, label: 'Sathyabama University', time: '5 mins' }
    ]
  },
  annanagar: {
    name: 'Anna Nagar & 2nd Avenue',
    lat: '13.0850',
    lng: '80.2101',
    zoom: 15,
    description: 'Ultra-luxury residential enclave with lush boulevards, boutique retail, Tower Park & metro underground stations.',
    transit: [
      { icon: Train, label: 'Anna Nagar Tower Metro', time: '2 mins' },
      { icon: Hospital, label: 'MGM Healthcare & Apollo', time: '8 mins' },
      { icon: GraduationCap, label: 'Anna Adarsh & DAV School', time: '4 mins' },
      { icon: Plane, label: 'Central Railway Station', time: '14 mins' }
    ]
  },
  ecr: {
    name: 'ECR Coastal Beachfront',
    lat: '12.8750',
    lng: '80.2450',
    zoom: 14,
    description: 'Elite coastal boulevard with private sea-facing villas, beachfront resorts, clean air & 4-lane expressway.',
    transit: [
      { icon: Waves, label: 'Private Beach Access', time: '1 min' },
      { icon: Briefcase, label: 'OMR Tech Corridor Junction', time: '10 mins' },
      { icon: Hospital, label: 'Apollo Specialty Hospital', time: '12 mins' },
      { icon: GraduationCap, label: 'Mayajaal & Recreation Hub', time: '5 mins' }
    ]
  },
  velachery: {
    name: 'Velachery & Phoenix Hub',
    lat: '12.9815',
    lng: '80.2180',
    zoom: 14,
    description: 'Centrally connected commercial and residential zone with MRTS, Phoenix MarketCity & Grand Mall.',
    transit: [
      { icon: Train, label: 'Velachery MRTS Terminal', time: '3 mins' },
      { icon: Briefcase, label: 'Taramani Ascendas IT Park', time: '7 mins' },
      { icon: Hospital, label: 'Prashanth Super Specialty', time: '4 mins' },
      { icon: Plane, label: 'Chennai Airport Corridor', time: '15 mins' }
    ]
  },
  adyar: {
    name: 'Adyar & Besant Nagar',
    lat: '13.0012',
    lng: '80.2565',
    zoom: 14,
    description: 'South Chennai cultural & luxury heritage hub with Elliot Beach, IIT Madras & premier schools.',
    transit: [
      { icon: Waves, label: 'Elliot Beach Promenade', time: '4 mins' },
      { icon: GraduationCap, label: 'IIT Madras & Anna Univ', time: '6 mins' },
      { icon: Hospital, label: 'Fortis Malar Hospital', time: '5 mins' },
      { icon: Briefcase, label: 'Tidel Park Taramani', time: '8 mins' }
    ]
  },
  tambaram: {
    name: 'Tambaram & GST Corridor',
    lat: '12.9249',
    lng: '80.1000',
    zoom: 14,
    description: 'Gateway to South Tamil Nadu, connected via Kilambakkam Bus Terminus, GST Road, and Outer Ring Road.',
    transit: [
      { icon: Train, label: 'Tambaram Railway Terminal', time: '4 mins' },
      { icon: Briefcase, label: 'MEPZ Special Economic Zone', time: '6 mins' },
      { icon: Hospital, label: 'Hindu Mission Hospital', time: '5 mins' },
      { icon: Plane, label: 'Kilambakkam KCBT Terminus', time: '12 mins' }
    ]
  }
};

function GoogleMapView({ 
  locationName = 'Porur, Chennai', 
  specificLocationKey,
  height = '420px',
  title = 'Interactive Google Map Location',
  showTransitDetails = true 
}) {
  // Determine active key from prop or location string
  const getInitialKey = () => {
    if (specificLocationKey && CHENNAI_LOCATIONS[specificLocationKey]) return specificLocationKey;
    const locLower = (locationName || '').toLowerCase();
    if (locLower.includes('omr') || locLower.includes('sholinganallur') || locLower.includes('siruseri')) return 'omr';
    if (locLower.includes('anna nagar') || locLower.includes('nungambakkam')) return 'annanagar';
    if (locLower.includes('ecr') || locLower.includes('beach') || locLower.includes('kovalam')) return 'ecr';
    if (locLower.includes('velachery') || locLower.includes('taramani')) return 'velachery';
    if (locLower.includes('adyar') || locLower.includes('besant')) return 'adyar';
    if (locLower.includes('tambaram') || locLower.includes('gst')) return 'tambaram';
    return 'porur';
  };

  const [activeKey, setActiveKey] = useState(getInitialKey);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' or 'satellite'

  const activeData = CHENNAI_LOCATIONS[activeKey] || CHENNAI_LOCATIONS.porur;

  // Google Maps Embed URL
  const embedQuery = encodeURIComponent(`${activeData.name}, Chennai, Tamil Nadu, India`);
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${embedQuery}&t=${mapType === 'satellite' ? 'k' : 'm'}&z=${activeData.zoom || 14}&ie=UTF8&iwloc=&output=embed`;

  // Direct Live Navigation Link
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${embedQuery}`;

  return (
    <div className="google-map-container glass-panel" style={{ padding: '24px', borderRadius: '22px', marginBottom: '28px' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div>
          <span className="section-tag" style={{ color: '#10b981', borderColor: '#10b981' }}>
            <MapPin size={13} /> LIVE GOOGLE MAPS SATELLITE & TRANSIT
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '6px 0 2px' }}>
            {title}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            {activeData.description}
          </p>
        </div>

        {/* Map Type Switcher & External Directions Button */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '3px', borderRadius: '10px', display: 'flex', gap: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              type="button"
              onClick={() => setMapType('roadmap')}
              style={{
                background: mapType === 'roadmap' ? '#38bdf8' : 'transparent',
                color: mapType === 'roadmap' ? '#0f172a' : '#94a3b8',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Roadmap
            </button>
            <button
              type="button"
              onClick={() => setMapType('satellite')}
              style={{
                background: mapType === 'satellite' ? '#10b981' : 'transparent',
                color: mapType === 'satellite' ? '#0f172a' : '#94a3b8',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Satellite
            </button>
          </div>

          <a 
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '12px', textDecoration: 'none', gap: '6px' }}
          >
            <Navigation size={13} />
            <span>Open in Google Maps Directions</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Chennai Micro-Market Quick Locality Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '10px', marginBottom: '16px' }}>
        {Object.keys(CHENNAI_LOCATIONS).map((key) => {
          const loc = CHENNAI_LOCATIONS[key];
          const isSelected = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveKey(key)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: isSelected ? 800 : 500,
                borderRadius: '12px',
                background: isSelected ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(56, 189, 248, 0.3) 100%)' : 'rgba(255,255,255,0.04)',
                border: isSelected ? '1.5px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                color: isSelected ? '#fff' : '#cbd5e1',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease'
              }}
            >
              <MapPin size={12} color={isSelected ? '#10b981' : '#94a3b8'} />
              <span>{loc.name.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Embedded Google Map Frame */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: height, 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          background: '#0f172a'
        }}
      >
        <iframe
          title={`Google Map - ${activeData.name}`}
          src={googleMapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: mapType === 'roadmap' ? 'contrast(1.05) brightness(0.95)' : 'none' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Live Coordinate Overlay Badge */}
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: '10px',
            padding: '6px 12px',
            fontSize: '11px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          <span style={{ fontWeight: 800, color: '#10b981' }}>{activeData.name}</span>
          <span style={{ color: 'var(--text-muted)' }}>({activeData.lat}° N, {activeData.lng}° E)</span>
        </div>
      </div>

      {/* Transit Times & Key Infrastructure Hubs Grid */}
      {showTransitDetails && activeData.transit && (
        <div style={{ marginTop: '18px' }}>
          <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            ⚡ Key Transit & Landmark Distances from {activeData.name.split('(')[0]}:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {activeData.transit.map((tr, idx) => {
              const Icon = tr.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: '#38bdf8', display: 'flex' }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 600 }}>
                      {tr.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '8px' }}>
                    {tr.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

export default GoogleMapView;
