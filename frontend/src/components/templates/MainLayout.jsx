import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import LanguageSelector from '../atoms/LanguageSelector';
import styles from './MainLayout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const TITLES = {
  '/': 'dashboard.title',
  '/dashboard': 'dashboard.title',
  '/students': 'studentsManagement',
  '/teachers': 'teachersManagement',
  '/parents': 'parentsManagement',
  '/attendance': 'attendanceManagement',
};

export default function MainLayout({ children }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleGoDashboard = () => {
    navigate('/dashboard');
  };

  // Determinar el título dinámico según la ruta
  const currentPath = location.pathname;
  const titleKey = TITLES[currentPath] || 'dashboard.title';
  const showDashboardBtn = !['/', '/dashboard'].includes(currentPath);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brand}>
            <Icon name="GraduationCap" size={32} className={styles.logo} />
            <h1 className={styles.title}>{t(titleKey)}</h1>
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

            {showDashboardBtn && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoDashboard}
                className={styles.dashboardButton}
              >
                <Icon name="Home" size={16} />
                {t('dashboard.title')}
              </Button>
            )}

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
        {children}
      </main>
      <footer className={styles.footer}>
        <span>© 2024 Jardín</span>
      </footer>
    </div>
  );
} 