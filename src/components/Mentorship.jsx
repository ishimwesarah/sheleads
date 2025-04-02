import React from "react";
import { Link } from "react-router-dom";
import "../styles/mentor.css";
import image from '../assets/ment.jpg'
import image1 from '../assets/wo2.jpg'
import image2 from '../assets/wo4.jpg'



const Mentorship = () => {
  return (
    <div className="mentorship-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Empower Your Future with Mentorship</h1>
          <p>
            Every successful entrepreneur had a mentor guiding them. You don’t have to navigate business and finance alone—we’re here to help you grow, step by step.
          </p>
          <button className="cta-button"><Link to="https://calendly.com/sarahishimwe-va/she-leads-finances-mentorship" style={{ textDecoration: 'none',color:"inherit"}}>Start Your Journey</Link></button>
        </div>
        <img src={image} className="hero-image" alt="Mentorship Illustration" />
      </header>

      {/* Why Mentorship Matters */}
      <section className="why-mentorship">
        <h2>Why Mentorship Matters</h2>
        <p>
          Many women step into business with passion but without the right financial knowledge. This often leads to frustration and setbacks. Our mentorship program provides you with structured guidance, industry insights, and the confidence to make informed decisions.
        </p>
      </section>

      {/* Key Features with Cards */}
      <section className="fatures">
        <h2>What’s Included in the Program?</h2>
        <div className="fature-cards">
          <div className="cardy">
            <h3>Personalized Coaching</h3>
            <p>One-on-one guidance tailored to your business and financial goals.</p>
          </div>
          <div className="cardy">
            <h3>Expert-Led Workshops</h3>
            <p>Gain insights from industry leaders on essential business strategies.</p>
          </div>
          <div className="cardy">
            <h3>Community & Networking</h3>
            <p>Connect with like-minded entrepreneurs and build valuable relationships.</p>
          </div>
          <div className="cardy">
            <h3>Exclusive Resources</h3>
            <p>Access tools, templates, and financial literacy guides to support your growth.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial">
          <img src=
          {image1} alt="Happy Mentee" className="testimonial-img" />
          <blockquote>
            "Before joining, I struggled with pricing and budgeting. Now, I confidently manage my business finances and see consistent growth!"
            <span>- A Thriving Entrepreneur</span>
          </blockquote>
        </div>
        <div className="testimonial">
          <img src={image2} alt="Successful Business Owner" className="testimonial-img" />
          <blockquote>
            "This mentorship gave me clarity and direction. I now have a solid financial plan and a support system that keeps me accountable."
            <span>- A Growing Business Owner</span>
          </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Take the Next Step</h2>
        <p>
          Your success story starts today. Join a community of driven women building financial confidence and business success.
        </p>
        <button className="cta-button"><Link to="/Join" style={{ textDecoration: 'none',color:"inherit"}}>Start Your Journey</Link></button>
      </section>
    </div>
  );
};

export default Mentorship;