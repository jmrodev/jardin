import { useTranslation } from 'react-i18next';

const LoadingSpinner = ({ size = 'md', className = '', showText = true }) => {
  const { t } = useTranslation();
  const spinnerClasses = [
    'spinner',
    size,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="loading-spinner-container">
      <div className={spinnerClasses}></div>
      {showText && (
        <p className="loading-text">{t('common.loading')}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 