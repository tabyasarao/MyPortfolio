// client/src/auth/PrivateRoutes.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoutes = () => {
  const session = auth.isAuthenticated(); 
  const isAuthenticated = !!session; 
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
