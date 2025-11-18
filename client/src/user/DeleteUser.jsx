// src/user/DeleteUser.jsx

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import auth from '../lib/auth-helper';
import { remove } from '../lib/api-auth';
import { signout } from '../lib/api-auth'; 

const DeleteUser = ({ userId }) => {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteAccount = () => {
        const jwt = auth.isAuthenticated();

        // 1. Call the protected remove API function
        remove({ userId: userId }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                console.error("Deletion failed:", data.error);
                // Optionally show error to user
            } else {
                // 2. Sign out the user on the frontend to clear localStorage
                signout(() => auth.clearAuthData());
                
                // 3. Redirect to the home page (or signin)
                setRedirect(true);
            }
        });
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <span style={{ marginLeft: '10px' }}>
            <button 
                onClick={handleOpen} 
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px' }}
            >
                Delete Account
            </button>

            {/* Simple Modal/Dialog for Confirmation */}
            {open && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center' 
                }}>
                    <div style={{ padding: '20px', background: 'white', borderRadius: '5px' }}>
                        <h3>Confirm Account Deletion</h3>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <button onClick={deleteAccount} style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}>
                            Yes, Delete
                        </button>
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </span>
    );
};

export default DeleteUser;