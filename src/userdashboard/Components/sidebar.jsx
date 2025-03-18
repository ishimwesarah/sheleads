import React, { useState, useEffect } from "react";
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
          <li><a href="/Dashbo">Dashboard</a></li>
          <li><a href="/community">Community</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/progre">Progress Tracker</a></li>
          <li><a href="https://calendly.com/sarahishimwe-va/she-leads-finances-mentorship">Book a Mentor</a></li>
          
        </ul>
        <button className="slf-logout-btn" ><a href="/Home">Logout</a></button>
      </nav>
    </aside>
  );
};

export default Sidebar;
