import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Imports the auth helper needed to check the user's role
import auth from '../../lib/auth-helper'; 

const AdminRoute = () => {
  const location = useLocation();
  const isAuthenticated = auth.isAuthenticated();
  
  // 1. Check if the user is logged in
  // 2. If logged in, check if the user object includes the role 'admin'
  const isAdmin = isAuthenticated && isAuthenticated.user.role === 'admin';

  // If the user is an admin, render the nested component (the page they requested, e.g., /education/new)
  if (isAdmin) {
    return <Outlet />; 
  }

  // If the user is NOT an admin, redirect them to the home page (or sign-in page, based on preference)
  return (
    <Navigate 
      to="/" // Redirects non-admin users to the public home page
      replace 
      state={{ from: location.pathname }} 
    />
  );
};

export default AdminRoute;