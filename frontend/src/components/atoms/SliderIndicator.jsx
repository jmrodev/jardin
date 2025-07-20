import React from 'react';
import PropTypes from 'prop-types';

const SliderIndicator = ({ 
  totalItems,
  currentIndex = 0,
  direction = 'horizontal', // 'horizontal' | 'vertical'
  position = 'bottom', // 'top' | 'bottom' | 'left' | 'right'
  variant = 'dots', // 'dots' | 'numbers' | 'progress'
  className = '',
  onItemClick,
  ...props 
}) => {
  const indicatorClasses = [
    'slider-indicator',
    `slider-indicator--${direction}`,
    `slider-indicator--${position}`,
    `slider-indicator--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const renderDots = () => (
    <div className="slider-indicator-dots">
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          key={index}
          className={`slider-indicator-dot ${index === currentIndex ? 'slider-indicator-dot--active' : ''}`}
          onClick={() => onItemClick?.(index)}
          aria-label={`Ir al elemento ${index + 1}`}
        />
      ))}
    </div>
  );

  const renderNumbers = () => (
    <div className="slider-indicator-numbers">
      <span className="slider-indicator-current">{currentIndex + 1}</span>
      <span className="slider-indicator-separator">/</span>
      <span className="slider-indicator-total">{totalItems}</span>
    </div>
  );

  const renderProgress = () => (
    <div className="slider-indicator-progress">
      <div 
        className="slider-indicator-progress-bar"
        style={{ 
          width: `${((currentIndex + 1) / totalItems) * 100}%` 
        }}
      />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'numbers':
        return renderNumbers();
      case 'progress':
        return renderProgress();
      default:
        return renderDots();
    }
  };

  return (
    <div className={indicatorClasses} {...props}>
      {renderContent()}
    </div>
  );
};

SliderIndicator.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentIndex: PropTypes.number,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['dots', 'numbers', 'progress']),
  className: PropTypes.string,
  onItemClick: PropTypes.func
};

export default SliderIndicator; 