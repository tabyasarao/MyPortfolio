import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear any user-related data, e.g., tokens in localStorage
    localStorage.removeItem("user"); 
    // Redirect to SignIn page
    navigate("/signin");
  };

  return (
    <button 
      onClick={handleSignOut} 
      style={{
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2575fc",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      Sign Out
    </button>
  );
}
