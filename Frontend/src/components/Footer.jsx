import React from 'react';

function Footer() {
  return (
    <div className="footer-overall">
      {/* Social Icons Section */}
      <div className="footer-icons">
        <a href="#" className="social-icon" aria-label="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="#" className="social-icon" aria-label="Twitter">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="#" className="social-icon" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="#" className="social-icon" aria-label="YouTube">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="#" className="social-icon" aria-label="Discord">
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>
      
      {/* Divider */}
      <div className="footer-divider"></div>
      
      {/* Footer Content */}
      <div className="footer-center footer-content">
        <p className="copyright">© {new Date().getFullYear()} Stay Master. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

// Enhanced CSS with better responsiveness and UI improvements
const styles = `
.footer-overall {
  display: flex;
  flex-direction: column;
  color: #e6dcdc;
  padding: 0.8rem 1rem 0.6rem;
  background-color: #4d4e49;
  width: 100%;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
}

.footer-overall::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(230, 220, 220, 0.3), transparent);
}

.footer-icons {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(230, 220, 220, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: #e6dcdc;
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.social-icon:hover::before {
  left: 100%;
}

.social-icon:hover {
  transform: translateY(-3px);
  background: rgba(0, 123, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  color: #007bff;
}

.social-icon i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  z-index: 1;
}

.social-icon:hover i {
  transform: scale(1.1);
}

.footer-divider {
  width: 50%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(230, 220, 220, 0.3), transparent);
  margin: 0 auto;
}

.footer-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Removed footer-links styles as they're no longer needed */

.copyright {
  font-size: 0.61rem;
  font-weight: 256;
  margin: 0;
  opacity: 0.7;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-align: center;
}

/* Enhanced Responsive Design */
@media only screen and (max-width: 768px) {
  .footer-overall {
    padding: 0.85rem 1rem 0.68rem;
    gap: 0.75rem;
  }
  
  .footer-content {
    flex-direction: column;
    justify-content: center;
    gap: 0;
    text-align: center;
  }
  
  .copyright {
    font-size: 0.69rem;
    white-space: normal;
    text-align: center;
  }
  
  .footer-divider {
    width: 70%;
  }
}

@media only screen and (max-width: 480px) {
  .footer-overall {
    padding: 0.9rem 0.75rem 0.6rem;
    gap: 0.6rem;
  }
  
  .footer-icons {
    gap: 1rem;
  }
  
  .social-icon {
    width: 36px;
    height: 36px;
  }
  
  .social-icon i {
    font-size: 1rem;
  }
  
  .copyright {
    font-size: 0.75rem;
    line-height: 1.4;
  }
  
  .footer-divider {
    width: 80%;
  }
}

@media only screen and (max-width: 320px) {
  .footer-overall {
    padding: 0.8rem 0.5rem 0.5rem;
    gap: 0.5rem;
  }
  
  .footer-icons {
    gap: 0.8rem;
  }
  
  .social-icon {
    width: 34px;
    height: 34px;
  }
  
  .social-icon i {
    font-size: 0.95rem;
  }
  
  .copyright {
    font-size: 0.7rem;
  }
  
  .footer-divider {
    width: 85%;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .social-icon,
  .footer-links a,
  .social-icon::before {
    transition: none;
  }
  
  .social-icon:hover {
    transform: none;
  }
  
  .footer-links a:hover {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .footer-overall {
    border-top: 2px solid #e6dcdc;
  }
  
  .social-icon {
    border: 1px solid #e6dcdc;
  }
  
  .footer-links a::after {
    height: 3px;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// return <Footer />;