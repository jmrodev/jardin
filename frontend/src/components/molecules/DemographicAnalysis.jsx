import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AttendanceChart from './AttendanceChart';
import Icon from '../atoms/Icon';
import dashboardService from '../../services/api/dashboard';

export default function DemographicAnalysis({ stats, selectedPeriod }) {
  const { t } = useTranslation();
  const [demographicData, setDemographicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos demográficos del backend
  useEffect(() => {
    const fetchDemographicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardService.getDemographicStats();
        console.log('📊 Respuesta completa del servidor:', response);
        console.log('📊 Datos demográficos obtenidos:', response.data);
        // Los datos están en response.data.data, no en response.data
        console.log('📊 Estructura de datos demográficos:', response.data);
        console.log('📊 Datos demográficos reales:', response.data.data);
        setDemographicData(response.data.data);
      } catch (err) {
        console.error('❌ Error fetching demographic data:', err);
        setError('Error al cargar datos demográficos');
        // Usar datos de ejemplo en caso de error
        setDemographicData({
          byShift: {
            morning: { students: 15, attendance: 88, present: 13, absent: 2 },
            afternoon: { students: 15, attendance: 82, present: 12, absent: 3 }
          },
          byGender: {
            male: { students: 16, attendance: 85, present: 14, absent: 2 },
            female: { students: 14, attendance: 86, present: 12, absent: 2 }
          },
          byAge: {
            age3: { students: 8, attendance: 90, present: 7, absent: 1 },
            age4: { students: 10, attendance: 85, present: 9, absent: 1 },
            age5: { students: 12, attendance: 83, present: 10, absent: 2 }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDemographicData();
  }, []);

  if (loading) {
    return (
      <div className="demographic-analysis">
        <h3 className="demographic-title">
          <Icon name="chart-pie" />
          {t('statistics.demographicAnalysis')}
        </h3>
        <div className="loading-container">
          <p>Cargando análisis demográfico...</p>
        </div>
      </div>
    );
  }

  if (error || !demographicData) {
    return (
      <div className="demographic-analysis">
        <h3 className="demographic-title">
          <Icon name="chart-pie" />
          {t('statistics.demographicAnalysis')}
        </h3>
        <div className="error-container">
          <p>Error al cargar datos demográficos</p>
        </div>
      </div>
    );
  }

  // Preparar datos para gráficos
  const prepareShiftChartData = () => {
    console.log('🔍 Preparando datos de gráfico por turno...');
    console.log('📊 demographicData:', demographicData);
    
    if (!demographicData || !demographicData.byShift) {
      console.log('⚠️ No hay datos de turno disponibles');
      return {
        labels: [],
        datasets: [{
          label: t('statistics.attendanceRate'),
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2
        }]
      };
    }

    const data = demographicData.byShift;
    console.log('📊 Datos de turno:', data);
    
    const labels = [];
    const attendanceData = [];
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

    Object.entries(data).forEach(([shift, stats], index) => {
      const shiftLabel = shift === 'mañana' ? t('statistics.morningShift') : 
                        shift === 'tarde' ? t('statistics.afternoonShift') : 
                        shift.charAt(0).toUpperCase() + shift.slice(1);
      labels.push(shiftLabel);
      attendanceData.push(stats.students); // Cambiar a número de estudiantes
      console.log(`📊 ${shiftLabel}: ${stats.students} estudiantes`);
    });

    const chartData = {
      labels,
      datasets: [{
        label: t('statistics.students'),
        data: attendanceData,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 2,
        borderSkipped: false
      }]
    };
    
    console.log('📊 Datos del gráfico por turno:', chartData);
    return chartData;
  };

  const prepareGenderChartData = () => {
    console.log('🔍 Preparando datos de gráfico por género...');
    
    if (!demographicData || !demographicData.byGender) {
      console.log('⚠️ No hay datos de género disponibles');
      return {
        labels: [],
        datasets: [{
          label: t('statistics.students'),
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2
        }]
      };
    }

    const data = demographicData.byGender;
    console.log('📊 Datos de género:', data);
    
    const labels = [];
    const studentData = [];
    const colors = ['#FF9800', '#E91E63', '#9C27B0'];

    Object.entries(data).forEach(([gender, stats], index) => {
      const genderLabel = gender === 'masculino' ? t('statistics.male') : 
                         gender === 'femenino' ? t('statistics.female') : 
                         gender.charAt(0).toUpperCase() + gender.slice(1);
      labels.push(genderLabel);
      studentData.push(stats.students);
      console.log(`📊 ${genderLabel}: ${stats.students} estudiantes`);
    });

    const chartData = {
      labels,
      datasets: [{
        label: t('statistics.students'),
        data: studentData,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 2,
        borderSkipped: false
      }]
    };
    
    console.log('📊 Datos del gráfico por género:', chartData);
    return chartData;
  };

  const prepareAgeChartData = () => {
    console.log('🔍 Preparando datos de gráfico por edad...');
    
    if (!demographicData || !demographicData.byAge) {
      console.log('⚠️ No hay datos de edad disponibles');
      return {
        labels: [],
        datasets: [{
          label: t('statistics.attendanceRate'),
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2
        }]
      };
    }

    const data = demographicData.byAge;
    console.log('📊 Datos de edad:', data);
    
    const labels = [];
    const attendanceData = [];
    const colors = ['#9C27B0', '#3F51B5', '#009688', '#4CAF50'];

    Object.entries(data).forEach(([ageKey, stats], index) => {
      const age = ageKey.replace('age', '');
      const ageLabel = t(`statistics.age${age}`);
      labels.push(ageLabel);
      attendanceData.push(stats.students); // Cambiar a número de estudiantes
      console.log(`📊 ${ageLabel}: ${stats.students} estudiantes`);
    });

    const chartData = {
      labels,
      datasets: [{
        label: t('statistics.students'),
        data: attendanceData,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 2,
        borderSkipped: false
      }]
    };
    
    console.log('📊 Datos del gráfico por edad:', chartData);
    return chartData;
  };

  // Generar insights demográficos
  const generateDemographicInsights = () => {
    // Verificar que demographicData existe y tiene las propiedades necesarias
    if (!demographicData || !demographicData.byShift || !demographicData.byGender || !demographicData.byAge) {
      return [];
    }

    const shiftData = demographicData.byShift;
    const genderData = demographicData.byGender;
    const ageData = demographicData.byAge;

    const insights = [];

    // Insights por turno
    if (shiftData && Object.keys(shiftData).length > 0) {
      const shifts = Object.entries(shiftData);
      if (shifts.length > 1) {
        const bestShift = shifts.reduce((best, current) => 
          current[1].attendance > best[1].attendance ? current : best
        );
        const worstShift = shifts.reduce((worst, current) => 
          current[1].attendance < worst[1].attendance ? current : worst
        );

        if (bestShift[1].attendance > worstShift[1].attendance + 5) {
          const bestShiftLabel = bestShift[0] === 'mañana' ? t('statistics.morningShift') : 
                                bestShift[0] === 'tarde' ? t('statistics.afternoonShift') : 
                                bestShift[0].charAt(0).toUpperCase() + bestShift[0].slice(1);
          
          insights.push({
            type: 'positive',
            category: 'shift',
            message: `${bestShiftLabel} tiene mejor asistencia (${bestShift[1].attendance}%)`
          });
        }
      }
    }

    // Insights por género
    if (genderData && Object.keys(genderData).length > 0) {
      const genders = Object.entries(genderData);
      if (genders.length > 1) {
        const genderDiff = Math.abs(genders[0][1].attendance - genders[1][1].attendance);
        if (genderDiff > 5) {
          insights.push({
            type: 'info',
            category: 'gender',
            message: 'Hay una diferencia significativa en asistencia entre géneros'
          });
        }
      }
    }

    // Insights por edad
    if (ageData && Object.keys(ageData).length > 0) {
      const ages = Object.entries(ageData);
      if (ages.length > 0) {
        const bestAge = ages.reduce((best, current) => 
          current[1].attendance > best[1].attendance ? current : best
        );
        const age = bestAge[0].replace('age', '');
        const ageLabel = t(`statistics.age${age}`);
        
        insights.push({
          type: 'positive',
          category: 'age',
          message: `Los estudiantes de ${ageLabel} tienen la mejor asistencia (${bestAge[1].attendance}%)`
        });
      }
    }

    return insights;
  };

  const insights = generateDemographicInsights();

  return (
    <div className="demographic-analysis">
      <h3 className="demographic-title">
        <Icon name="chart-pie" />
        {t('statistics.demographicAnalysis')}
      </h3>

      <div className="demographic-grid">
        {/* Análisis por Turno */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="clock" />
            {t('statistics.shiftAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byShift && Object.entries(demographicData.byShift).map(([shift, stats]) => {
              const shiftLabel = shift === 'mañana' ? t('statistics.morningShift') : 
                                shift === 'tarde' ? t('statistics.afternoonShift') : 
                                shift.charAt(0).toUpperCase() + shift.slice(1);
              return (
                <div key={shift} className="demographic-stat">
                  <span className="stat-label">{shiftLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{stats.attendance}%</span>
                </div>
              );
            })}
          </div>
          <div className="chart-container">
            {(() => {
              const chartData = prepareShiftChartData();
              console.log('🎨 Renderizando gráfico de turno con datos:', chartData);
              
              // Verificar si hay datos para mostrar
              if (!chartData.labels || chartData.labels.length === 0) {
                return (
                  <div className="chart-placeholder">
                    <Icon name="bar-chart-3" size={16} />
                    <p>No hay datos de turno disponibles</p>
                  </div>
                );
              }
              
              // Mostrar gráfico incluso si la asistencia es 0%
              
              return (
                <AttendanceChart
                  data={chartData}
                  type="bar"
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      }
                    },
                    elements: {
                      bar: {
                        borderWidth: 1,
                        borderRadius: 2,
                        borderSkipped: false
                      }
                    }
                  }}
                />
              );
            })()}
          </div>
        </div>

        {/* Análisis por Género */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="users" />
            {t('statistics.genderAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byGender && Object.entries(demographicData.byGender).map(([gender, stats]) => {
              const genderLabel = gender === 'masculino' ? t('statistics.male') : 
                                 gender === 'femenino' ? t('statistics.female') : 
                                 gender.charAt(0).toUpperCase() + gender.slice(1);
              return (
                <div key={gender} className="demographic-stat">
                  <span className="stat-label">{genderLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{stats.attendance}%</span>
                </div>
              );
            })}
          </div>
          <div className="chart-container">
            {(() => {
              const chartData = prepareGenderChartData();
              console.log('🎨 Renderizando gráfico de género con datos:', chartData);
              
              // Verificar si hay datos para mostrar
              if (!chartData.labels || chartData.labels.length === 0) {
                return (
                  <div className="chart-placeholder">
                    <Icon name="pie-chart" size={16} />
                    <p>No hay datos de género disponibles</p>
                  </div>
                );
              }
              
              return (
                <AttendanceChart
                  data={chartData}
                  type="bar"
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      }
                    },
                    elements: {
                      bar: {
                        borderWidth: 1,
                        borderRadius: 2,
                        borderSkipped: false
                      }
                    }
                  }}
                />
              );
            })()}
          </div>
        </div>

        {/* Análisis por Edad */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="calendar" />
            {t('statistics.ageAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byAge && Object.entries(demographicData.byAge).map(([ageKey, stats]) => {
              const age = ageKey.replace('age', '');
              const ageLabel = t(`statistics.age${age}`);
              return (
                <div key={ageKey} className="demographic-stat">
                  <span className="stat-label">{ageLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{stats.attendance}%</span>
                </div>
              );
            })}
          </div>
          <div className="chart-container">
            {(() => {
              const chartData = prepareAgeChartData();
              console.log('🎨 Renderizando gráfico de edad con datos:', chartData);
              
              // Verificar si hay datos para mostrar
              if (!chartData.labels || chartData.labels.length === 0) {
                return (
                  <div className="chart-placeholder">
                    <Icon name="bar-chart" size={16} />
                    <p>No hay datos de edad disponibles</p>
                  </div>
                );
              }
              
              return (
                <AttendanceChart
                  data={chartData}
                  type="bar"
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 8
                          }
                        }
                      }
                    },
                    elements: {
                      bar: {
                        borderWidth: 1,
                        borderRadius: 2,
                        borderSkipped: false
                      }
                    }
                  }}
                />
              );
            })()}
          </div>
        </div>
      </div>

      {/* Insights Demográficos */}
      <div className="demographic-insights">
        <h4 className="insights-title">
          <Icon name="lightbulb" />
          {t('statistics.demographicInsights')}
        </h4>
        <div className="insights-list">
          {insights.map((insight, index) => (
            <div key={index} className={`insight-item insight-${insight.type}`}>
              <Icon name={insight.type === 'positive' ? 'check-circle' : insight.type === 'warning' ? 'exclamation-triangle' : 'info-circle'} />
              <span>{insight.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 