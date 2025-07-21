import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import '@/styles/components/molecules/detail-modal.css';

const DetailModal = ({ isOpen, onClose, title, data, type }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (!isOpen) return null;

  const renderChartSection = () => {
    switch (type) {
      case 'students':
        return (
          <div className="detail-chart">
            <h3>{t('statistics.studentTrends')}</h3>
            <div className="chart-placeholder">
              <Icon name="BarChart3" size={48} />
              <p>{t('statistics.chartPlaceholder')}</p>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="detail-chart">
            <h3>{t('statistics.attendanceTrends')}</h3>
            <div className="chart-placeholder">
              <Icon name="TrendingUp" size={48} />
              <p>{t('statistics.chartPlaceholder')}</p>
            </div>
          </div>
        );
      case 'demographics':
        return (
          <div className="detail-chart">
            <h3>{t('statistics.demographicAnalysis')}</h3>
            <div className="chart-placeholder">
              <Icon name="PieChart" size={48} />
              <p>{t('statistics.chartPlaceholder')}</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="detail-chart">
            <h3>{t('statistics.dataVisualization')}</h3>
            <div className="chart-placeholder">
              <Icon name="BarChart3" size={48} />
              <p>{t('statistics.chartPlaceholder')}</p>
            </div>
          </div>
        );
    }
  };

  const renderDataTable = () => {
    const mockData = [
      { id: 1, name: 'Ejemplo 1', value: '100', status: 'active' },
      { id: 2, name: 'Ejemplo 2', value: '85', status: 'active' },
      { id: 3, name: 'Ejemplo 3', value: '92', status: 'inactive' },
    ];

    return (
      <div className="detail-table">
        <div className="table-header">
          <h3>{t('statistics.detailedData')}</h3>
          <div className="table-actions">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={14} />
              {t('common.export')}
            </Button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('common.id')}</th>
                <th>{t('common.name')}</th>
                <th>{t('common.value')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                  <td>
                    <span className={`status-badge status-${item.status}`}>
                      {t(`common.${item.status}`)}
                    </span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={12} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderFilters = () => (
    <div className="detail-filters">
      <h3>{t('statistics.filters')}</h3>
      <div className="filters-content">
        <div className="filter-group">
          <label>{t('statistics.period')}</label>
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            options={[
              { value: 'current', label: t('statistics.currentPeriod') },
              { value: 'previous', label: t('statistics.previousPeriod') },
              { value: 'yearly', label: t('statistics.yearly') },
            ]}
          />
        </div>
        
        <div className="filter-group">
          <label>{t('statistics.filter')}</label>
          <Select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            options={[
              { value: 'all', label: t('common.all') },
              { value: 'active', label: t('common.active') },
              { value: 'inactive', label: t('common.inactive') },
            ]}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal__header">
          <div className="modal-title">
            <h2>{title}</h2>
            <p>{t('statistics.detailedView')}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="close-button"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="detail-modal__content">
          {/* Sección Izquierda - Gráficos y Análisis */}
          <div className="detail-section detail-section--left">
            {renderChartSection()}
            
            <div className="detail-analysis">
              <h3>{t('statistics.analysis')}</h3>
              <div className="analysis-content">
                <div className="analysis-item">
                  <span className="analysis-label">{t('statistics.trend')}</span>
                  <span className="analysis-value positive">+12.5%</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">{t('statistics.average')}</span>
                  <span className="analysis-value">87.3</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">{t('statistics.peak')}</span>
                  <span className="analysis-value">94.2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección Derecha - Tabla y Filtros */}
          <div className="detail-section detail-section--right">
            {renderFilters()}
            {renderDataTable()}
          </div>
        </div>

        <div className="detail-modal__footer">
          <div className="modal-actions">
            <Button variant="outline" onClick={onClose}>
              {t('common.close')}
            </Button>
            <Button variant="primary">
              <Icon name="Download" size={16} />
              {t('common.exportReport')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.any,
  type: PropTypes.string,
};

export default DetailModal; 