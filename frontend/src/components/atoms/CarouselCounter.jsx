import React from 'react';
import PropTypes from 'prop-types';

const CarouselCounter = ({ 
  currentIndex,
  totalSlides,
  className = '',
  showDescription = false,
  description = '',
  ...props 
}) => {
  const counterClasses = [
    'carousel-counter',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="carousel-info" {...props}>
      <span className={counterClasses}>
        {currentIndex + 1} / {totalSlides}
      </span>
      {showDescription && description && (
        <span className="carousel-description">
          {description}
        </span>
      )}
    </div>
  );
};

CarouselCounter.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
  className: PropTypes.string,
  showDescription: PropTypes.bool,
  description: PropTypes.string
};

export default CarouselCounter; 