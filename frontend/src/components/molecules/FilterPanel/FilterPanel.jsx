import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@/components/atoms/Select';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import '@/styles/components/molecules/filter-panel.css';

const FilterPanel = ({ filterConfig, onFilterChange, activeFilters, onClearFilters }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3 className="filter-panel__title">{t('filters.title')}</h3>
        <Button onClick={onClearFilters} className="button--secondary button--small">
          {t('filters.clear')}
        </Button>
      </div>
      <div className="filter-panel__filters">
        {filterConfig.map((filter) => {
          if (filter.type === 'select') {
            return (
              <Select
                key={filter.name}
                name={filter.name}
                label={filter.label}
                options={filter.options}
                onChange={handleChange}
                placeholder={filter.placeholder}
                value={activeFilters[filter.name] || ''}
              />
            );
          } else if (filter.type === 'text') {
            return (
              <div key={filter.name} className="filter-field">
                <label className="filter-label">{filter.label}</label>
                <Input
                  name={filter.name}
                  type="text"
                  placeholder={filter.placeholder}
                  value={activeFilters[filter.name] || ''}
                  onChange={handleChange}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  filterConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.array,
      placeholder: PropTypes.string,
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired, // Nueva prop
  onClearFilters: PropTypes.func.isRequired, // Nueva prop
};

export default FilterPanel; 