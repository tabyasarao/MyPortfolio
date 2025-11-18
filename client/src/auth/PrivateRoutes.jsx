// client/src/auth/PrivateRoutes.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoutes = () => {
  const session = auth.isAuthenticated(); // returns token + user OR false
  const isAuthenticated = !!session; // convert to true/false

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <Navigate 
      to="/signin" 
      replace 
      state={{ from: window.location.pathname }} 
    />
  );
};

export default PrivateRoutes;
