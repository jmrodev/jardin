import React from 'react';
import Icon from '../atoms/Icon';

export default function AlertCard({ alert }) {
  return (
    <div className={`alert-card ${alert.type}`}>
      <div className="alert-icon">
        <Icon name={alert.icon} size={20} />
      </div>
      <div className="alert-content">
        <h4 className="alert-title">{alert.title}</h4>
        <p className="alert-message">{alert.message}</p>
        <p className="alert-action">{alert.action}</p>
      </div>
    </div>
  );
} 