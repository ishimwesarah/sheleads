import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Keep the CSS import

// Import images (assuming paths are correct)
import image1 from "../assets/mimi.jpg";
import image2 from "../assets/wom.jpg";
import image3 from "../assets/fina.jpeg";
import image4 from "../assets/bm.jpg";
import image5 from "../assets/Budg.jpg";
import image6 from "../assets/comm.jpg";
import succ from "../assets/wo1.jpg";
import succ1 from "../assets/wo2.jpg";
import succ2 from "../assets/wo3.jpg";
import succ3 from "../assets/wo4.jpg";

// Feature/Success Card Component (Slightly modified class name for consistency)
const InfoCard = ({ image, title, descriptionItems }) => {
    return (
        <div className="info-card"> {/* Changed class name */}
            <div className="info-card-image">
                <img src={image} alt={title} loading="lazy" /> {/* Added loading="lazy" */}
            </div>
            <div className="info-card-content"> {/* Added content wrapper */}
                <h3>{title}</h3>
                <ul>
                    {descriptionItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


function Home() {

    const featuresData = [
        { image: image3, title: 'Financial Education', descriptionItems: ['Interactive modules on budgeting, saving, investing, and debt management', 'Quizzes to reinforce learning',] },
        { image: image4, title: 'Business Management Tips & Resources', descriptionItems: ['Step-by-step startup guides', 'Marketing strategies and legal/financial advice',] },
        { image: image5, title: 'Budgeting & Tracking Tools', descriptionItems: ['Create personalized budgets', 'Track expenses and set financial goals',] },
        { image: image6, title: 'Mentorship & Community', descriptionItems: ['Connect with experienced women entrepreneurs', 'Share experiences and build a supportive network',] },
    ];

    const successData = [
        { image: succ, title: 'Sumaya Ahiyo', descriptionItems: ['"From struggling to know what\'s best for my business to growing it to a new level, I\'ve learned so much from the community and resources."'] },
        { image: succ1, title: 'Mukasa Muka', descriptionItems: ['"I didn\'t know how to start, but with the help here, I launched my business and have seen real growth."'] },
        { image: succ2, title: 'Chineke Diana', descriptionItems: ['"Managing finances was always a challenge. Now, I feel in control and my business is thriving."'] },
        { image: succ3, title: 'Munyana Butera', descriptionItems: ['"Joining this community was a turning point. My business has reached new heights, and my financial management is solid."'] },
    ];

    return (
        <div className='landing-home'> {/* Changed main container class */}
            {/* Optional Top Bar */}
            <div className='top-bar'>
                <p>Empower Her Wealth: Smart Finance & Business for Women</p>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Take Control of Your Financial Future</h1> {/* More impactful H1 */}
                    <p>
                        Helping women build confidence, grow wealth, and lead with financial
                        freedom. Access expert finance tips, business insights, and a
                        supportive community designed for your success.
                    </p>
                    <div className="hero-buttons">
                        {/* Use more descriptive button text if possible */}
                        <Link to="/Join" className="btn btn-primary">Start Learning</Link>
                        <Link to="/Join" className="btn btn-secondary">Join the Community</Link>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img
                        src={image1}
                        alt="Confident woman managing finances" // More descriptive alt text
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="success-stories-section section-padding">
                <h2 className="section-title">Inspiring Journeys to Success</h2>
                <p className="section-subtitle">Hear from women who transformed their finances and businesses.</p>
                <div className="info-cards-container">
                    {successData.map((story, index) => (
                        <InfoCard key={`success-${index}`} {...story} />
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-section section-padding">
                <div className="about-content">
                    <h2 className="section-title">About Us</h2>
                    <p>
                        This platform is dedicated to empowering women through financial
                        literacy and business education. Many women start their business
                        ventures without the necessary knowledge, often leading to avoidable
                        setbacks.
                    </p>
                    <p>
                        By providing the right tools, resources, and a supportive network, we aim to equip
                        women with the confidence and expertise to succeed in the business
                        world and take control of their financial futures.
                    </p>
                    {/* Optional: Add another CTA button here */}
                     <Link to="/about" className="btn btn-outline">Learn More About Our Mission</Link> {/* Example */}
                </div>
                <div className="about-image-container">
                    <img
                        src={image2}
                        alt="Diverse group of women collaborating" // More descriptive alt text
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Key Features Section */}
            <section className="features-section section-padding">
                <h2 className="section-title">What We Offer</h2>
                <p className="section-subtitle">Tools and resources designed for your growth.</p>
                <div className="info-cards-container">
                    {featuresData.map((feature, index) => (
                        <InfoCard key={`feature-${index}`} {...feature} />
                    ))}
                </div>
            </section>

            {/* Final Call to Action (CTA) Section */}
            <section className="cta-section section-padding text-center">
                 <h2 className="section-title">Ready to Start Your Journey?</h2>
                 <p className="section-subtitle">Join hundreds of women on the path to financial freedom and business success.</p>
                 <Link to='/Join' className="btn btn-primary btn-large">Join the Community Today</Link>
            </section>

            {/* Optional Footer Section */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} Empower Her Wealth. All rights reserved.</p>
                {/* Add links to privacy policy, terms, social media etc. */}
            </footer>
        </div>
    );
}

export default Home;