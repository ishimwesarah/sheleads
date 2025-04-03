// Navbar.jsx - No changes needed here based on the CSS logic
import React, { useState } from "react";
import "../styles/Navbar.css"; // Make sure this points to the CSS file
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Keep if needed, but not used in snippet

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Removed handleSearch as search bar isn't in JSX

    return (
        <nav className="navbar">
            {/* Toggle button is always rendered, CSS handles visibility */}
            <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
                {menuOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </button>

            <div className="navbar-brand">
                {/* Using Link directly */}
                <Link to="/">
                    She Leads Finance
                </Link>
            </div>

            {/* Menu container - always rendered, JS toggles 'active' class */}
            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                {/* Add onClick={toggleMenu} to links if you want menu to close on nav */}
                <Link to="/" className="navbar-item" onClick={toggleMenu}>Home</Link>
                <Link to="/mentorship" className="navbar-item" onClick={toggleMenu}>Mentorship</Link>
                <Link to="/contact" className="navbar-item" onClick={toggleMenu}>Contact us</Link>
                <Link to="/Success" className="navbar-item" onClick={toggleMenu}>Blogs</Link>
                <Link to="/join" className="navbar-item" onClick={toggleMenu}>Join Us</Link>
            </div>
        </nav>
    );
}

export default Navbar;