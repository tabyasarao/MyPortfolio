// src/user/Profile.jsx

import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";

// Standard components (You can use your simple HTML or styling framework here)
const Card = ({ children, className }) => <div className={className} style={{ margin: '20px auto', padding: '20px', maxWidth: '600px', border: '1px solid #ccc' }}>{children}</div>;
const Button = ({ children, to }) => <Link to={to}><button>{children}</button></Link>;

import auth from "../lib/auth-helper"; // 🔑 Import the new helper
import { read } from "../lib/api-auth";  // 🔑 Import the new read API call

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const { userId } = useParams(); // Get the userId from the URL parameter

    useEffect(() => {
        // 1. Get credentials (JWT token and user info)
        const jwt = auth.isAuthenticated();
        
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }

        // 2. Call the protected read API function
        read({ userId: userId }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                // If token is expired or invalid, redirect to signin
                setRedirectToSignin(true);
            } else {
                // Set user data to state
                setUser(data);
                setLoading(false);
            }
        });
        
    }, [userId]); // Re-run effect when userId changes

    if (redirectToSignin) {
        // Redirect the user to the Sign In page
        return <Navigate to="/signin" />;
    }
    
    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading profile...</p>;
    }

    // Check if the current logged-in user is viewing their own profile
    const isAuthenticatedUser = auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id;

    return (
        <Card className="profile-card">
            <h2>User Profile</h2>
            
            {/* Display User Details */}
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {(new Date(user.created)).toDateString()}</p>
            {user.updated && <p><strong>Last Updated:</strong> {(new Date(user.updated)).toDateString()}</p>}
            
            {/* Conditional Edit Button */}
           {isAuthenticatedUser && (
    <ListItemText sx={{ textAlign: 'right' }}>
        {/* Edit Button */}
        <Link to={"/user/edit/" + user._id} style={{ marginRight: '10px' }}>
            <button>Edit Profile</button>
        </Link>
        
        {/* Delete User Component */}
        <DeleteUser userId={user._id} /> 
        </ListItemText>
    )}
        </Card>
    );
};

export default Profile;