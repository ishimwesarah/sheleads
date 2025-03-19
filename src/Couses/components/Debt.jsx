import React from "react";
// import "./CourseStyles.css";
import investingImg1 from "../../assets/bm.jpg";
import investingImg2 from "../../assets/bm.jpg";
import investingImg3 from "../../assets/bm.jpg";

const Debt = ({ prevCourse, nextCourse }) => {
  return (
    <div className="course-container">
      <h1>Debt Management</h1>
      <p>Effective debt management is essential for maintaining financial health and achieving long-term financial goals.
         By understanding different types of debt, implementing strategic repayment methods, and adopting habits to prevent new debt, you can take control of your financial future.</p>
      
      <div className="course-images">
        <img src={investingImg1} alt="Investing 1" className="course-img" />
        <h2>Understanding Different Types of Debt</h2>
        <p>Debt can be categorized based on its characteristics and purpose:</p>
        <ol>
          <li><strong>Credit Card Debt</strong><br/>
This is unsecured, revolving debt that allows consumers to borrow up to a certain limit and repay over time. Credit card debt often carries high-interest rates, making it crucial to manage responsibly. citeturn0search0
</li>
          <li><strong>Student Loans</strong><br/>
          These are typically unsecured, installment debts used to finance education. They can come from federal or private lenders and usually have lower interest rates compared to credit cards. citeturn0search0</li>
        <li><strong>Mortgages</strong><br/>
        Mortgages are secured, installment debts used to purchase real estate, with the property serving as collateral. They generally have lower interest rates due to their secured nature. citeturn0search0
        </li>
        </ol>
        <img src={investingImg2} alt="Investing 2" className="course-img" />
        <h2>Debt Repayment Strategies</h2>
        <img src={investingImg3} alt="Investing 3" className="course-img" />
      </div>
      
     
        
      
      <div className="course-buttons">
        <button className="next-button"><a href="/Investing"  style={{ textDecoration: 'none',color:"inherit"}} >Previous: Investing</a></button>
        <button className="quiz-button">Take Quiz</button>
       
      </div>
    </div>
  );
};

export default Debt;
