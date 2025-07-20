import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import AnalysisCard from '../molecules/AnalysisCard';

export default function StatisticsAnalysis({ stats }) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const getAttendanceTrend = (stats) => {
    const rate = stats.attendanceRate || 0;
    if (rate >= 90) return t('statistics.trendExcellent');
    if (rate >= 80) return t('statistics.trendGood');
    if (rate >= 70) return t('statistics.trendAverage');
    return t('statistics.trendNeedsImprovement');
  };

  const getPerformanceAnalysis = (stats) => {
    const students = stats.totalStudents || 0;
    const teachers = stats.totalTeachers || 0;
    const ratio = students / teachers;
    
    if (ratio <= 15) return t('statistics.performanceOptimal');
    if (ratio <= 20) return t('statistics.performanceGood');
    return t('statistics.performanceOvercrowded');
  };

  const getDemographicsAnalysis = (stats) => {
    const students = stats.totalStudents || 0;
    if (students > 100) return t('statistics.demographicsLarge');
    if (students > 50) return t('statistics.demographicsMedium');
    return t('statistics.demographicsSmall');
  };

  const getRecommendations = (stats) => {
    const rate = stats.attendanceRate || 0;
    if (rate < 80) return t('statistics.recommendationsLowAttendance');
    return t('statistics.recommendationsGood');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slides = [
    {
      id: 'attendance',
      title: t('statistics.attendanceTrend'),
      icon: 'TrendingUp',
      color: 'blue',
      content: getAttendanceTrend(stats)
    },
    {
      id: 'performance',
      title: t('statistics.performance'),
      icon: 'Target',
      color: 'orange',
      content: getPerformanceAnalysis(stats)
    },
    {
      id: 'demographics',
      title: t('statistics.demographics'),
      icon: 'Users',
      color: 'green',
      content: getDemographicsAnalysis(stats)
    },
    {
      id: 'recommendations',
      title: t('statistics.recommendations'),
      icon: 'AlertCircle',
      color: 'purple',
      content: getRecommendations(stats)
    }
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <div className="statistics-analysis">
      <div className="analysis-header">
        <h3 className="analysis-title">{t('statistics.analysis')}</h3>
      </div>

      <div className="analysis-carousel">
        {/* Controles de navegación */}
        <div className="carousel-controls">
          <button 
            className="carousel-control carousel-control--prev" 
            onClick={prevSlide}
            aria-label={t('common.previous')}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`carousel-indicator ${index === currentSlide ? 'carousel-indicator--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`${slide.title} ${index + 1}`}
              >
                <div className="indicator-icon">
                  <Icon name={slide.icon} size={12} />
                </div>
                <span className="indicator-label">{slide.title}</span>
              </button>
            ))}
          </div>

          <button 
            className="carousel-control carousel-control--next" 
            onClick={nextSlide}
            aria-label={t('common.next')}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>

        {/* Contenido del carrusel */}
        <div className="carousel-content">
          <div className="analysis-card" data-border-color={currentSlideData.color}>
            <div className="analysis-card-header">
              <div className={`analysis-card-icon card-icon--${currentSlideData.color}`}>
                <Icon name={currentSlideData.icon} size={20} />
              </div>
              <h4 className="analysis-card-title">{currentSlideData.title}</h4>
            </div>
            <div className="analysis-card-content">
              <p className="analysis-card-text">{currentSlideData.content}</p>
            </div>
          </div>
        </div>

        {/* Información de navegación */}
        <div className="carousel-info">
          <span className="carousel-counter">
            {currentSlide + 1} / {slides.length}
          </span>
          <span className="carousel-description">
            {currentSlideData.title}
          </span>
        </div>
      </div>
    </div>
  );
} 