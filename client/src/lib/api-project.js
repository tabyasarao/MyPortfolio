// src/lib/api-project.js
const API_URL = "http://localhost:3000/api/projects";

export const createProject = async (projectData) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    });
    return await res.json();
  } catch (err) {
    console.error("Error creating project:", err);
    throw err;
  }
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${API_URL}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err;
  }
};

export const updateProject = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating project:", err);
    throw err;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("Error deleting project:", err);
    throw err;
  }
};
