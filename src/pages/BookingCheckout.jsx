import React, { useState } from 'react';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  MapPin, 
  Printer, 
  Clock,
  Building2,
  Award,
  Check
} from 'lucide-react';

import safeStorage from '../utils/safeStorage';

function BookingCheckout({ property, onBack, onBookingComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay', 'cash_on_visit'
  const [razorpaySubMethod, setRazorpaySubMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Buyer details
  const [buyerName, setBuyerName] = useState('Sudharsan G');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');
  const [buyerEmail, setBuyerEmail] = useState('sudharsan@example.com');
  const [visitDate, setVisitDate] = useState('2026-09-05');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:30 AM');

  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  if (!property) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Property Selected For Booking</h3>
          <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>Please choose a property from the catalog to proceed with reservation.</p>
          <button className="glass-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const tokenAmount = property.tokenAmount || 25000;
  const totalPayable = tokenAmount;

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const bookingData = {
        bookingId: `AGS-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyPrice: property.price,
        tokenPaid: totalPayable,
        paymentMethod: paymentMethod === 'razorpay' ? `Razorpay (${razorpaySubMethod.toUpperCase()})` : 'Cash on Site Visit',
        paymentGateway: paymentMethod === 'razorpay' ? 'Razorpay' : 'Cash on Hand',
        paymentStatus: paymentMethod === 'razorpay' ? 'PAID / VERIFIED' : 'SCHEDULED (Pay at Inspection)',
        buyerName,
        buyerPhone,
        buyerEmail,
        visitDate,
        timeSlot,
        transactionId: paymentMethod === 'razorpay' ? `pay_rzp_${Math.random().toString(36).substring(2, 11)}` : 'N/A (Cash on Visit)',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        assignedManager: 'Karthik Raja (Senior RM)',
        managerContact: '+91 94444 88822',
        status: paymentMethod === 'razorpay' ? 'CONFIRMED' : 'INSPECTION SCHEDULED'
      };

      // Atomic, concurrent-safe saving
      const savedBooking = safeStorage.addBooking(bookingData);
      setBookingConfirmed(savedBooking);
      if (onBookingComplete) onBookingComplete(savedBooking);
    }, 800);
  };

  const handlePrintReceipt = () => {
    document.body.classList.add('invoice-printing-active');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('invoice-printing-active');
    }, 1500);
  };

  return (
    <div className="section-wrapper checkout-page-container" style={{ maxWidth: '1020px', margin: '0 auto' }}>
      
      {/* Top Customer Journey Stepper & Back Navigation */}
      {!bookingConfirmed && (
        <div className="no-print">
          <div 
            className="glass-panel"
            style={{
              padding: '12px 20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              background: 'rgba(15, 17, 32, 0.9)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', flexWrap: 'wrap' }}>
              <span style={{ color: '#10b981', fontWeight: 600 }}>✓ 1. Properties</span>
              <span style={{ color: 'var(--text-muted)' }}>➔</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>✓ 2. Property Details</span>
              <span style={{ color: 'var(--text-muted)' }}>➔</span>
              <span style={{ color: '#c084fc', fontWeight: 800 }}>3. Pick Slot & Pay Token (Current)</span>
              <span style={{ color: 'var(--text-muted)' }}>➔</span>
              <span style={{ color: 'var(--text-muted)' }}>4. Confirmed Invoice</span>
            </div>

            <button 
              className="glass-btn-secondary" 
              onClick={onBack}
              style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> Back to Details
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          CLEAN SINGLE PAYMENT SUCCESSFUL PAGE WITH ANIMATED GREEN TICK (✓)
         ========================================================================= */}
      {bookingConfirmed ? (
        <div className="official-print-invoice-wrapper" style={{ animation: 'fadeIn 0.4s ease-out' }}>
          
          <div className="official-invoice-card glass-panel" style={{ borderRadius: '24px', maxWidth: '780px', margin: '0 auto', textAlign: 'left' }}>
            
            {/* Luminous Animated Green Tick Mark (✓) - Screen only, hidden during print to fit on 1 A4 page */}
            <div className="invoice-top-tick-container no-print" style={{ textAlign: 'center', marginBottom: '14px' }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.18)',
                  border: '3px solid #10b981',
                  boxShadow: '0 0 35px rgba(16, 185, 129, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                  color: '#10b981',
                  animation: 'pulse-glow 2s infinite ease-in-out'
                }}
              >
                <Check size={36} strokeWidth={3.5} />
              </div>
              
              <span className="section-tag" style={{ color: '#10b981', fontSize: '11px', padding: '4px 12px' }}>
                <CheckCircle2 size={13} /> PAYMENT SUCCESSFUL & SLOT CONFIRMED
              </span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0', color: '#fff', letterSpacing: '-0.02em' }} className="print-bold-title">
                Booking Order Receipt & GST Tax Invoice
              </h1>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '4px 0 0', fontWeight: 700 }} className="print-ref-id-sub">
                Booking Ref: <strong style={{ color: '#c084fc', fontSize: '14px', fontWeight: 900 }} className="print-ref-id">{bookingConfirmed.bookingId}</strong> • Confirmed On: <strong style={{ color: '#fff', fontWeight: 900 }}>{bookingConfirmed.date}</strong>
              </p>
            </div>

            {/* Official Tax Invoice Clean Box (Fits neatly on all screens & 1 A4 sheet) */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', marginBottom: '16px' }} className="invoice-section-box">
              
              {/* Header Letterhead Strip with Official Logo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div 
                    className="print-logo-box"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1.5px solid rgba(56, 189, 248, 0.4)',
                      background: '#0a0f1d',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img 
                      src={AGS_LOGO_BASE64} 
                      alt="AGS Garden City Logo" 
                      className="print-logo-img"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#fff', display: 'block', letterSpacing: '0.02em' }} className="print-bold-title">
                      AGS GARDEN CITY
                    </strong>
                    <span style={{ fontSize: '9.5px', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.12em' }}>
                      LUXURY REAL ESTATE DEVELOPERS PVT LTD
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 900 }} className="print-tax-badge">
                    ✓ OFFICIAL GST TAX INVOICE
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>
                    TN RERA: TN/29/Building/0189/2026
                  </span>
                </div>
              </div>

              {/* GSTIN & SAC Code Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '11px', flexWrap: 'wrap', gap: '6px', fontWeight: 800 }} className="gst-meta-bar">
                <span>GSTIN: <strong style={{ color: '#c084fc', letterSpacing: '0.04em', fontWeight: 900 }}>33AAACG2026R1ZM</strong> (Tamil Nadu)</span>
                <span>SAC / HSN Code: <strong style={{ color: '#38bdf8', fontWeight: 900 }}>997222</strong> (Real Estate Services)</span>
                <span>Place of Supply: <strong style={{ color: '#fff', fontWeight: 900 }}>Chennai (33)</strong></span>
              </div>

              {/* Responsive Customer & Property Info Grid */}
              <div className="print-text-block" style={{ marginBottom: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} className="print-info-cell">
                  <span style={{ color: 'var(--text-muted)', fontSize: '10.5px', display: 'block', fontWeight: 800 }}>Billed To (Customer):</span>
                  <div style={{ fontWeight: 900, fontSize: '13px', color: '#fff' }} className="print-bold-val">{bookingConfirmed.buyerName}</div>
                  <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800 }} className="print-sub-val">{bookingConfirmed.buyerPhone} • {bookingConfirmed.buyerEmail}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} className="print-info-cell">
                  <span style={{ color: 'var(--text-muted)', fontSize: '10.5px', display: 'block', fontWeight: 800 }}>Reserved Property:</span>
                  <div style={{ fontWeight: 900, fontSize: '13px', color: '#fff' }} className="print-bold-val">{bookingConfirmed.propertyTitle}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800 }} className="print-sub-val">{bookingConfirmed.propertyLocation} (Val: {bookingConfirmed.propertyPrice})</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} className="print-info-cell">
                  <span style={{ color: 'var(--text-muted)', fontSize: '10.5px', display: 'block', fontWeight: 800 }}>Site Visit Scheduled:</span>
                  <div style={{ fontWeight: 900, fontSize: '13px', color: '#fff' }} className="print-bold-val">{bookingConfirmed.visitDate}</div>
                  <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: 800 }} className="print-sub-val">⏰ {bookingConfirmed.timeSlot}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} className="print-info-cell">
                  <span style={{ color: 'var(--text-muted)', fontSize: '10.5px', display: 'block', fontWeight: 800 }}>Payment Method & Txn ID:</span>
                  <div style={{ fontWeight: 900, fontSize: '13px', color: '#10b981' }} className="print-bold-val">{bookingConfirmed.paymentMethod}</div>
                  <div style={{ fontSize: '10.5px', color: '#c084fc', fontFamily: 'monospace', fontWeight: 900 }} className="print-sub-val">{bookingConfirmed.transactionId}</div>
                </div>
              </div>

              {/* Mobile Swipe Hint for Table */}
              <div className="mobile-table-hint no-print">
                <span>👉 Swipe table sideways to see GST breakdown & Total</span>
              </div>

              {/* Official GST Tax Line Item Table with Horizontal Scroll Safeguard */}
              <div className="gst-table-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: '8px' }}>
                <table style={{ width: '100%', minWidth: '440px', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }} className="gst-invoice-table">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.08)', borderBottom: '1.5px solid rgba(255,255,255,0.2)' }}>
                      <th style={{ padding: '7px 8px', fontWeight: 900, width: '28px' }}>#</th>
                      <th style={{ padding: '7px 8px', fontWeight: 900 }}>Service Description & SAC Code</th>
                      <th style={{ padding: '7px 8px', fontWeight: 900, textAlign: 'right' }}>Taxable (₹)</th>
                      <th style={{ padding: '7px 8px', fontWeight: 900, textAlign: 'right' }}>CGST (9%)</th>
                      <th style={{ padding: '7px 8px', fontWeight: 900, textAlign: 'right' }}>SGST (9%)</th>
                      <th style={{ padding: '7px 8px', fontWeight: 900, textAlign: 'right', minWidth: '85px' }}>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '7px 8px', fontWeight: 800 }}>01</td>
                      <td style={{ padding: '7px 8px' }}>
                        <strong style={{ color: '#fff', fontWeight: 900 }} className="print-bold-val">Property Token Reservation Advance</strong>
                        <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 800 }} className="print-sub-val">
                          SAC: 997222 • {bookingConfirmed.propertyTitle}
                        </div>
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900 }}>
                        ₹{Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', color: '#f59e0b', fontWeight: 900 }}>
                        ₹{Math.round(((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18)) / 2).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', color: '#f59e0b', fontWeight: 900 }}>
                        ₹{((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18) - Math.round(((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18)) / 2)).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900, color: '#10b981' }} className="print-total-amount">
                        ₹{bookingConfirmed.tokenPaid?.toLocaleString('en-IN')}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '10.5px' }}>
                      <td style={{ padding: '5px 8px', fontWeight: 800 }}>02</td>
                      <td style={{ padding: '5px 8px', fontWeight: 800 }}>
                        CMDA Legal Document Verification & Patta Verification
                      </td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', color: '#10b981', fontWeight: 900 }}>FREE (₹0)</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '10.5px' }}>
                      <td style={{ padding: '5px 8px', fontWeight: 800 }}>03</td>
                      <td style={{ padding: '5px 8px', fontWeight: 800 }}>
                        VIP Chauffeur Cab Pickup & Site Tour Escort
                      </td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 800 }}>₹0.00</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', color: '#10b981', fontWeight: 900 }}>FREE (₹0)</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: '2px solid rgba(255,255,255,0.2)', background: 'rgba(16, 185, 129, 0.08)' }}>
                      <td colSpan={2} style={{ padding: '7px 8px', fontWeight: 900, color: '#fff' }}>
                        TOTAL GROSS AMOUNT PAID (INCL. 18% GST)
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900 }}>
                        ₹{Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900, color: '#f59e0b' }}>
                        ₹{Math.round(((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18)) / 2).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900, color: '#f59e0b' }}>
                        ₹{((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18) - Math.round(((bookingConfirmed.tokenPaid || 20000) - Math.round((bookingConfirmed.tokenPaid || 20000) / 1.18)) / 2)).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 900, color: '#10b981', fontSize: '13px' }} className="print-total-amount">
                        ₹{bookingConfirmed.tokenPaid?.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Prominent Responsive Gross Total Summary Banner */}
              <div className="invoice-total-summary-card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.12) 100%)',
                border: '1.5px solid #10b981',
                borderRadius: '10px',
                padding: '10px 14px',
                margin: '8px 0 10px',
                boxSizing: 'border-box',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                    ✓ TOTAL GROSS PAID (INCL. 18% GST)
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 800 }}>
                    Token Reservation & Site Inspection Advance
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#10b981', display: 'block', lineHeight: 1.1 }} className="print-total-amount">
                    ₹{bookingConfirmed.tokenPaid?.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 900 }}>
                    Official Payment Confirmed
                  </span>
                </div>
              </div>

              {/* Official Corporate Seal & Authorized Signatory Block */}
              <div className="invoice-seal-signature-container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '10px',
                borderTop: '1.5px dashed rgba(255, 255, 255, 0.2)',
                marginTop: '10px',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {/* Left: Official Corporate Seal Stamp */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="official-corporate-seal" style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '50%',
                    border: '2px dashed #0284c7',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3px',
                    textAlign: 'center',
                    color: '#0284c7',
                    transform: 'rotate(-4deg)',
                    background: 'rgba(2, 132, 199, 0.05)',
                    flexShrink: 0
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: '2px',
                      borderRadius: '50%',
                      border: '1px solid #0284c7',
                      pointerEvents: 'none'
                    }} />
                    <div style={{ fontSize: '6.5px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
                      ★ AGS GARDEN CITY ★
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                      fontSize: '8px',
                      fontWeight: 900,
                      margin: '2px 0',
                      borderTop: '1px solid #0284c7',
                      borderBottom: '1px solid #0284c7',
                      padding: '1px 3px'
                    }}>
                      <Check size={9} strokeWidth={3.5} /> SEALED
                    </div>
                    <div style={{ fontSize: '6px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
                      APPROVED FOR TOKEN
                    </div>
                    <div style={{ fontSize: '6px', fontWeight: 800, marginTop: '1px' }}>
                      CHENNAI (33)
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }} className="print-bold-title">
                      Official Corporate Seal
                    </div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 800 }}>
                      TN RERA: <strong style={{ color: '#fff', fontWeight: 900 }}>TN/29/Building/0189/2026</strong>
                    </div>
                    <div style={{ fontSize: '9.5px', color: '#10b981', fontWeight: 900 }}>
                      ✓ CMDA Legally Approved & Verified
                    </div>
                    <div style={{ fontSize: '8.5px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 800 }}>
                      Hash: SHA256-AGS-{bookingConfirmed.transactionId?.slice(-8) || 'VERIFIED'}
                    </div>
                  </div>
                </div>

                {/* Right: Authorized Signatory Block */}
                <div style={{ textAlign: 'right', minWidth: '180px' }} className="authorized-signatory-block">
                  <div style={{
                    fontFamily: '"Brush Script MT", "Caveat", "Segoe Script", cursive',
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#38bdf8',
                    transform: 'rotate(-2deg)',
                    letterSpacing: '1px',
                    lineHeight: 1
                  }} className="print-signature-text">
                    S. Ramanathan
                  </div>
                  <div style={{
                    borderTop: '1.5px solid #64748b',
                    marginTop: '4px',
                    paddingTop: '3px'
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff' }} className="print-bold-title">
                      Authorized Signatory
                    </div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 800 }}>
                      Chief Accounts & Finance Officer
                    </div>
                    <div style={{ fontSize: '9.5px', color: '#c084fc', fontWeight: 800 }}>
                      Assigned RM: {bookingConfirmed.assignedManager}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Legal Guarantee & 100% Refund Assurance Banner */}
            <div className="digital-stamp" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '14px',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 900 }}>
                ✓ 100% REFUND GUARANTEE • 100% CLEAR PATTA & TITLE DEED • RERA REGISTERED
              </div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 800 }}>
                Chennai HQ Support: +91 44 2888 9999 • contact@agsgardencity.com
              </div>
            </div>

            {/* Action Buttons (Hidden during Print) */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="glass-btn"
                style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 900 }}
                onClick={handlePrintReceipt}
              >
                <Printer size={16} /> 🖨️ Print 1-Page Receipt
              </button>

              <button 
                className="glass-btn"
                style={{ padding: '10px 20px', fontSize: '13px', background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)', fontWeight: 800 }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <span>🔥 Browse Trending Properties →</span>
              </button>

              <button 
                className="glass-btn-secondary"
                style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 800 }}
                onClick={onBack}
              >
                🏡 Back to Home
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Booking & Checkout Form Grid */
        <div className="checkout-form-grid">
          
          {/* Left Column: Payment & Buyer Form */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div className="brand-icon-box" style={{ width: '38px', height: '38px' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px' }}>Secure Property Token Checkout</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Reserve property & schedule your VIP visit slot</p>
              </div>
            </div>

            <form onSubmit={handleProcessPayment}>
              {/* Buyer Information */}
              <h4 style={{ fontSize: '15px', color: '#c084fc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> 1. Buyer & Site Visit Slot Details
              </h4>
              
              <div className="form-row-2col" style={{ marginBottom: '24px' }}>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Full Name *</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    required 
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    className="glass-input" 
                    required 
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    className="glass-input" 
                    required 
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Preferred Visit Date *</label>
                  <input 
                    type="date" 
                    className="glass-input" 
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="field-label" style={{ marginBottom: '6px' }}>
                    <Clock size={13} /> Select Preferred Time Slot *
                  </label>
                  <select 
                    className="glass-input"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM (Morning VIP Slot)</option>
                    <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM (Afternoon Slot)</option>
                    <option value="05:00 PM - 06:30 PM">05:00 PM - 06:30 PM (Sunset / Evening Slot)</option>
                  </select>
                </div>
              </div>

              {/* Payment Methods */}
              <h4 style={{ fontSize: '15px', color: '#38bdf8', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={16} /> 2. Select Payment Method
              </h4>

              <div className="form-row-2col" style={{ marginBottom: '20px' }}>
                {/* Razorpay Option */}
                <div 
                  className={`glass-panel ${paymentMethod === 'razorpay' ? 'glass-panel-active' : ''}`}
                  onClick={() => setPaymentMethod('razorpay')}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    border: paymentMethod === 'razorpay' ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.12)',
                    background: paymentMethod === 'razorpay' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={20} color="#c084fc" />
                      <strong style={{ fontSize: '14px' }}>Razorpay Online</strong>
                    </div>
                    <span style={{ fontSize: '10px', background: '#9333ea', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>INSTANT</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    UPI (GPay / PhonePe), Credit/Debit Cards, NetBanking.
                  </p>
                </div>

                {/* Cash on Visit Option */}
                <div 
                  className={`glass-panel ${paymentMethod === 'cash_on_visit' ? 'glass-panel-active' : ''}`}
                  onClick={() => setPaymentMethod('cash_on_visit')}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    border: paymentMethod === 'cash_on_visit' ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.12)',
                    background: paymentMethod === 'cash_on_visit' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Banknote size={20} color="#10b981" />
                      <strong style={{ fontSize: '14px' }}>Cash on Site Visit</strong>
                    </div>
                    <span style={{ fontSize: '10px', background: '#059669', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>INSPECTION</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Pay token amount in cash/cheque during physical property visit.
                  </p>
                </div>
              </div>

              {/* Razorpay Sub-Method Tabs */}
              {paymentMethod === 'razorpay' && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button 
                      type="button" 
                      className={`filter-pill ${razorpaySubMethod === 'upi' ? 'filter-pill-active' : ''}`}
                      onClick={() => setRazorpaySubMethod('upi')}
                    >
                      <Smartphone size={14} /> UPI (GPay, PhonePe, Paytm)
                    </button>
                    <button 
                      type="button" 
                      className={`filter-pill ${razorpaySubMethod === 'card' ? 'filter-pill-active' : ''}`}
                      onClick={() => setRazorpaySubMethod('card')}
                    >
                      <CreditCard size={14} /> Card (Debit/Credit)
                    </button>
                    <button 
                      type="button" 
                      className={`filter-pill ${razorpaySubMethod === 'netbanking' ? 'filter-pill-active' : ''}`}
                      onClick={() => setRazorpaySubMethod('netbanking')}
                    >
                      <Building size={14} /> Net Banking
                    </button>
                  </div>

                  {razorpaySubMethod === 'upi' && (
                    <div>
                      <label className="field-label" style={{ marginBottom: '6px' }}>Enter UPI ID (VPA)</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          placeholder="yourname@okaxis or 9876543210@ybl" 
                          className="glass-input" 
                          style={{ flex: 1 }}
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="glass-btn-secondary"
                          onClick={() => setUpiId('sudharsan@okaxis')}
                        >
                          Auto Fill
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '11px', color: '#10b981' }}>✓ Google Pay</span>
                        <span style={{ fontSize: '11px', color: '#38bdf8' }}>✓ PhonePe</span>
                        <span style={{ fontSize: '11px', color: '#c084fc' }}>✓ Paytm UPI</span>
                      </div>
                    </div>
                  )}

                  {razorpaySubMethod === 'card' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label className="field-label" style={{ marginBottom: '4px' }}>Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4532 •••• •••• 8892" 
                          className="glass-input" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="field-label" style={{ marginBottom: '4px' }}>Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="glass-input" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="field-label" style={{ marginBottom: '4px' }}>CVV</label>
                        <input 
                          type="password" 
                          placeholder="•••" 
                          maxLength="4" 
                          className="glass-input" 
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {razorpaySubMethod === 'netbanking' && (
                    <div>
                      <label className="field-label" style={{ marginBottom: '6px' }}>Select Bank</label>
                      <select className="glass-input" style={{ width: '100%' }}>
                        <option>HDFC Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === 'cash_on_visit' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, fontSize: '13px' }}>
                    <CheckCircle2 size={16} /> Zero Upfront Payment Required Today
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Our Senior Property Specialist will meet you on <strong>{visitDate} at {timeSlot}</strong>. You can inspect all legal title documents and pay the token directly in cash or cheque.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="glass-btn" 
                style={{ width: '100%', padding: '14px', fontSize: '16px' }}
                disabled={isProcessing}
              >
                <Lock size={16} />
                {isProcessing 
                  ? 'Verifying & Reserving Slot...' 
                  : paymentMethod === 'razorpay' 
                    ? `Pay ₹${totalPayable.toLocaleString('en-IN')} Token via Razorpay` 
                    : 'Confirm Site Visit & Slot Booking'}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary Glass Card */}
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left', position: 'sticky', top: '90px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '16px' }}>Property Reservation Summary</h4>

            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '140px', marginBottom: '14px' }}>
              <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <span className="property-type-tag">{property.type} • {property.category?.toUpperCase()}</span>
            <h3 style={{ fontSize: '18px', margin: '4px 0 6px' }}>{property.title}</h3>
            
            <div className="property-location" style={{ fontSize: '12px', marginBottom: '16px' }}>
              <MapPin size={14} className="location-icon" />
              <span>{property.location}</span>
            </div>

            {/* Price & Token Breakdown */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '14px 0', margin: '14px 0' }}>
              <div className="breakdown-row" style={{ marginBottom: '8px' }}>
                <span className="breakdown-label">Full Property Value:</span>
                <span className="breakdown-value">{property.price}</span>
              </div>
              <div className="breakdown-row" style={{ marginBottom: '8px' }}>
                <span className="breakdown-label">Refundable Token Deposit:</span>
                <span className="breakdown-value" style={{ color: '#c084fc' }}>₹{tokenAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">RERA Legal Verification Fee:</span>
                <span className="breakdown-value" style={{ color: '#10b981' }}>FREE (₹0)</span>
              </div>
            </div>

            <div className="breakdown-row" style={{ fontSize: '16px', fontWeight: 800 }}>
              <span>Total Payable Now:</span>
              <span className="gradient-accent-text">₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', marginTop: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                100% Refund Guarantee if legal verification or site inspection fails.
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default BookingCheckout;
