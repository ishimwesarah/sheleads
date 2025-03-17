import React from "react";
import "../Styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBookOpen, FiMessageSquare, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-item">
          <FiHome className="icon" /> Overview
        </NavLink>
        <NavLink to="/Userpage" className="sidebar-item">
          <FiUsers className="icon" /> Users
        </NavLink>
        <NavLink to="/CoPage" className="sidebar-item">
          <FiBookOpen className="icon" /> Courses
        </NavLink>
        <NavLink to="/AdminComm" className="sidebar-item">
          <FiMessageSquare className="icon" /> Community
        </NavLink>
        <NavLink to="/AdminSettings" className="sidebar-item">
          <FiSettings className="icon" /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
