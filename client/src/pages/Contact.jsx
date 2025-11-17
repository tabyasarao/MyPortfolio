import React, { useState } from 'react';
import { createContact } from "../lib/api-contact";
const create = createContact;
const Contact = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    error: '',
    success: false
  });

  // State management for form
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    
    const contactMessage = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    // Call the public 'create' API
    const data = await create(contactMessage);

    if (data && data.error) {
      setValues({ ...values, error: data.error, success: false });
    } else {
      // Success! Clear the form and show a success message
      setValues({ 
        name: '', 
        email: '', 
        message: '', 
        error: '', 
        success: true 
      });
    }
  };

  // This component uses the CSS classes you provided
  return (
    <div className="page contact">
      <h2>Contact Me</h2>
      
      <div className="contact-panel">
        <h3>Have a question or want to work together?</h3>
        <p>Fill out the form below and I'll get back to you as soon as possible.</p>
      </div>

      <form className="contact-form" onSubmit={clickSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={values.name} 
            onChange={handleChange('name')} 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={values.email} 
            onChange={handleChange('email')} 
            required 
          />
        </div>
        <textarea 
          placeholder="Your Message" 
          value={values.message} 
          onChange={handleChange('message')} 
          required 
        ></textarea>

        {/* --- Feedback Messages --- */}
        {values.error && (
          <p className="text-red-500 text-sm italic mb-4">
            Error: {values.error}
          </p>
        )}
        {values.success && (
          <p className="text-green-600 text-lg font-semibold mb-4">
            Message sent successfully! Thank you.
          </p>
        )}
        
        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;