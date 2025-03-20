import React from "react";
import { Link } from "react-router-dom";
// import "./CourseStyles.css";
import savingImg1 from "../../assets/bm.jpg";
import savingImg2 from "../../assets/bm.jpg";
import savingImg3 from "../../assets/bm.jpg";

const Saving = ({ prevCourse, nextCourse }) => {
  return (
    <div className="course-container">
      <h1>Saving</h1>
      <p>Saving money is a fundamental practice that lays the groundwork for financial stability and future prosperity.</p>
      
      <div className="course-images">
        <img src={savingImg1} alt="Saving 1" className="course-img" />
        <img src={savingImg2} alt="Saving 2" className="course-img" />
        <img src={savingImg3} alt="Saving 3" className="course-img" />
      </div>
      
      <div className="course-content">
        <h2>The Importance of Saving</h2>
        <ul>
          <li><strong>Financial Security:</strong> A safety net for unexpected expenses without resorting to debt.</li>
          <li><strong>Achieving Goals:</strong> Helps fund big milestones like a home, education, or vacation.</li>
          <li><strong>Wealth Building:</strong> Long-term savings and investments lead to financial freedom.</li>
        </ul>
        
        <h2>Building an Emergency Fund</h2>
        <p>An emergency fund is crucial for handling unexpected events like job loss or medical emergencies.</p>
        
        <h2>Saving for Big Goals</h2>
        <p>Define clear financial goals, create separate savings accounts, and set achievable timelines.</p>
        
        <h2>Saving Strategies</h2>
        <p>Automate savings, reduce unnecessary expenses, and utilize windfalls wisely to maximize savings.</p>
      </div>
      
      <div className="course-buttons">
        <button className="next-button" ><Link to="/Budget" style={{ textDecoration: 'none',color:"inherit"}}>Previous: Budgeting</Link></button>
        <button className="quiz-button">Take Quiz</button>
        <button className="next-button" ><Link to="/Investing" style={{ textDecoration: 'none',color:"inherit"}} >Next: Investing</Link></button>
      </div>
    </div>
  );
};

export default Saving;
