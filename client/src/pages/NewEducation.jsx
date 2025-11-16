import React, { useState } from 'react';
import { create } from '../../lib/api-education';
import { Navigate } from 'react-router-dom';

const NewEducation = () => {
  const [values, setValues] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: '',
    error: '',
    redirect: false
  });

  // State Management: Updates values whenever an input field changes
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    
    // Construct the education object to send to the backend
    const education = {
      school: values.school,
      degree: values.degree,
      startYear: values.startYear,
      endYear: values.endYear,
    };

    // Call the API helper to create the new entry
    const data = await create(education);

    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      // Success: Clear error, redirect to the list view
      setValues({ ...values, error: '', redirect: true });
    }
  };

  // If redirect is true, navigate away
  if (values.redirect) {
    return (<Navigate to="/education" />); 
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Qualification</h2>
      <form onSubmit={clickSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Institution/School</label>
          <input 
            type="text" 
            placeholder="e.g., Centennial College" 
            value={values.school} 
            onChange={handleChange('school')} 
            required 
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Degree/Qualification</label>
          <input 
            type="text" 
            placeholder="e.g., Software Engineering Technology" 
            value={values.degree} 
            onChange={handleChange('degree')} 
            required 
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Year</label>
            <input 
              type="number" 
              placeholder="2022" 
              value={values.startYear} 
              onChange={handleChange('startYear')} 
              required 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">End Year (or Present)</label>
            <input 
              type="number" 
              placeholder="2025" 
              value={values.endYear} 
              onChange={handleChange('endYear')} 
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
          Submit Education
        </button>
      </form>
    </div>
  );
};

export default NewEducation;