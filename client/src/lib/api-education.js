// src/lib/api-education.js

const API_URL = "/api/qualifications";


/**
 * CREATE qualification (Admin only)
 */
export const create = async (credentials, qualification) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(qualification),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not create qualification." };
  }
};

/**
 * LIST all qualifications (public)
 */
export const list = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not load qualifications." };
  }
};

/**
 * READ one qualification
 */
export const read = async (params) => {
  try {
    const response = await fetch(`${API_URL}/${params.qualificationId}`, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not load qualification." };
  }
};

/**
 * UPDATE qualification (Admin only)
 */
export const update = async (params, credentials, qualification) => {
  try {
    const response = await fetch(`${API_URL}/${params.qualificationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(qualification),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not update qualification." };
  }
};

/**
 * DELETE qualification (Admin only)
 */
export const remove = async (params, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${params.qualificationId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not delete qualification." };
  }
};
