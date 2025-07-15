import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentsPage from '../pages/StudentsPage';
import TeachersPage from '../pages/TeachersPage';
import AttendancePage from '../pages/AttendancePage';
import LoadingSpinner from '../molecules/LoadingSpinner';

const AppRoutes = () => {
  const { isAuthenticated, loading, initialized } = useAuth();

  // Mostrar loading mientras se inicializa el contexto
  if (!initialized || loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/students" 
        element={isAuthenticated ? <StudentsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/teachers" 
        element={isAuthenticated ? <TeachersPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/attendance" 
        element={isAuthenticated ? <AttendancePage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
    </Routes>
  );
};

export default AppRoutes; 