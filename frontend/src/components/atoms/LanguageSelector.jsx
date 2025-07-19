import { useTranslation } from 'react-i18next';
import Button from './Button';
import Icon from './Icon';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="language-selector-container">
      <div className="language-selector">
        <Button
          variant={currentLanguage === 'es' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage('es')}
          className="language-button"
          title={t('language.spanish')}
        >
          <Icon name="Flag" size={16} />
          <span className="language-text">{t('language.spanish')}</span>
        </Button>
        
        <Button
          variant={currentLanguage === 'en' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage('en')}
          className="language-button"
          title={t('language.english')}
        >
          <Icon name="Flag" size={16} />
          <span className="language-text">{t('language.english')}</span>
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector; 