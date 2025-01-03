import React from 'react';
import '../index.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Freego. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="#about-us">About Us</a>
          </li>
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
      </div>
    </footer>
  );
}

export default Footer;
