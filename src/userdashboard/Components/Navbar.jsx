import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";
import { FaBars } from 'react-icons/fa'; // Example using react-icons

// Receive onToggleSidebar prop from parent
const Navbar = ({ onToggleSidebar }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif"
  ); // Initialize from localStorage

  // --- Keep your useEffect for fetching profile picture ---
  useEffect(() => {
    let isMounted = true; // Flag to prevent state update on unmounted component
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // Use default if no user ID
             if (isMounted) setProfilePic("https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif");
            return;
        };

        const response = await fetch(`http://localhost:5000/user/getUser/${userId}`); // Adjust endpoint if needed
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        if (isMounted) {
            if (data && data.profilePic) {
                setProfilePic(data.profilePic);
                localStorage.setItem("profilePic", data.profilePic);
            } else {
                const defaultPic = "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif";
                setProfilePic(defaultPic);
                 // Optionally update localStorage with default if fetch failed but user exists
                // localStorage.setItem("profilePic", defaultPic);
            }
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        // Fallback to localStorage or default if fetch fails
         if (isMounted) {
            setProfilePic(localStorage.getItem("profilePic") || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif");
         }
      }
    };

    fetchUserProfile(); // Initial fetch

    // Setup interval (consider if polling is the best approach vs event-driven)
    const interval = setInterval(fetchUserProfile, 30000);

    // Cleanup function
    return () => {
        isMounted = false; // Set flag on unmount
        clearInterval(interval);
    };
  }, []); // Dependency array is empty, runs once on mount + interval cleanup

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <header className="slf-navbar">
      {/* Hamburger Button - visible only on small screens via CSS */}
      <button className="slf-navbar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar menu">
         <FaBars /> {/* Hamburger Icon */}
      </button>

      <div className="slf-navbar-logo">She Leads Finance</div>

      {/* Group profile and resources button for better alignment */}
      <div className="slf-navbar-right">
            <Link to="/profile" className="slf-profile">
                {profilePic ? (
                <img src={profilePic} alt="Profile" className="slf-profile-pic" />
                ) : (
                 // Placeholder or icon if no image
                 <span>Profile</span>
                )}
            </Link>

            {/* Original Resources Button - hidden on small screens via CSS */}
            <button onClick={toggleModal} className="slf-resources-btn">
                Resources
            </button>
      </div>


      {/* --- Keep your Modal logic --- */}
      {modalOpen && (
        <div className="slf-modal-overlay" onClick={toggleModal}>
           {/* ... modal content ... */}
           <div className="slf-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="slf-modal-close-btn" onClick={toggleModal}>×</span>
            <h2 className="slf-modal-title">DIVE IN</h2>
            <ul className="slf-modal-links">
              {/* Add onClick={toggleModal} to links if you want modal to close on navigation */}
              <li><Link to="/Finance" onClick={toggleModal}>📊 Financial Education</Link></li>
              <li><Link to="/Tools" onClick={toggleModal}>📌 Budgeting Tools</Link></li>
              <li><Link to="/Manage" onClick={toggleModal}>📈 Business Management</Link></li>
              {/* Add the Resources button functionality here for mobile */}
               <li className="slf-mobile-resource-link"><span onClick={toggleModal}>Resources (Opens Modal)</span></li>
              </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;