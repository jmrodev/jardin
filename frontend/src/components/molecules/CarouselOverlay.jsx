import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CarouselControl from '../atoms/CarouselControl';
import CarouselIndicator from '../atoms/CarouselIndicator';
import CarouselCounter from '../atoms/CarouselCounter';
import CarouselSlide from '../atoms/CarouselSlide';

const CarouselOverlay = ({ 
  slides = [],
  showIndicators = true,
  showCounter = true,
  showControls = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  controlsPosition = 'top', // 'top' | 'bottom' | 'overlay'
  className = '',
  ...props 
}) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length, currentSlide]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`carousel carousel--overlay carousel--${controlsPosition} ${className}`} {...props}>
      {/* Controles de navegación por encima */}
      {showControls && controlsPosition === 'top' && (
        <div className="carousel-controls carousel-controls--top">
          <CarouselControl
            direction="prev"
            onClick={prevSlide}
            disabled={slides.length <= 1}
          />
          
          {showIndicators && (
            <div className="carousel-indicators">
              {slides.map((slide, index) => (
                <CarouselIndicator
                  key={slide.id || index}
                  icon={slide.icon}
                  label={slide.title}
                  isActive={index === currentSlide}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}

          <CarouselControl
            direction="next"
            onClick={nextSlide}
            disabled={slides.length <= 1}
          />
        </div>
      )}

      {/* Contenido del carrusel */}
      <div className="carousel-content">
        <CarouselSlide
          icon={currentSlideData.icon}
          iconColor={currentSlideData.iconColor}
          title={currentSlideData.title}
          borderColor={currentSlideData.borderColor}
          variant={currentSlideData.variant}
        >
          {currentSlideData.content}
        </CarouselSlide>
      </div>

      {/* Controles de navegación por debajo */}
      {showControls && controlsPosition === 'bottom' && (
        <div className="carousel-controls carousel-controls--bottom">
          <CarouselControl
            direction="prev"
            onClick={prevSlide}
            disabled={slides.length <= 1}
          />
          
          {showIndicators && (
            <div className="carousel-indicators">
              {slides.map((slide, index) => (
                <CarouselIndicator
                  key={slide.id || index}
                  icon={slide.icon}
                  label={slide.title}
                  isActive={index === currentSlide}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}

          <CarouselControl
            direction="next"
            onClick={nextSlide}
            disabled={slides.length <= 1}
          />
        </div>
      )}

      {/* Controles superpuestos */}
      {showControls && controlsPosition === 'overlay' && (
        <div className="carousel-controls carousel-controls--overlay">
          <CarouselControl
            direction="prev"
            onClick={prevSlide}
            disabled={slides.length <= 1}
            className="carousel-control--overlay"
          />
          
          <CarouselControl
            direction="next"
            onClick={nextSlide}
            disabled={slides.length <= 1}
            className="carousel-control--overlay"
          />
        </div>
      )}

      {/* Indicadores superpuestos */}
      {showIndicators && controlsPosition === 'overlay' && (
        <div className="carousel-indicators carousel-indicators--overlay">
          {slides.map((slide, index) => (
            <CarouselIndicator
              key={slide.id || index}
              icon={slide.icon}
              label={slide.title}
              isActive={index === currentSlide}
              onClick={() => goToSlide(index)}
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Información de navegación */}
      {showCounter && (
        <CarouselCounter
          currentIndex={currentSlide}
          totalSlides={slides.length}
          showDescription={true}
          description={currentSlideData.title}
        />
      )}
    </div>
  );
};

CarouselOverlay.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.string,
      iconColor: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      borderColor: PropTypes.string,
      variant: PropTypes.oneOf(['default', 'analysis', 'demographic'])
    })
  ).isRequired,
  showIndicators: PropTypes.bool,
  showCounter: PropTypes.bool,
  showControls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  controlsPosition: PropTypes.oneOf(['top', 'bottom', 'overlay']),
  className: PropTypes.string
};

export default CarouselOverlay; 