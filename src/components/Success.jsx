import React from 'react';
import '../styles/success.css';
import success1 from '../assets/wo1.jpg';
import success2 from '../assets/wo2.jpg';
import success3 from '../assets/wo3.jpg';

const SuccessStories = () => {
    const stories = [
        {
            image: success1,
            name: 'Sarah M.',
            before: 'Struggled with budgeting, had no savings.',
            after: 'Now saves $500/month and invests regularly.',
            quote: 'She Leads Finance changed my financial future!'
        },
        {
            image: success2,
            name: 'Lisa K.',
            before: 'Had no business plan, struggled to attract clients.',
            after: 'Built a profitable online store with steady customers.',
            quote: 'I finally understand business finances!'
        },
        {
            image: success3,
            name: 'Jessica R.',
            before: 'Drowning in debt and unsure how to manage money.',
            after: 'Cleared $10,000 in debt and created a stable budget.',
            quote: 'I feel in control of my money for the first time!'
        }
    ];

    return (
        <section className="success-stories">
            <h2>Success Stories</h2>
            <p>Read real stories from women who transformed their financial and business lives with She Leads Finance.</p>
            <div className="stories-container">
                {stories.map((story, index) => (
                    <div className="story-card" key={index}>
                        <img src={story.image} alt={story.name} className="story-image" />
                        <h3>{story.name}</h3>
                        <p><strong>Before:</strong> {story.before}</p>
                        <p><strong>After:</strong> {story.after}</p>
                        <blockquote>“{story.quote}”</blockquote>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuccessStories;