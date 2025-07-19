import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AttendanceChart = ({ data, type = 'bar', title, height = 300, options = {} }) => {
  console.log('🎨 AttendanceChart recibió datos:', data);
  console.log('🎨 AttendanceChart tipo:', type);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    ...options
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={chartOptions} height={height} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} height={height} />;
      default:
        return <Bar data={data} options={chartOptions} height={height} />;
    }
  };

  return (
    <div className={`attendance-chart attendance-chart--height-${height}`}>
      {renderChart()}
    </div>
  );
};

export default AttendanceChart; 