import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

export default function StudentFilters({ filters, onFilterChange, onClearFilters }) {
  const { t } = useTranslation();

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(filter => 
    filter !== '' && filter !== null && filter !== undefined
  );

  return (
    <div className="student-filters">
      <div className="filters-header">
        <h3 className="filters-title">
          <Icon name="Search" size={20} />
          {t('filters.title')}
        </h3>
        {hasActiveFilters && (
          <Button 
            variant="danger" 
            size="sm" 
            onClick={clearAllFilters}
          >
            <Icon name="X" size={16} />
            {t('filters.clearAll')}
          </Button>
        )}
      </div>

      <div className="filters-grid">
        {/* Filtro por Sala */}
        <div className="filter-group">
          <label className="filter-label">{t('filters.classroom')}</label>
          <select
            className="filter-select"
            value={filters.classroom || ''}
            onChange={(e) => handleFilterChange('classroom', e.target.value)}
          >
            <option value="">{t('filters.allClassrooms')}</option>
            <option value="Sala 3">Sala 3</option>
            <option value="Sala 4">Sala 4</option>
            <option value="Sala 5">Sala 5</option>
          </select>
        </div>

        {/* Filtro por Turno */}
        <div className="filter-group">
          <label className="filter-label">{t('filters.shift')}</label>
          <select
            className="filter-select"
            value={filters.shift || ''}
            onChange={(e) => handleFilterChange('shift', e.target.value)}
          >
            <option value="">{t('filters.allShifts')}</option>
            <option value="Mañana">{t('filters.morning')}</option>
            <option value="Tarde">{t('filters.afternoon')}</option>
          </select>
        </div>

        {/* Filtro por Edad */}
        <div className="filter-group">
          <label className="filter-label">{t('filters.age')}</label>
          <select
            className="filter-select"
            value={filters.age || ''}
            onChange={(e) => handleFilterChange('age', e.target.value)}
          >
            <option value="">{t('filters.allAges')}</option>
            <option value="3">{t('filters.age3')}</option>
            <option value="4">{t('filters.age4')}</option>
            <option value="5">{t('filters.age5')}</option>
            <option value="6">{t('filters.age6')}</option>
          </select>
        </div>

        {/* Filtro por Género */}
        <div className="filter-group">
          <label className="filter-label">{t('filters.gender')}</label>
          <select
            className="filter-select"
            value={filters.gender || ''}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">{t('filters.allGenders')}</option>
            <option value="varón">{t('filters.male')}</option>
            <option value="mujer">{t('filters.female')}</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">{t('filters.activeFilters')}:</span>
          <div className="active-filters-tags">
            {filters.classroom && (
              <span className="filter-tag">
                {t('filters.classroom')}: {filters.classroom}
                <button 
                  onClick={() => handleFilterChange('classroom', '')}
                  className="filter-tag-remove"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.shift && (
              <span className="filter-tag">
                {t('filters.shift')}: {filters.shift}
                <button 
                  onClick={() => handleFilterChange('shift', '')}
                  className="filter-tag-remove"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.age && (
              <span className="filter-tag">
                {t('filters.age')}: {filters.age} {t('filters.years')}
                <button 
                  onClick={() => handleFilterChange('age', '')}
                  className="filter-tag-remove"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.gender && (
              <span className="filter-tag">
                {t('filters.gender')}: {filters.gender}
                <button 
                  onClick={() => handleFilterChange('gender', '')}
                  className="filter-tag-remove"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 