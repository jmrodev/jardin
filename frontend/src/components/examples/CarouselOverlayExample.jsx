import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../molecules/Carousel';
import CarouselOverlay from '../molecules/CarouselOverlay';

const CarouselOverlayExample = () => {
  const { t } = useTranslation();

  // Ejemplo de slides para el carrusel
  const slides = [
    {
      id: 'attendance',
      title: t('statistics.attendanceTrend'),
      icon: 'TrendingUp',
      iconColor: 'blue',
      borderColor: 'blue',
      variant: 'analysis',
      content: (
        <div>
          <p>El análisis de asistencia muestra una tendencia positiva con un 92% de asistencia promedio.</p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
            <strong>Recomendación:</strong> Mantener las estrategias actuales de motivación estudiantil.
          </div>
        </div>
      )
    },
    {
      id: 'performance',
      title: t('statistics.performance'),
      icon: 'Target',
      iconColor: 'orange',
      borderColor: 'orange',
      variant: 'analysis',
      content: (
        <div>
          <p>El rendimiento académico se mantiene estable con una ratio estudiante-maestro óptima.</p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px' }}>
            <strong>Métrica:</strong> 15 estudiantes por maestro en promedio.
          </div>
        </div>
      )
    },
    {
      id: 'demographics',
      title: t('statistics.demographics'),
      icon: 'Users',
      iconColor: 'green',
      borderColor: 'green',
      variant: 'demographic',
      content: (
        <div>
          <p>Distribución demográfica equilibrada con representación diversa en todos los niveles.</p>
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>52%</div>
              <div>Mujeres</div>
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>48%</div>
              <div>Hombres</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'recommendations',
      title: t('statistics.recommendations'),
      icon: 'AlertCircle',
      iconColor: 'purple',
      borderColor: 'purple',
      variant: 'analysis',
      content: (
        <div>
          <p>Recomendaciones basadas en el análisis de datos actuales.</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Implementar programas de tutoría personalizada</li>
            <li>Fortalecer la comunicación con padres</li>
            <li>Desarrollar actividades extracurriculares</li>
            <li>Mejorar la infraestructura tecnológica</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Carrusel con Controles por Encima del Contenido
      </h2>
      
      {/* Carrusel con controles por encima */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Controles por Encima (Top)</h3>
        <CarouselOverlay 
          slides={slides}
          showIndicators={true}
          showCounter={true}
          showControls={true}
          controlsPosition="top"
          autoPlay={false}
          autoPlayInterval={5000}
        />
      </div>

      {/* Carrusel con controles superpuestos */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Controles Superpuestos (Overlay)</h3>
        <CarouselOverlay 
          slides={slides}
          showIndicators={true}
          showCounter={true}
          showControls={true}
          controlsPosition="overlay"
          autoPlay={false}
          autoPlayInterval={5000}
        />
      </div>

      {/* Carrusel con controles por debajo */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Controles por Debajo (Bottom)</h3>
        <CarouselOverlay 
          slides={slides}
          showIndicators={true}
          showCounter={true}
          showControls={true}
          controlsPosition="bottom"
          autoPlay={false}
          autoPlayInterval={5000}
        />
      </div>

      {/* Carrusel original para comparación */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Carrusel Original (Controles integrados)</h3>
        <Carousel 
          slides={slides}
          showIndicators={true}
          showCounter={true}
          showControls={true}
          autoPlay={false}
          autoPlayInterval={5000}
        />
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Características de los Controles por Encima:</h3>
        <ul>
          <li><strong>Z-Index Alto:</strong> Los controles tienen z-index: 30 para estar por encima del contenido</li>
          <li><strong>Posicionamiento Flexible:</strong> Top, Bottom o Overlay</li>
          <li><strong>Fondo Semi-transparente:</strong> Los controles overlay tienen backdrop-filter para mejor visibilidad</li>
          <li><strong>Responsive:</strong> Se adaptan a diferentes tamaños de pantalla</li>
          <li><strong>Accesibilidad:</strong> Mantienen todos los aria-labels y navegación por teclado</li>
        </ul>
        
        <h4 style={{ marginTop: '1rem' }}>Opciones de Posicionamiento:</h4>
        <ul>
          <li><strong>Top:</strong> Controles por encima del contenido</li>
          <li><strong>Bottom:</strong> Controles por debajo del contenido</li>
          <li><strong>Overlay:</strong> Controles superpuestos sobre el contenido</li>
        </ul>
      </div>
    </div>
  );
};

export default CarouselOverlayExample; 