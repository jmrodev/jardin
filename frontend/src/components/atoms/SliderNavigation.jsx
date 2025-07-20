import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const SliderNavigation = ({ 
  direction = 'horizontal', // 'horizontal' | 'vertical'
  showPrev = true,
  showNext = true,
  onPrev,
  onNext,
  disabled = false,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  position = 'overlay', // 'overlay' | 'side'
  ...props 
}) => {
  const navClasses = [
    'slider-navigation',
    `slider-navigation--${direction}`,
    `slider-navigation--${position}`,
    `slider-navigation--${size}`,
    className
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  return (
    <div className={navClasses} {...props}>
      {showPrev && (
        <button
          className="slider-nav-button slider-nav-button--prev"
          onClick={onPrev}
          disabled={disabled}
          aria-label="Anterior"
        >
          <Icon 
            name={direction === 'horizontal' ? 'chevron-left' : 'chevron-up'} 
            size={iconSize} 
          />
        </button>
      )}
      
      {showNext && (
        <button
          className="slider-nav-button slider-nav-button--next"
          onClick={onNext}
          disabled={disabled}
          aria-label="Siguiente"
        >
          <Icon 
            name={direction === 'horizontal' ? 'chevron-right' : 'chevron-down'} 
            size={iconSize} 
          />
        </button>
      )}
    </div>
  );
};

SliderNavigation.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  showPrev: PropTypes.bool,
  showNext: PropTypes.bool,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  position: PropTypes.oneOf(['overlay', 'side'])
};

export default SliderNavigation; 