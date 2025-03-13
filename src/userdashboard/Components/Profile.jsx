import React from "react";
import "../styles/Profile.css";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      
      <div className="profile-card">
        <img src="/path-to-profile-image.jpg" alt="Profile" className="profile-image" />
        <h3>Jane Doe</h3>
        <p>Email: jane.doe@example.com</p>
        <p>Role: Member</p>
        <button className="edit-btn">Edit Profile</button>
        <button className="password-btn">Change Password</button>
      </div>

      <div className="activity-section">
        <h3>My Courses</h3>
        <ul>
          <li>📖 Budgeting Basics</li>
          <li>📊 Smart Investing</li>
        </ul>
      </div>

      <div className="activity-section">
        <h3>Community Activity</h3>
        <ul>
          <li>💬 "Great budgeting tips!" - Posted in Finance Forum</li>
          <li>💡 "How to start saving?" - Question asked in Community</li>
        </ul>
      </div>

      <button className="logout-btn"><a href="/Home" style={{textDecoration: "none", color: "inherit"}}>Logout</a></button>
    </div>
  );
};

export default ProfilePage;
