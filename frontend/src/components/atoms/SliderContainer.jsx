import React from 'react';
import PropTypes from 'prop-types';

const SliderContainer = ({ 
  children,
  direction = 'horizontal', // 'horizontal' | 'vertical'
  snapType = 'mandatory', // 'mandatory' | 'proximity' | 'none'
  snapAlign = 'center', // 'start' | 'center' | 'end'
  aspectRatio = null, // '16/9', '4/3', '1/1', etc.
  width = '100%',
  height = 'auto',
  className = '',
  showScrollbar = false,
  autoScroll = false,
  autoScrollInterval = 3000,
  ...props 
}) => {
  const containerClasses = [
    'slider-container',
    `slider-container--${direction}`,
    `slider-container--snap-${snapType}`,
    `slider-container--align-${snapAlign}`,
    !showScrollbar && 'slider-container--no-scrollbar',
    className
  ].filter(Boolean).join(' ');

  const containerStyle = {
    width,
    height,
    ...(aspectRatio && { aspectRatio }),
    ...props.style
  };

  return (
    <div 
      className={containerClasses}
      style={containerStyle}
      {...props}
    >
      <div className="slider-track">
        {children}
      </div>
    </div>
  );
};

SliderContainer.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  snapType: PropTypes.oneOf(['mandatory', 'proximity', 'none']),
  snapAlign: PropTypes.oneOf(['start', 'center', 'end']),
  aspectRatio: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  showScrollbar: PropTypes.bool,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number
};

export default SliderContainer; 