import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const DashboardTemplate = ({ children }) => {
  // const { t } = useTranslation();
  // const { user } = useAuth();

  return (
    <div className="dashboard-page">
      {children}
    </div>
  );
};

export default DashboardTemplate;
