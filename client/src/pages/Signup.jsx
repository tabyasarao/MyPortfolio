import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../lib/api-auth.js"; // Adjust path as needed

export default function SignUp({ onAuth }) {
  // Form includes only email and password
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = await signup(form);

    // Handle backend error message
    if (!data || data.error) {
      setError(data?.error || "Registration failed. Try again.");
      return;
    }

    // Registration succeeded
    console.log("User registered successfully. Redirecting to Sign In...");
    navigate("/signin");
  };

  return (
    <div className="page signup">
      <h2>Sign Up</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Only Email and Password Inputs */}
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
