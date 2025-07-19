import React from 'react';
import { useTranslation } from 'react-i18next';
import StatCard from '../atoms/StatCard';

export default function StatisticsOverview({ stats }) {
  const { t } = useTranslation();

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  const formatPercentage = (num) => {
    return `${num?.toFixed(1) || '0'}%`;
  };

  const statCards = [
    {
      icon: 'Users',
      label: t('statistics.totalStudents'),
      value: formatNumber(stats.totalStudents || 0),
      color: 'primary'
    },
    {
      icon: 'GraduationCap',
      label: t('statistics.totalTeachers'),
      value: formatNumber(stats.totalTeachers || 0),
      color: 'secondary'
    },
    {
      icon: 'UserCheck',
      label: t('statistics.totalParents'),
      value: formatNumber(stats.totalParents || 0),
      color: 'success'
    },
    {
      icon: 'CalendarCheck',
      label: t('statistics.attendanceRate'),
      value: formatPercentage(stats.attendanceRate || 0),
      color: 'warning'
    }
  ];

  return (
    <div className="stats-overview">
      <h2 className="stats-section-title">{t('statistics.overview')}</h2>
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
} 