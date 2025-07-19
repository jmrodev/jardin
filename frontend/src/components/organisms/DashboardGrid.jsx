import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '../atoms/Icon';
import PropTypes from 'prop-types';

export default function DashboardGrid({ stats = {} }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewMore = (link) => {
    navigate(link);
  };

  // Función para formatear números
  const formatNumber = (num) => {
    return num ? num.toLocaleString('es-ES') : '0';
  };

  // Función para formatear porcentaje
  const formatPercentage = (num) => {
    return num ? `${num}%` : '0%';
  };

  const dashboardCards = [
    {
      id: 1,
      title: t('dashboard.students'),
      count: formatNumber(stats.students || 0),
      description: t('dashboard.studentsDescription'),
      icon: 'Users',
      color: 'bg-blue-500',
      link: '/students'
    },
    {
      id: 2,
      title: t('dashboard.teachers'),
      count: formatNumber(stats.teachers || 0),
      description: t('dashboard.teachersDescription'),
      icon: 'GraduationCap',
      color: 'bg-green-500',
      link: '/teachers'
    },
    {
      id: 3,
      title: t('dashboard.parents'),
      count: formatNumber(stats.parents || 0),
      description: t('dashboard.parentsDescription'),
      icon: 'UserCheck',
      color: 'bg-purple-500',
      link: '/parents'
    },
    {
      id: 4,
      title: t('dashboard.attendance'),
      count: formatPercentage(stats.todayAttendance || 0),
      description: t('dashboard.attendanceDescription'),
      icon: 'CalendarCheck',
      color: 'bg-orange-500',
      link: '/attendance'
    }
  ];

  return (
    <div className="dashboard-grid">
      {dashboardCards.map((card) => (
        <div 
          key={card.id} 
          className="card"
          onClick={() => handleViewMore(card.link)}
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          role="button"
          onKeyPress={e => { if (e.key === 'Enter') handleViewMore(card.link); }}
        >
          <div className="card-header">
            <div className={`card-icon ${card.color}`}>
              <Icon name={card.icon} size={24} />
            </div>
            <h3 className="card-title">{card.title}</h3>
          </div>
          <div className="card-count">{card.count}</div>
        </div>
      ))}
    </div>
  );
}

DashboardGrid.propTypes = {
  stats: PropTypes.shape({
    students: PropTypes.number,
    teachers: PropTypes.number,
    parents: PropTypes.number,
    todayAttendance: PropTypes.number
  })
};
