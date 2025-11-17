import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example API call function
import { signin } from "../lib/api-auth.js";

export default function SignIn({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signin(form); // call backend signin API

    if (data.error) {
      setError(data.error);
    } else {
      // Store JWT token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onAuth(); // mark user as authenticated
      navigate("/"); // redirect to home page
    }
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
