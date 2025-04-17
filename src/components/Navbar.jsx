import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="new-navbar">
            <div className="new-navbar-left">
                <div className="new-navbar-brand">
                    <Link to="/" onClick={closeMenu}>
                        She Leads Finance
                    </Link>
                </div>
            </div>

            <div className="new-navbar-toggle-container">
                <button
                    className="new-navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <FaTimes /> : <GiHamburgerMenu />}
                </button>
            </div>

            <div className={`new-navbar-menu ${menuOpen ? "active" : ""}`}>
                <Link to="/" className="new-navbar-item" onClick={closeMenu}>Home</Link>
                <Link to="/mentorship" className="new-navbar-item" onClick={closeMenu}>Mentorship</Link>
                <Link to="/contact" className="new-navbar-item" onClick={closeMenu}>Contact Us</Link>
                <Link to="/Success" className="new-navbar-item" onClick={closeMenu}>Blogs</Link>

                <div className="new-auth-links">
                    <Link to="/Join" className="new-auth-button login-btn" onClick={closeMenu}>Login</Link>
                    <Link to="/Join" className="new-auth-button register-btn" onClick={closeMenu}>Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
