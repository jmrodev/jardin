import React from 'react';
import Icon from './Icon';

export default function PeriodButton({ period, isActive, onClick }) {
  return (
    <button
      className={`period-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon name={period.icon} size={16} />
      {period.label}
    </button>
  );
} 