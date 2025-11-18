import React, { useEffect, useState } from "react";
import { list as listContacts, remove as deleteContact } from "../lib/api-contact";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await listContacts();
    if (data.error) setError(data.error);
    else setContacts(data);
  };

  const handleDelete = async (id) => {
    const data = await deleteContact({ contactId: id }, { t: token });
    if (data.error) setError(data.error);
    else setContacts(contacts.filter((c) => c._id !== id));
  };

  if (!isAdmin) return <p>You are not authorized.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Messages</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {contacts.map((c) => (
        <div
          key={c._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <p><b>Message:</b> {c.message}</p>

          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
