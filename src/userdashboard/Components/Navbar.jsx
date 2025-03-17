import React, { useState } from "react";
import "../styles/dash.css";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <header className="slf-navbar">
      <div className="slf-navbar-logo">She Leads Finance</div>
      <button onClick={toggleModal} className="slf-resources-btn">
        Resources
      </button>

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
    </header>
  );
};

export default Navbar;
