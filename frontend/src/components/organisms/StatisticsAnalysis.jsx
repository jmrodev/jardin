import React from 'react';
import { useTranslation } from 'react-i18next';
import AnalysisCard from '../molecules/AnalysisCard';

export default function StatisticsAnalysis({ stats }) {
  const { t } = useTranslation();

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

  const analysisCards = [
    {
      icon: 'TrendingUp',
      title: t('statistics.attendanceTrend'),
      content: getAttendanceTrend(stats)
    },
    {
      icon: 'Target',
      title: t('statistics.performance'),
      content: getPerformanceAnalysis(stats)
    },
    {
      icon: 'Users',
      title: t('statistics.demographics'),
      content: getDemographicsAnalysis(stats)
    },
    {
      icon: 'AlertCircle',
      title: t('statistics.recommendations'),
      content: getRecommendations(stats)
    }
  ];

  return (
    <div className="statistics-analysis">
      <h3 className="analysis-title">{t('statistics.analysis')}</h3>
      <div className="analysis-grid">
        {analysisCards.map((card, index) => (
          <AnalysisCard
            key={index}
            icon={card.icon}
            title={card.title}
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
} 