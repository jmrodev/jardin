import React from 'react';
import PropTypes from 'prop-types';

const SliderImage = ({ 
  src,
  alt = '',
  objectFit = 'cover', // 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  borderRadius = '5px',
  width = '100%',
  height = '100%',
  className = '',
  loading = 'lazy', // 'lazy' | 'eager'
  onClick,
  ...props 
}) => {
  const imageClasses = [
    'slider-image',
    `slider-image--${objectFit}`,
    onClick && 'slider-image--clickable',
    className
  ].filter(Boolean).join(' ');

  const imageStyle = {
    width,
    height,
    objectFit,
    borderRadius,
    ...props.style
  };

  return (
    <img 
      src={src}
      alt={alt}
      className={imageClasses}
      style={imageStyle}
      loading={loading}
      onClick={onClick}
      {...props}
    />
  );
};

SliderImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  borderRadius: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onClick: PropTypes.func
};

export default SliderImage; 