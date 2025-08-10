import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading: loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
