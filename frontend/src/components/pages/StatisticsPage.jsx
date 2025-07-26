import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../services/api/statistics';
import LoadingSpinner from '../molecules/LoadingSpinner';
import '../../styles/pages/statistics.css';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getStatistics();
        setStats(response);
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="statistics-page">
      <h1>Estadísticas</h1>
      {stats && (
        <div className="stats-container">
          <div className="stat-card">
            <h2>Estudiantes</h2>
            <p>{stats.students}</p>
          </div>
          <div className="stat-card">
            <h2>Profesores</h2>
            <p>{stats.teachers}</p>
          </div>
          <div className="stat-card">
            <h2>Padres</h2>
            <p>{stats.parents}</p>
          </div>
          <div className="stat-card">
            <h2>Asistencia</h2>
            <p>{stats.attendance}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
