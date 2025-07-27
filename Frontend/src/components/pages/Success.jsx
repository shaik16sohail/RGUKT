import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Original navigation timer - exactly as you had it
    const timer = setTimeout(() => {
      navigate('/student/home'); // Redirect to homepage after 4 seconds
    }, 4000);

    return () => {
      clearTimeout(timer); // Clear on unmount
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
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
        {/* Success Icon with Pulse Animation */}
        <div style={styles.iconContainer}>
          <div style={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          </div>
          <div style={styles.pulseRing1}></div>
          <div style={styles.pulseRing2}></div>
          <div style={styles.pulseRing3}></div>
        </div>

        {/* Main Heading */}
        <h1 style={styles.heading}>
          <span style={styles.emoji}>🎉</span>
          <span style={{whiteSpace: 'nowrap'}}>Emergency Outpass Applied!</span>
        </h1>

        {/* Success Message */}
        <div style={styles.messageContainer}>
          <p style={styles.message}>
            You have successfully applied for an emergency outpass.
          </p>
          <p style={styles.subMessage}>
            You may now leave the campus safely.
          </p>
        </div>

        {/* Status Badge */}
        <div style={styles.statusBadge}>
          <div style={styles.statusDot}></div>
          <span>Approved & Active</span>
        </div>

        {/* Countdown Timer */}
        <div style={styles.countdownContainer}>
          <div style={styles.countdownCircle}>
            <span style={styles.countdownNumber}>{countdown}</span>
          </div>
          <p style={styles.countdownText}>
            Redirecting to homepage in {countdown} second{countdown !== 1 ? 's' : ''}
          </p>
        </div>

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

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
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

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #00ff88, #ff6b9d);
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
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
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
  
  successIcon: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(0, 255, 136, 0.1)',
    border: '2px solid #00ff88',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    animation: 'pulse 2s infinite',
    backdropFilter: 'blur(10px)'
  },
  
  pulseRing1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    border: '2px solid rgba(0, 255, 136, 0.3)',
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
    border: '2px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '50%',
    animation: 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
    animationDelay: '0.3s'
  },
  
  pulseRing3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    border: '2px solid rgba(138, 43, 226, 0.3)',
    borderRadius: '50%',
    animation: 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
    animationDelay: '0.6s'
  },
  
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88 0%, #ff6b9d 50%, #ffd700 100%)',
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
    animation: 'sparkle 2s ease-in-out infinite',
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
    color: '#00ff88',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },
  
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.8rem',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '50px',
    padding: '0.8rem 1.5rem',
    fontSize: '0.95rem',
    color: '#00ff88',
    fontWeight: '600',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)'
  },
  
  statusDot: {
    width: '8px',
    height: '8px',
    background: '#00ff88',
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite'
  },
  
  countdownContainer: {
    marginTop: '2rem'
  },
  
  countdownCircle: {
    width: '80px',
    height: '80px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '3px solid #00ff88',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    animation: 'pulse 1s infinite',
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  },
  
  countdownNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#00ff88'
  },
  
  countdownText: {
    color: '#a0a0a0',
    fontSize: '0.95rem',
    fontWeight: '400'
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
    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.3) 50%, transparent 100%)',
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

export default Success;