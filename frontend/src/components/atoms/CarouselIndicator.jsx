import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const CarouselIndicator = ({ 
  icon,
  label,
  isActive = false,
  onClick,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  ...props 
}) => {
  const indicatorClasses = [
    'carousel-indicator',
    `carousel-indicator--${size}`,
    isActive && 'carousel-indicator--active',
    className
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 10 : size === 'lg' ? 16 : 12;

  return (
    <button
      className={indicatorClasses}
      onClick={onClick}
      aria-label={label}
      {...props}
    >
      <div className="indicator-icon">
        <Icon name={icon} size={iconSize} />
      </div>
      {label && (
        <span className="indicator-label">{label}</span>
      )}
    </button>
  );
};

CarouselIndicator.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default CarouselIndicator; 