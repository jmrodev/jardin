import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Icon from '@/components/atoms/Icon';
import '@/styles/components/organisms/entity-form.css';
// import { useForm } from '@/hooks/useForm'; // Lo crearemos pronto

const EntityForm = ({ formConfig, initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  // const { formData, errors, handleChange, handleSubmit } = useForm(initialData, onSubmit, formConfig.validationSchema);

  // Temporalmente, hasta que creemos el hook
  const [formData, setFormData] = React.useState(initialData || {});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleResponsibleChange = (index, field, value) => {
    setFormData(prev => {
      const responsibles = [...(prev.responsibles || [])];
      responsibles[index] = { ...responsibles[index], [field]: value };
      return { ...prev, responsibles };
    });
  };

  const addResponsible = () => {
    setFormData(prev => {
      const responsibles = [...(prev.responsibles || []), {
        name: '',
        middle_name: '',
        lastname_father: '',
        maternal_lastname: '',
        dni: '',
        phone: '',
        email: '',
        relationship: 'Tutor Legal',
        can_pickup: true,
        can_change_diapers: false,
        is_emergency_contact: false
      }];
      return { ...prev, responsibles };
    });
  };

  const removeResponsible = (index) => {
    setFormData(prev => {
      const responsibles = [...(prev.responsibles || [])];
      responsibles.splice(index, 1);
      return { ...prev, responsibles };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }

  const renderField = (field) => {
    const { name, label, type, placeholder, options, required, defaultValue } = field;
    
    // Establecer valor por defecto si no existe
    if (defaultValue !== undefined && formData[name] === undefined) {
      setFormData(prev => ({ ...prev, [name]: defaultValue }));
    }
    
    const commonProps = {
      id: name,
      name: name,
      value: formData[name] || '',
      onChange: handleChange,
      placeholder: placeholder,
      required: required
    };
    
    switch(type) {
      case 'select':
        return <Select {...commonProps} options={options} />;
      case 'textarea':
        return <Input {...commonProps} as="textarea" />;
      case 'checkbox':
        return (
          <Input 
            {...commonProps} 
            type="checkbox" 
            checked={formData[name] || false}
          />
        );
      default:
        return <Input {...commonProps} type={type} />;
    }
  }

  const renderResponsibleField = (responsible, index, fieldName, label, type = 'text', options = null) => {
    const value = responsible[fieldName] || '';
    
    const handleFieldChange = (e) => {
      const { value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      handleResponsibleChange(index, fieldName, newValue);
    };

    if (type === 'select') {
      return (
        <Select
          name={`responsible_${index}_${fieldName}`}
          value={value}
          onChange={handleFieldChange}
          options={options}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <Input
          type="checkbox"
          name={`responsible_${index}_${fieldName}`}
          checked={value}
          onChange={handleFieldChange}
        />
      );
    }

    return (
      <Input
        type={type}
        name={`responsible_${index}_${fieldName}`}
        value={value}
        onChange={handleFieldChange}
        placeholder={label}
      />
    );
  };

  const getFieldClassName = (field) => {
    const baseClass = 'form-field';
    if (field.type === 'checkbox' || field.type === 'radio') {
      return `${baseClass} ${field.type}-field`;
    }
    if (field.fullWidth) {
      return `${baseClass} full-width`;
    }
    return baseClass;
  };

  const renderResponsiblesSection = () => {
    const responsibles = formData.responsibles || [];
    
    return (
      <div className="form-section">
        <div className="form-section-header">
          <h4>{t('responsibles')}</h4>
          <Button 
            type="button" 
            onClick={addResponsible} 
            variant="secondary"
            className="button--small"
          >
            <Icon name="Plus" size={16} />
            {t('addResponsible')}
          </Button>
        </div>
        
        {responsibles.length === 0 ? (
          <div className="no-responsibles">
            <p>{t('noResponsiblesAdded')}</p>
            <Button 
              type="button" 
              onClick={addResponsible} 
              variant="primary"
              className="button--small"
            >
              {t('addFirstResponsible')}
            </Button>
          </div>
        ) : (
          <div className="responsibles-list">
            {responsibles.map((responsible, index) => (
              <div key={index} className="responsible-card">
                <div className="responsible-card-header">
                  <h5>{t('responsible')} {index + 1}</h5>
                  <Button 
                    type="button" 
                    onClick={() => removeResponsible(index)}
                    variant="danger"
                    className="button--small"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t('firstName')}</label>
                    {renderResponsibleField(responsible, index, 'name', t('firstName'))}
                  </div>
                  <div className="form-field">
                    <label>{t('middleName')}</label>
                    {renderResponsibleField(responsible, index, 'middle_name', t('middleName'))}
                  </div>
                  <div className="form-field">
                    <label>{t('paternalLastname')}</label>
                    {renderResponsibleField(responsible, index, 'lastname_father', t('paternalLastname'))}
                  </div>
                  <div className="form-field">
                    <label>{t('maternalLastname')}</label>
                    {renderResponsibleField(responsible, index, 'maternal_lastname', t('maternalLastname'))}
                  </div>
                  <div className="form-field">
                    <label>{t('dni')}</label>
                    {renderResponsibleField(responsible, index, 'dni', t('dni'))}
                  </div>
                  <div className="form-field">
                    <label>{t('phone')}</label>
                    {renderResponsibleField(responsible, index, 'phone', t('phone'), 'tel')}
                  </div>
                  <div className="form-field">
                    <label>{t('email')}</label>
                    {renderResponsibleField(responsible, index, 'email', t('email'), 'email')}
                  </div>
                  <div className="form-field">
                    <label>{t('relationship')}</label>
                    {renderResponsibleField(responsible, index, 'relationship', t('relationship'), 'select', [
                      { value: 'Madre', label: t('mother') },
                      { value: 'Padre', label: t('father') },
                      { value: 'Tutor Legal', label: t('legalGuardian') },
                      { value: 'Abuelo/a', label: t('grandparent') },
                      { value: 'Tío/a', label: t('uncleAunt') },
                      { value: 'Otro', label: t('other') }
                    ])}
                  </div>
                </div>
                
                <div className="responsible-permissions">
                  <h6>{t('permissions')}</h6>
                  <div className="form-grid">
                    <div className="form-field checkbox-field">
                      {renderResponsibleField(responsible, index, 'can_pickup', t('can_pickup'), 'checkbox')}
                      <label>{t('can_pickup')}</label>
                    </div>
                    <div className="form-field checkbox-field">
                      {renderResponsibleField(responsible, index, 'can_change_diapers', t('can_change_diapers'), 'checkbox')}
                      <label>{t('can_change_diapers')}</label>
                    </div>
                    <div className="form-field checkbox-field">
                      {renderResponsibleField(responsible, index, 'is_emergency_contact', t('is_emergency_contact'), 'checkbox')}
                      <label>{t('is_emergency_contact')}</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
              <div key={field.name} className={getFieldClassName(field)}>
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                  {field.required && <span className="required-indicator">*</span>}
                </label>
                {renderField(field)}
                {/* {errors[field.name] && <span className="error-message">{errors[field.name]}</span>} */}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Sección de Responsables - solo para estudiantes */}
      {formConfig.createTitle?.includes('Estudiante') || formConfig.createTitle?.includes('Alumno') ? 
        renderResponsiblesSection() : null}
      
      <div className="form-actions">
        <Button type="submit" variant="primary">{t('save')}</Button>
        <Button type="button" onClick={onCancel} variant="secondary">{t('cancel')}</Button>
      </div>
    </form>
  )
}

EntityForm.propTypes = {
  formConfig: PropTypes.shape({
    createTitle: PropTypes.string.isRequired,
    editTitle: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            options: PropTypes.array,
            required: PropTypes.bool,
            defaultValue: PropTypes.any,
            fullWidth: PropTypes.bool,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EntityForm; 