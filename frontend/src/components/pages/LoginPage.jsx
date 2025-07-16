import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import LanguageSelector from '../atoms/LanguageSelector';

const LoginPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = t('login.username') + ' ' + t('common.error').toLowerCase();
    }
    
    if (!formData.password) {
      newErrors.password = t('login.password') + ' ' + t('common.error').toLowerCase();
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: t('login.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header-actions">
        <LanguageSelector />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="login-page-theme-button"
        >
          <Icon 
            name={theme === 'dark' ? 'Sun' : 'Moon'} 
            size={20} 
          />
        </Button>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <Icon name="GraduationCap" size={48} className="login-logo" />
          <h1 className="login-title">{t('login.title')}</h1>
          <p className="login-subtitle">{t('login.subtitle')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="login-error-message">
              {errors.general}
            </div>
          )}
          
          <Input
            type="text"
            name="username"
            label={t('login.username')}
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
            placeholder={t('login.username')}
          />
          
          <Input
            type="password"
            name="password"
            label={t('login.password')}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            placeholder={t('login.password')}
          />
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? t('common.loading') : t('login.loginButton')}
          </Button>
        </form>
        
        <div className="login-footer">
          <p className="login-demo-info">
            Credenciales de demostración:
          </p>
          <div className="login-credentials">
            <div>
              <strong>{t('roles.admin')}:</strong> admin / password
            </div>
            <div>
              <strong>{t('roles.director')}:</strong> director / password
            </div>
            <div>
              <strong>{t('roles.teacher')}:</strong> teacher / password
            </div>
            <div>
              <strong>{t('roles.preceptor')}:</strong> preceptor / password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 