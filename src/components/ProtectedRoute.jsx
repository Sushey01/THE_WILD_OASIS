// components/ProtectedRoute.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/useUser'; // Your user hook

const fullPageStyle = {
  height: '100vh',
  backgroundColor: '#111827',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  // Determine authentication state
  const isAuthenticated = Boolean(user);

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Show a loading message while checking auth status
  if (isLoading) {
    return (
      <div style={fullPageStyle}>
        <h2 style={{ color: '#E5EBE7', fontSize: '16px' }}>Loading...</h2>
      </div>
    );
  }

  // Prevent rendering content while redirect is happening
  if (!isAuthenticated) return null;

  // User is authenticated — render protected content
  return children;
};

export default ProtectedRoute;
