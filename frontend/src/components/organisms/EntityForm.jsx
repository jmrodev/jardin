import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/atoms/Button';
// import { useForm } from '@/hooks/useForm'; // Lo crearemos pronto

const EntityForm = ({ formConfig, initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  // const { formData, errors, handleChange, handleSubmit } = useForm(initialData, onSubmit, formConfig.validationSchema);

  // Temporalmente, hasta que creemos el hook
  const [formData, setFormData] = React.useState(initialData || {});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }


  const renderField = (field) => {
    const { name, label, type, placeholder, options } = field;
    
    switch(type) {
      case 'select':
        return (
          <select id={name} name={name} value={formData[name] || ''} onChange={handleChange}>
            <option value="">{placeholder || t('selectOption')}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        );
      case 'textarea':
        return <textarea id={name} name={name} placeholder={placeholder} value={formData[name] || ''} onChange={handleChange} />;
      default:
        return <input type={type} id={name} name={name} placeholder={placeholder} value={formData[name] || ''} onChange={handleChange} />;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <h2 className="entity-form__title">
        {initialData ? formConfig.editTitle : formConfig.createTitle}
      </h2>
      {formConfig.sections.map(section => (
        <div key={section.title} className="form-section">
          <h4>{section.title}</h4>
          <div className="form-grid">
            {section.fields.map(field => (
              <div key={field.name} className="form-field">
                <label htmlFor={field.name}>{field.label}</label>
                {renderField(field)}
                {/* {errors[field.name] && <span className="error-message">{errors[field.name]}</span>} */}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="form-actions">
        <Button type="submit" className="button--primary">{t('save')}</Button>
        <Button type="button" onClick={onCancel} className="button--secondary">{t('cancel')}</Button>
      </div>
    </form>
  )
}

EntityForm.propTypes = {
  // ... Definiremos los propTypes luego
};

export default EntityForm; 