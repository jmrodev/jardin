import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import AttendanceChart from './AttendanceChart';
import DemographicAnalysis from './DemographicAnalysis';
import '@/styles/components/molecules/detail-modal.css';

const DetailModal = ({ isOpen, onClose, title, data, type }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (!isOpen) return null;

  const renderChartSection = () => {
    switch (type) {
      case 'students':
        // For students, we might want a different type of chart or a list
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
        // Assuming data for attendance is an array of { date, present, absent }
        const attendanceChartData = {
          labels: data?.map(item => item.date),
          datasets: [
            {
              label: t('common.present'),
              data: data?.map(item => (item.present / (item.present + item.absent)) * 100 || 0),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: t('common.absent'),
              data: data?.map(item => (item.absent / (item.present + item.absent)) * 100 || 0),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
        return (
          <div className="detail-chart">
            <h3>{t('statistics.attendanceTrends')}</h3>
            <AttendanceChart data={attendanceChartData} type="line" title={t('statistics.dailyAttendance')} />
          </div>
        );
      case 'demographics':
        // DemographicAnalysis fetches its own data, so we just render it
        return (
          <div className="detail-chart">
            <h3>{t('statistics.demographicAnalysis')}</h3>
            <DemographicAnalysis stats={data} /> {/* Pass data as stats if it's the main stats object */}
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
    let columns = [];
    let rows = [];

    if (!data) {
      return (
        <div className="detail-table">
          <p>{t('common.noDataAvailable')}</p>
        </div>
      );
    }

    switch (type) {
      case 'students':
        columns = [
          { key: 'id', label: t('common.id') },
          { key: 'first_name', label: t('common.firstName') },
          { key: 'paternal_lastname', label: t('common.lastName') },
          { key: 'classroom', label: t('common.classroom') },
          { key: 'status', label: t('common.status') },
        ];
        rows = data.map(student => ({
          id: student.id,
          first_name: student.first_name,
          paternal_lastname: student.paternal_lastname,
          classroom: student.classroom, // Assuming classroom name is directly available
          status: student.status,
        }));
        break;
      case 'attendance':
        columns = [
          { key: 'date', label: t('common.date') },
          { key: 'present', label: t('common.present') },
          { key: 'absent', label: t('common.absent') },
          { key: 'total', label: t('common.total') },
          { key: 'percentage', label: t('common.percentage') },
        ];
        rows = data.map(record => ({
          date: record.date,
          present: record.present,
          absent: record.absent,
          total: record.present + record.absent,
          percentage: ((record.present / (record.present + record.absent)) * 100 || 0).toFixed(2) + '%',
        }));
        break;
      case 'demographics':
        columns = [
          { key: 'category', label: t('common.category') },
          { key: 'item', label: t('common.item') },
          { key: 'students', label: t('statistics.students') },
          { key: 'present', label: t('common.present') },
          { key: 'absent', label: t('common.absent') },
          { key: 'percentage', label: t('common.percentage') },
        ];
        rows = [];
        if (data.byShift) {
          Object.entries(data.byShift).forEach(([shift, stats]) => {
            rows.push({
              category: t('statistics.byShift'),
              item: shift,
              students: stats.students,
              present: stats.present,
              absent: stats.absent,
              percentage: ((stats.present / stats.students) * 100 || 0).toFixed(2) + '%',
            });
          });
        }
        if (data.byGender) {
          Object.entries(data.byGender).forEach(([gender, stats]) => {
            rows.push({
              category: t('statistics.byGender'),
              item: gender,
              students: stats.students,
              present: stats.present,
              absent: stats.absent,
              percentage: ((stats.present / stats.students) * 100 || 0).toFixed(2) + '%',
            });
          });
        }
        if (data.byAge) {
          Object.entries(data.byAge).forEach(([age, stats]) => {
            rows.push({
              category: t('statistics.byAge'),
              item: age,
              students: stats.students,
              present: stats.present,
              absent: stats.absent,
              percentage: ((stats.present / stats.students) * 100 || 0).toFixed(2) + '%',
            });
          });
        }
        if (data.byClassroom) {
          Object.entries(data.byClassroom).forEach(([classroom, stats]) => {
            rows.push({
              category: t('statistics.byClassroom'),
              item: classroom,
              students: stats.students,
              present: stats.present,
              absent: stats.absent,
              percentage: ((stats.present / stats.students) * 100 || 0).toFixed(2) + '%',
            });
          });
        }
        break;
      default:
        // Fallback for unknown types or if data is not structured as expected
        columns = [
          { key: 'id', label: t('common.id') },
          { key: 'name', label: t('common.name') },
          { key: 'value', label: t('common.value') },
          { key: 'status', label: t('common.status') },
        ];
        rows = [
          { id: 1, name: 'No Data', value: 'N/A', status: 'inactive' },
        ];
        break;
    }

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
                {columns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((item, index) => (
                  <tr key={index}>
                    {columns.map(col => (
                      <td key={col.key}>
                        {col.key === 'status' ? (
                          <span className={`status-badge status-${item[col.key]}`}>
                            {t(`common.${item[col.key]}`)}
                          </span>
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    <td>
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={12} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1}>{t('common.noData')}</td>
                </tr>
              )}
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