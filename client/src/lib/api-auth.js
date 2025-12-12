// src/lib/api-auth.js
const API_URL = "https://myportfolio-production-090b.up.railway.app/api/auth";
const USER_API_URL = "https://myportfolio-production-090b.up.railway.app/api/users";

// ------------------------ SIGNIN ------------------------
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

// ------------------------ SIGNUP ------------------------
export const signup = async (user) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not reach the server." };
  }
};

// ------------------------ SIGNOUT ------------------------
export const signout = async () => {
  try {
    const response = await fetch(`${API_URL}/signout`, { method: "GET" });
    return await response.json();
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};

// ------------------------ READ USER ------------------------
export const read = async (params, credentials) => {
  try {
    const response = await fetch(`${USER_API_URL}/${params.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Failed to fetch user data." };
  }
};

// ------------------------ UPDATE USER ------------------------
export const update = async (params, credentials, user) => {
  try {
    const response = await fetch(`${USER_API_URL}/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Failed to update user data." };
  }
};

// ------------------------ DELETE USER ------------------------
export const remove = async (params, credentials) => {
  try {
    const response = await fetch(`${USER_API_URL}/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Failed to delete user." };
  }
};
