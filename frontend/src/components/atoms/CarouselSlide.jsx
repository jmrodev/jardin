import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const CarouselSlide = ({ 
  children,
  icon,
  iconColor = 'primary',
  title,
  borderColor = 'primary',
  className = '',
  variant = 'default', // 'default' | 'analysis' | 'demographic'
  ...props 
}) => {
  const slideClasses = [
    'carousel-slide',
    `carousel-slide--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'slide-icon',
    `slide-icon--${iconColor}`
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={slideClasses}
      data-border-color={borderColor}
      {...props}
    >
      {(icon || title) && (
        <div className="slide-header">
          {icon && (
            <div className={iconClasses}>
              <Icon name={icon} size={20} />
            </div>
          )}
          {title && (
            <h4 className="slide-title">{title}</h4>
          )}
        </div>
      )}
      
      <div className="slide-content">
        {children}
      </div>
    </div>
  );
};

CarouselSlide.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  title: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'analysis', 'demographic'])
};

export default CarouselSlide; 