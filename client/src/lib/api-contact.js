// src/lib/api-contact.js

const API_URL = "/api/contacts";


// CREATE (Public)
export const createContact = async (contact) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};

// LIST ALL CONTACTS (Admin only)
export const list = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not load contacts." };
  }
};

// DELETE CONTACT (Admin only)
export const remove = async (params, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${params.contactId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t
      },
    });

    return await response.json();
  } catch (err) {
    return { error: "Network error. Could not delete contact." };
  }
};
