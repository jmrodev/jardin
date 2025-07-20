import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
        console.log('📊 Datos demográficos obtenidos:', response.data);
        console.log('📊 Datos por sala específicos:', response.data.data.byClassroom);
        console.log('📊 Estructura completa de datos:', JSON.stringify(response.data.data, null, 2));
        setDemographicData(response.data.data);
      } catch (err) {
        console.error('❌ Error fetching demographic data:', err);
        setError(t('statistics.errorDemographic'));
        // Usar datos de ejemplo en caso de error
        setDemographicData({
          byShift: {
            morning: { students: 15, present: 13, absent: 2 },
            afternoon: { students: 15, present: 12, absent: 3 }
          },
          byGender: {
            male: { students: 16, present: 14, absent: 2 },
            female: { students: 14, present: 12, absent: 2 }
          },
          byAge: {
            age3: { students: 8, present: 7, absent: 1 },
            age4: { students: 10, present: 9, absent: 1 },
            age5: { students: 12, present: 10, absent: 2 }
          },
          byClassroom: {
            'Sala de 3 - Mañana': { classroom: 'Sala de 3', shift: 'Mañana', students: 5, present: 4, absent: 1 },
            'Sala de 3 - Tarde': { classroom: 'Sala de 3', shift: 'Tarde', students: 3, present: 3, absent: 0 },
            'Sala de 4 - Mañana': { classroom: 'Sala de 4', shift: 'Mañana', students: 8, present: 7, absent: 1 },
            'Sala de 4 - Tarde': { classroom: 'Sala de 4', shift: 'Tarde', students: 4, present: 3, absent: 1 },
            'Sala de 5 - Mañana': { classroom: 'Sala de 5', shift: 'Mañana', students: 10, present: 9, absent: 1 },
            'Sala de 5 - Tarde': { classroom: 'Sala de 5', shift: 'Tarde', students: 4, present: 3, absent: 1 }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDemographicData();
  }, []);

  const calculateAttendanceRate = (present, total) => {
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  const getStatusColor = (rate) => {
    if (rate >= 90) return 'success';
    if (rate >= 75) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <div className="demographic-analysis">
        <div className="demographic-header">
          <div className="demographic-header-icon">
            <Icon name="chart-pie" size={20} />
          </div>
          <h3 className="demographic-title">{t('statistics.demographicAnalysis')}</h3>
        </div>
        <div className="demographic-loading">
          <div className="loading-spinner"></div>
          <p>{t('statistics.loadingDemographic')}</p>
        </div>
      </div>
    );
  }

  if (error || !demographicData) {
    return (
      <div className="demographic-analysis">
        <div className="demographic-header">
          <div className="demographic-header-icon">
            <Icon name="chart-pie" size={20} />
          </div>
          <h3 className="demographic-title">{t('statistics.demographicAnalysis')}</h3>
        </div>
        <div className="demographic-error">
          <Icon name="alert-circle" size={24} />
          <p>{t('statistics.errorDemographic')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="demographic-analysis">
      <div className="demographic-header">
        <div className="demographic-header-icon">
          <Icon name="chart-pie" size={20} />
        </div>
        <h3 className="demographic-title">{t('statistics.demographicAnalysis')}</h3>
      </div>

      <div className="demographic-grid">
        {/* Análisis por Turno */}
        <div className="demographic-card" data-border-color="skyblue">
          <div className="demographic-card-header">
            <div className="demographic-card-icon card-icon--skyblue">
              <Icon name="clock" size={16} />
            </div>
            <h4 className="demographic-card-title">{t('statistics.byShift')}</h4>
          </div>
          <div className="demographic-card-content">
            {demographicData.byShift && Object.entries(demographicData.byShift).map(([shift, data]) => {
              const shiftLabel = shift === 'mañana' ? t('statistics.morningShift') : 
                                shift === 'tarde' ? t('statistics.afternoonShift') : 
                                shift.charAt(0).toUpperCase() + shift.slice(1);
              const attendanceRate = calculateAttendanceRate(data.present, data.students);
              const statusColor = getStatusColor(attendanceRate);
              
              return (
                <div key={shift} className="demographic-stat-item">
                  <div className="stat-item-header">
                    <span className="stat-item-label">{shiftLabel}</span>
                    <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                      {attendanceRate}%
                    </span>
                  </div>
                  <div className="stat-item-details">
                    <div className="stat-item-detail">
                      <Icon name="users" size={12} />
                      <span>{data.students} {t('statistics.students')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="check-circle" size={12} />
                      <span>{data.present} {t('statistics.present')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="x-circle" size={12} />
                      <span>{data.absent} {t('statistics.absent')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis por Género */}
        <div className="demographic-card" data-border-color="pink">
          <div className="demographic-card-header">
            <div className="demographic-card-icon card-icon--pink">
              <Icon name="users" size={16} />
            </div>
            <h4 className="demographic-card-title">{t('statistics.byGender')}</h4>
          </div>
          <div className="demographic-card-content">
            {demographicData.byGender && Object.entries(demographicData.byGender).map(([gender, data]) => {
              const genderLabel = gender === 'masculino' ? t('statistics.male') : 
                                 gender === 'femenino' ? t('statistics.female') : 
                                 gender.charAt(0).toUpperCase() + gender.slice(1);
              const attendanceRate = calculateAttendanceRate(data.present, data.students);
              const statusColor = getStatusColor(attendanceRate);
              
              return (
                <div key={gender} className="demographic-stat-item">
                  <div className="stat-item-header">
                    <span className="stat-item-label">{genderLabel}</span>
                    <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                      {attendanceRate}%
                    </span>
                  </div>
                  <div className="stat-item-details">
                    <div className="stat-item-detail">
                      <Icon name="users" size={12} />
                      <span>{data.students} {t('statistics.students')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="check-circle" size={12} />
                      <span>{data.present} {t('statistics.present')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="x-circle" size={12} />
                      <span>{data.absent} {t('statistics.absent')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis por Edad */}
        <div className="demographic-card" data-border-color="lime">
          <div className="demographic-card-header">
            <div className="demographic-card-icon card-icon--lime">
              <Icon name="calendar" size={16} />
            </div>
            <h4 className="demographic-card-title">{t('statistics.byAge')}</h4>
          </div>
          <div className="demographic-card-content">
            {demographicData.byAge && Object.entries(demographicData.byAge).map(([ageKey, data]) => {
              const age = ageKey.replace('age', '');
              const ageLabel = t(`statistics.age${age}`);
              const attendanceRate = calculateAttendanceRate(data.present, data.students);
              const statusColor = getStatusColor(attendanceRate);
              
              return (
                <div key={ageKey} className="demographic-stat-item">
                  <div className="stat-item-header">
                    <span className="stat-item-label">{ageLabel}</span>
                    <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                      {attendanceRate}%
                    </span>
                  </div>
                  <div className="stat-item-details">
                    <div className="stat-item-detail">
                      <Icon name="users" size={12} />
                      <span>{data.students} {t('statistics.students')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="check-circle" size={12} />
                      <span>{data.present} {t('statistics.present')}</span>
                    </div>
                    <div className="stat-item-detail">
                      <Icon name="x-circle" size={12} />
                      <span>{data.absent} {t('statistics.absent')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis por Sala */}
        <div className="demographic-card" data-border-color="purple">
          <div className="demographic-card-header">
            <div className="demographic-card-icon card-icon--purple">
              <Icon name="home" size={16} />
            </div>
            <h4 className="demographic-card-title">{t('statistics.byClassroom')}</h4>
          </div>
          <div className="demographic-card-content">
            {console.log('🔍 Datos por sala recibidos:', demographicData.byClassroom)}
            {demographicData.byClassroom && Object.keys(demographicData.byClassroom).length > 0 ? (
              Object.entries(demographicData.byClassroom).map(([key, data]) => {
                console.log('🔍 Procesando sala:', key, data);
                const shiftLabel = data.shift === 'Mañana' ? t('statistics.morningShift') : 
                                  data.shift === 'Tarde' ? t('statistics.afternoonShift') : 
                                  data.shift;
                const classroomLabel = `${data.classroom} - ${shiftLabel}`;
                const attendanceRate = calculateAttendanceRate(data.present, data.students);
                const statusColor = getStatusColor(attendanceRate);
                
                return (
                  <div key={key} className="demographic-stat-item">
                    <div className="stat-item-header">
                      <span className="stat-item-label">{classroomLabel}</span>
                      <span className={`stat-item-rate stat-item-rate--${statusColor}`}>
                        {attendanceRate}%
                      </span>
                    </div>
                    <div className="stat-item-details">
                      <div className="stat-item-detail">
                        <Icon name="users" size={12} />
                        <span>{data.students} {t('statistics.students')}</span>
                      </div>
                      <div className="stat-item-detail">
                        <Icon name="check-circle" size={12} />
                        <span>{data.present} {t('statistics.present')}</span>
                      </div>
                      <div className="stat-item-detail">
                        <Icon name="x-circle" size={12} />
                        <span>{data.absent} {t('statistics.absent')}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="demographic-stat-item">
                <div className="stat-item-header">
                  <span className="stat-item-label">{t('common.noData')}</span>
                </div>
                <div className="stat-item-details">
                  <div className="stat-item-detail">
                    <Icon name="alert-circle" size={12} />
                    <span>No hay datos de salas disponibles</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}