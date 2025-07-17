import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../templates/MainLayout';
import Button from '../atoms/Button';

export default function AttendancePage() {
  const { t } = useTranslation();

  return (
      <div className="attendance-page">
        <div className="attendance-header">
          <h2 className="attendance-title">{t('attendance.title')}</h2>
          <p className="attendance-subtitle">{t('attendance.subtitle')}</p>
        </div>

        <div className="attendance-content">
          <div className="card">
            <h3 className="card-title">{t('attendance.today')}</h3>
            <div className="attendance-stats">
              <div className="attendance-stat">
                <span className="attendance-stat-label">{t('attendance.present')}</span>
                <span className="attendance-stat-value">45</span>
              </div>
              <div className="attendance-stat">
                <span className="attendance-stat-label">{t('attendance.absent')}</span>
                <span className="attendance-stat-value">3</span>
              </div>
              <div className="attendance-stat">
                <span className="attendance-stat-label">{t('attendance.late')}</span>
                <span className="attendance-stat-value">2</span>
              </div>
            </div>
          </div>

          <div className="attendance-actions">
            <Button variant="primary">
              {t('attendance.registerAttendance')}
            </Button>
            <Button variant="secondary">
              {t('attendance.viewReport')}
            </Button>
          </div>
        </div>
      </div>
  );
} 