import React, { useState } from "react";
import "../styles/dash.css";
import image from "../images/wo2.jpg";

const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <aside className="slf-dashboard-sidebar">
      <div className="slf-sidebar-profile">
        <img src={image} alt="Profile" className="slf-profile-pic-sidebar" />
        <h3>Jane Doe</h3>
      </div>
      <nav className="slf-sidebar-links">
        <ul>
          <li><a href="/Dashbo">Dashboard</a></li>
          <li onClick={toggleModal} className="slf-resources">Resources</li>
          {modalOpen && (
            <div className="slf-modal-overlay" onClick={toggleModal}>
              <div className="slf-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="slf-modal-close-btn" onClick={toggleModal}>×</span>
                <h2 className="slf-modal-title">DIVE IN</h2>
                <ul className="slf-modal-links">
                  <li><a href="/Finance">📊 Financial Education</a></li>
                  <li><a href="/Tools">📌 Budgeting Tools</a></li>
                  <li><a href="/Manage">📈 Business Management</a></li>
                  <li><a href="/Success">🏆 Success Stories</a></li>
                </ul>
              </div>
            </div>
          )}
          <li><a href="/community">Community</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/Home">Logout</a></li>
          <li><a href="/Community">Progress Tracker</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
