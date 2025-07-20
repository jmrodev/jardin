import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const CarouselControl = ({ 
  direction = 'next', // 'next' | 'prev'
  onClick, 
  disabled = false,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  ...props 
}) => {
  const controlClasses = [
    'carousel-control',
    `carousel-control--${direction}`,
    `carousel-control--${size}`,
    disabled && 'carousel-control--disabled',
    className
  ].filter(Boolean).join(' ');

  const iconName = direction === 'next' ? 'chevron-right' : 'chevron-left';
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  return (
    <button
      className={controlClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'next' ? 'Siguiente' : 'Anterior'}
      {...props}
    >
      <Icon name={iconName} size={iconSize} />
    </button>
  );
};

CarouselControl.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev']),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default CarouselControl; 