import React from 'react';
import PropTypes from 'prop-types';

const SliderItem = ({ 
  children,
  snapAlign = 'center', // 'start' | 'center' | 'end'
  width = '100%',
  height = 'auto',
  minWidth = null,
  flexShrink = 0,
  className = '',
  onClick,
  ...props 
}) => {
  const itemClasses = [
    'slider-item',
    `slider-item--align-${snapAlign}`,
    onClick && 'slider-item--clickable',
    className
  ].filter(Boolean).join(' ');

  const itemStyle = {
    width,
    height,
    minWidth,
    flexShrink,
    ...props.style
  };

  return (
    <div 
      className={itemClasses}
      style={itemStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

SliderItem.propTypes = {
  children: PropTypes.node.isRequired,
  snapAlign: PropTypes.oneOf(['start', 'center', 'end']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexShrink: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SliderItem; 