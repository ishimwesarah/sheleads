import React from "react";
import "../styles/contact.css";
import { FaFacebook, FaLinkedinIn  } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <header className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Have questions or need guidance? We're here to help!</p>
      </header>
      
      {/* Contact Form */}
      <section className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>
      
      {/* Other Contact Details */}
      <section className="contact-info">
        <h2>Our Contact Details</h2>
        <p>Email: contact@sheleadsfinance.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Business Street, City, Country</p>
      </section>
      
      {/* Social Media Links */}
      <section className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="#" target="_blank"><FaFacebook/></a>
          <a href="#" target="_blank"><FaInstagram/></a>
          <a href="#" target="_blank"><FaLinkedinIn /></a>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
