import React, { useState, useEffect } from 'react';
import { list, remove } from '../../lib/api-education';
import auth from '../../lib/auth-helper';
import { Link, useNavigate } from 'react-router-dom';

const EducationList = () => {
  const [educationData, setEducationData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if the current user is an Admin (Part II.e)
  const isAuthenticated = auth.isAuthenticated();
  const isAdmin = isAuthenticated && isAuthenticated.user.role === 'admin';

  // Fetch all education entries on component mount (Read Operation)
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setEducationData(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // Handler for Deleting an entry (Part II.d, Admin Only)
  const deleteEducation = async (eduId) => {
    const data = await remove(eduId);

    if (data && data.error) {
      setError(data.error);
    } else {
      // Update state to remove the deleted item instantly
      setEducationData(educationData.filter(item => item._id !== eduId));
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Qualifications
      </h1>

      {/* Admin Button to Add New Education (C) */}
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <Link to="/education/new">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md">
              + Add New Education
            </button>
          </Link>
        </div>
      )}

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      
      <div className="space-y-8">
        {educationData.length > 0 ? (
          educationData.map((item, index) => (
            <div 
              key={item._id} 
              className="bg-gray-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.degree}</h2>
                  <p className="text-lg text-gray-600">{item.school}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.startYear} - {item.endYear || 'Present'}
                  </p>
                </div>

                {/* Admin Actions (U and D) */}
                {isAdmin && (
                  <div className="flex gap-2">
                    {/* Link to Update Form (U) */}
                    <Link to={`/education/edit/${item._id}`}>
                      <button 
                        className="text-blue-500 hover:text-blue-700 transition" 
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                    </Link>
                    
                    {/* Delete Button (D) */}
                    <button 
                      onClick={() => deleteEducation(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl">No qualifications added yet. {isAdmin ? 'Use the "Add New Education" button.' : ''}</p>
        )}
      </div>
    </div>
  );
};

export default EducationList;