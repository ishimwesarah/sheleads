import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/progress.css";

const ProgressTracker = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/progress/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          });
          setUserProgress(res.data);
        } catch (error) {
          console.log("Error fetching progress:", error);
        }
      };
      fetchProgress();
    }
  }, [user]);

  return (
    <div className="progress-tracker">
      <h1>Your Financial Journey</h1>
      {userProgress ? (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <p>Financial Education Progress</p>
            <div className="progress-bar-fill" style={{ width: `${userProgress.educationProgress}%` }}></div>
          </div>

          {/* Milestones */}
          <div className="milestone-cards">
            {userProgress.milestones.map((milestone, index) => (
              <div key={index} className="milestone-card">
                <h3>{milestone.name}</h3>
                <p>Completed on {milestone.date}</p>
              </div>
            ))}
          </div>

          {/* Goals Tracker */}
          <div className="goals-tracker">
            <h2>Your Financial Goals</h2>
            {userProgress.goals.map((goal, index) => (
              <div key={index} className="goal">
                <p>{goal.name}: ${goal.targetAmount}</p>
                <div className="goal-progress">
                  <div
                    className="goal-progress-bar"
                    style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div className="feedback">
            <h2>Keep Going!</h2>
            <p>{userProgress.feedback}</p>
          </div>

          {/* CTA */}
          <div className="cta">
            <button onClick={() => window.location.href = "/next-steps"}>Continue Your Journey</button>
          </div>
        </>
      ) : (
        <p>Loading your progress...</p>
      )}
    </div>
  );
};

export default ProgressTracker;
