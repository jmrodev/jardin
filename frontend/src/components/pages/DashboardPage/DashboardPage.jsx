import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import LanguageSelector from '../../atoms/LanguageSelector';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout, isAdmin, isDirector, isTeacher, isPreceptor } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };

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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brand}>
            <Icon name="GraduationCap" size={32} className={styles.logo} />
            <h1 className={styles.title}>{t('dashboard.title')}</h1>
          </div>
          
          <div className={styles.headerActions}>
            <LanguageSelector />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={styles.themeButton}
            >
              <Icon 
                name={theme === 'dark' ? 'Sun' : 'Moon'} 
                size={20} 
              />
            </Button>
            
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userRole}>{t(`roles.${user?.role}`)}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              <Icon name="LogOut" size={16} />
              {t('dashboard.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h2>{t('dashboard.welcome', { name: user?.name })}</h2>
            <p>{t('dashboard.role')} <strong>{t(`roles.${user?.role}`)}</strong></p>
          </div>

          <div className={styles.permissions}>
            <h3>{t('dashboard.permissions')}</h3>
            <ul className={styles.permissionsList}>
              {isAdmin && <li>{t('dashboard.fullAccess')}</li>}
              {isDirector && <li>{t('dashboard.manageStaff')}</li>}
              {isTeacher && <li>{t('dashboard.viewStudents')}</li>}
              {isPreceptor && <li>{t('dashboard.limitedAccess')}</li>}
            </ul>
          </div>

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
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 