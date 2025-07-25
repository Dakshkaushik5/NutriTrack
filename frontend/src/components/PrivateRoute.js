import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  
  // If token exists, render the child components (Outlet). Otherwise, redirect to login.
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
