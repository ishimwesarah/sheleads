import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "Loading...", profilePic: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // Listen for profile updates from ProfilePage
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  return (
    <aside className="slf-dashboard-sidebar">
      
      <div className="slf-sidebar-profile">
        <img 
          src={user.profilePic || "/default-profile.jpg"} 
          alt="Profile" 
          className="slf-profile-pic-sidebar" 
        />
        <h3>{user.name}</h3> {/* ✅ Dynamic Name Display */}
      </div>
      <nav className="slf-sidebar-links">
        <ul>
          <li><Link to="/Dashbo">Dashboard</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/progre">Progress Tracker</Link></li>
          <li><Link to="https://calendly.com/sarahishimwe-va/she-leads-finances-mentorship">Book a Mentor</Link></li>
          
        </ul>
        <button className="slf-logout-btn" ><Link to="/Home">Logout</Link></button>
      </nav>
    </aside>
  );
};

export default Sidebar;
