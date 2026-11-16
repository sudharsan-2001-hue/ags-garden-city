import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, PieChart, ShieldCheck, ArrowLeft } from 'lucide-react';

function PriceCalculator({ onBack, setActivePage }) {
  const [loanAmount, setLoanAmount] = useState(6000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="section-wrapper" style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'left', padding: '0 16px 60px' }}>
      
      {/* Customer Journey Stepper Progress Bar */}
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
          <span style={{ color: '#10b981', fontWeight: 800 }}>🧮 EMI & Loan Calculator (Current)</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button 
            onClick={() => { if (setActivePage) setActivePage('properties'); }}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            2. Browse Properties
          </button>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <button 
            onClick={() => { if (setActivePage) setActivePage('checkout'); }}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            3. Book Slot & Payment
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { if (onBack) onBack(); else if (setActivePage) setActivePage('home'); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px' }}
          >
            ← Back to Home
          </button>
          <button 
            className="glass-btn" 
            onClick={() => { if (setActivePage) setActivePage('properties'); }}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            Browse Properties →
          </button>
        </div>
      </div>

      <div className="section-top-header">
        <div className="section-title-group">
          <span className="section-tag"><Calculator size={14} /> MORTGAGE CALCULATOR</span>
          <h2 className="section-main-heading">Property Loan & <span className="gradient-text">EMI Estimator</span></h2>
        </div>
      </div>

      <div className="calculator-grid">
        <div className="calculator-controls-panel glass-panel">
          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Loan Required</span>
              <span className="slider-val-box">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input 
              type="range" 
              className="calculator-slider" 
              min="1000000" 
              max="50000000" 
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Interest Rate (% p.a)</span>
              <span className="slider-val-box">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              className="calculator-slider" 
              min="6.5" 
              max="14.0" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Loan Tenure (Years)</span>
              <span className="slider-val-box">{tenure} Years</span>
            </div>
            <input 
              type="range" 
              className="calculator-slider" 
              min="5" 
              max="30" 
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="calculator-results-panel glass-panel">
          <div className="emi-highlight-box">
            <span className="emi-label">Estimated Monthly EMI</span>
            <div className="emi-value">₹{calculations.emi.toLocaleString('en-IN')}</div>
          </div>

          <div className="breakdown-list">
            <div className="breakdown-row">
              <span>Principal Amount</span>
              <strong>₹{loanAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="breakdown-row">
              <span>Total Interest Due</span>
              <strong>₹{calculations.totalInterest.toLocaleString('en-IN')}</strong>
            </div>
            <div className="breakdown-row total-row">
              <span>Total Payment Payable</span>
              <strong className="gradient-accent-text">₹{calculations.totalAmount.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Step-by-Step Orderly Navigation Bar */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '28px',
          padding: '24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(15, 17, 32, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Instant Loan & Mortgage Pre-Approval Support
          </div>
          <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '18px' }}>
            Ready to find properties matching your calculated budget?
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="glass-btn-secondary" 
            onClick={() => { if (onBack) onBack(); else if (setActivePage) setActivePage('home'); }}
            style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '14px' }}
          >
            ← Back to Home
          </button>

          <button 
            className="glass-btn" 
            onClick={() => { if (setActivePage) setActivePage('properties'); }}
            style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 800, borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <span>Browse Matching Properties →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceCalculator;
