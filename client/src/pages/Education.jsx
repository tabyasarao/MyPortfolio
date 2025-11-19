import React, { useState, useEffect } from "react";
import { 
  list as getEducations,
  create,
  remove
} from "../lib/api-education";

export default function Education() {
  const [educationList, setEducationList] = useState([]);
  const [form, setForm] = useState({ school: "", degree: "", year: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Load educations from backend
  useEffect(() => {
    const fetchEducations = async () => {
      const data = await getEducations();
      if (data.error) setError(data.error);
      else setEducationList(data);
    };
    fetchEducations();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") setIsAdmin(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!isAdmin) {
      setError("You must be logged in as admin to add education.");
      return;
    }

    const data = await create({ t: token }, form);

    if (data.error) {
      setError(data.error);
    } else {
      setEducationList([...educationList, data]);
      setForm({ school: "", degree: "", year: "" });
      setError("");
      setSuccess("Education added successfully");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const data = await remove({ qualificationId: id }, { t: token });

    if (data.error) {
      setError(data.error);
    } else {
      setEducationList(educationList.filter((edu) => edu._id !== id));
      setSuccess("Education deleted successfully");
    }
  };

  return (
    <div className="page education">
      <h2>Qualifications</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {isAdmin && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="school"
              placeholder="School / University"
              value={form.school}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree / Qualification"
              value={form.degree}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Education</button>
        </form>
      )}

      <div className="card-container">
        {educationList.map((edu) => (
          <div key={edu._id} className="card">
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
            <p>{edu.year}</p>

            {isAdmin && (
              <button
                onClick={() => handleDelete(edu._id)}
                style={{ marginTop: "10px" }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
