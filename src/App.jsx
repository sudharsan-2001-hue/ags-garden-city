import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveActivityTicker from './components/LiveActivityTicker';
import PulseRingBeacon from './components/PulseRingBeacon';
import UnifiedAuthPortal from './components/UnifiedAuthPortal';
import Home from './pages/HomePage';
import Trending from './pages/Trending';
import Properties from './pages/Properties';
import PropertyDetails from './pages/Properties Details';
import BookingCheckout from './pages/BookingCheckout';
import PriceTrends from './pages/PriceTrends';
import AIPropertyFinder from './pages/AI Property Finder';
import PriceCalculator from './pages/price calculator';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/ContactUs';
import PriceDropAlert from './pages/PriceDropAlert';
import SavedProperties from './pages/SavedProperties';
import VerifiedProperties from './pages/VerifiedProperties';
import EnquiryPage from './pages/EnquiryPage';
import { PROPERTIES_DATA } from './data/propertiesData';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import safeStorage from './utils/safeStorage';

function App() {
  // 'home', 'trending', 'properties', 'property-detail', 'checkout', 'trends', 'ai-finder', 'calculator', 'admin', 'price-drop', 'saved', 'verified', 'auth'
  const [activePage, setActivePage] = useState('home'); 
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Customer Authentication state (Failsafe Storage)
  const [currentUser, setCurrentUser] = useState(() => {
    return safeStorage.getItem('agsgarden_customer', null);
  });

  // Customer Entry Gate: Defaults to true so the Login/Welcome Portal appears first when opening the website
  const [showCustomerGate, setShowCustomerGate] = useState(true);

  // Admin Portal Authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('agsgarden_admin_auth') === 'true';
  });

  // Dynamic Properties list shared across Admin and Customer views
  const [propertiesList, setPropertiesList] = useState(() => {
    const saved = localStorage.getItem('agsgarden_custom_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PROPERTIES_DATA;
      }
    }
    return PROPERTIES_DATA;
  });

  const [selectedProperty, setSelectedProperty] = useState(propertiesList[0] || PROPERTIES_DATA[0]);
  const [authModal, setAuthModal] = useState(null); // null, 'customer', 'admin'
  const [toastMessage, setToastMessage] = useState(null);
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  // Voice Assistant Settings
  const [voiceLanguage, setVoiceLanguage] = useState('ta'); // 'ta', 'en'
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  // Quick enquiry modal
  const [enquiryProperty, setEnquiryProperty] = useState(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', email: '', message: '' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCustomerSuccess = (user) => {
    setCurrentUser(user);
    setShowCustomerGate(false);
    setAuthModal(null);
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Welcome to AGS Garden City, ${user.name || user.email}!`);
  };

  const handleCustomerLogout = () => {
    safeStorage.removeItem('agsgarden_customer');
    setCurrentUser(null);
    setShowCustomerGate(true);
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Signed out successfully.');
  };

  const handleAdminSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowCustomerGate(false);
    setAuthModal(null);
    sessionStorage.setItem('agsgarden_admin_auth', 'true');
    setActivePage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Admin Portal Activated!');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('agsgarden_admin_auth');
    setIsAdminLoggedIn(false);
    setShowCustomerGate(true);
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Admin logged out.');
  };

  const handleSelectProperty = (prop) => {
    setSelectedProperty(prop);
    setActivePage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookProperty = (prop) => {
    setSelectedProperty(prop);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (prop) => {
    if (prop) setSelectedProperty(prop);
    setActivePage('enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = (bookingData) => {
    setConfirmedBookings([bookingData, ...confirmedBookings]);
    showToast(`Booking ${bookingData.bookingId} Confirmed & Stored in Admin!`);
  };

  // Client Apartment Visit Request Submission Handler (High Concurrency Safe)
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);

    const newAlert = {
      customerName: enquiryForm.name || 'VIP Client',
      customerPhone: enquiryForm.phone || '+91 98401 23456',
      customerEmail: enquiryForm.email || 'client@example.com',
      apartmentTitle: enquiryProperty?.title || 'Selected Residence',
      apartmentLocation: enquiryProperty?.location || 'Chennai Hotspot',
      apartmentPrice: enquiryProperty?.price || 'Verified Price',
      visitDate: 'Today (Immediate Request)',
      timeSlot: '04:00 PM - 05:30 PM',
      status: '🔴 URGENT - NEW VISIT TODAY',
      statusType: 'urgent',
      notes: enquiryForm.message || 'VIP site visit scheduled via web portal. Immediate executive assignment requested.',
      cabRequested: true
    };

    // Atomic, high-traffic safe alert dispatch
    safeStorage.addVisitAlert(newAlert);

    setTimeout(() => {
      setEnquirySubmitted(false);
      setEnquiryProperty(null);
      setEnquiryForm({ name: '', phone: '', email: '', message: '' });
      showToast(`VIP Visit Scheduled for ${enquiryProperty?.title}! Admin Alert Dispatched.`);
    }, 1200);
  };

  // Present the Dedicated Real Estate Login & Register Portal FIRST whenever website opens
  if (showCustomerGate || activePage === 'auth') {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '20px 10px' }}>
        {/* Ambient Floating Glow Orbs for Glassmorphism */}
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>

        {/* Dedicated Real Estate Customer & Admin Portal */}
        <UnifiedAuthPortal 
          initialRole={activePage === 'admin' ? "admin" : "customer"}
          onCustomerSuccess={handleCustomerSuccess}
          onAdminSuccess={handleAdminSuccess}
        />

        {toastMessage && (
          <div 
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 99999,
              padding: '14px 22px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.95)',
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // If activePage is 'admin' and admin is not authenticated yet, render full dedicated Admin Portal Gate
  if (activePage === 'admin' && !isAdminLoggedIn) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '24px 16px' }}>
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>

        <UnifiedAuthPortal 
          initialRole="admin"
          onCustomerSuccess={handleCustomerSuccess}
          onAdminSuccess={handleAdminSuccess}
          onClose={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {toastMessage && (
          <div 
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 99999,
              padding: '14px 22px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.95)',
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Ambient Floating Glow Orbs for Glassmorphism */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>

      {/* Auth Modal when opened manually while logged in */}
      {authModal && (
        <UnifiedAuthPortal 
          initialRole={authModal}
          onCustomerSuccess={handleCustomerSuccess}
          onAdminSuccess={handleAdminSuccess}
          onClose={() => setAuthModal(null)}
        />
      )}

      {/* Interactive Pulsing Radar Ring Beacon Widget */}
      <PulseRingBeacon 
        voiceLanguage={voiceLanguage}
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Live Social Proof Activity Ticker */}
      <LiveActivityTicker />

      {/* Floating Glass Navbar with Voice Assistant */}
      <Navbar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBack={() => {
          if (activePage === 'checkout') {
            setActivePage('property-detail');
          } else if (activePage === 'property-detail') {
            setActivePage('properties');
          } else {
            setActivePage('home');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuthModal={(mode) => setAuthModal(mode || 'customer')}
        currentUser={currentUser}
        onLogoutCustomer={handleCustomerLogout}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
        voiceLanguage={voiceLanguage}
        setVoiceLanguage={setVoiceLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />

      {/* Main Multi-Page Route Render */}
      <main className="main-content">
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onOpenAuthModal={(mode) => setAuthModal(mode || 'customer')}
            onEnquire={handleOpenEnquiry}
          />
        )}

        {activePage === 'trending' && (
          <Trending 
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'properties' && (
          <Properties 
            initialCategory={selectedCategory}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
            onBack={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'property-detail' && (
          <PropertyDetails 
            property={selectedProperty}
            onBack={() => {
              setActivePage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
          />
        )}

        {activePage === 'checkout' && (
          <BookingCheckout 
            property={selectedProperty}
            onBack={() => {
              setActivePage('property-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookingComplete={handleBookingComplete}
          />
        )}

        {activePage === 'trends' && (
          <PriceTrends 
            setActivePage={setActivePage}
            onSelectPropertyForBooking={handleBookProperty}
          />
        )}

        {activePage === 'ai-finder' && (
          <AIPropertyFinder 
            setActivePage={setActivePage}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
            onBack={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'price-drop' && (
          <PriceDropAlert 
            setActivePage={setActivePage}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
          />
        )}

        {activePage === 'saved' && (
          <SavedProperties 
            setActivePage={setActivePage}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
          />
        )}

        {activePage === 'verified' && (
          <VerifiedProperties 
            setActivePage={setActivePage}
            onSelectProperty={handleSelectProperty}
            onBookProperty={handleBookProperty}
            onEnquire={handleOpenEnquiry}
          />
        )}

        {activePage === 'enquiry' && (
          <EnquiryPage 
            selectedProperty={selectedProperty}
            setActivePage={setActivePage}
            onSelectProperty={handleSelectProperty}
            currentUser={currentUser}
          />
        )}

        {activePage === 'auth' && (
          <UnifiedAuthPortal 
            initialRole="customer"
            onCustomerSuccess={handleCustomerSuccess}
            onAdminSuccess={handleAdminSuccess}
            onClose={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'calculator' && (
          <PriceCalculator 
            onBack={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'contact' && (
          <ContactUs 
            setActivePage={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard 
              bookings={confirmedBookings}
              onUpdateBookings={(updated) => setConfirmedBookings(updated)}
              propertiesList={propertiesList}
              onUpdateProperties={(updated) => setPropertiesList(updated)}
              onLogoutAdmin={handleAdminLogout}
            />
          ) : (
            <UnifiedAuthPortal 
              initialRole="admin"
              onCustomerSuccess={handleCustomerSuccess}
              onAdminSuccess={handleAdminSuccess}
              onClose={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {/* Glass Footer */}
      <Footer setActivePage={(page) => {
        setActivePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Unified Auth Modal (When clicked manually from Navbar or footer) */}
      {authModal && (
        <UnifiedAuthPortal 
          initialRole={authModal}
          onCustomerSuccess={handleCustomerSuccess}
          onAdminSuccess={handleAdminSuccess}
          onClose={() => setAuthModal(null)}
        />
      )}

      {/* Quick Enquiry & VIP Site Inspection Modal */}
      {enquiryProperty && (
        <div className="glass-modal-overlay" onClick={() => setEnquiryProperty(null)}>
          <div className="glass-modal-content auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEnquiryProperty(null)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="section-tag"><Sparkles size={14} /> VIP APARTMENT VISIT & ENQUIRY</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Schedule Site Inspection</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                For: <strong style={{ color: '#fff' }}>{enquiryProperty.title}</strong>
              </p>
            </div>

            {enquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px' }}>Visit Alert Dispatched to Admin!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
                  Our Senior Relationship Manager will connect with you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="auth-form">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  className="glass-input"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number (+91)" 
                  className="glass-input"
                  required
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="glass-input"
                  required
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                />
                <textarea 
                  placeholder="Preferred viewing date / special questions (e.g. VIP chauffeur cab needed)..." 
                  className="glass-input"
                  rows="3"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                ></textarea>
                <button type="submit" className="glass-btn" style={{ width: '100%', marginTop: '6px' }}>
                  Confirm VIP Apartment Inspection
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="glass-panel" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(15, 17, 32, 0.95)',
            border: '1px solid rgba(168, 85, 247, 0.5)',
            color: '#c084fc',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
          }}
        >
          <CheckCircle2 size={18} />
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;