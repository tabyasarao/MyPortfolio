import React, { useEffect, useState } from "react";
import { 
  list as getProjects,
  create,
  update,
  remove
} from "../lib/api-project";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", role: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // Load projects from backend
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    if (data.error) setError(data.error);
    else setProjects(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError("Only admin can add or edit projects.");
      return;
    }

    let data;

    if (editingId) {
      // UPDATE
      data = await update({ projectId: editingId }, { t: token }, form);
    } else {
      // CREATE
      data = await create({ t: token }, form);
    }

    if (data.error) {
      setError(data.error);
      return;
    }

    // Refresh list
    loadProjects();

    // Reset form
    setForm({ title: "", role: "", description: "", image: "" });
    setEditingId(null);
  };

  // DELETE project
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const data = await remove({ projectId: id }, { t: token });

    if (data.error) setError(data.error);
    else setProjects(projects.filter((p) => p._id !== id));
  };

  // LOAD project into form for editing
  const handleEdit = (project) => {
    if (!isAdmin) return;

    setForm({
      title: project.title,
      role: project.role,
      description: project.description,
      image: project.image || "",
    });
    setEditingId(project._id);
  };

  return (
    <div className="page projects">
      <h2>My Projects</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Project Form (Admin Only) */}
      {isAdmin && (
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

          <button type="submit">
            {editingId ? "Update Project" : "Add Project"}
          </button>
        </form>
      )}

      {/* Project List */}
      <div className="card-container">
        {projects.map((proj) => (
          <div key={proj._id} className="project-card">
            {proj.image && (
              <img src={proj.image} alt={proj.title} className="project-image" />
            )}

            <h3>{proj.title}</h3>
            <p>
              <strong>Role:</strong> {proj.role} <br />
              <strong>Description:</strong> {proj.description}
            </p>

            {isAdmin && (
              <div className="card-buttons">
                <button onClick={() => handleEdit(proj)}>Edit</button>
                <button onClick={() => handleDelete(proj._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
  