import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import MainLayout from '../MainLayout';
import styles from './DashboardTemplate.module.css';

const DashboardTemplate = ({ children }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.welcome}>
          <h2>{t('dashboard.welcome', { name: user?.name })}</h2>
          <p>{t('dashboard.role')} <strong>{t(`roles.${user?.role}`)}</strong></p>
        </div>
        {children}
      </div>
    </MainLayout>
  );
};

export default DashboardTemplate;
