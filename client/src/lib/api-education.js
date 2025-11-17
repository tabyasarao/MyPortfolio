const API_URL = "http://localhost:3000/api/educations";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

export const getEducations = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};

export const createEducation = async (education) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(education),
    });
    return await response.json();
  } catch (err) {
    return { error: "Failed to create education." };
  }
};

export const updateEducation = async (id, education) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(education),
    });
    return await response.json();
  } catch (err) {
    return { error: "Failed to update education." };
  }
};

export const deleteEducation = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    });
    return await response.json();
  } catch (err) {
    return { error: "Failed to delete education." };
  }
};
