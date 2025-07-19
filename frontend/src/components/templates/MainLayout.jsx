import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import LanguageSelector from '../atoms/LanguageSelector';
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
    <div className="layout">
      <header className="header">
        <div className="header-content">
          {/* Brand Section - Left */}
          <div className="brand">
            <Icon name="GraduationCap" size={32} className="logo" />
            <h1 className="title">{t(titleKey)}</h1>
          </div>

          {/* Header Actions - Right */}
          <div className="header-actions">
            {/* UI Controls Group */}
            <div className="header-controls">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="theme-button"
                title={theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}
              >
                <Icon
                  name={theme === 'dark' ? 'Sun' : 'Moon'}
                  size={20}
                />
              </Button>
            </div>

            {/* Separator */}
            <div className="header-separator"></div>

            {/* User Controls Group */}
            <div className="user-controls">
              <div className="user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{t(`roles.${user?.role}`)}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="logout-button"
                title={t('dashboard.logout')}
              >
                <Icon name="LogOut" size={16} />
                <span className="logout-text">{t('dashboard.logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <span>© 2024 Jardín</span>
      </footer>
    </div>
  );
} 