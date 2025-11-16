import React, { useState, useEffect } from 'react';
import { list, remove } from '../../lib/api-project';
import auth from '../../lib/auth-helper';
import { Link, useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projectData, setProjectData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if the current user is an Admin
  const isAuthenticated = auth.isAuthenticated();
  const isAdmin = isAuthenticated && isAuthenticated.user.role === 'admin';

  // Fetch all project entries on component mount (Read Operation)
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setProjectData(data);
      }
    }).catch(err => {
      setError("Failed to fetch projects from the server.");
      console.error(err);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // Handler for Deleting an entry (Admin Only)
  const deleteProject = async (projectId) => {
    // Note: Using window.confirm() as a temporary modal substitute
    if (!window.confirm("Are you sure you want to delete this project?")) {
        return;
    }

    const data = await remove(projectId);

    if (data && data.error) {
      setError(data.error);
    } else {
      // Update state to remove the deleted item instantly
      setProjectData(projectData.filter(item => item._id !== projectId));
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Projects Portfolio
      </h1>

      {/* Admin Button to Add New Project (C) */}
      {isAdmin && (
        <div className="flex justify-end mb-8">
          <Link to="/project/new">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md">
              + Add New Project
            </button>
          </Link>
        </div>
      )}

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      
      {/* Implements the 'page.projects' and 'project-card' styles from your CSS */}
      <div className="page projects">
        {projectData.length > 0 ? (
          projectData.map((item, index) => (
            <div 
              key={item._id} 
              className="project-card" // Using your custom CSS class
            >
              {/* Image with fallback placeholder */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="project-image" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/600x400/cccccc/333333?text=Project+${index + 1}`
                }}
              />
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                
                {/* Admin Actions (U and D) - Only visible to admin */}
                {isAdmin && (
                  <div className="flex gap-2">
                    {/* Link to Update Form (U) */}
                    <Link to={`/project/edit/${item._id}`}>
                      <button 
                        className="text-blue-500 hover:text-blue-700 transition" 
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                    </Link>
                    
                    {/* Delete Button (D) */}
                    <button 
                      onClick={() => deleteProject(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                )}
              </div>

              <p>{item.description}</p>
              
              <div className="mt-4 flex gap-4">
                {item.githubLink && (
                  <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.77.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.535-1.52.117-3.176 0 0 1.005-.322 3.3-.12.96.26 1.98.39 3 .383 1.02.007 2.04-.122 3-.383 2.295-.202 3.297.12 3.297.12.653 1.657.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.603-.015 2.898-.015 3.28 0 .323.21.696.825.577C20.565 22.118 24 17.614 24 12.297c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
                {item.liveLink && (
                  <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-500 hover:text-green-700 transition flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4h2v4h-2zm1-8c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1z"/></svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl w-full">No projects added yet. {isAdmin ? 'Use the "Add New Project" button.' : ''}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;