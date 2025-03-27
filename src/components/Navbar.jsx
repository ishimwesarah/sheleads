import React, { useState } from "react";
import "../styles/Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                <Link to="/" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>
                    She Leads Finance
                </Link>
            </div>

            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/mentorship" className="navbar-item">Mentorship</Link>
                <Link to="/contact" className="navbar-item">Contact us</Link>
                <Link to="/Success" className="navbar-item">Blogs</Link>
                <Link to="/join" className="navbar-item">Join Us</Link>
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
