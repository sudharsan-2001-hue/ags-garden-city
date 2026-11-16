import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveActivityTicker from './components/LiveActivityTicker';
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
import FrontLoginPage from './pages/FrontLoginPage';
import Conclusion from './pages/Conclusion';
import { PROPERTIES_DATA } from './data/propertiesData';

import { X, CheckCircle2, Sparkles, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import safeStorage from './utils/safeStorage';

function App() {

  // ==========================================
  // AUTHORITATIVE ROUTING & STEP MANAGEMENT
  // ==========================================
  const VALID_PAGES = [
    'auth', 'home', 'properties', 'ai-finder', 'trends',
    'saved', 'verified', 'property-detail', 'checkout',
    'conclusion', 'admin', 'calculator', 'contact', 'enquiry', 'price-drop', 'trending'
  ];

  const getPageFromHash = () => {
    if (typeof window === 'undefined') return 'auth';
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (VALID_PAGES.includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.toLowerCase();
    if (path === '/ags-nest' || path === '/ags-nest/') {
      return 'home';
    }
    return 'auth'; // Default Step 1: Front Login
  };

  const [activePage, setActivePageState] = useState(getPageFromHash);
  const [pageHistory, setPageHistory] = useState([]);

  // Navigates to a specific step/page, updating browser URL hash & history
  const setActivePage = (newPage, replaceHistory = false) => {
    if (!VALID_PAGES.includes(newPage)) return;

    if (newPage !== activePage) {
      setPageHistory((prev) => [...prev.slice(-15), activePage]);
    }

    setActivePageState(newPage);

    const targetHash = `#${newPage}`;
    if (window.location.hash !== targetHash) {
      if (replaceHistory) {
        window.history.replaceState(null, '', targetHash);
      } else {
        window.history.pushState(null, '', targetHash);
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Synchronize with browser Back/Forward buttons and direct URL hash changes
  useEffect(() => {
    const handleHashSync = () => {
      const page = getPageFromHash();
      setActivePageState(page);
    };

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);

    // Initial check: if no hash exists, set default hash
    if (!window.location.hash) {
      const initial = getPageFromHash();
      window.history.replaceState(null, '', `#${initial}`);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');


  // ==========================================
  // CUSTOMER AUTHENTICATION STATE
  // ==========================================
  const [currentUser, setCurrentUser] = useState(() => {
    return safeStorage.getItem(
      'agsgarden_customer',
      null
    );
  });


  // ==========================================
  // CUSTOMER ENTRY GATE
  // ==========================================
  const [showCustomerGate, setShowCustomerGate] =
    useState(false);


  // ==========================================
  // ADMIN AUTHENTICATION STATE
  // ==========================================
  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(() => {
      return (
        sessionStorage.getItem(
          'agsgarden_admin_auth'
        ) === 'true'
      );
    });


  // ==========================================
  // DYNAMIC PROPERTIES LIST
  // ==========================================
  const [propertiesList, setPropertiesList] =
    useState(() => {

      const saved = localStorage.getItem(
        'agsgarden_custom_properties'
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return PROPERTIES_DATA;
        }
      }

      return PROPERTIES_DATA;
    });


  const [selectedProperty, setSelectedProperty] =
    useState(
      propertiesList[0] ||
      PROPERTIES_DATA[0]
    );

  const [returnPage, setReturnPage] = useState('properties');


  const [authModal, setAuthModal] =
    useState(null);

  const [toastMessage, setToastMessage] =
    useState(null);

  const [confirmedBookings, setConfirmedBookings] =
    useState([]);


  // ==========================================
  // VOICE ASSISTANT SETTINGS
  // ==========================================
  const [voiceLanguage, setVoiceLanguage] =
    useState('ta');

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);


  // ==========================================
  // QUICK ENQUIRY MODAL
  // ==========================================
  const [enquiryProperty, setEnquiryProperty] =
    useState(null);

  const [enquirySubmitted, setEnquirySubmitted] =
    useState(false);


  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });


  // ==========================================
  // TOAST MESSAGE
  // ==========================================
  const showToast = (msg) => {

    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };


  // ==========================================
  // CUSTOMER LOGIN SUCCESS
  // ==========================================
  const handleCustomerSuccess = (user) => {

    setCurrentUser(user);

    setShowCustomerGate(false);

    setAuthModal(null);

    setActivePage('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    // AGS NEST BRAND NAME
    showToast(
      `Welcome to AGS NEST, ${
        user.name || user.email
      }!`
    );
  };


  // ==========================================
  // CUSTOMER LOGOUT
  // ==========================================
  const handleCustomerLogout = () => {

    safeStorage.removeItem(
      'agsgarden_customer'
    );

    setCurrentUser(null);

    setShowCustomerGate(true);

    setActivePage('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    showToast(
      'Signed out successfully.'
    );
  };


  // ==========================================
  // ADMIN LOGIN SUCCESS
  // ==========================================
  const handleAdminSuccess = () => {

    setIsAdminLoggedIn(true);

    setShowCustomerGate(false);

    setAuthModal(null);


    sessionStorage.setItem(
      'agsgarden_admin_auth',
      'true'
    );


    setActivePage('admin');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    showToast(
      'AGS NEST Admin Portal Activated!'
    );
  };


  // ==========================================
  // ADMIN LOGOUT
  // ==========================================
  const handleAdminLogout = () => {

    sessionStorage.removeItem(
      'agsgarden_admin_auth'
    );

    setIsAdminLoggedIn(false);

    setShowCustomerGate(true);

    setActivePage('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    showToast(
      'Admin logged out.'
    );
  };


  // ==========================================
  // SELECT PROPERTY
  // ==========================================
  const handleSelectProperty = (prop, sourcePage = null) => {

    setSelectedProperty(prop);

    setReturnPage(sourcePage || activePage || 'properties');

    setActivePage(
      'property-detail'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // ==========================================
  // BOOK PROPERTY
  // ==========================================
  const handleBookProperty = (prop) => {

    setSelectedProperty(prop);

    setActivePage(
      'checkout'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // ==========================================
  // OPEN ENQUIRY
  // ==========================================
  const handleOpenEnquiry = (prop) => {

    if (prop) {
      setSelectedProperty(prop);
    }

    setActivePage(
      'enquiry'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // ==========================================
  // BOOKING COMPLETE
  // ==========================================
  const handleBookingComplete = (
    bookingData
  ) => {

    setConfirmedBookings([
      bookingData,
      ...confirmedBookings
    ]);

    showToast(
      `Booking ${
        bookingData.bookingId
      } Confirmed & Stored in Admin!`
    );
  };


  // ==========================================
  // ENQUIRY SUBMISSION
  // ==========================================
  const handleEnquirySubmit = (e) => {

    e.preventDefault();

    setEnquirySubmitted(true);


    const newAlert = {

      customerName:
        enquiryForm.name ||
        'VIP Client',

      customerPhone:
        enquiryForm.phone ||
        '+91 98401 23456',

      customerEmail:
        enquiryForm.email ||
        'client@example.com',

      apartmentTitle:
        enquiryProperty?.title ||
        'Selected Residence',

      apartmentLocation:
        enquiryProperty?.location ||
        'Chennai Hotspot',

      apartmentPrice:
        enquiryProperty?.price ||
        'Verified Price',

      visitDate:
        'Today (Immediate Request)',

      timeSlot:
        '04:00 PM - 05:30 PM',

      status:
        '🔴 URGENT - NEW VISIT TODAY',

      statusType:
        'urgent',

      notes:
        enquiryForm.message ||
        'VIP site visit scheduled via web portal. Immediate executive assignment requested.',

      cabRequested:
        true
    };


    safeStorage.addVisitAlert(
      newAlert
    );


    setTimeout(() => {

      setEnquirySubmitted(false);

      setEnquiryProperty(null);


      setEnquiryForm({
        name: '',
        phone: '',
        email: '',
        message: ''
      });


      showToast(
        `VIP Visit Scheduled for ${
          enquiryProperty?.title
        }! Admin Alert Dispatched.`
      );

    }, 1200);
  };


  // ==========================================
  // MAIN APP
  // ==========================================
  return (

    <div className="app-container">

      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>


      {/* AUTH MODAL */}
      {authModal && (
        <UnifiedAuthPortal
          isModal={true}
          initialRole={authModal}

          onCustomerSuccess={
            handleCustomerSuccess
          }

          onAdminSuccess={
            handleAdminSuccess
          }

          onClose={() =>
            setAuthModal(null)
          }
        />
      )}





      {/* LIVE ACTIVITY */}
      <LiveActivityTicker />


      {/* NAVBAR */}
      <Navbar

        activePage={activePage}

        setActivePage={(page) => {
          if (page !== activePage) {
            setPageHistory((prev) => [...prev.slice(-15), activePage]);
          }
          setActivePage(page);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}

        onBack={() => {
          if (pageHistory.length > 0) {
            const prevPage = pageHistory[pageHistory.length - 1];
            setPageHistory((prev) => prev.slice(0, -1));
            setActivePage(prevPage);
          } else if (activePage === 'checkout') {
            setActivePage('property-detail');
          } else if (activePage === 'property-detail') {
            setActivePage('properties');
          } else if (activePage !== 'home') {
            setActivePage('home');
          } else {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}


        onOpenAuthModal={(mode) =>
          setAuthModal(
            mode || 'customer'
          )
        }


        currentUser={currentUser}


        onLogoutCustomer={
          handleCustomerLogout
        }


        isAdminLoggedIn={
          isAdminLoggedIn
        }


        onLogoutAdmin={
          handleAdminLogout
        }


        voiceLanguage={
          voiceLanguage
        }

        setVoiceLanguage={
          setVoiceLanguage
        }


        voiceEnabled={
          voiceEnabled
        }

        setVoiceEnabled={
          setVoiceEnabled
        }

      />


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="main-content">


        {/* HOME */}
        {activePage === 'home' && (

          <Home
            setActivePage={
              setActivePage
            }

            setSelectedCategory={
              setSelectedCategory
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onOpenAuthModal={(mode) =>
              setAuthModal(
                mode || 'customer'
              )
            }

            onEnquire={
              handleOpenEnquiry
            }
          />

        )}


        {/* TRENDING */}
        {activePage === 'trending' && (

          <Trending
            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

            setActivePage={
              setActivePage
            }
          />

        )}


        {/* PROPERTIES */}
        {activePage === 'properties' && (

          <Properties
            initialCategory={
              selectedCategory
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

            onBack={() => {

              setActivePage('home');

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

            setActivePage={
              setActivePage
            }
          />

        )}


        {/* PROPERTY DETAILS */}
        {activePage === 'property-detail' && (

          <PropertyDetails

            property={
              selectedProperty
            }

            onBack={() => {

              setActivePage(
                returnPage || 'properties'
              );

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

            setActivePage={
              setActivePage
            }

          />

        )}


        {/* CHECKOUT */}
        {activePage === 'checkout' && (

          <BookingCheckout

            property={
              selectedProperty
            }

            onBack={() => {

              setActivePage(
                'property-detail'
              );

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

            onBookingComplete={
              handleBookingComplete
            }

            setActivePage={
              setActivePage
            }

          />

        )}


        {/* PRICE TRENDS */}
        {activePage === 'trends' && (

          <PriceTrends

            setActivePage={
              setActivePage
            }

            onSelectPropertyForBooking={
              handleBookProperty
            }

            onSelectProperty={
              handleSelectProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

          />

        )}


        {/* AI PROPERTY FINDER */}
        {activePage === 'ai-finder' && (

          <AIPropertyFinder

            setActivePage={
              setActivePage
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

            onBack={() => {

              setActivePage('home');

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

          />

        )}


        {/* PRICE DROP */}
        {activePage === 'price-drop' && (

          <PriceDropAlert

            setActivePage={
              setActivePage
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

          />

        )}


        {/* SAVED PROPERTIES */}
        {activePage === 'saved' && (

          <SavedProperties

            setActivePage={
              setActivePage
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

          />

        )}


        {/* VERIFIED PROPERTIES */}
        {activePage === 'verified' && (

          <VerifiedProperties

            setActivePage={
              setActivePage
            }

            onSelectProperty={
              handleSelectProperty
            }

            onBookProperty={
              handleBookProperty
            }

            onEnquire={
              handleOpenEnquiry
            }

          />

        )}


        {/* ENQUIRY */}
        {activePage === 'enquiry' && (

          <EnquiryPage

            selectedProperty={
              selectedProperty
            }

            setActivePage={
              setActivePage
            }

            onSelectProperty={
              handleSelectProperty
            }

            currentUser={
              currentUser
            }

          />

        )}


        {/* STEP 1: FRONT LOGIN & WELCOME PORTAL */}
        {activePage === 'auth' && (
          <FrontLoginPage
            setActivePage={setActivePage}
            onCustomerSuccess={handleCustomerSuccess}
            onAdminSuccess={handleAdminSuccess}
            currentUser={currentUser}
          />
        )}


        {/* STEP 10: HR SHOWCASE & CONCLUSION */}
        {activePage === 'conclusion' && (
          <Conclusion
            setActivePage={setActivePage}
            selectedProperty={selectedProperty}
            currentUser={currentUser}
            confirmedBookings={confirmedBookings}
          />
        )}


        {/* CALCULATOR */}
        {activePage === 'calculator' && (

          <PriceCalculator

            onBack={() => {

              setActivePage('home');

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

            setActivePage={
              setActivePage
            }

          />

        )}


        {/* CONTACT */}
        {activePage === 'contact' && (

          <ContactUs

            setActivePage={(page) => {

              setActivePage(page);

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

            }}

          />

        )}


        {/* ADMIN */}
        {activePage === 'admin' && (

          isAdminLoggedIn ? (

            <AdminDashboard

              bookings={
                confirmedBookings
              }

              onUpdateBookings={
                (updated) =>
                  setConfirmedBookings(
                    updated
                  )
              }

              propertiesList={
                propertiesList
              }

              onUpdateProperties={
                (updated) =>
                  setPropertiesList(
                    updated
                  )
              }

              onLogoutAdmin={
                handleAdminLogout
              }

              onSelectProperty={(prop) =>
                handleSelectProperty(prop, 'admin')
              }

              onBookProperty={
                handleBookProperty
              }

            />

          ) : (

            <div className="section-wrapper" style={{ maxWidth: '600px', margin: '30px auto 60px', padding: '0 16px' }}>
              <div 
                className="glass-panel"
                style={{
                  padding: '12px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(15, 17, 32, 0.9)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#c084fc', fontWeight: 800 }}>
                  <ShieldCheck size={16} /> <span>AGS NEST Executive Admin Portal</span>
                </div>
                <button
                  className="glass-btn-secondary"
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ padding: '5px 12px', fontSize: '12px', borderRadius: '14px' }}
                >
                  ← Home
                </button>
              </div>

              <UnifiedAuthPortal
                initialRole="admin"
                onCustomerSuccess={handleCustomerSuccess}
                onAdminSuccess={handleAdminSuccess}
                onClose={() => {
                  setActivePage('home');
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              />
            </div>

          )

        )}

      </main>


      {/* FOOTER */}
      <Footer

        setActivePage={(page) => {

          setActivePage(page);

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        }}

      />




      {/* ==========================================
          ENQUIRY MODAL
      ========================================== */}
      {enquiryProperty && (

        <div
          className="glass-modal-overlay"
          onClick={() =>
            setEnquiryProperty(null)
          }
        >

          <div
            className="glass-modal-content auth-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close-btn"
              onClick={() =>
                setEnquiryProperty(null)
              }
            >

              <X size={20} />

            </button>


            <div
              style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >

              <span className="section-tag">

                <Sparkles size={14} />

                {' '}

                VIP APARTMENT VISIT & ENQUIRY

              </span>


              <h3
                style={{
                  fontSize: '20px',
                  marginTop: '4px'
                }}
              >
                Schedule Site Inspection
              </h3>


              <p
                style={{
                  fontSize: '12px',
                  color:
                    'var(--text-muted)',
                  marginTop: '4px'
                }}
              >

                For:{' '}

                <strong
                  style={{
                    color: '#fff'
                  }}
                >
                  {enquiryProperty.title}
                </strong>

              </p>

            </div>


            {/* SUCCESS MESSAGE */}
            {enquirySubmitted ? (

              <div
                style={{
                  textAlign: 'center',
                  padding: '30px 10px'
                }}
              >

                <CheckCircle2
                  size={48}
                  color="#10b981"
                  style={{
                    margin:
                      '0 auto 12px'
                  }}
                />


                <h4
                  style={{
                    fontSize: '18px'
                  }}
                >
                  Visit Alert Dispatched
                  to Admin!
                </h4>


                <p
                  style={{
                    color:
                      'var(--text-muted)',
                    fontSize: '13px',
                    marginTop: '6px'
                  }}
                >
                  Our Senior Relationship
                  Manager will connect
                  with you within 15
                  minutes.
                </p>

              </div>

            ) : (

              /* ENQUIRY FORM */
              <form
                onSubmit={
                  handleEnquirySubmit
                }
                className="auth-form"
              >

                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="glass-input"
                  required
                  value={
                    enquiryForm.name
                  }
                  onChange={(e) =>
                    setEnquiryForm({
                      ...enquiryForm,
                      name:
                        e.target.value
                    })
                  }
                />


                <input
                  type="tel"
                  placeholder="Phone Number (+91)"
                  className="glass-input"
                  required
                  value={
                    enquiryForm.phone
                  }
                  onChange={(e) =>
                    setEnquiryForm({
                      ...enquiryForm,
                      phone:
                        e.target.value
                    })
                  }
                />


                <input
                  type="email"
                  placeholder="Email Address"
                  className="glass-input"
                  required
                  value={
                    enquiryForm.email
                  }
                  onChange={(e) =>
                    setEnquiryForm({
                      ...enquiryForm,
                      email:
                        e.target.value
                    })
                  }
                />


                <textarea
                  placeholder="Preferred viewing date / special questions..."
                  className="glass-input"
                  rows="3"
                  value={
                    enquiryForm.message
                  }
                  onChange={(e) =>
                    setEnquiryForm({
                      ...enquiryForm,
                      message:
                        e.target.value
                    })
                  }
                />


                <button
                  type="submit"
                  className="glass-btn"
                  style={{
                    width: '100%',
                    marginTop: '6px'
                  }}
                >
                  Confirm VIP Apartment
                  Inspection
                </button>

              </form>

            )}

          </div>

        </div>

      )}


      {/* ==========================================
          TOAST MESSAGE
      ========================================== */}
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
            background:
              'rgba(15, 17, 32, 0.95)',
            border:
              '1px solid rgba(168, 85, 247, 0.5)',
            color: '#c084fc',
            boxShadow:
              '0 8px 30px rgba(0,0,0,0.5)'
          }}
        >

          <CheckCircle2 size={18} />

          <span
            style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            {toastMessage}
          </span>

        </div>

      )}

    </div>
  );
}

export default App;