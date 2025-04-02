import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get user ID from local storage or authentication context
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/user/getUser/${userId}`);
        const data = await response.json();

        if (data && data.profilePic) {
          setProfilePic(data.profilePic); // Set the latest profile picture
          localStorage.setItem("profilePic", data.profilePic); // Store in local storage for quick access
        } else {
          // Use Cloudinary default image if no profile picture is found
          const defaultPic = "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif";
          setProfilePic(defaultPic);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        // Use stored image as fallback
        setProfilePic(localStorage.getItem("profilePic") || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif");
      }
    };

    fetchUserProfile();

    // Re-fetch the image every 30 seconds (in case the user uploads a new one)
    const interval = setInterval(fetchUserProfile, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <header className="slf-navbar">
      <div className="slf-navbar-logo">She Leads Finance</div>

      <Link to="/profile" className="slf-profile">
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="slf-profile-pic" />
        ) : (
          "Profile"
        )}
      </Link>

      <button onClick={toggleModal} className="slf-resources-btn">
        Resources
      </button>

      {modalOpen && (
        <div className="slf-modal-overlay" onClick={toggleModal}>
          <div className="slf-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="slf-modal-close-btn" onClick={toggleModal}>×</span>
            <h2 className="slf-modal-title">DIVE IN</h2>
            <ul className="slf-modal-links">
              <li><Link to="/Finance">📊 Financial Education</Link></li>
              <li><Link to="/Tools">📌 Budgeting Tools</Link></li>
              <li><Link to="/Manage">📈 Business Management</Link></li>
              </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
