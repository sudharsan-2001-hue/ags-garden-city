import React from 'react';
import { 
  Lock, 
  Home, 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Scale, 
  Heart, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const STEPS = [
  { id: 'auth', stepNum: 1, label: 'Login', icon: Lock, badge: 'START' },
  { id: 'home', stepNum: 2, label: 'Home', icon: Home },
  { id: 'properties', stepNum: 3, label: 'Properties', icon: Compass },
  { id: 'ai-finder', stepNum: 4, label: 'AI Match', icon: Sparkles, badge: 'AI' },
  { id: 'trends', stepNum: 5, label: 'Trends', icon: TrendingUp },
  { id: 'saved', stepNum: 6, label: 'Saved', icon: Heart },
  { id: 'verified', stepNum: 7, label: 'Verified', icon: CheckCircle2, badge: 'RERA' },
  { id: 'property-detail', stepNum: 8, label: 'Details & Tour', icon: Building2 },
  { id: 'checkout', stepNum: 9, label: 'Booking & GST', icon: CreditCard },
  { id: 'conclusion', stepNum: 10, label: 'HR Showcase', icon: Award, badge: 'HR VIP' }
];

export default function GlassStepBar({ 
  currentStepId, 
  setActivePage,
  onPrev,
  onNext,
  nextLabel,
  prevLabel,
  compact = false
}) {
  const foundIndex = STEPS.findIndex(s => s.id === currentStepId);
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const currentStep = STEPS[currentIndex] || STEPS[0];
  const progressPercent = Math.round(((currentIndex + 1) / STEPS.length) * 100);

  const handleStepClick = (stepId) => {
    setActivePage(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevClick = () => {
    if (onPrev) {
      onPrev();
    } else if (currentIndex > 0) {
      handleStepClick(STEPS[currentIndex - 1].id);
    }
  };

  const handleNextClick = () => {
    if (onNext) {
      onNext();
    } else if (currentIndex < STEPS.length - 1) {
      handleStepClick(STEPS[currentIndex + 1].id);
    }
  };

  return (
    <div 
      className="glass-panel"
      style={{
        margin: '12px auto 24px',
        padding: compact ? '10px 16px' : '16px 20px',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'relative',
        zIndex: 20
      }}
    >
      {/* Top Meta Strip: Step Progress & Live Java Backend Status */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 900,
            color: '#38bdf8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'rgba(56, 189, 248, 0.12)',
            padding: '3px 8px',
            borderRadius: '8px',
            border: '1px solid rgba(56, 189, 248, 0.25)'
          }}>
            Step {currentIndex + 1} of {STEPS.length}: {currentStep.label}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ({progressPercent}% Complete)
          </span>
        </div>

        {/* Live Java Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: '#10b981',
          fontWeight: 700,
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '3px 10px',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }}></span>
          <span>Java 26 Virtual Thread REST API: Active (Port 8080)</span>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        marginBottom: '14px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #38bdf8 0%, #a855f7 50%, #10b981 100%)',
          borderRadius: '4px',
          transition: 'width 0.4s ease'
        }}></div>
      </div>

      {/* Horizontal Steps Track */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = step.id === currentStepId;
          const isPassed = idx < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '12px',
                border: isActive 
                  ? '1.5px solid #a855f7' 
                  : isPassed 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.2) 100%)' 
                  : isPassed 
                    ? 'rgba(16, 185, 129, 0.08)' 
                    : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#fff' : isPassed ? '#10b981' : 'var(--text-muted)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '11.5px',
                fontWeight: isActive ? 800 : 600,
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 15px rgba(168, 85, 247, 0.35)' : 'none'
              }}
              title={`Go to Step ${step.stepNum}: ${step.label}`}
            >
              <StepIcon size={13} color={isActive ? '#c084fc' : isPassed ? '#10b981' : '#94a3b8'} />
              <span>{step.stepNum}. {step.label}</span>
              {step.badge && (
                <span style={{
                  fontSize: '8px',
                  fontWeight: 900,
                  padding: '1px 5px',
                  borderRadius: '6px',
                  background: step.badge === 'HR VIP' ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'rgba(56, 189, 248, 0.3)',
                  color: '#fff'
                }}>
                  {step.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Prev / Next Quick Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {currentIndex > 0 ? (
          <button
            className="glass-btn-secondary"
            onClick={handlePrevClick}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={13} /> {prevLabel || `Step ${currentIndex}: ${STEPS[currentIndex - 1]?.label}`}
          </button>
        ) : (
          <div style={{ fontSize: '11.5px', color: '#c084fc', fontWeight: 700 }}>
            🚀 Step 1: Starting Front Login Portal
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {currentStepId !== 'conclusion' && (
            <button
              onClick={() => handleStepClick('conclusion')}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '6px 12px',
                borderRadius: '14px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              👔 HR Project Showcase →
            </button>
          )}

          {currentIndex < STEPS.length - 1 && (
            <button
              className="glass-btn"
              onClick={handleNextClick}
              style={{
                padding: '6px 16px',
                fontSize: '12px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 800
              }}
            >
              {nextLabel || `Next: Step ${currentIndex + 2}. ${STEPS[currentIndex + 1]?.label}`} <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
