import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentsPage from '../pages/StudentsPage';
import TeachersPage from '../pages/TeachersPage';
import AttendancePage from '../pages/AttendancePage';
import PersonsPage from '../pages/PersonsPage/PersonsPage.jsx';
import ParentsPage from '../pages/ParentsPage/ParentsPage.jsx';
import LoadingSpinner from '../molecules/LoadingSpinner';
import MainLayout from './MainLayout';

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
        element={isAuthenticated ? <MainLayout><DashboardPage /></MainLayout> : <Navigate to="/login" />} 
      />
      <Route 
        path="/students" 
        element={isAuthenticated ? <MainLayout><StudentsPage /></MainLayout> : <Navigate to="/login" />} 
      />
      <Route 
        path="/teachers" 
        element={isAuthenticated ? <MainLayout><TeachersPage /></MainLayout> : <Navigate to="/login" />} 
      />
      <Route 
        path="/attendance" 
        element={isAuthenticated ? <MainLayout><AttendancePage /></MainLayout> : <Navigate to="/login" />} 
      />
      <Route 
        path="/persons" 
        element={isAuthenticated ? <MainLayout><PersonsPage /></MainLayout> : <Navigate to="/login" />} 
      />
      <Route 
        path="/parents" 
        element={isAuthenticated ? <MainLayout><ParentsPage /></MainLayout> : <Navigate to="/login" />} 
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