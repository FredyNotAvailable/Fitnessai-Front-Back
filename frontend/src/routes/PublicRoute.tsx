import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (user) {
    // Usuario ya autenticado, redirigir a dashboard o onboarding depende de PrivateRoute
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
