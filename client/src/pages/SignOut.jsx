import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

export default function SignOut({ onSignOut }) {
  const navigate = useNavigate();

  const doSignOut = () => {
    auth.clearAuthData(); // now this function exists
    if (onSignOut) onSignOut();
    navigate("/signin");
  };

  return (
    <button
      onClick={doSignOut}
      style={{
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2575fc",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Sign Out
    </button>
  );
}
