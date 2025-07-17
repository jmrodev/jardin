import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@/components/atoms/Select'; // Importar el nuevo átomo
import '@/styles/components/molecules/filter-panel.css';

const FilterPanel = ({ filterConfig, onFilterChange }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-panel__title">{t('filters.title')}</h3>
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
                value={filter.value || ''} // Asegurar que el valor esté controlado
              />
            );
          }
          // Se podrían añadir otros tipos de filtro aquí (e.g., input de texto)
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
};

export default FilterPanel; 