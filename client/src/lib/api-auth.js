// src/lib/api-auth.js
const API_URL = "http://localhost:3000/api/auth";

export const signin = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};

export const signout = async () => {
  try {
    const response = await fetch(`${API_URL}/signout`, { method: "GET" });
    return await response.json();
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};
