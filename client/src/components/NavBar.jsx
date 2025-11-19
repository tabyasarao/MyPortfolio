import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SignOut from "../pages/Signout.jsx";
import "../App.css";

export default function NavBar() {
  const user = localStorage.getItem("user"); // or your auth state
  const location = useLocation(); // to check current page

  // Disable nav links if on signin/signup page
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="navbar">
      {/* Logo or Brand Name */}
      <div className="navbar-logo">
        <img src="/Logo.png.png" alt="Site Logo" className="logo-img" />
        <div className="site-title">
          <h1>Tabya Kaur Sarao</h1>
          <p>Portfolio</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <NavLink to="/" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`} end>Home</NavLink>
        <NavLink to="/about" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`}>About</NavLink>
        <NavLink to="/projects" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`}>Projects</NavLink>
        <NavLink to="/services" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`}>Services</NavLink>
        <NavLink to="/education" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`}>Qualifications</NavLink>
        <NavLink to="/contact" className={`nav-link ${isAuthPage ? "disabled-link" : ""}`}>Contact</NavLink>

        {!user && !isAuthPage && (
          <>
            <NavLink to="/signin" className="nav-link">Sign In</NavLink>
            <NavLink to="/signout" className="nav-link">Sign Out</NavLink>
          </>
        )}

        {user && !isAuthPage && <SignOut />}
      </nav>
    </header>
  );
}
