import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import DashboardTemplate from '../templates/DashboardTemplate';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Obtener el nombre del usuario de diferentes posibles propiedades
  const getUserName = () => {
    if (!user) return 'Usuario';
    
    // Intentar diferentes propiedades donde podría estar el nombre
    return user.name || user.firstname || user.username || user.email || 'Usuario';
  };

  // Manejador para navegar a las diferentes secciones
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
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{t('dashboard.welcome', { name: getUserName() })}</h1>
        <p className="dashboard-subtitle">{t('dashboard.subtitle')}</p>
      </div>

      <div className="dashboard-grid">
        {dashboardCards.map((card) => (
          <div key={card.id} className="dashboard-card">
            <div className="dashboard-card-header">
              <div className={`dashboard-card-icon ${card.color}`}>
                <Icon name={card.icon} size={24} />
              </div>
              <h3 className="dashboard-card-title">{card.title}</h3>
            </div>
            <div className="dashboard-card-count">{card.count}</div>
            <p className="dashboard-card-description">{card.description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="dashboard-card-button"
              onClick={() => handleViewMore(card.link)}
            >
              <Icon name="ArrowRight" size={16} />
              {t('dashboard.viewMore')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 