import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import DashboardGrid from '../organisms/DashboardGrid';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const getUserName = () => {
    if (!user) return 'Usuario';
    return user.name || user.firstname || user.username || user.email || 'Usuario';
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{t('dashboard.welcome', { name: getUserName() })}</h1>
        <p className="dashboard-subtitle">{t('dashboard.subtitle')}</p>
      </div>

      <DashboardGrid />
    </div>
  );
} 