import React, { useState } from "react";
import "../styles/Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSearch = () => {
        const searchTerm = document.getElementById("searchInput").value;

        if (searchTerm) {
            navigate(`/search?query=${searchTerm}`);
        } else {
            alert("Please enter a search term.");
        }
    };

    return (
        <nav className="navbar">
            <button className="navbar-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </button>

            <div className="navbar-brand">
                <a href="/" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>She Leads Finance</a>
            </div>

            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                <a href="/" className="navbar-item">Home</a>
                <a href="/mentorship" className="navbar-item">Mentorship</a>
                <a href="/contact" className="navbar-item">Contact us</a>
                <a href="/Join" className="navbar-item">Join Us</a>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search..." id="searchInput" />
                <button onClick={handleSearch}>🔍</button>
            </div>

            
            
        </nav>
    );
}

export default Navbar;