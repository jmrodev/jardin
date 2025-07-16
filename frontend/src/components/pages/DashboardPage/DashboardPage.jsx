import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import DashboardTemplate from '../../templates/DashboardTemplate/DashboardTemplate';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAdmin, isDirector, isTeacher, isPreceptor } = useAuth();

  const handleViewStudents = () => {
    navigate('/students');
  };

  const handleManageTeachers = () => {
    navigate('/teachers');
  };

  const handleAttendance = () => {
    navigate('/attendance');
  };

  const handleViewParents = () => {
    navigate('/parents');
  };

  return (
    <DashboardTemplate>
      {/* <div className={styles.permissions}>
        <h3>{t('dashboard.permissions')}</h3>
        <ul className={styles.permissionsList}>
          {isAdmin && <li>{t('dashboard.fullAccess')}</li>}
          {isDirector && <li>{t('dashboard.manageStaff')}</li>}
          {isTeacher && <li>{t('dashboard.viewStudents')}</li>}
          {isPreceptor && <li>{t('dashboard.limitedAccess')}</li>}
        </ul>
      </div> */}

      <div className={styles.quickActions}>
        <h3>{t('dashboard.quickActions')}</h3>
        <div className={styles.actionsGrid}>
          {(isAdmin || isDirector || isTeacher) && (
            <Button
              variant="primary"
              size="lg"
              className={styles.actionButton}
              onClick={handleViewStudents}
            >
              <Icon name="Users" size={24} />
              {t('dashboard.viewStudentsBtn')}
            </Button>
          )}
          
          {(isAdmin || isDirector) && (
            <Button
              variant="secondary"
              size="lg"
              className={styles.actionButton}
              onClick={handleManageTeachers}
            >
              <Icon name="UserCheck" size={24} />
              {t('dashboard.manageTeachersBtn')}
            </Button>
          )}

          {(isAdmin || isDirector || isTeacher) && (
            <Button
              variant="outline"
              size="lg"
              className={styles.actionButton}
              onClick={handleAttendance}
            >
              <Icon name="Calendar" size={24} />
              {t('dashboard.attendanceBtn')}
            </Button>
          )}
          {(isAdmin || isDirector) && (
            <Button
              variant="primary"
              size="lg"
              className={styles.actionButton}
              onClick={handleViewParents}
            >
              <Icon name="User" size={24} />
              {t('dashboard.viewParentsBtn')}
            </Button>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DashboardPage; 