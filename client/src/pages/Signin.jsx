import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example API call function
import { signin } from "../lib/api-auth.js";

export default function SignIn({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting form:", form);

    // Call backend signin API
    const data = await signin(form);
    console.log("API response:", data);

    // Handle backend error
    if (!data || data.error) {
      setError(data?.error || "Login failed. Try again.");
      return;
    }

    // Validate token + user object
    if (!data.token || !data.user) {
      setError("Invalid response from server. Please try again.");
      return;
    }

    // Save JWT token and user (role, email, id)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Trigger global auth state (if provided)
    if (onAuth) onAuth();

    console.log("User authenticated, redirecting to home...");
    navigate("/"); // redirect to home page
  };

  return (
    <div className="page signin">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>

      <div className="signup-link">
        <p>
          New to this? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
