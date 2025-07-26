import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '../atoms/Icon';

export default function DashboardGrid() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewMore = (link) => {
    navigate(link);
  };

  const dashboardCards = [
    {
      id: 1,
      title: t('dashboard.students'),
      count: 150,
      description: t('dashboard.studentsDescription'),
      icon: 'Users',
      color: 'bg-blue-500',
      link: '/students'
    },
    {
      id: 2,
      title: t('dashboard.teachers'),
      count: 25,
      description: t('dashboard.teachersDescription'),
      icon: 'GraduationCap',
      color: 'bg-green-500',
      link: '/teachers'
    },
    {
      id: 3,
      title: t('dashboard.parents'),
      count: 300,
      description: t('dashboard.parentsDescription'),
      icon: 'UserCheck',
      color: 'bg-purple-500',
      link: '/parents'
    },
    {
      id: 4,
      title: t('dashboard.attendance'),
      count: 95,
      description: t('dashboard.attendanceDescription'),
      icon: 'CalendarCheck',
      color: 'bg-orange-500',
      link: '/attendance'
    },
    {
      id: 5,
      title: t('dashboard.statistics'),
      count: '',
      description: t('dashboard.statisticsDescription'),
      icon: 'BarChart',
      color: 'bg-red-500',
      link: '/statistics'
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
