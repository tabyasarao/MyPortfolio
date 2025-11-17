// src/lib/api-contact.js
export const createContact = async (contact) => {
  try {
    const response = await fetch("http://localhost:3000/api/contacts", {
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
