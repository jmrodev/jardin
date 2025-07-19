import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AttendanceChart from './AttendanceChart';
import Icon from '../atoms/Icon';
import dashboardService from '../../services/api/dashboard';

export default function DemographicAnalysis({ stats, selectedPeriod }) {
  const { t } = useTranslation();
  const [demographicData, setDemographicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos demográficos del backend
  useEffect(() => {
    const fetchDemographicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardService.getDemographicStats();
        console.log('📊 Respuesta completa del servidor:', response);
        console.log('📊 Datos demográficos obtenidos:', response.data);
        // Los datos están en response.data.data, no en response.data
        console.log('📊 Estructura de datos demográficos:', response.data);
        console.log('📊 Datos demográficos reales:', response.data.data);
        setDemographicData(response.data.data);
      } catch (err) {
        console.error('❌ Error fetching demographic data:', err);
        setError('Error al cargar datos demográficos');
        // Usar datos de ejemplo en caso de error
        setDemographicData({
          byShift: {
            morning: { students: 15, attendance: 88, present: 13, absent: 2 },
            afternoon: { students: 15, attendance: 82, present: 12, absent: 3 }
          },
          byGender: {
            male: { students: 16, attendance: 85, present: 14, absent: 2 },
            female: { students: 14, attendance: 86, present: 12, absent: 2 }
          },
          byAge: {
            age3: { students: 8, attendance: 90, present: 7, absent: 1 },
            age4: { students: 10, attendance: 85, present: 9, absent: 1 },
            age5: { students: 12, attendance: 83, present: 10, absent: 2 }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDemographicData();
  }, []);

  if (loading) {
    return (
      <div className="demographic-analysis">
        <h3 className="demographic-title">
          <Icon name="chart-pie" />
          {t('statistics.demographicAnalysis')}
        </h3>
        <div className="loading-container">
          <p>Cargando análisis demográfico...</p>
        </div>
      </div>
    );
  }

  if (error || !demographicData) {
    return (
      <div className="demographic-analysis">
        <h3 className="demographic-title">
          <Icon name="chart-pie" />
          {t('statistics.demographicAnalysis')}
        </h3>
        <div className="error-container">
          <p>Error al cargar datos demográficos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="demographic-analysis">
      <h3 className="demographic-title">
        <Icon name="chart-pie" />
        {t('statistics.demographicAnalysis')}
      </h3>

      <div className="demographic-grid">
        {/* Análisis por Turno */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="clock" />
            {t('statistics.shiftAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byShift && Object.entries(demographicData.byShift).map(([shift, stats]) => {
              const shiftLabel = shift === 'mañana' ? t('statistics.morningShift') : 
                                shift === 'tarde' ? t('statistics.afternoonShift') : 
                                shift.charAt(0).toUpperCase() + shift.slice(1);
              return (
                <div key={shift} className="demographic-stat">
                  <span className="stat-label">{shiftLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{t('statistics.present')}: {stats.present}</span>
                  <span className="stat-attendance">{t('statistics.absent')}: {stats.absent}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis por Género */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="users" />
            {t('statistics.genderAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byGender && Object.entries(demographicData.byGender).map(([gender, stats]) => {
              const genderLabel = gender === 'masculino' ? t('statistics.male') : 
                                 gender === 'femenino' ? t('statistics.female') : 
                                 gender.charAt(0).toUpperCase() + gender.slice(1);
              return (
                <div key={gender} className="demographic-stat">
                  <span className="stat-label">{genderLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{t('statistics.present')}: {stats.present}</span>
                  <span className="stat-attendance">{t('statistics.absent')}: {stats.absent}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis por Edad */}
        <div className="demographic-card">
          <h4 className="demographic-card-title">
            <Icon name="calendar" />
            {t('statistics.ageAnalysis')}
          </h4>
          <div className="demographic-stats">
            {demographicData.byAge && Object.entries(demographicData.byAge).map(([ageKey, stats]) => {
              const age = ageKey.replace('age', '');
              const ageLabel = t(`statistics.age${age}`);
              return (
                <div key={ageKey} className="demographic-stat">
                  <span className="stat-label">{ageLabel}:</span>
                  <span className="stat-value">{stats.students} {t('statistics.students')}</span>
                  <span className="stat-attendance">{t('statistics.present')}: {stats.present}</span>
                  <span className="stat-attendance">{t('statistics.absent')}: {stats.absent}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}