import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/finance.css';
import image from '../../assets/budget.jpg';
import image1 from '../../assets/invest.jpg';
import image2 from '../../assets/Save.jpg';
import image3 from '../../assets/debt.jpg';

const CourseCard = ({ image, title, description, buttonText, path }) => {
    return (
        <div className="unique-course-card">
            <div className="unique-course-image">
                <img src={image} alt={title} />
            </div>
            <h3 className="unique-course-title">{title}</h3>
            <p className="unique-course-description">{description}</p>
            <Link to={path} className="unique-course-link">
                <button className="unique-course-button">{buttonText}</button>
            </Link>
        </div>
    );
};

const Courses = () => {
    const coursesData = [
        {
            image: image,
            title: 'Budgeting: Building a Solid Foundation',
            description: 'Learn how to track, plan, and control finances...',
            buttonText: 'Start a course',
            path: '/Budget', // Path for the course
        },
        {
            image: image2,
            title: 'Saving: Creating Financial Security',
            description: 'Understand the importance of saving regularly...',
            buttonText: 'Start a course',
            path: '/Saving',
        },
        {
            image: image1,
            title: 'Investing: Growing Your Wealth',
            description: 'Learn the basics of investing...',
            buttonText: 'Start a course',
            path: '/Investing',
        },
        {
            image: image3,
            title: 'Debt Management: Gaining Control of Your Finances',
            description: 'Learn how to effectively manage and reduce debt...',
            buttonText: 'Start a course',
            path: '/Debt',
        },
    ];

    return (
        <section className="unique-courses">
            <h2 className="unique-courses-heading">Welcome to the course</h2>
            <div className="unique-course-cards">
                <div className="unique-course-row">
                    {coursesData.slice(0, 2).map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
                <div className="unique-course-row">
                    {coursesData.slice(2, 4).map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
