import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SimpleCarousel = ({ 
  slides = [],
  className = '',
  ...props 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`simple-carousel ${className}`} {...props}>
      {/* Flecha izquierda */}
      <button 
        className="carousel-arrow carousel-arrow--left"
        onClick={prevSlide}
        disabled={slides.length <= 1}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Contenido del carrusel */}
      <div className="carousel-content">
        {currentSlideData.content}
      </div>

      {/* Flecha derecha */}
      <button 
        className="carousel-arrow carousel-arrow--right"
        onClick={nextSlide}
        disabled={slides.length <= 1}
        aria-label="Slide siguiente"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

SimpleCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.node.isRequired
    })
  ).isRequired,
  className: PropTypes.string
};

export default SimpleCarousel; 