import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleRetry = () => {
    navigate('/student/emergency-outpass'); // Redirect to the form page (or wherever your form is)
  };

  // Floating particles animation
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundOverlay}>
        <div style={styles.gradientOrb1}></div>
        <div style={styles.gradientOrb2}></div>
        <div style={styles.gradientOrb3}></div>
      </div>
      
      {/* Floating Particles */}
      <div style={styles.particlesContainer}>
        {particles}
      </div>

      {/* Main Content */}
      <div style={{
        ...styles.content,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
        opacity: isVisible ? 1 : 0
      }}>
        {/* Error Icon with Animation */}
        <div style={styles.iconContainer}>
          <div style={styles.errorIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ff4757" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div style={styles.pulseRing1}></div>
          <div style={styles.pulseRing2}></div>
        </div>

        {/* Main Heading */}
        <h1 style={styles.heading}>
          <span style={styles.emoji}>⚠️</span>
          <span style={{whiteSpace: 'nowrap'}}>Payment Failed</span>
        </h1>

        {/* Error Message */}
        <div style={styles.messageContainer}>
          <p style={styles.message}>
            Something went wrong. Please try again.
          </p>
          <p style={styles.subMessage}>
            Don't worry, no charges were made to your account.
          </p>
        </div>

        {/* Status Badge */}
        <div style={styles.statusBadge}>
          <div style={styles.statusDot}></div>
          <span>Transaction Failed</span>
        </div>

        {/* Retry Button */}
        <button onClick={handleRetry} style={styles.button}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          Try Again
        </button>

        {/* Decorative Elements */}
        <div style={styles.decorativeLines}>
          <div style={styles.line1}></div>
          <div style={styles.line2}></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: scale(0.95);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: scale(1) translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: scale(1) translateX(2px);
          }
        }

        @keyframes pulseError {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(255, 71, 87, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.33);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(180deg);
          }
        }

        @keyframes buttonHover {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #ff4757, #ff6b9d);
          border-radius: 50%;
          animation: float infinite ease-in-out;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .heading {
            font-size: 1.8rem !important;
          }
          .message {
            font-size: 1rem !important;
          }
          .button {
            width: 100% !important;
            padding: 16px 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'hsla(351, 100%, 25%, 1)',
    background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)',
    background: '-moz-linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)',
    background: '-webkit-linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1
  },
  
  gradientOrb1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'gradientShift 8s ease-in-out infinite',
    filter: 'blur(40px)'
  },
  
  gradientOrb2: {
    position: 'absolute',
    top: '60%',
    right: '10%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(220, 38, 127, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'gradientShift 6s ease-in-out infinite reverse',
    filter: 'blur(30px)'
  },
  
  gradientOrb3: {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(191, 21, 12, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'gradientShift 10s ease-in-out infinite',
    filter: 'blur(50px)'
  },
  
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none'
  },
  
  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    width: '100%',
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  
  iconContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '2rem'
  },
  
  errorIcon: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(255, 71, 87, 0.1)',
    border: '2px solid #ff4757',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    animation: 'shake 3s ease-in-out infinite',
    backdropFilter: 'blur(10px)'
  },
  
  pulseRing1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    border: '2px solid rgba(255, 71, 87, 0.3)',
    borderRadius: '50%',
    animation: 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite'
  },
  
  pulseRing2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    border: '2px solid rgba(220, 38, 127, 0.3)',
    borderRadius: '50%',
    animation: 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
    animationDelay: '0.3s'
  },
  
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ff4757 0%, #ff6b9d 50%, #ffd700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
    overflow: 'visible'
  },
  
  emoji: {
    display: 'inline-block',
    animation: 'shake 2s ease-in-out infinite',
    marginRight: '0.5rem'
  },
  
  messageContainer: {
    marginBottom: '2rem'
  },
  
  message: {
    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
    color: '#e0e0e0',
    marginBottom: '0.8rem',
    fontWeight: '400',
    lineHeight: '1.6'
  },
  
  subMessage: {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#ff6b9d',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },
  
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.8rem',
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.3)',
    borderRadius: '50px',
    padding: '0.8rem 1.5rem',
    fontSize: '0.95rem',
    color: '#ff4757',
    fontWeight: '600',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)'
  },
  
  statusDot: {
    width: '8px',
    height: '8px',
    background: '#ff4757',
    borderRadius: '50%',
    animation: 'pulseError 1.5s infinite'
  },
  
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
    backdropFilter: 'blur(10px)',
    minWidth: '200px',
    position: 'relative',
    overflow: 'hidden'
  },
  
  decorativeLines: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1
  },
  
  line1: {
    position: 'absolute',
    top: '20%',
    left: '0',
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 71, 87, 0.3) 50%, transparent 100%)',
    animation: 'fadeInUp 2s ease-out'
  },
  
  line2: {
    position: 'absolute',
    bottom: '20%',
    left: '0',
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 157, 0.3) 50%, transparent 100%)',
    animation: 'fadeInUp 2s ease-out 0.5s both'
  }
};

export default Cancel;