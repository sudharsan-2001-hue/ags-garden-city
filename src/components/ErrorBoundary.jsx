import React from 'react';
import { ShieldAlert, RefreshCw, Home, Sparkles } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0b14',
            padding: '20px',
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Plus Jakarta Sans, sans-serif'
          }}
        >
          <div 
            className="glass-panel"
            style={{
              maxWidth: '520px',
              padding: '36px 28px',
              borderRadius: '24px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              background: 'rgba(15, 17, 32, 0.95)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(168, 85, 247, 0.3)'
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#10b981'
              }}
            >
              <Sparkles size={32} />
            </div>

            <h2 style={{ fontSize: '22px', marginBottom: '8px', color: '#fff' }}>
              AGS NEST High-Speed Engine Protected
            </h2>
            <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              Our high-traffic concurrency shield safely recovered your session. Click below to continue browsing verified residences smoothly.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={this.handleReset}
                className="glass-btn"
                style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <RefreshCw size={16} /> ⚡ Fast Re-sync & Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
