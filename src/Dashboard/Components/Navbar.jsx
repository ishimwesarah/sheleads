import React from "react";
import "../Styles/Navbar.css";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="app-navbar">
      <div className="app-search-bar">
        <FiSearch className="app-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="app-navbar-icons">
        <FiBell className="app-icon" />
        <FiUser className="app-icon" />
      </div>
    </div>
  );
};

export default Navbar;