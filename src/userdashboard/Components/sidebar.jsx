import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/dash.css";

// Receive isOpen and onClose props
const Sidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({ name: "Loading...", profilePic: "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif" });
  const navigate = useNavigate(); // Hook for navigation

  // --- Keep your useEffect for fetching/updating user data ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser({
      name: storedUser.name || "User", // Provide a simple default
      profilePic: storedUser.profilePic || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif",
    });

    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("profilePic");

    // Close sidebar if open
    if (onClose) {
      onClose();
    }
    // Redirect to Home page
    navigate("/Home"); // Use navigate for programmatic navigation
     // Optionally reload the window to ensure clean state
     // window.location.reload();
  };


  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    // Apply 'slf-sidebar-open' class conditionally based on isOpen prop
    <aside className={`slf-dashboard-sidebar ${isOpen ? 'slf-sidebar-open' : ''}`}>
      <div className="slf-sidebar-profile">
        <img
          src={user.profilePic}
          alt="Profile"
          className="slf-profile-pic-sidebar"
        />
        <h3>{user.name}</h3>
      </div>
      <nav className="slf-sidebar-links">
        <ul>
          {/* Add onClick={handleLinkClick} to close menu on navigation */}
          <li><Link to="/Dashbo" onClick={handleLinkClick}>Dashboard</Link></li>
          <li><Link to="/community" onClick={handleLinkClick}>Community</Link></li>
          <li><Link to="/UserContact" onClick={handleLinkClick}>Contact</Link></li>
          <li><Link to="/bookMentor" onClick={handleLinkClick}>Book a Mentor</Link></li>
           {/* Add Resources link for mobile menu */}
           <li className="slf-mobile-resource-link"><Link to="#" onClick={() => { /* Logic to open modal? Needs coordination */ handleLinkClick(); }}>Resources</Link></li>
        </ul>
        {/* Use the handleLogout function */}
        <button className="slf-logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;

// Add CSS for the mobile-only resource link if needed
/*
.slf-mobile-resource-link { display: none; }
@media (max-width: 992px) {
  .slf-mobile-resource-link { display: block; }
}
*/