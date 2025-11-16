import React, { useState } from 'react';
import { create } from '../../lib/api-project';
import { Navigate } from 'react-router-dom';

const NewProject = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    githubLink: '',
    liveLink: '',
    image: '', // URL for the project image, needed for card display
    error: '',
    redirect: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    
    const project = {
      name: values.name,
      description: values.description,
      githubLink: values.githubLink,
      liveLink: values.liveLink,
      image: values.image,
    };

    const data = await create(project);

    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, error: '', redirect: true });
    }
  };

  if (values.redirect) {
    return (<Navigate to="/project" />); 
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Project</h2>
      <form onSubmit={clickSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
          <input 
            type="text" 
            placeholder="e.g., E-Commerce Platform" 
            value={values.name} 
            onChange={handleChange('name')} 
            required 
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            placeholder="A brief summary of the project and technologies used." 
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
            placeholder="https://placehold.co/600x400/2575fc/ffffff?text=Project+Image" 
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
              placeholder="https://github.com/my-project" 
              value={values.githubLink} 
              onChange={handleChange('githubLink')} 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Live Demo Link (Optional)</label>
            <input 
              type="url" 
              placeholder="https://live-demo.com" 
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 shadow-lg"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default NewProject;