// components/ProtectedRoute.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/useUser';

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

  useEffect(() => {
    // When loading finishes and user is NOT authenticated, redirect to login
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    // Show loading UI while fetching user info
    return (
      <div style={fullPageStyle}>
        <h2 style={{ color: '#E5EBE7', fontSize: '16px' }}>Loading...</h2>
      </div>
    );
  }

  // If not loading, and no user, don't render anything (redirect happens in useEffect)
  if (!user) return null;

  // User is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
