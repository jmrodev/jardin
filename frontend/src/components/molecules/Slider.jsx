import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SliderContainer from '../atoms/SliderContainer';
import SliderItem from '../atoms/SliderItem';
import SliderImage from '../atoms/SliderImage';
import SliderNavigation from '../atoms/SliderNavigation';
import SliderIndicator from '../atoms/SliderIndicator';

const Slider = ({ 
  items = [],
  direction = 'horizontal',
  snapType = 'mandatory',
  snapAlign = 'center',
  aspectRatio = null,
  width = '100%',
  height = 'auto',
  showNavigation = false,
  showIndicator = false,
  indicatorVariant = 'dots',
  indicatorPosition = 'bottom',
  navigationPosition = 'overlay',
  navigationSize = 'md',
  hideScrollbar = true,
  autoScroll = false,
  autoScrollInterval = 3000,
  className = '',
  onItemClick,
  ...props 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || items.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      scrollToIndex(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, items.length, currentIndex]);

  // Scroll to specific index
  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const itemWidth = container.offsetWidth;
    const scrollPosition = index * itemWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
  };

  // Handle scroll events to update current index
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const itemWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(nextIndex);
  };

  // Handle indicator click
  const handleIndicatorClick = (index) => {
    scrollToIndex(index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`slider-wrapper ${className}`} {...props}>
      <SliderContainer
        ref={containerRef}
        direction={direction}
        snapType={snapType}
        snapAlign={snapAlign}
        aspectRatio={aspectRatio}
        width={width}
        height={height}
        showScrollbar={!hideScrollbar}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <SliderItem
            key={item.id || index}
            snapAlign={snapAlign}
            width="100%"
            onClick={() => onItemClick?.(item, index)}
          >
            {item.type === 'image' ? (
              <SliderImage
                src={item.src}
                alt={item.alt || ''}
                objectFit={item.objectFit || 'cover'}
                borderRadius={item.borderRadius || '5px'}
                onClick={() => onItemClick?.(item, index)}
              />
            ) : (
              item.content || item
            )}
          </SliderItem>
        ))}
      </SliderContainer>

      {/* Navigation */}
      {showNavigation && items.length > 1 && (
        <SliderNavigation
          direction={direction}
          onPrev={handlePrev}
          onNext={handleNext}
          disabled={false}
          size={navigationSize}
          position={navigationPosition}
        />
      )}

      {/* Indicator */}
      {showIndicator && items.length > 1 && (
        <SliderIndicator
          totalItems={items.length}
          currentIndex={currentIndex}
          direction={direction}
          position={indicatorPosition}
          variant={indicatorVariant}
          onItemClick={handleIndicatorClick}
        />
      )}
    </div>
  );
};

Slider.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.oneOf(['image', 'content']),
        src: PropTypes.string,
        alt: PropTypes.string,
        objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
        borderRadius: PropTypes.string,
        content: PropTypes.node
      }),
      PropTypes.node
    ])
  ).isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  snapType: PropTypes.oneOf(['mandatory', 'proximity', 'none']),
  snapAlign: PropTypes.oneOf(['start', 'center', 'end']),
  aspectRatio: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showNavigation: PropTypes.bool,
  showIndicator: PropTypes.bool,
  indicatorVariant: PropTypes.oneOf(['dots', 'numbers', 'progress']),
  indicatorPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  navigationPosition: PropTypes.oneOf(['overlay', 'side']),
  navigationSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  hideScrollbar: PropTypes.bool,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number,
  className: PropTypes.string,
  onItemClick: PropTypes.func
};

export default Slider; 