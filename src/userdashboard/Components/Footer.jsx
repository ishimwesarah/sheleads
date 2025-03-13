import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="userfooter">
      <div className="footer-container">
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>She Leads Finance</p>
          <p>Kigali, Rwanda 00000</p>
          <p>Email: hello@sheleadsfinance.com</p>
          <p>Phone: +250 78 000 0000</p>
        </div>

        {/* Vertical Line */}
        <div className="vertical-line"></div>

        <div className="stay-connected">
          <h3>Stay connected</h3>
          <p>Subscribe to our newsletter for financial tips and updates</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Insert Email" required />
            <button type="submit">Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="X"><FaXTwitter /></a>
          </div>
        </div>
      </div>
      <div className="copyright">
        @sheleadsfinance. All right reserved
      </div>
    </footer>
  );
};

export default Footer;