import React from 'react';
import { useTranslation } from 'react-i18next';
import PeriodButton from '../atoms/PeriodButton';

export default function StatisticsFilters({ 
  selectedPeriod, 
  selectedYear, 
  onPeriodChange, 
  onYearChange,
  periods 
}) {
  const { t } = useTranslation();

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 5; year--) {
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };

  return (
    <div className="statistics-filters">
      <h4>{t('statistics.filters')}</h4>
      
      <div className="filter-group">
        <label className="filter-label">{t('statistics.period')}</label>
        <div className="period-selector">
          {periods.map((period) => (
            <PeriodButton
              key={period.key}
              period={period}
              isActive={selectedPeriod === period.key}
              onClick={() => onPeriodChange(period.key)}
            />
          ))}
        </div>
      </div>

      {(selectedPeriod === 'yearly' || selectedPeriod === 'monthly') && (
        <div className="filter-group">
          <label className="filter-label">{t('statistics.year')}</label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="year-selector"
          >
            {generateYearOptions().map(year => (
              <option key={year.value} value={year.value}>{year.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
} 