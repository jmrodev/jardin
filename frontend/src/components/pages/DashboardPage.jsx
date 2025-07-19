import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ListPageLayout from '../templates/ListPageLayout';
import DashboardGrid from '../organisms/DashboardGrid';
import LoadingSpinner from '../molecules/LoadingSpinner';
import personService from '../../services/api/persons';
import dashboardService from '../../services/api/dashboard';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    todayAttendance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserName = () => {
    if (!user) return 'Usuario';
    return user.name || user.firstname || user.username || user.email || 'Usuario';
  };

  // Función para obtener estadísticas reales
  const fetchStats = async () => {
    setLoading(true);
    try {
      // Obtener estadísticas generales del dashboard
      const statsRes = await dashboardService.getStats();
      
      setStats({
        students: statsRes.data.students || 0,
        teachers: statsRes.data.teachers || 0,
        parents: statsRes.data.parents || 0,
        todayAttendance: statsRes.data.todayAttendance || 0
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Función para formatear números
  const formatNumber = (num) => {
    return num.toLocaleString('es-ES');
  };

  // Función para formatear porcentaje
  const formatPercentage = (num) => {
    return `${num}%`;
  };

  return (
    <ListPageLayout
      entityType="dashboard"
      filters={
        <div className="dashboard-filters">
          <h4>{t('dashboard.quickStats')}</h4>
          {loading ? (
            <div className="dashboard-loading">
              <LoadingSpinner size="sm" />
            </div>
          ) : error ? (
            <div className="dashboard-error">
              <p>{error}</p>
            </div>
          ) : (
            <div className="dashboard-quick-stats">
              <div className="quick-stat">
                <span className="quick-stat-label">{t('dashboard.totalStudents')}</span>
                <span className="quick-stat-value">{formatNumber(stats.students)}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">{t('dashboard.totalTeachers')}</span>
                <span className="quick-stat-value">{formatNumber(stats.teachers)}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">{t('dashboard.todayAttendance')}</span>
                <span className="quick-stat-value">{formatPercentage(stats.todayAttendance)}</span>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{t('dashboard.welcome', { name: getUserName() })}</h1>
          <p className="dashboard-subtitle">{t('dashboard.subtitle')}</p>
        </div>

        <DashboardGrid />
      </div>
    </ListPageLayout>
  );
} 