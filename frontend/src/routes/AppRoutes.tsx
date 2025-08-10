import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => (
  <Routes>
    {/* Ruta raíz: si está autenticado y tiene perfil, va a dashboard, sino a onboarding */}
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Navigate to="/dashboard" replace />
        </PrivateRoute>
      }
    />

    {/* Rutas públicas */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />

    {/* Ruta dashboard: usuario autenticado con perfil */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    {/* Ruta catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
