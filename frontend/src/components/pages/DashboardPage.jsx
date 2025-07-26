import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ListPageLayout from '../templates/ListPageLayout';
import DashboardGrid from '../organisms/DashboardGrid';
import LoadingSpinner from '../molecules/LoadingSpinner';
import { getStatistics } from '../../services/api/statistics';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    attendance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserName = () => {
    if (!user) return 'Usuario';
    return user.name || user.firstname || user.username || user.email || 'Usuario';
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        const response = await getStatistics();
        // Asegurar que los datos tengan valores por defecto
        const data = response || {};
        setStats({
          students: data.students || 0,
          teachers: data.teachers || 0,
          parents: data.parents || 0,
          attendance: data.attendance || 0
        });
      } catch (err) {
        setError('Error al cargar las estadísticas del dashboard');
        // Establecer valores por defecto en caso de error
        setStats({
          students: 0,
          teachers: 0,
          parents: 0,
          attendance: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Función para formatear números
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString('es-ES');
  };

  // Función para formatear porcentaje
  const formatPercentage = (num) => {
    if (num === undefined || num === null) return '0%';
    return `${parseFloat(num).toFixed(1)}%`;
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
                <span className="quick-stat-value">{formatPercentage(stats.attendance)}</span>
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