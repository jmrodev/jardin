import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import dashboardService from '../../services/api/dashboard';
import { predictiveAnalysis } from '../../utils/predictiveAnalysis';

export default function DemographicAnalysis({ stats, selectedPeriod }) {
  const { t } = useTranslation();
  const [demographicData, setDemographicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cargar datos demográficos del backend
  useEffect(() => {
    const fetchDemographicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardService.getDemographicStats();
        if (response && response.data) {
          setDemographicData(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(t('statistics.errorDemographic'));
      } finally {
        setLoading(false);
      }
    };

    fetchDemographicData();
  }, []);

  const calculateAttendanceRate = (present, total) => {
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  const getStatusColor = (rate) => {
    if (rate >= 90) return 'success';
    if (rate >= 75) return 'warning';
    return 'danger';
  };

  // Funciones para análisis de insights


  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString();
  };

  const formatPercentage = (num) => {
    if (num === undefined || num === null) return '0%';
    return `${num.toFixed(1)}%`;
  };

  const generatePredictions = () => {
    // Agregar datos actuales al análisis predictivo
    predictiveAnalysis.addHistoricalData(stats);
    
    // Generar predicciones
    const predictiveReport = predictiveAnalysis.generatePredictiveReport(4);
    return predictiveReport;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 9);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 9) % 9);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slides = [
    // Resumen (Overview)
    {
      id: 'total-students',
      title: t('statistics.totalStudents'),
      icon: 'Users',
      color: 'skyblue',
      type: 'overview',
      value: formatNumber(stats.totalStudents || 0),
      description: t('statistics.students')
    },
    {
      id: 'total-teachers',
      title: t('statistics.totalTeachers'),
      icon: 'GraduationCap',
      color: 'orange',
      type: 'overview',
      value: formatNumber(stats.totalTeachers || 0),
      description: t('statistics.teachers')
    },
    {
      id: 'total-parents',
      title: t('statistics.totalParents'),
      icon: 'UserCheck',
      color: 'lime',
      type: 'overview',
      value: formatNumber(stats.totalParents || 0),
      description: t('statistics.parents')
    },
    {
      id: 'attendance-rate',
      title: t('statistics.attendanceRate'),
      icon: 'CalendarCheck',
      color: 'pink',
      type: 'overview',
      value: formatPercentage(stats.attendanceRate || 0),
      description: t('statistics.attendance')
    },
    // Análisis Demográfico
    {
      id: 'shift',
      title: t('statistics.byShift'),
      icon: 'clock',
      color: 'skyblue',
      type: 'demographic',
      data: demographicData?.byShift,
      renderItem: (key, data) => {
        const shiftLabel = key === 'mañana' ? t('statistics.morningShift') : 
                          key === 'tarde' ? t('statistics.afternoonShift') : 
                          key.charAt(0).toUpperCase() + key.slice(1);
        const attendanceRate = calculateAttendanceRate(data.present, data.students);
        const statusColor = getStatusColor(attendanceRate);
        
        return (
          <div key={key} className="demographic-stat-item">
            <div className="stat-item-header">
              <span className="stat-item-label">{shiftLabel}</span>
              <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                {attendanceRate}%
              </span>
            </div>
            <div className="stat-item-details">
              <div className="stat-item-detail">
                <Icon name="users" size={12} />
                <span>{data.students} {t('statistics.students')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="check-circle" size={12} />
                <span>{data.present} {t('statistics.present')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="x-circle" size={12} />
                <span>{data.absent} {t('statistics.absent')}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'gender',
      title: t('statistics.byGender'),
      icon: 'users',
      color: 'pink',
      type: 'demographic',
      data: demographicData?.byGender,
      renderItem: (key, data) => {
        const genderLabel = key === 'masculino' ? t('statistics.male') : 
                           key === 'femenino' ? t('statistics.female') : 
                           key.charAt(0).toUpperCase() + key.slice(1);
        const attendanceRate = calculateAttendanceRate(data.present, data.students);
        const statusColor = getStatusColor(attendanceRate);
        
        return (
          <div key={key} className="demographic-stat-item">
            <div className="stat-item-header">
              <span className="stat-item-label">{genderLabel}</span>
              <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                {attendanceRate}%
              </span>
            </div>
            <div className="stat-item-details">
              <div className="stat-item-detail">
                <Icon name="users" size={12} />
                <span>{data.students} {t('statistics.students')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="check-circle" size={12} />
                <span>{data.present} {t('statistics.present')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="x-circle" size={12} />
                <span>{data.absent} {t('statistics.absent')}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'age',
      title: t('statistics.byAge'),
      icon: 'calendar',
      color: 'lime',
      type: 'demographic',
      data: demographicData?.byAge,
      renderItem: (key, data) => {
        const age = key.replace('age', '');
        const ageLabel = t(`statistics.age${age}`);
        const attendanceRate = calculateAttendanceRate(data.present, data.students);
        const statusColor = getStatusColor(attendanceRate);
        
        return (
          <div key={key} className="demographic-stat-item">
            <div className="stat-item-header">
              <span className="stat-item-label">{ageLabel}</span>
              <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                {attendanceRate}%
              </span>
            </div>
            <div className="stat-item-details">
              <div className="stat-item-detail">
                <Icon name="users" size={12} />
                <span>{data.students} {t('statistics.students')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="check-circle" size={12} />
                <span>{data.present} {t('statistics.present')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="x-circle" size={12} />
                <span>{data.absent} {t('statistics.absent')}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'classroom',
      title: t('statistics.byClassroom'),
      icon: 'home',
      color: 'purple',
      type: 'demographic',
      data: demographicData?.byClassroom,
      renderItem: (key, data) => {
        const shiftLabel = data.shift === 'Mañana' ? t('statistics.morningShift') : 
                          data.shift === 'Tarde' ? t('statistics.afternoonShift') : 
                          data.shift;
        const classroomLabel = `${data.classroom} - ${shiftLabel}`;
        const attendanceRate = calculateAttendanceRate(data.present, data.students);
        const statusColor = getStatusColor(attendanceRate);
        
        return (
          <div key={key} className="demographic-stat-item">
            <div className="stat-item-header">
              <span className="stat-item-label">{classroomLabel}</span>
              <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                {attendanceRate}%
              </span>
            </div>
            <div className="stat-item-details">
              <div className="stat-item-detail">
                <Icon name="users" size={12} />
                <span>{data.students} {t('statistics.students')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="check-circle" size={12} />
                <span>{data.present} {t('statistics.present')}</span>
              </div>
              <div className="stat-item-detail">
                <Icon name="x-circle" size={12} />
                <span>{data.absent} {t('statistics.absent')}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    // Predicciones
    {
      id: 'predictions',
      title: t('statistics.predictions'),
      icon: 'TrendingUp',
      color: 'indigo',
      type: 'predictions',
      content: generatePredictions()
    }
  ];

  const currentSlideData = slides[currentSlide];

  if (loading) {
    return (
      <div className="demographic-analysis">
        <div className="demographic-loading">
          <div className="loading-spinner"></div>
          <p>{t('statistics.loadingDemographic')}</p>
        </div>
      </div>
    );
  }

  if (error || !demographicData) {
    return (
      <div className="demographic-analysis">
        <div className="demographic-error">
          <Icon name="alert-circle" size={24} />
          <p>{t('statistics.errorDemographic')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="demographic-analysis">
      <div className="demographic-carousel">
        {/* Flecha izquierda */}
        <button 
          className="carousel-arrow carousel-arrow--left" 
          onClick={prevSlide}
          aria-label={t('common.previous')}
        >
          <Icon name="chevron-left" size={20} />
        </button>

        {/* Contenido del carrusel */}
        <div className="carousel-content">
          <div className="demographic-card" data-border-color={currentSlideData.color}>
            <div className="demographic-card-header">
              <div className={`demographic-card-icon card-icon--${currentSlideData.color}`}>
                <Icon name={currentSlideData.icon} size={16} />
              </div>
              <h4 className="demographic-card-title">{currentSlideData.title}</h4>
            </div>
            <div className="demographic-card-content">
              {currentSlideData.type === 'overview' ? (
                // Renderizar tarjeta de resumen
                <div className="overview-content">
                  <div className="overview-value">{currentSlideData.value}</div>
                  <div className="overview-description">{currentSlideData.description}</div>
                </div>
              ) : currentSlideData.type === 'demographic' ? (
                // Renderizar datos demográficos
                currentSlideData.data && Object.keys(currentSlideData.data).length > 0 ? (
                  Object.entries(currentSlideData.data).map(([key, data]) => 
                    currentSlideData.renderItem(key, data)
                  )
                ) : (
                  <div className="demographic-stat-item">
                    <div className="stat-item-header">
                      <span className="stat-item-label">{t('common.noData')}</span>
                    </div>
                    <div className="stat-item-details">
                      <div className="stat-item-detail">
                        <Icon name="alert-circle" size={12} />
                        <span>No hay datos disponibles</span>
                      </div>
                    </div>
                  </div>
                )
              ) : currentSlideData.type === 'predictions' ? (
                // Renderizar predicciones
                <div className="predictions-content">
                  {currentSlideData.content && (
                    <div className="predictions-grid">
                      <div className="prediction-card">
                        <h4>{t('statistics.attendancePrediction')}</h4>
                        <div className="prediction-data">
                          {currentSlideData.content.predictions.attendance.predictions.map((pred, index) => (
                            <div key={index} className="prediction-item">
                              <span className="prediction-period">Período {pred.period}</span>
                              <span className="prediction-value">{pred.predicted}%</span>
                              <span className={`prediction-trend ${pred.trend}`}>
                                <Icon name={pred.trend === 'increasing' ? 'TrendingUp' : pred.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} size={12} />
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="prediction-recommendation">
                          {currentSlideData.content.predictions.attendance.recommendation}
                        </p>
                      </div>

                      <div className="prediction-card">
                        <h4>{t('statistics.enrollmentPrediction')}</h4>
                        <div className="prediction-data">
                          {currentSlideData.content.predictions.enrollment.predictions.map((pred, index) => (
                            <div key={index} className="prediction-item">
                              <span className="prediction-period">Período {pred.period}</span>
                              <span className="prediction-value">{pred.predicted} estudiantes</span>
                              <span className={`prediction-trend ${pred.trend}`}>
                                <Icon name={pred.trend === 'increasing' ? 'TrendingUp' : pred.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} size={12} />
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="prediction-recommendation">
                          {currentSlideData.content.predictions.enrollment.recommendation}
                        </p>
                      </div>

                      <div className="prediction-card">
                        <h4>{t('statistics.staffingPrediction')}</h4>
                        <div className="prediction-data">
                          {currentSlideData.content.predictions.staffing.predictions.map((pred, index) => (
                            <div key={index} className="prediction-item">
                              <span className="prediction-period">Período {pred.period}</span>
                              <span className="prediction-value">
                                {pred.neededTeachers} maestros
                                {pred.deficit > 0 && <span className="deficit"> (+{pred.deficit})</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="prediction-recommendation">
                          {currentSlideData.content.predictions.staffing.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Renderizar insights
                <div className="insight-content">
                  <p className="insight-text">{currentSlideData.content}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flecha derecha */}
        <button 
          className="carousel-arrow carousel-arrow--right" 
          onClick={nextSlide}
          aria-label={t('common.next')}
        >
          <Icon name="chevron-right" size={20} />
        </button>
      </div>
    </div>
  );
}