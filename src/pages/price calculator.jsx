import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, PieChart, ShieldCheck, ArrowLeft } from 'lucide-react';

function PriceCalculator({ onBack }) {
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
    <div className="section-wrapper" style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'left', padding: '0 16px' }}>
      
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
          <span style={{ color: 'var(--text-muted)' }}>2. Browse Properties</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: 'var(--text-muted)' }}>3. Book Slot & Payment</span>
          <span style={{ color: 'var(--text-muted)' }}>➔</span>
          <span style={{ color: 'var(--text-muted)' }}>4. Confirmed Invoice</span>
        </div>

        {onBack && (
          <button 
            className="glass-btn-secondary" 
            onClick={onBack}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '16px' }}
          >
            ← Back to Home
          </button>
        )}
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
    </div>
  );
}

export default PriceCalculator;
