import React, { useEffect, useState } from "react";
import { read as getEducation, update } from "../lib/api-education";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEducation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ school: "", degree: "", year: "" });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    const data = await getEducation({ qualificationId: id });
    if (data.error) setError(data.error);
    else setForm({
      school: data.school || "",
      degree: data.degree || "",
      year: data.year || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await update({ qualificationId: id }, { t: token }, form);

    if (data.error) setError(data.error);
    else navigate("/education");
  };

  if (!isAdmin) return <p>Not authorized</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Education</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={form.school}
          name="school"
          onChange={(e) => setForm({ ...form, school: e.target.value })}
          placeholder="School"
        />
        <input
          value={form.degree}
          name="degree"
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          placeholder="Degree"
        />
        <input
          value={form.year}
          name="year"
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          placeholder="Year"
        />
        <button>Save</button>
      </form>
    </div>
  );
}
