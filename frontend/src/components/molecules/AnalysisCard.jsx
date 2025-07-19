import React from 'react';
import Icon from '../atoms/Icon';

export default function AnalysisCard({ icon, title, content }) {
  return (
    <div className="analysis-card">
      <div className="analysis-icon">
        <Icon name={icon} size={20} />
      </div>
      <div className="analysis-content">
        <h4>{title}</h4>
        <p className="analysis-text">{content}</p>
      </div>
    </div>
  );
} 