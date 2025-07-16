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
        >
          <Icon name="Flag" size={16} />
          {t('language.spanish')}
        </Button>
        
        <Button
          variant={currentLanguage === 'en' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage('en')}
          className="language-button"
        >
          <Icon name="Flag" size={16} />
          {t('language.english')}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector; 