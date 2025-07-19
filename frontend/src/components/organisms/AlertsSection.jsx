import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import AlertCard from '../molecules/AlertCard';

export default function AlertsSection({ alerts }) {
  const { t } = useTranslation();

  if (alerts.length === 0) return null;

  return (
    <div className="alerts-section">
      <h3 className="alerts-title">
        <Icon name="AlertTriangle" size={20} />
        {t('statistics.alerts')} ({alerts.length})
      </h3>
      <div className="alerts-grid">
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </div>
    </div>
  );
} 