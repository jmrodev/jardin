import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../molecules/Carousel';

const CarouselExample = () => {
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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Ejemplo de Carrusel con Átomos
      </h2>
      
      <Carousel 
        slides={slides}
        showIndicators={true}
        showCounter={true}
        showControls={true}
        autoPlay={false}
        autoPlayInterval={5000}
      />
      
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Características del Carrusel:</h3>
        <ul>
          <li><strong>Átomos Modulares:</strong> CarouselControl, CarouselIndicator, CarouselCounter, CarouselSlide</li>
          <li><strong>Reutilizable:</strong> Se puede usar en cualquier parte de la aplicación</li>
          <li><strong>Configurable:</strong> Múltiples opciones de personalización</li>
          <li><strong>Responsive:</strong> Adaptado para móviles y tablets</li>
          <li><strong>Accesible:</strong> Incluye aria-labels y navegación por teclado</li>
        </ul>
      </div>
    </div>
  );
};

export default CarouselExample; 