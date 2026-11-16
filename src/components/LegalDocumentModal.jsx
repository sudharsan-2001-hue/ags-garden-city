import React from 'react';
import { X, ShieldCheck, Printer, Stamp } from 'lucide-react';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';

function VaoSealBlock({ vaoName, village, docLabel }) {
  return (
    <div className="dossier-seal-section" style={{ marginTop: '16px' }}>
      <div className="dossier-sign-block dossier-sign-left">
        <div className="dossier-signature-img-box customer-sig-box">
          <svg width="150" height="38" viewBox="0 0 150 38" style={{ overflow: 'visible' }}>
            <text
              x="5"
              y="26"
              fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', cursive"
              fontSize="22"
              fontStyle="italic"
              fontWeight="600"
              fill="#1d4ed8"
            >
              {vaoName}
            </text>
            <path d="M6 30 Q 55 36 135 28" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="dossier-sign-line" />
        <div className="dossier-sign-title">Village Administrative Officer (VAO)</div>
        <div className="dossier-sign-sub">{village} Village • Revenue Ward</div>
      </div>

      <div className="dossier-stamp-box">
        <div className="dossier-stamp-seal" style={{ borderColor: '#b45309', color: '#b45309', background: 'rgba(245, 158, 11, 0.08)' }}>
          <span>GOVT OF TN</span>
          <strong>VAO SEALED</strong>
          <span>{docLabel}</span>
        </div>
      </div>

      <div className="dossier-sign-block dossier-sign-right">
        <div className="dossier-signature-img-box director-sig-box">
          <svg width="160" height="38" viewBox="0 0 160 38" style={{ overflow: 'visible' }}>
            <text
              x="15"
              y="25"
              fontFamily="'Brush Script MT', 'Segoe Script', 'Caveat', cursive"
              fontSize="21"
              fontStyle="italic"
              fontWeight="700"
              fill="#0f172a"
            >
              Tahsildar Office
            </text>
            <path d="M14 28 Q 70 36 148 27" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="dossier-sign-line" />
        <div className="dossier-sign-title">Revenue Department Attestation</div>
        <div className="dossier-sign-sub">Digitally Verified • TN e-Services Portal</div>
      </div>
    </div>
  );
}

function LegalDocumentModal({ property, docType, onClose }) {
  if (!docType) return null;

  const isPatta = docType === 'patta';
  const title = property?.title || 'Verified Property';
  const location = property?.location || 'Chennai';
  const area = property?.area || location.split(',')[0] || 'Chennai';
  const docId = String(property?.id || '101').replace(/\D/g, '').slice(-4) || '4892';
  const vaoName = 'K. Murugesan';
  const issueDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="glass-modal-overlay" onClick={onClose}>
      <div
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          padding: '16px',
          background: 'rgba(15, 23, 42, 0.96)',
          borderRadius: '20px',
          border: `1px solid ${isPatta ? 'rgba(16, 185, 129, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`,
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '12px',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <span className="section-tag" style={{ color: isPatta ? '#10b981' : '#38bdf8', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} />
            {isPatta ? 'Revenue e-Patta Certificate' : 'DTCP Layout Approval Certificate'}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="glass-btn"
              onClick={() => window.print()}
              style={{ padding: '6px 14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontWeight: 700 }}
            >
              <Printer size={14} /> Print
            </button>
            <button className="modal-close-btn" onClick={onClose} style={{ position: 'static', padding: '6px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div
          id="printableLegalDoc"
          className="dossier-paper-container"
          style={{ background: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '16px 20px', border: '2px solid #0f172a', boxSizing: 'border-box' }}
        >
          <div className="dossier-letterhead">
            <div className="dossier-brand-group">
              <div className="dossier-logo-box">
                <img src={AGS_LOGO_BASE64} alt="AGS NEST Logo" className="dossier-logo-img" />
              </div>
              <div>
                <h1 className="dossier-main-title">GOVERNMENT OF TAMIL NADU — REVENUE DEPARTMENT</h1>
                <div className="dossier-sub-tag">
                  {isPatta ? 'ELECTRONIC PATTA (e-PATTA) • LAND RECORD EXTRACT' : 'DTCP DIRECTORATE • LAYOUT SANCTION ORDER'}
                </div>
                <div className="dossier-meta-text">Property: {title} • Location: {location}</div>
              </div>
            </div>
            <div className="dossier-ref-badge-box">
              <div className="dossier-doc-type">{isPatta ? 'e-PATTA REF' : 'DTCP PERMIT REF'}</div>
              <div className="dossier-ref-number">{isPatta ? `TN/ePATTA/${docId}/2026` : `DTCP/LS/${docId}/2026`}</div>
              <div className="dossier-issue-date">Date: {issueDate}</div>
              <span className="dossier-status-pill">{isPatta ? '✓ CLEAR TITLE PATTA' : '✓ DTCP APPROVED'}</span>
            </div>
          </div>

          <div className="dossier-license-bar">
            <span>PROPERTY: <strong>{title}</strong></span>
            <span>AREA: <strong>{area}</strong></span>
            <span>STATUS: <strong style={{ color: '#047857' }}>✓ VAO VERIFIED & SEALED</strong></span>
          </div>

          <div className="dossier-card" style={{ marginTop: '12px' }}>
            <div className="dossier-card-title">
              <span>{isPatta ? 'Revenue e-Patta & Land Record Details' : 'DTCP Planning Permission Details'}</span>
              <span className="dossier-chip" style={{ background: isPatta ? '#ecfdf5' : '#eff6ff', color: isPatta ? '#047857' : '#1d4ed8', border: `1px solid ${isPatta ? '#10b981' : '#3b82f6'}` }}>
                <Stamp size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                {isPatta ? 'PATTA ISSUED' : 'DTCP SANCTIONED'}
              </span>
            </div>
            <div className="dossier-card-body">
              {isPatta ? (
                <>
                  <div className="dossier-row">
                    <span className="dossier-lbl">e-Patta Number:</span>
                    <span className="dossier-val bold" style={{ color: '#047857' }}>e-Patta #{docId} (VAO Attested)</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Survey / T.S. Numbers:</span>
                    <span className="dossier-val">Survey No. 284/3A, 284/3B, Ward D</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Revenue Village / Taluk:</span>
                    <span className="dossier-val">{area} Village, Kundrathur Taluk, Chennai</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Land Title Tenure:</span>
                    <span className="dossier-val bold">Ryotwari Patta (Freehold — No Disputes)</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Chitta & Adangal:</span>
                    <span className="dossier-val">Verified Clean on TN e-Services Portal</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">30-Year EC Status:</span>
                    <span className="dossier-val bold" style={{ color: '#047857' }}>NIL Encumbrance — Zero Liens</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">VAO Field Verification:</span>
                    <span className="dossier-val">Physical site visit completed & boundary confirmed</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="dossier-row">
                    <span className="dossier-lbl">DTCP Layout Sanction No:</span>
                    <span className="dossier-val bold" style={{ color: '#1d4ed8' }}>DTCP/LS/2026/{docId}</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Planning Permission (PP):</span>
                    <span className="dossier-val">CMDA/PP/MSB/2026/0{docId}</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Layout Location:</span>
                    <span className="dossier-val">{location}</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Zoning Classification:</span>
                    <span className="dossier-val">Residential Mixed Development Zone (DTCP Approved)</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">OSR Gift Deed:</span>
                    <span className="dossier-val">10% Open Space Reserve Park Land Gifted to Local Body</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">Internal Road Width:</span>
                    <span className="dossier-val">40 Feet Blacktop Tar Road — Handed Over</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-lbl">VAO Revenue Clearance:</span>
                    <span className="dossier-val bold" style={{ color: '#047857' }}>✓ Attested — No Revenue Arrears</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <VaoSealBlock vaoName={vaoName} village={area} docLabel={isPatta ? 'PATTA' : 'DTCP'} />

          <div className="dossier-footnote">
            <div className="dossier-barcode-text">
              ||||| | |||| ||||| {isPatta ? 'TN-ePATTA' : 'TN-DTCP'}-{docId}-2026 |||||
            </div>
            <p>
              This {isPatta ? 'e-Patta land record extract' : 'DTCP layout sanction certificate'} is electronically certified and
              {' '}<strong>VAO sealed & signed</strong> under Tamil Nadu Revenue Department guidelines. Guaranteed 100% clear marketable title for {title}.
            </p>
          </div>
        </div>

        <div className="no-print" style={{ marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
          <button className="glass-btn-secondary" onClick={onClose} style={{ padding: '10px 20px' }}>
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegalDocumentModal;
