import React from 'react';
import '../index.css';

function Footer() {
  return (
    <div className='footer-overall'>
      <div className='footer-icons'>
      <i class="fa-brands fa-instagram"></i>
      <i class="fa-brands fa-x-twitter"></i>
      <i class="fa-brands fa-linkedin"></i>
      <i class="fa-brands fa-youtube"></i>
      <i class="fa-brands fa-discord"></i>
      </div>
      
      
      <div className="footer-center footer-content">
      <ul className="footer-links">
          <li>
            <a href="#privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="#terms-conditions">Terms & Conditions</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <p>© {new Date().getFullYear()} Stay Master. All Rights Reserved.</p>
        
      </div>
    
    </div>
    
  );
}

export default Footer;
