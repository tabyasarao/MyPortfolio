// src/lib/api-project.js

const API_URL = "https://myportfolio-production-090b.up.railway.app/api/projects";

/**
 * LIST all projects (public)
 */
export const list = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not load projects." };
  }
};

/**
 * READ a single project (public)
 */
export const read = async (params) => {
  try {
    const response = await fetch(`${API_URL}/${params.projectId}`, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not load project." };
  }
};

/**
 * CREATE project (Admin only)
 */
export const create = async (credentials, project) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(project),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not create project." };
  }
};

/**
 * UPDATE project (Admin only)
 */
export const update = async (params, credentials, project) => {
  try {
    const response = await fetch(`${API_URL}/${params.projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(project),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not update project." };
  }
};

/**
 * DELETE project (Admin only)
 */
export const remove = async (params, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${params.projectId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not delete project." };
  }
};
  