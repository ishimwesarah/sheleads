import React, { useState } from "react";
import "../styles/Usercontact.css";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const UserContactUs = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatusMessage("Error sending message. Please try again later.");
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Your Message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="cta-button">
            Send Message
          </button>
        </form>

        {/* Display status message */}
        {statusMessage && <p>{statusMessage}</p>}
      </section>

    
    
      
    </div>
  );
};

export default UserContactUs;
