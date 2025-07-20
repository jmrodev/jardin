import React from 'react';
import Slider from '../molecules/Slider';

const SliderExample = () => {
  // Ejemplo de imágenes para el slider (basado en el código CSS que mostraste)
  const imageItems = [
    {
      id: 'mario1',
      type: 'image',
      src: 'https://www.gamespot.com/a/uploads/scale_super/1597/15976769/4097326-the-super-mario-bros.-movie-poster.jpg',
      alt: 'The Super Mario Bros. Movie Poster',
      objectFit: 'cover',
      borderRadius: '5px'
    },
    {
      id: 'mario2',
      type: 'image',
      src: 'https://www.gamespot.com/a/uploads/scale_super/1597/15976769/4097353-super-mario-bros-movie-pcers-v0-1asm3wqnyz2a1.jpg',
      alt: 'Super Mario Bros Movie PC',
      objectFit: 'cover',
      borderRadius: '5px'
    },
    {
      id: 'mario3',
      type: 'image',
      src: 'https://www.gamespot.com/a/uploads/scale_super/1597/15976769/4097354-fisljmax0aif.jpg',
      alt: 'Super Mario Bros Movie',
      objectFit: 'cover',
      borderRadius: '5px'
    }
  ];

  // Ejemplo de contenido mixto
  const mixedItems = [
    {
      id: 'card1',
      type: 'content',
      content: (
        <div style={{ 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '10px',
          textAlign: 'center',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3>Tarjeta 1</h3>
          <p>Contenido personalizado con gradiente</p>
        </div>
      )
    },
    {
      id: 'card2',
      type: 'content',
      content: (
        <div style={{ 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: '10px',
          textAlign: 'center',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3>Tarjeta 2</h3>
          <p>Otra tarjeta con diferente estilo</p>
        </div>
      )
    },
    {
      id: 'card3',
      type: 'content',
      content: (
        <div style={{ 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          borderRadius: '10px',
          textAlign: 'center',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3>Tarjeta 3</h3>
          <p>Última tarjeta del slider</p>
        </div>
      )
    }
  ];

  const handleItemClick = (item, index) => {
    console.log('Item clicked:', item, 'Index:', index);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Ejemplos de Slider con Átomos
      </h2>
      
      {/* Slider de Imágenes - Similar al código CSS que mostraste */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Slider de Imágenes (Horizontal)</h3>
        <Slider 
          items={imageItems}
          direction="horizontal"
          snapType="mandatory"
          snapAlign="center"
          aspectRatio="10/16"
          width="300px"
          showNavigation={true}
          showIndicator={true}
          indicatorVariant="dots"
          indicatorPosition="bottom"
          navigationPosition="overlay"
          hideScrollbar={true}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Slider de Contenido Mixto */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Slider de Contenido Mixto</h3>
        <Slider 
          items={mixedItems}
          direction="horizontal"
          snapType="mandatory"
          snapAlign="center"
          width="100%"
          height="200px"
          showNavigation={true}
          showIndicator={true}
          indicatorVariant="numbers"
          indicatorPosition="bottom"
          navigationPosition="side"
          hideScrollbar={true}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Slider Vertical */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Slider Vertical</h3>
        <Slider 
          items={imageItems}
          direction="vertical"
          snapType="mandatory"
          snapAlign="center"
          width="300px"
          height="400px"
          showNavigation={true}
          showIndicator={true}
          indicatorVariant="progress"
          indicatorPosition="right"
          navigationPosition="overlay"
          hideScrollbar={true}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Slider con Auto-scroll */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Slider con Auto-scroll</h3>
        <Slider 
          items={imageItems}
          direction="horizontal"
          snapType="mandatory"
          snapAlign="center"
          aspectRatio="10/16"
          width="300px"
          showNavigation={false}
          showIndicator={true}
          indicatorVariant="dots"
          indicatorPosition="bottom"
          autoScroll={true}
          autoScrollInterval={2000}
          hideScrollbar={true}
          onItemClick={handleItemClick}
        />
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Características del Slider:</h3>
        <ul>
          <li><strong>Scroll Nativo:</strong> Usa scroll-snap para navegación táctil</li>
          <li><strong>Átomos Modulares:</strong> SliderContainer, SliderItem, SliderImage, SliderNavigation, SliderIndicator</li>
          <li><strong>Flexible:</strong> Soporta imágenes y contenido personalizado</li>
          <li><strong>Responsive:</strong> Adaptado para móviles y tablets</li>
          <li><strong>Configurable:</strong> Múltiples opciones de personalización</li>
          <li><strong>Auto-scroll:</strong> Reproducción automática opcional</li>
        </ul>
      </div>
    </div>
  );
};

export default SliderExample; 