import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import '@/styles/organisms/statistics-grid.css';

const StatisticsGrid = ({ stats, onViewDetails }) => {
  const { t } = useTranslation();

  // Preparar datos para las métricas
  const metrics = [
    // Fila 1: Métricas Principales
    {
      id: 'total-students',
      title: t('statistics.totalStudents'),
      value: stats.totalStudents || 0,
      icon: 'Users',
      iconColor: 'skyblue',
      borderColor: 'skyblue',
      trend: stats.studentsTrend || 0,
      type: 'students'
    },
    {
      id: 'total-teachers',
      title: t('statistics.totalTeachers'),
      value: stats.totalTeachers || 0,
      icon: 'GraduationCap',
      iconColor: 'orange',
      borderColor: 'orange',
      trend: stats.teachersTrend || 0,
      type: 'teachers'
    },
    {
      id: 'total-parents',
      title: t('statistics.totalParents'),
      value: stats.totalParents || 0,
      icon: 'UserCheck',
      iconColor: 'lime',
      borderColor: 'lime',
      trend: stats.parentsTrend || 0,
      type: 'parents'
    },
    {
      id: 'attendance-rate',
      title: t('statistics.attendanceRate'),
      value: `${stats.attendanceRate || 0}%`,
      icon: 'CalendarCheck',
      iconColor: 'pink',
      borderColor: 'pink',
      trend: stats.attendanceTrend || 0,
      type: 'attendance'
    },

    // Fila 2: Distribución Demográfica
    {
      id: 'age-distribution',
      title: t('statistics.ageDistribution'),
      value: t('statistics.byAge'),
      icon: 'PieChart',
      iconColor: 'primary',
      borderColor: 'primary',
      data: stats.ageDistribution || [],
      type: 'demographics'
    },
    {
      id: 'gender-distribution',
      title: t('statistics.genderDistribution'),
      value: t('statistics.byGender'),
      icon: 'BarChart3',
      iconColor: 'success',
      borderColor: 'success',
      data: stats.genderDistribution || [],
      type: 'demographics'
    },
    {
      id: 'classroom-distribution',
      title: t('statistics.classroomDistribution'),
      value: t('statistics.byClassroom'),
      icon: 'Building',
      iconColor: 'warning',
      borderColor: 'warning',
      data: stats.classroomDistribution || [],
      type: 'classrooms'
    },
    {
      id: 'monthly-trend',
      title: t('statistics.monthlyTrend'),
      value: t('statistics.lastMonth'),
      icon: 'TrendingUp',
      iconColor: 'danger',
      borderColor: 'danger',
      data: stats.monthlyTrend || [],
      type: 'trends'
    },

    // Fila 3: Indicadores de Rendimiento
    {
      id: 'weekly-attendance',
      title: t('statistics.weeklyAttendance'),
      value: `${stats.weeklyAttendance || 0}%`,
      icon: 'Calendar',
      iconColor: 'orange',
      borderColor: 'orange',
      data: stats.weeklyData || [],
      type: 'performance'
    },
    {
      id: 'classroom-occupancy',
      title: t('statistics.classroomOccupancy'),
      value: `${stats.classroomOccupancy || 0}%`,
      icon: 'Users',
      iconColor: 'lime',
      borderColor: 'lime',
      data: stats.occupancyData || [],
      type: 'performance'
    },
    {
      id: 'new-enrollments',
      title: t('statistics.newEnrollments'),
      value: stats.newEnrollments || 0,
      icon: 'UserPlus',
      iconColor: 'pink',
      borderColor: 'pink',
      trend: stats.enrollmentTrend || 0,
      type: 'enrollments'
    },
    {
      id: 'retention-rate',
      title: t('statistics.retentionRate'),
      value: `${stats.retentionRate || 0}%`,
      icon: 'Heart',
      iconColor: 'purple',
      borderColor: 'purple',
      trend: stats.retentionTrend || 0,
      type: 'performance'
    },

    // Fila 4: Alertas y Acciones
    {
      id: 'low-attendance',
      title: t('statistics.lowAttendance'),
      value: stats.lowAttendanceStudents || 0,
      icon: 'AlertTriangle',
      iconColor: 'danger',
      borderColor: 'danger',
      urgent: true,
      type: 'alerts'
    },
    {
      id: 'full-classrooms',
      title: t('statistics.fullClassrooms'),
      value: stats.fullClassrooms || 0,
      icon: 'AlertCircle',
      iconColor: 'warning',
      borderColor: 'warning',
      urgent: true,
      type: 'alerts'
    },
    {
      id: 'upcoming-events',
      title: t('statistics.upcomingEvents'),
      value: stats.upcomingEvents || 0,
      icon: 'Calendar',
      iconColor: 'success',
      borderColor: 'success',
      type: 'events'
    },
    {
      id: 'pending-tasks',
      title: t('statistics.pendingTasks'),
      value: stats.pendingTasks || 0,
      icon: 'CheckSquare',
      iconColor: 'skyblue',
      borderColor: 'skyblue',
      type: 'tasks'
    },

    // Fila 5: Métricas Adicionales
    {
      id: 'total-classrooms',
      title: t('statistics.totalClassrooms'),
      value: stats.totalClassrooms || 6,
      icon: 'Building',
      iconColor: 'purple',
      borderColor: 'purple',
      type: 'classrooms'
    },
    {
      id: 'shift-distribution',
      title: t('statistics.shiftDistribution'),
      value: t('statistics.byShift'),
      icon: 'Clock',
      iconColor: 'skyblue',
      borderColor: 'skyblue',
      data: stats.shiftDistribution || [],
      type: 'demographics'
    },
    {
      id: 'average-age',
      title: t('statistics.averageAge'),
      value: `${stats.averageAge || 4.2} años`,
      icon: 'User',
      iconColor: 'primary',
      borderColor: 'primary',
      type: 'demographics'
    },
    {
      id: 'system-health',
      title: t('statistics.systemHealth'),
      value: t('statistics.excellent'),
      icon: 'Activity',
      iconColor: 'lime',
      borderColor: 'lime',
      type: 'system'
    }
  ];

  return (
    <div className="statistics-grid">
      <div className="statistics-grid__header">
        <h2 className="statistics-title">{t('statistics.overview')}</h2>
        <p className="statistics-subtitle">{t('statistics.realTimeData')}</p>
      </div>

      <div className="statistics-grid__content">
        {metrics.map((metric) => (
          <div key={metric.id} className="statistics-grid__item">
            <Card
              variant="dashboard"
              icon={metric.icon}
              iconColor={metric.iconColor}
              title={metric.title}
              description={metric.value}
              data-border-color={metric.borderColor}
              className="statistics-card"
              actions={
                <div className="statistics-card__actions">
                  {metric.trend && (
                    <div className={`trend-indicator ${metric.trend > 0 ? 'positive' : 'negative'}`}>
                      <Icon name={metric.trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                      <span>{Math.abs(metric.trend)}%</span>
                    </div>
                  )}
                  {metric.urgent && (
                    <div className="urgent-indicator">
                      <Icon name="AlertCircle" size={12} />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(metric)}
                    className="view-details-btn"
                  >
                    <Icon name="Eye" size={14} />
                    {t('common.viewDetails')}
                  </Button>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

StatisticsGrid.propTypes = {
  stats: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StatisticsGrid; 