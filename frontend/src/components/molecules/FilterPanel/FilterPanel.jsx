import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/atoms/Button';
import '@/styles/components/molecules/filter-panel.css';

const FilterPanel = ({ filterConfig, onFilterChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const initialFilters = filterConfig.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
    setFilters(initialFilters);
  }, [filterConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = filterConfig.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const renderField = (field) => {
    const { name, type, placeholder, options } = field;

    switch (type) {
      case 'select':
        return (
          <select name={name} value={filters[name] || ''} onChange={handleChange}>
            <option value="">{placeholder || t('selectOption')}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'text':
      case 'number':
      default:
        return (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={filters[name] || ''}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-panel__title">{t('filters.title')}</h3>
      <div className="filter-panel__fields">
        {filterConfig.map((field) => (
          <div key={field.name} className="filter-panel__field">
            <label htmlFor={field.name}>{field.label}</label>
            {renderField(field)}
          </div>
        ))}
      </div>
      <div className="filter-panel__actions">
        <Button onClick={handleApplyFilters} className="button--primary">
          {t('filters.apply')}
        </Button>
        <Button onClick={handleClearFilters} className="button--secondary">
          {t('filters.clear')}
        </Button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  filterConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number', 'select']).isRequired,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterPanel; 