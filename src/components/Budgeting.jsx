import React from "react";
// import "./CourseStyles.css";
import budgetImg1 from "../assets/bm.jpg";
import budgetImg2 from "../assets/bm.jpg";
import budgetImg3 from "../assets/bm.jpg";

const Budgeting = ({ nextCourse }) => {
  return (
    <div className="course-container">
      <h1>Budgeting</h1>
      <p>Budgeting is a fundamental skill that empowers you to take control of your finances, ensuring that your spending aligns with your income and financial goals.</p>
      
      <div className="course-images">
        <img src={budgetImg1} alt="Budgeting 1" className="course-img" />
        <img src={budgetImg2} alt="Budgeting 2" className="course-img" />
        <img src={budgetImg3} alt="Budgeting 3" className="course-img" />
      </div>
      
      <div className="course-content">
        <h2>Understanding Budgeting</h2>
        <p>A budget is a financial plan that outlines your expected income and expenses over a specific period, typically a month.</p>
        
        <h2>Benefits of Budgeting</h2>
        <ul>
          <li><strong>Financial Awareness:</strong> Tracking your income and expenses provides a clear picture of your financial health.</li>
          <li><strong>Goal Achievement:</strong> Helps you prioritize and reach financial goals like saving or debt repayment.</li>
          <li><strong>Stress Reduction:</strong> Having a financial plan alleviates anxiety and brings peace of mind.</li>
        </ul>
        
        <h2>Step-by-Step Guide to Creating a Budget</h2>
        <p>Follow these steps: Calculate your income, track expenses, set financial goals, create a plan, and monitor progress.</p>
        
        <h2>Common Budgeting Mistakes</h2>
        <p>Avoid overspending, unrealistic goals, ignoring expenses, and not adjusting for life changes.</p>
      </div>
      
      <div className="course-buttons">
        <button className="quiz-button">Take Quiz</button>
        <button className="next-button" onClick={nextCourse}>Next: Saving</button>
      </div>
    </div>
  );
};

export default Budgeting;
