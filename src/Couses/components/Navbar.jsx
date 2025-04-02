import React, { useState } from "react";
import "../styles/Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate hook

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
                <Link to="/Dashbo" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>She Leads Finance</Link>
            </div>

            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                <Link to="/Dashbo" className="navbar-item">Dashboard</Link>
                <Link to="/adminContact" className="navbar-item">Contact us</Link>
                
            </div>

           
           
        </nav>
    );
}

export default Navbar;