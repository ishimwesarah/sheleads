import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "Loading...", profilePic: "" });

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser({
      name: storedUser.name || "Loading...",
      profilePic: storedUser.profilePic || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif",
    });

    // Listen for profile updates from ProfilePage
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []); // ✅ Only one useEffect hook

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
          <li><Link to="https://calendly.com/sarahishimwe-va/she-leads-finances-mentorship">Book a Mentor</Link></li>
        </ul>
        <button className="slf-logout-btn"><Link to="/Home">Logout</Link></button>
      </nav>
    </aside>
  );
};

export default Sidebar;
