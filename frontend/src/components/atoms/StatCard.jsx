import React from 'react';
import Icon from './Icon';

export default function StatCard({ icon, label, value, color = 'primary' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon-${color}`}>
        <Icon name={icon} size={24} />
      </div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
} 