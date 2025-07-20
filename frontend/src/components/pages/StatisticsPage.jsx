import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ListPageLayout from '../templates/ListPageLayout';
import LoadingSpinner from '../molecules/LoadingSpinner';
import DemographicAnalysis from '../molecules/DemographicAnalysis';
import dashboardService from '../../services/api/dashboard';

export default function StatisticsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  // Función para obtener estadísticas detalladas
  const fetchDetailedStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = (await dashboardService.getStats()).data;
      setStats(statsData);
    } catch (err) {
      let errorMessage = 'Error al cargar las estadísticas detalladas';
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        errorMessage = t('statistics.serverUnavailable');
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailedStats();
  }, []);

  return (
    <ListPageLayout entityType="statistics">
      <div className="statistics-page">
        {loading ? (
          <div className="statistics-loading">
            <LoadingSpinner />
            <p>{t('statistics.loading')}</p>
          </div>
        ) : error ? (
          <div className="statistics-error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="statistics-content">
            <DemographicAnalysis stats={stats} selectedPeriod="total" />
          </div>
        )}
      </div>
    </ListPageLayout>
  );
}
