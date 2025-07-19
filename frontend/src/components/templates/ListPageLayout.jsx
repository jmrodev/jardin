import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import '@/styles/templates/list-page-layout.css';

const ListPageLayout = ({ filters, children, entityType, onAddNew }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = useMemo(() => [
    { path: '/dashboard', label: t('nav.dashboard'), icon: 'Home' },
    { path: '/students', label: t('nav.students'), icon: 'Users' },
    { path: '/teachers', label: t('nav.teachers'), icon: 'GraduationCap' },
    { path: '/parents', label: t('nav.parents'), icon: 'UserCheck' },
    { path: '/attendance', label: t('nav.attendance'), icon: 'CalendarCheck' },
    { path: '/statistics', label: t('nav.statistics'), icon: 'BarChart3' },
  ], [t]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="list-page-layout">
      <aside className="list-page-layout__sidebar">
        <div className="sidebar-navigation">
          <h3 className="sidebar-title" data-separator="navigation">{t('navigation')}</h3>
          <nav className="sidebar-nav">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActiveRoute(item.path) ? 'primary' : 'ghost'}
                onClick={() => navigate(item.path)}
                className="sidebar-nav-item"
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {onAddNew && entityType !== 'dashboard' && entityType !== 'attendance' && (
          <div className="sidebar-actions">
            <Button 
              onClick={onAddNew} 
              variant="primary"
              className="sidebar-add-button"
            >
              <Icon name="Plus" size={16} />
              {`${t('addNew')} ${t(entityType)}`}
            </Button>
          </div>
        )}

        <div className="sidebar-filters">
          <h3 className="sidebar-title" data-separator="filters">{t('filters.title')}</h3>
          {filters}
        </div>
      </aside>
      
      <main className="list-page-layout__content">
        {children}
      </main>
    </div>
  );
};

ListPageLayout.propTypes = {
  filters: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  entityType: PropTypes.string,
  onAddNew: PropTypes.func,
};

export default ListPageLayout; 