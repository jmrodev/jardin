import { useTranslation } from 'react-i18next';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'md', className = '', showText = true }) => {
  const { t } = useTranslation();
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <div className={spinnerClasses}></div>
      {showText && (
        <p className={styles.loadingText}>{t('common.loading')}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 