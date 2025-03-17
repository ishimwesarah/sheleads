import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="sheleads-footer">
      <div className="sheleads-footer-container">
        <div className="sheleads-footer-section sheleads-contact-us">
          <h3>Contact Us</h3>
          <p className="sheleads-footer-address">She Leads Finance</p>
          <p className="sheleads-footer-address">Kigali, Rwanda 00000</p>
          <p className="sheleads-footer-email">Email: <a href="mailto:hello@sheleadsfinance.com">hello@sheleadsfinance.com</a></p>
          <p className="sheleads-footer-phone">Phone: <a href="tel:+250780000000">+250 78 000 0000</a></p>
        </div>

        <div className="sheleads-vertical-line"></div>

        <div className="sheleads-footer-section sheleads-stay-connected">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter for financial tips and updates</p>
          <div className="sheleads-subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </div>
          <div className="sheleads-social-icons">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="sheleads-footer-bottom">
        <p className="sheleads-copyright">© 2025 She Leads Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
