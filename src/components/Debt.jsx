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
        <p>At its core, investing involves committing your money to assets with the expectation of generating income or appreciation over time.</p>
        
        <h2>Types of Investments</h2>
        <ul>
          <li><strong>Stocks (Equities):</strong> Partial ownership in a company with potential for high returns but increased volatility.</li>
          <li><strong>Bonds:</strong> Debt securities offering periodic interest payments, typically lower risk than stocks.</li>
          <li><strong>Mutual Funds & ETFs:</strong> Pooled investments for diversification and risk management.</li>
          <li><strong>Real Estate:</strong> Investing in property for rental income or appreciation.</li>
        </ul>
        
        <h2>How to Get Started</h2>
        <ul>
          <li>Define financial goals (e.g., retirement, buying a home).</li>
          <li>Assess risk tolerance and align investments accordingly.</li>
          <li>Educate yourself through books, courses, and market research.</li>
          <li>Start small and invest consistently over time.</li>
        </ul>
        
        <h2>Risk Management</h2>
        <ul>
          <li><strong>Diversification:</strong> Spread investments across different asset classes.</li>
          <li><strong>Asset Allocation:</strong> Balance risk by adjusting your investment mix.</li>
          <li><strong>Regular Portfolio Reviews:</strong> Adjust investments based on market conditions and personal goals.</li>
        </ul>
      </div>
      
      <div className="course-buttons">
        <button className="prev-button" onClick={prevCourse}>Previous: Saving</button>
        <button className="quiz-button">Take Quiz</button>
        <button className="next-button" onClick={nextCourse}>Next: Debt Management</button>
      </div>
    </div>
  );
};

export default Investing;
