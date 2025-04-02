import React from "react";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ mentor }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page
  };
  return (
    <div className="mentnavbar">
      <h2>Welcome, {mentor?.name}</h2>
      <div className="mentnav-right">
        <img src={mentor?.profilePic || "/default-profile.png"} alt="Profile" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
  );
};

export default Navbar;
