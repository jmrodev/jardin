import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './DashboardTemplate.module.css';

const DashboardTemplate = ({ children }) => {
  // const { t } = useTranslation();
  // const { user } = useAuth();

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default DashboardTemplate;
