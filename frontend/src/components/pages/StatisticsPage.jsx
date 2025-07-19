import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ListPageLayout from '../templates/ListPageLayout';
import LoadingSpinner from '../molecules/LoadingSpinner';
import Icon from '../atoms/Icon';
import AttendanceChart from '../molecules/AttendanceChart';
import DemographicAnalysis from '../molecules/DemographicAnalysis';
import StatisticsFilters from '../molecules/StatisticsFilters';
import StatisticsOverview from '../molecules/StatisticsOverview';
import StatisticsActions from '../molecules/StatisticsActions';
import StatisticsAnalysis from '../organisms/StatisticsAnalysis';
import AlertsSection from '../organisms/AlertsSection';
import { generateStatisticsReport } from '../../utils/reportGenerator';
import { alertSystem } from '../../utils/alertSystem';
import { predictiveAnalysis } from '../../utils/predictiveAnalysis';
import dashboardService from '../../services/api/dashboard';

export default function StatisticsPage() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('total');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: {},
    yearly: {},
    monthly: {},
    weekly: {},
    daily: {}
  });

  // Nuevos estados para funcionalidades avanzadas
  const [alerts, setAlerts] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);
  const [exporting, setExporting] = useState(false);
  const chartRef = useRef(null);



  // Función para obtener estadísticas detalladas
  const fetchDetailedStats = async () => {
    console.log('🔍 Iniciando fetchDetailedStats...');
    setLoading(true);
    setError(null);
    try {
      console.log('📡 Intentando obtener estadísticas del servidor...');
      // Obtener estadísticas totales (endpoint existente)
      const totalStats = await dashboardService.getStats();
      console.log('✅ Datos del servidor obtenidos:', totalStats);
      console.log('📊 Datos del servidor (data):', totalStats.data);
      
      // Obtener estadísticas específicas según el período seleccionado
      let detailedStats = {};
      
      try {
        if (selectedPeriod === 'yearly') {
          const yearlyStats = await dashboardService.getYearlyStats(selectedYear);
          detailedStats = yearlyStats.data;
        } else if (selectedPeriod === 'monthly') {
          const monthlyStats = await dashboardService.getMonthlyStats(selectedYear);
          detailedStats = monthlyStats.data;
        } else if (selectedPeriod === 'weekly') {
          const weeklyStats = await dashboardService.getWeeklyStats();
          detailedStats = weeklyStats.data;
        } else if (selectedPeriod === 'daily') {
          const dailyStats = await dashboardService.getDailyStats();
          detailedStats = dailyStats.data;
        } else {
          // Para 'total', usar los datos del endpoint principal
          detailedStats = totalStats.data;
        }
        console.log('✅ Datos detallados obtenidos:', detailedStats);
        console.log('📊 Datos detallados (data):', detailedStats.data);
        
        // Asegurar que detailedStats tenga la estructura correcta
        if (detailedStats && detailedStats.data) {
          detailedStats = detailedStats.data;
        }
      } catch (detailedError) {
        console.warn('⚠️ Error fetching detailed stats, using fallback data:', detailedError);
        // Si fallan los endpoints detallados, usar datos básicos
        detailedStats = {
          totalStudents: totalStats.data.totalStudents || 0,
          totalTeachers: totalStats.data.totalTeachers || 0,
          totalParents: totalStats.data.totalParents || 0,
          attendanceRate: totalStats.data.attendanceRate || 0
        };
      }

      console.log('📊 Configurando estadísticas finales...');
      const finalStats = {
        total: detailedStats,
        yearly: detailedStats,
        monthly: detailedStats,
        weekly: detailedStats,
        daily: detailedStats
      };
      console.log('📊 Estadísticas finales a guardar:', finalStats);
      setStats(finalStats);
      console.log('✅ Estadísticas configuradas exitosamente');
    } catch (err) {
      console.error('❌ Error fetching detailed stats:', err);
      
      // Determinar el tipo de error
      let errorMessage = 'Error al cargar las estadísticas detalladas';
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        errorMessage = t('statistics.serverUnavailable');
        setError(errorMessage);
      } else {
        setError(errorMessage);
      }
      
      console.log('🔄 Configurando datos de ejemplo...');
      // Datos de ejemplo más completos en caso de error
      const fallbackData = {
        totalStudents: 25,
        totalTeachers: 8,
        totalParents: 30,
        attendanceRate: 85
      };
      
      // Datos de ejemplo para estadísticas diarias
      const dailyExampleData = {
        ...fallbackData,
        dailyData: [
          {
            date: new Date().toISOString(),
            attendance: 85,
            presentStudents: 17,
            totalStudents: 20
          },
          {
            date: new Date(Date.now() - 86400000).toISOString(),
            attendance: 90,
            presentStudents: 18,
            totalStudents: 20
          },
          {
            date: new Date(Date.now() - 172800000).toISOString(),
            attendance: 80,
            presentStudents: 16,
            totalStudents: 20
          }
        ]
      };

      // Datos de ejemplo para estadísticas mensuales
      const monthlyExampleData = {
        ...fallbackData,
        monthlyData: [
          { month: 1, attendance: 85, students: 25 },
          { month: 2, attendance: 88, students: 25 },
          { month: 3, attendance: 82, students: 25 },
          { month: 4, attendance: 90, students: 25 },
          { month: 5, attendance: 87, students: 25 },
          { month: 6, attendance: 83, students: 25 },
          { month: 7, attendance: 89, students: 25 },
          { month: 8, attendance: 91, students: 25 },
          { month: 9, attendance: 86, students: 25 },
          { month: 10, attendance: 84, students: 25 },
          { month: 11, attendance: 88, students: 25 },
          { month: 12, attendance: 92, students: 25 }
        ]
      };
      
      console.log('📊 Configurando datos de ejemplo...');
      setStats({
        total: fallbackData,
        yearly: fallbackData,
        monthly: monthlyExampleData,
        weekly: fallbackData,
        daily: dailyExampleData
      });
      console.log('✅ Datos de ejemplo configurados');
    } finally {
      setLoading(false);
      console.log('🏁 fetchDetailedStats completado');
    }
  };

  // Función para generar alertas
  const generateAlerts = (currentStats) => {
    const newAlerts = alertSystem.analyzeStats(currentStats, selectedPeriod, selectedYear);
    setAlerts(newAlerts);
    return newAlerts;
  };

  // Función para generar predicciones
  const generatePredictions = (currentStats) => {
    // Agregar datos actuales al análisis predictivo
    predictiveAnalysis.addHistoricalData(currentStats);
    
    // Generar predicciones
    const predictiveReport = predictiveAnalysis.generatePredictiveReport(4);
    setPredictions(predictiveReport);
    return predictiveReport;
  };

  // Función para exportar reporte
  const handleExportReport = async () => {
    setExporting(true);
    try {
      await generateStatisticsReport(currentStats, selectedPeriod, selectedYear);
      console.log('✅ Reporte exportado exitosamente');
    } catch (error) {
      console.error('❌ Error al exportar reporte:', error);
      setError('Error al exportar el reporte');
    } finally {
      setExporting(false);
    }
  };

  // Función para preparar datos de gráficos
  const prepareChartData = (stats, type) => {
    switch (type) {
      case 'monthly':
        if (!stats.monthlyData) return null;
        return {
          labels: stats.monthlyData.map(m => 
            new Date(2024, m.month - 1).toLocaleDateString('es-ES', { month: 'short' })
          ),
          datasets: [{
            label: 'Asistencia (%)',
            data: stats.monthlyData.map(m => m.attendance),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          }]
        };
      
      case 'daily':
        if (!stats.dailyData) return null;
        return {
          labels: stats.dailyData.map(d => 
            new Date(d.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
          ),
          datasets: [{
            label: 'Asistencia (%)',
            data: stats.dailyData.map(d => d.attendance),
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
            tension: 0.4
          }]
        };
      
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchDetailedStats();
  }, [selectedPeriod, selectedYear]);

  // Obtener estadísticas actuales
  const currentStats = stats[selectedPeriod] || {};

  // Efecto para generar alertas y predicciones cuando cambian las estadísticas
  useEffect(() => {
    if (currentStats && Object.keys(currentStats).length > 0) {
      generateAlerts(currentStats);
      generatePredictions(currentStats);
    }
  }, [currentStats]);

  // Función para formatear números
  const formatNumber = (num) => {
    return num ? num.toLocaleString('es-ES') : '0';
  };

  // Función para formatear porcentaje
  const formatPercentage = (num) => {
    return num ? `${num}%` : '0%';
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generar años para el selector (últimos 5 años)
  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i);
    }
    return years;
  };

  // Funciones de análisis
  const getAttendanceTrend = (stats) => {
    if (!stats.attendanceRate) return t('statistics.noDataAvailable');
    
    if (stats.attendanceRate >= 90) {
      return t('statistics.excellentTrend');
    } else if (stats.attendanceRate >= 80) {
      return t('statistics.goodTrend');
    } else if (stats.attendanceRate >= 70) {
      return t('statistics.averageTrend');
    } else {
      return t('statistics.needsImprovement');
    }
  };

  const getPerformanceAnalysis = (stats) => {
    const totalPeople = (stats.totalStudents || 0) + (stats.totalTeachers || 0) + (stats.totalParents || 0);
    const studentRatio = totalPeople > 0 ? Math.round(((stats.totalStudents || 0) / totalPeople) * 100) : 0;
    const teacherRatio = totalPeople > 0 ? Math.round(((stats.totalTeachers || 0) / totalPeople) * 100) : 0;
    
    return t('statistics.performanceText', {
      studentRatio,
      teacherRatio,
      attendanceRate: stats.attendanceRate || 0
    });
  };

  const getDemographicsAnalysis = (stats) => {
    const students = stats.totalStudents || 0;
    const teachers = stats.totalTeachers || 0;
    const parents = stats.totalParents || 0;
    
    const teacherStudentRatio = students > 0 ? (teachers / students).toFixed(1) : 0;
    const parentStudentRatio = students > 0 ? (parents / students).toFixed(1) : 0;
    
    return t('statistics.demographicsText', {
      teacherStudentRatio,
      parentStudentRatio,
      totalStudents: students
    });
  };

  const getRecommendations = (stats) => {
    const recommendations = [];
    
    if ((stats.attendanceRate || 0) < 85) {
      recommendations.push(t('statistics.improveAttendance'));
    }
    
    if ((stats.totalTeachers || 0) / (stats.totalStudents || 1) < 0.3) {
      recommendations.push(t('statistics.considerMoreTeachers'));
    }
    
    if ((stats.totalParents || 0) / (stats.totalStudents || 1) < 1.5) {
      recommendations.push(t('statistics.encourageParentInvolvement'));
    }
    
    if (recommendations.length === 0) {
      recommendations.push(t('statistics.excellentPerformance'));
    }
    
    return recommendations.join('. ');
  };

  // Funciones de comparación
  const getPreviousPeriodStats = (period, year) => {
    // Para simplificar, usamos datos de ejemplo del período anterior
    const previousStats = {
      yearly: { attendanceRate: 78, totalStudents: 28 },
      monthly: { attendanceRate: 82, totalStudents: 29 },
      weekly: { attendanceRate: 85, totalStudents: 30 },
      daily: { attendanceRate: 87, totalStudents: 30 }
    };
    return previousStats[period] || { attendanceRate: 0, totalStudents: 0 };
  };

  const getAttendanceChange = (currentStats, period, year) => {
    const previous = getPreviousPeriodStats(period, year);
    const current = currentStats.attendanceRate || 0;
    return current - previous.attendanceRate;
  };

  const getStudentChange = (currentStats, period, year) => {
    const previous = getPreviousPeriodStats(period, year);
    const current = currentStats.totalStudents || 0;
    return current - previous.totalStudents;
  };

  const formatChange = (change) => {
    if (change === 0) return '0%';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}%`;
  };

  const getChangeClass = (change) => {
    if (change > 0) return 'positive';
    if (change < 0) return 'negative';
    return 'neutral';
  };

  const periods = [
    { key: 'total', label: t('statistics.total'), icon: 'BarChart3' },
    { key: 'yearly', label: t('statistics.yearly'), icon: 'Calendar' },
    { key: 'monthly', label: t('statistics.monthly'), icon: 'CalendarDays' },
    { key: 'weekly', label: t('statistics.weekly'), icon: 'CalendarRange' },
    { key: 'daily', label: t('statistics.daily'), icon: 'CalendarCheck' }
  ];

  console.log('🎯 Estado actual:', {
    loading,
    error,
    selectedPeriod,
    selectedYear,
    stats,
    currentStats
  });
  
  console.log('📊 Datos actuales detallados:', {
    totalStudents: currentStats.totalStudents,
    totalTeachers: currentStats.totalTeachers,
    totalParents: currentStats.totalParents,
    attendanceRate: currentStats.attendanceRate,
    monthlyData: currentStats.monthlyData,
    dailyData: currentStats.dailyData
  });

  return (
    <ListPageLayout
      entityType="statistics"
      filters={
        <StatisticsFilters
          selectedPeriod={selectedPeriod}
          selectedYear={selectedYear}
          onPeriodChange={setSelectedPeriod}
          onYearChange={setSelectedYear}
          periods={periods}
        />
      }
    >
      <div className="statistics-page">
        <div className="statistics-header">
          <h1 className="statistics-title">{t('statistics.title')}</h1>
          <p className="statistics-subtitle">{t('statistics.subtitle')}</p>
          
          <StatisticsActions
            onExport={handleExportReport}
            onTogglePredictions={() => setShowPredictions(!showPredictions)}
            exporting={exporting}
            showPredictions={showPredictions}
          />
        </div>

        <AlertsSection alerts={alerts} />

        {loading ? (
          <div className="statistics-loading">
            <LoadingSpinner />
            <p>{t('statistics.loading')}</p>
          </div>
        ) : error ? (
          <div className="statistics-error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="statistics-content">
            <StatisticsOverview stats={currentStats} />

            {/* Estadísticas Específicas por Período */}
            <div className="stats-details">
              <h2 className="stats-section-title">
                {t(`statistics.${selectedPeriod}Details`)}
              </h2>
              
              <StatisticsAnalysis stats={currentStats} />
              
              {/* Comparación entre Períodos */}
              {selectedPeriod !== 'total' && (
                <div className="statistics-comparison">
                  <h3 className="comparison-title">{t('statistics.comparison')}</h3>
                  <div className="comparison-grid">
                    <div className="comparison-card">
                      <div className="comparison-header">
                        <Icon name="Calendar" size={16} />
                        <span>{t('statistics.previousPeriod')}</span>
                      </div>
                      <div className="comparison-stats">
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.attendanceRate')}</span>
                          <span className="stat-value">{formatPercentage(getPreviousPeriodStats(selectedPeriod, selectedYear).attendanceRate || 0)}</span>
                        </div>
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.totalStudents')}</span>
                          <span className="stat-value">{formatNumber(getPreviousPeriodStats(selectedPeriod, selectedYear).totalStudents || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="comparison-card current">
                      <div className="comparison-header">
                        <Icon name="CalendarCheck" size={16} />
                        <span>{t('statistics.currentPeriod')}</span>
                      </div>
                      <div className="comparison-stats">
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.attendanceRate')}</span>
                          <span className="stat-value">{formatPercentage(currentStats.attendanceRate || 0)}</span>
                        </div>
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.totalStudents')}</span>
                          <span className="stat-value">{formatNumber(currentStats.totalStudents || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="comparison-card change">
                      <div className="comparison-header">
                        <Icon name="TrendingUp" size={16} />
                        <span>{t('statistics.change')}</span>
                      </div>
                      <div className="comparison-stats">
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.attendanceRate')}</span>
                          <span className={`stat-value ${getChangeClass(getAttendanceChange(currentStats, selectedPeriod, selectedYear))}`}>
                            {formatChange(getAttendanceChange(currentStats, selectedPeriod, selectedYear))}
                          </span>
                        </div>
                        <div className="comparison-stat">
                          <span className="stat-label">{t('statistics.totalStudents')}</span>
                          <span className={`stat-value ${getChangeClass(getStudentChange(currentStats, selectedPeriod, selectedYear))}`}>
                            {formatChange(getStudentChange(currentStats, selectedPeriod, selectedYear))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Predicciones */}
              {showPredictions && predictions && (
                <div className="predictions-section">
                  <h3 className="predictions-title">
                    <Icon name="TrendingUp" size={20} />
                    {t('statistics.predictions')}
                  </h3>
                  <div className="predictions-grid">
                    <div className="prediction-card">
                      <h4>{t('statistics.attendancePrediction')}</h4>
                      <div className="prediction-data">
                        {predictions.predictions.attendance.predictions.map((pred, index) => (
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
                        {predictions.predictions.attendance.recommendation}
                      </p>
                    </div>

                    <div className="prediction-card">
                      <h4>{t('statistics.enrollmentPrediction')}</h4>
                      <div className="prediction-data">
                        {predictions.predictions.enrollment.predictions.map((pred, index) => (
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
                        {predictions.predictions.enrollment.recommendation}
                      </p>
                    </div>

                    <div className="prediction-card">
                      <h4>{t('statistics.staffingPrediction')}</h4>
                      <div className="prediction-data">
                        {predictions.predictions.staffing.predictions.map((pred, index) => (
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
                        {predictions.predictions.staffing.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Análisis Demográfico */}
              <DemographicAnalysis stats={currentStats} selectedPeriod={selectedPeriod} />

              {selectedPeriod === 'monthly' && (
                <div className="monthly-chart">
                  <h3>{t('statistics.monthlyChart')}</h3>
                  {currentStats.monthlyData ? (
                    <div ref={chartRef}>
                      <AttendanceChart
                        data={prepareChartData(currentStats, 'monthly')}
                        type="bar"
                        title="Asistencia Mensual"
                        height={300}
                      />
                    </div>
                  ) : (
                    <div className="chart-placeholder">
                      <Icon name="BarChart3" size={48} />
                      <p>{t('statistics.noChartData')}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedPeriod === 'daily' && (
                <div className="daily-chart">
                  <h3>{t('statistics.dailyChart')}</h3>
                  {currentStats.dailyData ? (
                    <div ref={chartRef}>
                      <AttendanceChart
                        data={prepareChartData(currentStats, 'daily')}
                        type="line"
                        title="Asistencia Diaria"
                        height={300}
                      />
                    </div>
                  ) : (
                    <div className="chart-placeholder">
                      <Icon name="TrendingUp" size={48} />
                      <p>{t('statistics.noChartData')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ListPageLayout>
  );
} 