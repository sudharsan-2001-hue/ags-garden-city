import React, { useState } from 'react';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  Globe,
  Share2,
  MessageCircle,
  Shield
} from 'lucide-react';

function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim()) {
      setSubscribed(true);

      setTimeout(() => setSubscribed(false), 5000);

      setEmail('');
    }
  };

  return (
    <footer className="footer-section no-print">

      <div className="footer-glass-container glass-panel">

        <div className="footer-grid">

          {/* =========================
              BRAND INFO
          ========================== */}
          <div className="footer-brand-col">

            <div
              className="navbar-brand"
              style={{
                cursor: 'default',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >

              {/* AGS NEST LOGO */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow:
                    '0 0 20px rgba(16, 185, 129, 0.4), 0 0 10px rgba(56, 189, 248, 0.3)',
                  border: '1.5px solid rgba(16, 185, 129, 0.4)',
                  background: '#0a0f1d',
                  flexShrink: 0
                }}
              >

                <img
                  src={AGS_LOGO_BASE64}
                  alt="AGS NEST Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

              </div>

              {/* BRAND NAME */}
              <div className="brand-text">

                <span
                  className="brand-title gradient-text"
                  style={{
                    fontSize: '22px',
                    fontWeight: 900
                  }}
                >
                  AGS NEST
                </span>

                <span
                  className="brand-subtitle"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: 'var(--text-muted)',
                    fontWeight: 700
                  }}
                >
                  LUXURY REAL ESTATE
                </span>

              </div>

            </div>


            {/* CONTACT DETAILS */}
            <div className="footer-contact-items">

              {/* 24 HOURS */}
              <div
                className="contact-item"
                style={{
                  color: '#10b981',
                  fontWeight: 800
                }}
              >

                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block'
                  }}
                ></span>

                <span>
                  24 HOURS AVAILABLE DIRECT HELPLINE
                </span>

              </div>


              {/* ADDRESS */}
              <div className="contact-item">

                <MapPin
                  size={15}
                  color="#38bdf8"
                />

                <span>
                  AGS NEST Towers, Mount-Poonamallee Road,
                  Porur Junction, Chennai - 600116
                </span>

              </div>


              {/* PHONE */}
              <div className="contact-item">

                <Phone
                  size={15}
                  color="#10b981"
                />

                <a
                  href="tel:7397135792"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 800
                  }}
                >
                  +91 73971 35792 (24/7 Direct Hotline)
                </a>

              </div>


              {/* EMAIL */}
              <div className="contact-item">

                <Mail
                  size={15}
                  color="#c084fc"
                />

                <a
                  href="mailto:AGSGARDENCITY@gmail.com"
                  style={{
                    color: '#c084fc',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  AGSGARDENCITY@gmail.com
                </a>

              </div>

            </div>

          </div>


          {/* =========================
              QUICK LINKS
          ========================== */}
          <div className="footer-col">

            <h4 className="footer-heading">
              Quick Exploration
            </h4>

            <ul className="footer-links-list">

              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('contact');

                    window.scrollTo(0, 0);
                  }}
                  style={{
                    color: '#10b981',
                    fontWeight: 'bold'
                  }}
                >
                  📞 24/7 Contact & VIP Hotline
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('trending');

                    window.scrollTo(0, 0);
                  }}
                  style={{
                    color: '#ef4444',
                    fontWeight: 'bold'
                  }}
                >
                  🔥 Trending Hot Deals 2026
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('properties');

                    window.scrollTo(0, 0);
                  }}
                >
                  Browse All Properties
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('ai-finder');

                    window.scrollTo(0, 0);
                  }}
                >
                  AI Smart Property Matcher
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('calculator');

                    window.scrollTo(0, 0);
                  }}
                >
                  Mortgage & EMI Calculator
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('trends');

                    window.scrollTo(0, 0);
                  }}
                >
                  Chennai Price Trends 2026
                </button>
              </li>


              <li>
                <button
                  onClick={() => {
                    setActivePage &&
                      setActivePage('admin');

                    window.scrollTo(0, 0);
                  }}
                >
                  Admin Management Portal
                </button>
              </li>

            </ul>

          </div>


          {/* =========================
              POPULAR LOCALITIES
          ========================== */}
          <div className="footer-col">

            <h4 className="footer-heading">
              Top Chennai Hubs
            </h4>

            <ul className="footer-links-list">

              <li>
                <span>
                  Anna Nagar (West & East)
                </span>
              </li>

              <li>
                <span>
                  OMR IT Corridor (Thoraipakkam)
                </span>
              </li>

              <li>
                <span>
                  Velachery & Madipakkam
                </span>
              </li>

              <li>
                <span>
                  ECR Coastal Luxury Corridor
                </span>
              </li>

              <li>
                <span>
                  Adyar & Besant Nagar
                </span>
              </li>

              <li>
                <span>
                  Tambaram & GST Road Hub
                </span>
              </li>

            </ul>

          </div>


          {/* =========================
              NEWSLETTER
          ========================== */}
          <div className="footer-col newsletter-col">

            <h4 className="footer-heading">

              <Sparkles
                size={16}
                className="sparkle-icon"
              />

              Stay In The Loop

            </h4>


            <p className="newsletter-text">

              Subscribe to get exclusive first-access
              to off-market price drops, prime launches
              & weekly real estate insights.

            </p>


            {/* NEWSLETTER FORM */}
            <form
              onSubmit={handleSubscribe}
              className="newsletter-form"
            >

              <div className="newsletter-input-group">

                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="glass-input newsletter-input"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />


                <button
                  type="submit"
                  className="glass-btn newsletter-btn"
                >

                  <Send size={15} />

                </button>

              </div>

            </form>


            {/* SUBSCRIBED MESSAGE */}
            {subscribed && (
              <div className="subscribed-badge">

                <CheckCircle2 size={15} />

                <span>
                  Thank you! You are now subscribed.
                </span>

              </div>
            )}


            {/* SOCIAL LINKS */}
            <div className="social-links-row">

              <a
                href="#globe"
                className="social-glass-icon"
                aria-label="Website"
              >
                <Globe size={17} />
              </a>


              <a
                href="#share"
                className="social-glass-icon"
                aria-label="Share"
              >
                <Share2 size={17} />
              </a>


              <a
                href="#chat"
                className="social-glass-icon"
                aria-label="Community"
              >
                <MessageCircle size={17} />
              </a>


              <a
                href="#security"
                className="social-glass-icon"
                aria-label="Trust"
              >
                <Shield size={17} />
              </a>

            </div>

          </div>

        </div>


        {/* =========================
            BOTTOM STRIP
        ========================== */}
        <div className="footer-bottom-strip">

          <p>
            © 2026 AGS NEST Real Estate Technologies Inc.
            All rights reserved.
          </p>


          <div className="footer-bottom-links">

            <a href="#">
              Privacy Policy
            </a>

            <span>•</span>

            <a href="#">
              Terms of Service
            </a>

            <span>•</span>

            <a href="#">
              RERA Disclosures
            </a>

            <span>•</span>

            <a href="#">
              Sitemap
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;