import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ListPageLayout from '../templates/ListPageLayout';
import LoadingSpinner from '../molecules/LoadingSpinner';
import StatCard from '../atoms/StatCard';
import DetailModal from '../molecules/DetailModal';
import StatisticsGrid from '../organisms/StatisticsGrid';
import dashboardService from '../../services/api/dashboard';
import '@/styles/pages/statistics.css';

export default function StatisticsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo para mostrar cuando no hay datos del backend
  const getMockStats = () => ({
    totalStudents: 156,
    totalTeachers: 12,
    totalParents: 142,
    totalClassrooms: 6,
    attendanceRate: 94.5,
    studentsTrend: 8.2,
    teachersTrend: 2.1,
    parentsTrend: 5.7,
    attendanceTrend: 1.3,
    ageDistribution: [
      { age: '3 años', count: 45 },
      { age: '4 años', count: 52 },
      { age: '5 años', count: 59 }
    ],
    genderDistribution: [
      { gender: 'Niñas', count: 78 },
      { gender: 'Niños', count: 78 }
    ],
    classroomDistribution: [
      { classroom: 'Sala 3A', count: 25 },
      { classroom: 'Sala 3B', count: 26 },
      { classroom: 'Sala 4A', count: 28 },
      { classroom: 'Sala 4B', count: 27 },
      { classroom: 'Sala 5A', count: 30 },
      { classroom: 'Sala 5B', count: 20 }
    ],
    shiftDistribution: [
      { shift: 'Mañana', count: 82 },
      { shift: 'Tarde', count: 74 }
    ],
    monthlyTrend: [
      { month: 'Ene', value: 92 },
      { month: 'Feb', value: 94 },
      { month: 'Mar', value: 93 },
      { month: 'Abr', value: 95 },
      { month: 'May', value: 96 },
      { month: 'Jun', value: 94 }
    ],
    weeklyAttendance: 95.2,
    classroomOccupancy: 88.7,
    newEnrollments: 23,
    retentionRate: 97.8,
    averageAge: 4.2,
    weeklyData: [
      { day: 'Lun', attendance: 94 },
      { day: 'Mar', attendance: 96 },
      { day: 'Mié', attendance: 95 },
      { day: 'Jue', attendance: 97 },
      { day: 'Vie', attendance: 93 }
    ],
    occupancyData: [
      { classroom: 'Sala 3A', occupancy: 92 },
      { classroom: 'Sala 3B', occupancy: 88 },
      { classroom: 'Sala 4A', occupancy: 95 },
      { classroom: 'Sala 4B', occupancy: 90 },
      { classroom: 'Sala 5A', occupancy: 87 },
      { classroom: 'Sala 5B', occupancy: 85 }
    ],
    enrollmentTrend: 15.2,
    retentionTrend: 2.1,
    lowAttendanceStudents: 8,
    fullClassrooms: 2,
    upcomingEvents: 5,
    pendingTasks: 12
  });

  // Función para obtener estadísticas detalladas
  const fetchDetailedStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getStats();
      // Si hay datos del backend, usarlos; si no, usar datos de ejemplo
      const statsData = response?.data || getMockStats();
      setStats(statsData);
    } catch (err) {
      console.log('Usando datos de ejemplo debido a error del backend:', err.message);
      // En caso de error, usar datos de ejemplo
      setStats(getMockStats());
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (metric) => {
    setSelectedMetric(metric);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMetric(null);
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
          <StatisticsGrid 
            stats={stats} 
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {isModalOpen && selectedMetric && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedMetric.title}
          data={selectedMetric.data}
          type={selectedMetric.type}
        />
      )}
    </ListPageLayout>
  );
}
