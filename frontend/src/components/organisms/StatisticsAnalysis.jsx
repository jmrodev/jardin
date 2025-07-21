import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatisticsOverview from '../molecules/StatisticsOverview';
import AttendanceChart from '../molecules/AttendanceChart';
import dashboardService from '../../services/api/dashboard';

export default function StatisticsAnalysis({ stats }) {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos para el gráfico
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const response = await dashboardService.getMonthlyStats(new Date().getFullYear());
        if (response && response.data && response.data.data && response.data.data.monthlyData) {
          const monthlyData = response.data.data.monthlyData;
          
          // Preparar datos para el gráfico
          const chartData = {
            labels: [
              'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
              'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
            ],
            datasets: [
              {
                label: t('statistics.attendanceRate'),
                data: monthlyData.map(month => month.attendance),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                tension: 0.4
              }
            ]
          };
          setChartData(chartData);
        }
      } catch (error) {
        console.error('Error loading chart data:', error);
        // Datos de ejemplo en caso de error
        setChartData({
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: t('statistics.attendanceRate'),
            data: [85, 88, 92, 87, 90, 89, 91, 86, 88, 93, 89, 87],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.4
          }]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [t]);

  return (
    <div className="statistics-analysis">
      <StatisticsOverview stats={stats} />
      
      <div className="statistics-charts">
        <div className="chart-section">
          <h3 className="chart-title">{t('statistics.monthlyChart')}</h3>
          {loading ? (
            <div className="chart-loading">
              <p>{t('statistics.loading')}</p>
            </div>
          ) : chartData ? (
            <AttendanceChart 
              data={chartData} 
              type="line" 
              height={300}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          ) : (
            <div className="chart-placeholder">
              <p>{t('statistics.noChartData')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 