import React, { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", role: "", description: "", image: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects, form]);
    setForm({ title: "", role: "", description: "", image: "" });
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleEdit = (index) => {
    setForm(projects[index]);
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="page projects">
      <h2>My Projects</h2>

      {/* Project Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      {/* Project List */}
      <div className="card-container">
        {projects.map((proj, index) => (
          <div key={index} className="project-card">
            {proj.image && <img src={proj.image} alt={proj.title} className="project-image" />}
            <h3>{proj.title}</h3>
            <p>
              <strong>Role:</strong> {proj.role} <br />
              <strong>Description:</strong> {proj.description}
            </p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
