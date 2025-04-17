import React from "react";
import { Link } from "react-router-dom";
import "../styles/mentor.css"; // Make sure this CSS file exists and is used

// Assuming image paths are correct
import heroMentorshipImage from '../assets/ment.jpg';
import testimonialImage1 from '../assets/wo2.jpg';
import testimonialImage2 from '../assets/wo4.jpg';

const Mentorship = () => {
  return (
    // Unique container class for this page
    <div className="mentorship-page-container">

      {/* Hero Section */}
      <header className="mentorship-hero mentorship-section"> {/* Added section class */}
        <div className="mentorship-hero-content">
          <h1>Empower Your Future with Mentorship</h1>
          <p>
            Every successful entrepreneur had a mentor guiding them. You don’t have to navigate business and finance alone—we’re here to help you grow, step by step.
          </p>
          {/* Apply btn classes directly to Link for consistent styling */}
          {/* Target external link specifically if needed */}
          <a
            href="https://calendly.com/sarahishimwe-va/she-leads-finances-mentorship"
            className="btn btn-primary btn-large" // Added btn-large for emphasis
            target="_blank" // Open external links in new tab
            rel="noopener noreferrer" // Security for target="_blank"
            style={{ textDecoration: 'none', color: "inherit" }} // Inline styles might be overridden by .btn, ensure color works
          >
            Schedule a Discovery Call
          </a>
        </div>
        <div className="mentorship-hero-image-container">
           <img
              src={heroMentorshipImage}
              className="mentorship-hero-image"
              alt="Supportive mentor guiding a mentee" // Descriptive alt text
              loading="lazy"
            />
        </div>
      </header>

      {/* Why Mentorship Matters Section */}
      <section className="mentorship-why mentorship-section">
        <h2 className="mentorship-section-title">Why Mentorship Matters</h2>
        <p className="mentorship-section-subtitle"> {/* Added subtitle class */}
          Many women step into business with passion but without the right financial knowledge. This often leads to frustration and setbacks. Our mentorship program provides you with structured guidance, industry insights, and the confidence to make informed decisions.
        </p>
        {/* Optional: Add an image or illustration here if desired */}
      </section>

      {/* Key Features Section */}
      <section className="mentorship-features mentorship-section">
        <h2 className="mentorship-section-title">What’s Included in the Program?</h2>
        <div className="mentorship-feature-cards-grid"> {/* Changed class */}
          {/* Individual Feature Cards */}
          <div className="mentorship-card"> {/* Replaced cardy */}
            {/* Optional: Add icons here */}
            <h3>Personalized Coaching</h3>
            <p>One-on-one guidance tailored to your specific business challenges and financial goals.</p>
          </div>
          <div className="mentorship-card">
            <h3>Expert-Led Workshops</h3>
            <p>Gain actionable insights from industry leaders on essential business strategies and financial planning.</p>
          </div>
          <div className="mentorship-card">
            <h3>Community & Networking</h3>
            <p>Connect with a vibrant community of like-minded entrepreneurs for support and collaboration.</p>
          </div>
          <div className="mentorship-card">
            <h3>Exclusive Resources</h3>
            <p>Access a library of tools, templates, and financial literacy guides designed to support your growth.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mentorship-testimonials mentorship-section">
        <h2 className="mentorship-section-title">Success Stories</h2>
        <div className="mentorship-testimonials-container"> {/* Wrapper for testimonials */}
          <div className="mentorship-testimonial">
            <img src={testimonialImage1} alt="Happy Mentee Portrait" className="mentorship-testimonial-img" loading="lazy" />
            <div className="mentorship-testimonial-content">
                <blockquote>
                "Before joining, I struggled with pricing and budgeting. Now, I confidently manage my business finances and see consistent growth!"
                </blockquote>
                <cite>- A Thriving Entrepreneur</cite> {/* Use cite for attribution */}
            </div>
          </div>
          <div className="mentorship-testimonial">
            <img src={testimonialImage2} alt="Successful Business Owner Portrait" className="mentorship-testimonial-img" loading="lazy" />
             <div className="mentorship-testimonial-content">
                <blockquote>
                "This mentorship gave me clarity and direction. I now have a solid financial plan and a support system that keeps me accountable."
                </blockquote>
                <cite>- A Growing Business Owner</cite>
            </div>
          </div>
           {/* Add more testimonials as needed */}
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="mentorship-cta mentorship-section text-center"> {/* Added text-center utility */}
        <h2 className="mentorship-section-title">Take the Next Step Towards Success</h2>
        <p className="mentorship-section-subtitle">
          Your success story starts today. Join a community of driven women building financial confidence and achieving their business goals.
        </p>
        {/* Ensure this link goes to the correct internal page */}
        <Link to="/Join" className="btn btn-primary btn-large">
          Join the Program
        </Link>
      </section>

        {/* Optional: Footer (reuse from Home page or create a shared component) */}
        {/* <footer className="footer"> ... </footer> */}

    </div>
  );
};

export default Mentorship;