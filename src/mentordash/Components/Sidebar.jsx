import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>Mentor Panel</h2>
      <ul>
        <li><Link to="/mentordash">Dashboard</Link></li>
        <li><Link to="/mentorpro">My Profile</Link></li>
        <li><Link to="/mentees">Mentees</Link></li>
        <li><Link to="/mentor/sessions">Sessions</Link></li>
        <li><Link to="/mentor/messages">Messages</Link></li>
        <li><Link to="/mentor/resources">Resources</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
