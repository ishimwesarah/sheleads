import React, { useState } from "react";
import "../Styles/Navbar.css";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="app-navbar">
      <div className="app-search-bar">
        <FiSearch className="app-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="app-navbar-icons">
        
        <button className="app-icon" onClick={toggleLogout}>Logout</button> 
      </div>

      {/* ✅ Logout Modal */}
      {showLogout && (
        <div className="logout-modal" onClick={() => setShowLogout(false)}>
          <div className="logout-box" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to logout?</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="cancel-btn" onClick={() => setShowLogout(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
