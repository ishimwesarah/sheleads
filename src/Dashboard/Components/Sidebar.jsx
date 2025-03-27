import React from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiBookOpen, FiMessageSquare, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-item">
          <FiHome className="icon" /> Overview
        </Link>
        <Link to="/Userpage" className="sidebar-item">
          <FiUsers className="icon" /> Users
        </Link>
        <Link to="/CoPage" className="sidebar-item">
          <FiBookOpen className="icon" /> Courses
        </Link>
        <Link to="/AdminComm" className="sidebar-item">
          <FiMessageSquare className="icon" /> Community
        </Link>
        <Link to="/mentor" className="sidebar-item">
          <FiMessageSquare className="icon" /> Mentors
        </Link>
        <Link to="/AdminBlog" className="sidebar-item">
          <FiMessageSquare className="icon" /> Blog
        </Link>
        <Link to="/AdminSettings" className="sidebar-item">
          <FiSettings className="icon" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
