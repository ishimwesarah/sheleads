import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/finance.css';
import image from '../images/budget.jpg';
import image1 from '../images/invest.jpg';
import image2 from '../images/save.jpg';
import image3 from '../images/debt.jpg';

const CourseCard = ({ image, title, description, buttonText, path }) => {
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link to={path}>
                <button>{buttonText}</button>
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
        <section className="courses">
            <h2>Welcome to the course</h2>
            <div className="course-cards">
                <div className="row">
                    {coursesData.slice(0, 2).map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
                <div className="row">
                    {coursesData.slice(2, 4).map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
