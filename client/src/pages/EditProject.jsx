import React, { useState, useEffect } from 'react';
import { update } from '../../lib/api-project'; 
import { Navigate, useParams } from 'react-router-dom';
import auth from '../../lib/auth-helper';

// Note: This component assumes a backend READ ONE endpoint exists 
// to fetch the initial data using the projectId.

const EditProject = () => {
  const { projectId } = useParams(); // Get the ID from the URL (e.g., /project/edit/123)
  const [values, setValues] = useState({
    name: 'Loading Project Name...',
    description: 'Loading project description...',
    githubLink: '',
    liveLink: '',
    image: 'https://placehold.co/600x400/2575fc/ffffff?text=Loading+Image',
    error: '',
    redirect: false
  });
  
  const jwt = auth.isAuthenticated();

  // 1. Fetch Data on Component Load
  useEffect(() => {
    // --- TEMPORARY READ IMPLEMENTATION ---
    // In a real application, you would use a 'read' helper from api-project.js.
    const fetchProject = async () => {
        // Mocking fetched data for demonstration since the READ ONE endpoint isn't implemented yet.
        setValues(v => ({ 
            ...v, 
            name: `Project ID: ${projectId} (Edit Mode)`,
            description: "This is a placeholder description for the project being edited. Update these details and links.",
            githubLink: "https://github.com/my-project-edit",
            image: "https://placehold.co/600x400/2575fc/ffffff?text=Placeholder+for+Edit",
        }));
    };
    fetchProject();
    
  }, [projectId, jwt.token]);


  // State Management: Updates values whenever an input field changes
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    
    // Construct the project object to send to the backend
    const project = {
      name: values.name || undefined,
      description: values.description || undefined,
      githubLink: values.githubLink || undefined,
      liveLink: values.liveLink || undefined,
      image: values.image || undefined,
    };

    // Call the API helper to update the entry
    const data = await update(projectId, project); // Use the update function from api-project.js

    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      // Success: Clear error, redirect to the project list view
      setValues({ ...values, error: '', redirect: true });
    }
  };

  // If redirect is true, navigate away
  if (values.redirect) {
    return (<Navigate to="/project" />); 
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Project: {values.name}</h2>
      <form onSubmit={clickSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
          <input 
            type="text" 
            value={values.name} 
            onChange={handleChange('name')} 
            required 
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={values.description} 
            onChange={handleChange('description')} 
            required 
            rows="4"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input 
            type="text" 
            value={values.image} 
            onChange={handleChange('image')} 
            required 
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">GitHub Link</label>
            <input 
              type="url" 
              value={values.githubLink} 
              onChange={handleChange('githubLink')} 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Live Demo Link (Optional)</label>
            <input 
              type="url" 
              value={values.liveLink} 
              onChange={handleChange('liveLink')} 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {values.error && (
          <p className="text-red-500 text-sm italic mb-4">
            Error: {values.error}
          </p>
        )}

        <button 
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 shadow-lg"
        >
          Update Project Details
        </button>
      </form>
    </div>
  );
};

export default EditProject;