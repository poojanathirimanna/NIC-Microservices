import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Optionally, you could add a loading state here
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // Redirect to login with original path preserved
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
