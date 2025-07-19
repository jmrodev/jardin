import React from 'react';
import Icon from './Icon';

export default function ActionButton({ 
  icon, 
  label, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  loading = false 
}) {
  return (
    <button
      className={`action-button action-button-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <Icon name={loading ? 'Loader' : icon} size={16} />
      {label}
    </button>
  );
} 