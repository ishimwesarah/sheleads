import React from "react";
// import "./CourseStyles.css";
import investingImg1 from "../assets/bm.jpg";
import investingImg2 from "../assets/bm.jpg";
import investingImg3 from "../assets/bm.jpg";

const Investing = ({ prevCourse, nextCourse }) => {
  return (
    <div className="course-container">
      <h1>Investing</h1>
      <p>Investing is a powerful strategy for building wealth and achieving financial goals over time.</p>
      
      <div className="course-images">
        <img src={investingImg1} alt="Investing 1" className="course-img" />
        <img src={investingImg2} alt="Investing 2" className="course-img" />
        <img src={investingImg3} alt="Investing 3" className="course-img" />
      </div>
      
      <div className="course-content">
        <h2>Understanding Investing</h2>
        <p>Investing involves committing money to assets that generate income or appreciate over time.</p>
        
        <h2>Types of Investments</h2>
        <ul>
          <li><strong>Stocks:</strong> Ownership in a company with potential for high returns.</li>
          <li><strong>Bonds:</strong> Debt securities offering fixed interest payments.</li>
          <li><strong>Mutual Funds & ETFs:</strong> Diversified investment portfolios for risk management.</li>
          <li><strong>Real Estate:</strong> Properties for rental income or appreciation.</li>
        </ul>
        
        <h2>How to Get Started</h2>
        <p>Define financial goals, assess risk tolerance, educate yourself, and start small.</p>
        
        <h2>Risk Management</h2>
        <p>Manage investment risks through diversification, asset allocation, and regular portfolio reviews.</p>
      </div>
      
      <div className="course-buttons">
        <button className="next-button" ><a href="/Saving" style={{ textDecoration: 'none',color:"inherit"}} >Previous: Saving</a></button>
        <button className="quiz-button">Take Quiz</button>
        <button className="next-button" ><a href="/Debt" style={{ textDecoration: 'none',color:"inherit"}} >Next: Debt Management</a></button>
      </div>
    </div>
  );
};

export default Investing;
