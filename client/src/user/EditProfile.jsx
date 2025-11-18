// src/user/EditProfile.jsx

import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import auth from "../lib/auth-helper";
import { read, update } from "../lib/api-auth"; // 🔑 Import update

// Simple component wrappers for styling (replace with your actual components if using a library)
const Card = ({ children }) => <div style={{ margin: '20px auto', padding: '20px', maxWidth: '600px', border: '1px solid #ccc' }}>{children}</div>;
const TextField = ({ label, name, value, type = 'text', onChange, required = false }) => (
    <div style={{ marginBottom: '15px' }}>
        <label htmlFor={name}>{label}:</label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
    </div>
);

const EditProfile = () => {
    const { userId } = useParams();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToProfile: false,
    });

    useEffect(() => {
        const jwt = auth.isAuthenticated();
        
        // 1. Fetch current user data to pre-populate the form
        read({ userId: userId }, { t: jwt.token }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: "Failed to load user data." });
            } else {
                // Set initial form state with existing user data
                setValues({ ...values, email: data.email });
            }
        });
    }, [userId]);

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jwt = auth.isAuthenticated();
        
        // Create the user object to send to the server
        const userData = {
            email: values.email || undefined,
            // Only include password if the user typed something
            password: values.password.length > 0 ? values.password : undefined, 
        };

        // 2. Call the protected update API function
        update({ userId: userId }, { t: jwt.token }, userData).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // IMPORTANT: Update local storage with new user data
                auth.clearAuthData(); // Clear old token/user
                localStorage.setItem("token", jwt.token); // Keep the current token (it's still valid for now)
                localStorage.setItem("user", JSON.stringify(data)); // Save the new user object
                
                // Redirect to the updated profile page
                setValues({ ...values, redirectToProfile: true });
            }
        });
    };
    
    // Handle unauthorized access (token expired or not logged in)
    if (!auth.isAuthenticated()) {
        return <Navigate to="/signin" />;
    }
    
    // Redirect after successful update
    if (values.redirectToProfile) {
        return <Navigate to={`/user/${userId}`} />;
    }

    return (
        <Card>
            <h2>Edit Profile</h2>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Email" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange('email')} 
                    type="email"
                    required
                />
                <TextField 
                    label="New Password (optional)" 
                    name="password" 
                    value={values.password} 
                    onChange={handleChange('password')} 
                    type="password" 
                    placeholder="Leave blank to keep current password"
                />

                {/* Display Error Message */}
                {values.error && <p style={{ color: "red" }}>{values.error}</p>}

                <button type="submit" style={{ padding: '10px', marginTop: '20px' }}>
                    Save Changes
                </button>
            </form>
        </Card>
    );
};

export default EditProfile;