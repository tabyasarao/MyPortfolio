import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Imports the auth helper to check if the user is authenticated
import auth from '../../lib/auth-helper'; 

const PrivateRoute = () => {
  const location = useLocation();
  
  // Checks the sessionStorage for a valid JWT token
  const isAuthenticated = auth.isAuthenticated();
  
  // If the user is authenticated, render the nested component (the page they requested)
  if (isAuthenticated) {
    return <Outlet />; 
  }

  // If the user is NOT authenticated, redirect them to the Signin page.
  // We use 'state' to save the intended path for redirecting back after login.
  return (
    <Navigate 
      to="/signin" 
      replace // Replaces the current entry in the history stack
      state={{ from: location.pathname }} // Saves the intended path
    />
  );
};

export default PrivateRoute;