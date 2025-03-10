import React from 'react';
import '../styles/manage.css';
import startupImg from '../assets/cover.png';
import businessPlanImg from '../assets/bm.jpg';
import marketingImg from '../assets/bm.jpg';
import financeImg from '../assets/bm.jpg';
import scalingImg from '../assets/bm.jpg';
import doc1 from '../assets/start.pdf'
import doc2 from '../assets/biz.pdf'
import doc3 from '../assets/marke.pdf'
import doc4 from '../assets/fina.pdf'

const BusinessManagement = () => {
    const resources = [
        {
            title: "Startup Guide",
            description: "Learn the steps to register your business, understand taxes, and find funding opportunities.",
            image: startupImg,
            link: doc1
        },
        {
            title: "Business Plan Template",
            description: "Download a free template to structure your business plan and set clear goals.",
            image: businessPlanImg,
            link: doc2
        },
        {
            title: "Marketing Strategies",
            description: "Discover how to market your business, build a brand, and engage with customers.",
            image: marketingImg,
            link: doc3
        },
        {
            title: "Financial Management",
            description: "Learn budgeting, cash flow management, and pricing strategies for profitability.",
            image: financeImg,
            link: doc4
        },
        {
            title: "Scaling Your Business",
            description: "Understand when and how to grow your business to reach more customers.",
            image: scalingImg,
            link: "/scaling-business"
        }
    ];

    return (
        <section className="business-management">
            <h2>Business Management Resources</h2>
            <p>Access guides, templates, and strategies to help you launch and grow your business successfully.</p>
            <div className="resource-container">
                {resources.map((resource, index) => (
                    <div key={index} className="resource-card">
                        <img src={resource.image} alt={resource.title} className="resource-image" />
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <a href={resource.link} className="resource-button">Read More</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BusinessManagement;
