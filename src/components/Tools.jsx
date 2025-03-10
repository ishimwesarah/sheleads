import React from 'react';
import '../styles/tools.css';
import everyDollarImg from '../assets/every dolar.jpg';
import goodBudgetImg from '../assets/good budget.png';
import quickenImg from '../assets/Quicken simplifi.png';
import sofiImg from '../assets/sofi.png';
import ynabImg from '../assets/YNAB.png';

const BudgetingTools = () => {
    const tools = [
        {
            image: everyDollarImg,
            title: 'EveryDollar',
            description: 'A simple budgeting app based on the zero-based budgeting method.',
            link: 'https://www.ramseysolutions.com/ramseyplus/everydollar'
        },
        {
            image: goodBudgetImg,
            title: 'GoodBudget',
            description: 'An envelope budgeting system to help you plan expenses ahead of time.',
            link: 'https://www.goodbudget.com/'
        },
        {
            image: quickenImg,
            title: 'Quicken Simplifi',
            description: 'A powerful budgeting and financial tracking tool with real-time insights.',
            link: 'https://www.simplifimoney.com/'
        },
        {
            image: sofiImg,
            title: 'SoFi',
            description: 'A budgeting and investing app that helps you manage your entire financial life.',
            link: 'https://www.sofi.com/money/'
        },
        {
            image: ynabImg,
            title: 'You Need A Budget (YNAB)',
            description: 'A proactive budgeting tool that helps you give every dollar a job.',
            link: 'https://www.youneedabudget.com/'
        },
    ];

    return (
        <section className="budgeting-tools">
            <h2>Best Budgeting Tools</h2>
            <p>Take control of your money with these top budgeting tools designed to help you manage your finances effectively.</p>
            <div className="tools-container">
                {tools.map((tool, index) => (
                    <div key={index} className="tool-card">
                        <img src={tool.image} alt={tool.title} />
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="tool-button">
                            Learn More
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BudgetingTools;
