import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function NavBar(){
    return(
        <header className="navbar">
            {/* Logo or Brand Name */}
            <div className="navbar-logo">
                <img src="/Logo.png.png" alt="Site Logo" className="logo-img"/>
                <div className="site-title">
                    <h1>Tabya Kaur Sarao</h1>
                    <p>Portfolio</p>
                </div>
            </div>

            {/*Navigation Links */}
            <nav className="nav-links">
                <NavLink to="/" className="nav-link" end>Home</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
                <NavLink to="/projects" className="nav-link">Projects</NavLink>
                <NavLink to="/services" className="nav-link">Services</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </nav>
        </header>
    );
}