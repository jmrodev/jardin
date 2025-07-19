import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
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
      description: t('dashboard.studentsDescription'),
      icon: 'Users',
      iconColor: 'skyblue',
      borderColor: 'skyblue',
      link: '/students',
      action: t('dashboard.enter')
    },
    {
      id: 2,
      title: t('dashboard.teachers'),
      description: t('dashboard.teachersDescription'),
      icon: 'GraduationCap',
      iconColor: 'orange',
      borderColor: 'orange',
      link: '/teachers',
      action: t('dashboard.enter')
    },
    {
      id: 3,
      title: t('dashboard.parents'),
      description: t('dashboard.parentsDescription'),
      icon: 'UserCheck',
      iconColor: 'lime',
      borderColor: 'lime',
      link: '/parents',
      action: t('dashboard.enter')
    },
    {
      id: 4,
      title: t('dashboard.attendance'),
      description: t('dashboard.attendanceDescription'),
      icon: 'CalendarCheck',
      iconColor: 'pink',
      borderColor: 'pink',
      link: '/attendance',
      action: t('dashboard.enter')
    },
    {
      id: 5,
      title: t('dashboard.statistics'),
      description: t('dashboard.statisticsDescription'),
      icon: 'BarChart3',
      iconColor: 'purple',
      borderColor: 'purple',
      link: '/statistics',
      action: t('dashboard.enter')
    }
  ];

  return (
    <div className="dashboard-grid">
      {dashboardCards.map((card) => (
        <Card
          key={card.id}
          variant="dashboard"
          icon={card.icon}
          iconColor={card.iconColor}
          title={card.title}
          description={card.description}
          data-border-color={card.borderColor}
          actions={
            <Button
              variant="primary"
              onClick={() => handleViewMore(card.link)}
              className="dashboard-card-button"
            >
              {card.action}
              <Icon name="ArrowRight" size={16} />
            </Button>
          }
        />
      ))}
    </div>
  );
}
