import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";

const DashboardView = () => {
  const [user] = useState({
    goalsProgress: 50,
  });

  return (
    <div className="slf-dashboard-wrapper">
     
      <div className="slf-main-content">
        
        <section className="slf-dashboard-body">
          <section className="slf-financial-tools">
            <h2 className="slf-section-title">Your Financial Tools</h2>
            <div className="slf-tools-links">
              <Link to="/everydollar">EveryDollar</Link>
              <Link to="/goodbudget">GoodBudget</Link>
              <Link to="/ynab">YNAB</Link>
            </div>
          </section>

          <section className="slf-business-insights">
            <h2 className="slf-section-title">Your Business Insights</h2>
            <p>Latest tips on business management and growth...</p>
          </section>

          <section className="slf-progress-tracker">
            <h2 className="slf-section-title">Your Progress</h2>
            <div className="slf-progress-bar">
              <div className="slf-progress" style={{ width: `${user.goalsProgress}%` }}></div>
            </div>
            <p>{user.goalsProgress}% to your goal!</p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
