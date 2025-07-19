import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

export default function DashboardGrid() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewMore = (link) => {
    navigate(link);
  };

  const dashboardCards = [
    {
      id: 1,
      title: t('dashboard.manageStudents'),
      description: t('dashboard.studentsDescription'),
      icon: 'Users',
      colorClass: 'dashboard-card-icon--primary',
      link: '/students',
      action: t('dashboard.viewStudents')
    },
    {
      id: 2,
      title: t('dashboard.manageTeachers'),
      description: t('dashboard.teachersDescription'),
      icon: 'GraduationCap',
      colorClass: 'dashboard-card-icon--success',
      link: '/teachers',
      action: t('dashboard.viewTeachers')
    },
    {
      id: 3,
      title: t('dashboard.manageParents'),
      description: t('dashboard.parentsDescription'),
      icon: 'UserCheck',
      colorClass: 'dashboard-card-icon--warning',
      link: '/parents',
      action: t('dashboard.viewParents')
    },
    {
      id: 4,
      title: t('dashboard.manageAttendance'),
      description: t('dashboard.attendanceDescription'),
      icon: 'CalendarCheck',
      colorClass: 'dashboard-card-icon--info',
      link: '/attendance',
      action: t('dashboard.viewAttendance')
    },
    {
      id: 5,
      title: t('dashboard.viewStatistics'),
      description: t('dashboard.statisticsDescription'),
      icon: 'BarChart3',
      colorClass: 'dashboard-card-icon--secondary',
      link: '/statistics',
      action: t('dashboard.viewStatistics')
    }
  ];

  return (
    <div className="dashboard-grid">
      {dashboardCards.map((card) => (
        <div 
          key={card.id} 
          className="dashboard-card"
        >
          <div className="dashboard-card-header">
            <div 
              className={`dashboard-card-icon ${card.colorClass}`}
            >
              <Icon name={card.icon} size={24} />
            </div>
            <h3 className="dashboard-card-title">{card.title}</h3>
          </div>
          <div className="dashboard-card-content">
            <p className="dashboard-card-description">{card.description}</p>
            <Button
              variant="primary"
              onClick={() => handleViewMore(card.link)}
              className="dashboard-card-button"
            >
              {card.action}
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
