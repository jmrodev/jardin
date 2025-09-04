import React, { useState, useEffect } from 'react';
import { getPersons } from '../../services/api/persons';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

export default function StudentForm({ onSubmit, onCancel, initialData }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(() => {
    const initialResponsibles = Array.isArray(initialData?.responsibles) ? initialData.responsibles : [];
    return {
      firstname: initialData?.firstname || '',
      lastname_father: initialData?.lastname_father || '',
      lastname_mother: initialData?.lastname_mother || '',
      address: initialData?.address || '',
      dni: initialData?.dni || '',
      gender: initialData?.gender || '',
      classroom: initialData?.classroom || '',
      shift: initialData?.shift || '',
      birth_date: initialData?.birth_date || '',
      responsibles: initialResponsibles,
    };
  });
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await getPersons();
        setPersons(response.data); // Assuming API returns { data: [...] }
      } catch (error) {
        console.error('Error fetching persons:', error);
        alert('Error al obtener la lista de personas.');
      }
    };
    fetchPersons();
  }, []);

  const handleResponsibleChange = (index, field, value) => {
    const updatedResponsibles = [...form.responsibles];
    const responsible = { ...updatedResponsibles[index] };

    if (field === 'person_id') {
        responsible[field] = parseInt(value, 10);
    } else if (field === 'can_pickup' || field === 'can_change_diapers') {
        responsible[field] = value;
    } else {
        responsible[field] = value;
    }
    
    updatedResponsibles[index] = responsible;
    setForm(prev => ({ ...prev, responsibles: updatedResponsibles }));
  };

  const addResponsible = () => {
    setForm(prev => ({
      ...prev,
      responsibles: [
        ...(prev.responsibles || []),
        { person_id: '', type: 'padre', can_pickup: false, can_change_diapers: false, notes: '' }
      ]
    }));
  };

  const removeResponsible = index => {
    setForm(prev => ({
      ...prev,
      responsibles: prev.responsibles.filter((_, i) => i !== index)
    }));
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ensure all other fields are included
    const dataToSubmit = {
      ...form,
      special_education: form.special_education || false,
      needs_assistant: form.needs_assistant || false,
      special_diet: form.special_diet || false,
      celiac: form.celiac || false,
      diabetic: form.diabetic || false,
      takes_dairy: form.takes_dairy || false,
      care_diseases: form.care_diseases || '',
      medication: form.medication || '',
      diapers: form.diapers || false,
      diaper_responsible: form.diaper_responsible || '',
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Student Fields ... */}
      <input className="input-field" name="firstname" placeholder={t('name')} value={form.firstname} onChange={handleChange} required />
      <input className="input-field" name="lastname_father" placeholder={t('lastnameFather')} value={form.lastname_father} onChange={handleChange} required />
      <input className="input-field" name="lastname_mother" placeholder={t('lastnameMother')} value={form.lastname_mother} onChange={handleChange} required />
      <input className="input-field" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />
      <input className="input-field" name="dni" placeholder={t('dni')} value={form.dni} onChange={handleChange} required />
      <select className="input-field" name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">{t('filters.gender')}</option>
        <option value="varón">{t('filters.male')}</option>
        <option value="mujer">{t('filters.female')}</option>
      </select>
      <select className="input-field" name="classroom" value={form.classroom} onChange={handleChange} required>
        <option value="">{t('classroom')}</option>
        <option value="Sala 3">Sala 3</option>
        <option value="Sala 4">Sala 4</option>
        <option value="Sala 5">Sala 5</option>
      </select>
      <select className="input-field" name="shift" value={form.shift} onChange={handleChange} required>
        <option value="">{t('filters.shift')}</option>
        <option value="Mañana">{t('filters.morning')}</option>
        <option value="Tarde">{t('filters.afternoon')}</option>
      </select>
      <input className="input-field" name="birth_date" type="date" placeholder={t('birthDate')} value={form.birth_date} onChange={handleChange} required />

      {/* Responsibles Section */}
      <div className="responsibles-section">
        <h3>{t('responsibles')}</h3>
        {Array.isArray(form.responsibles) && form.responsibles.map((resp, index) => (
          <div key={index} className="responsible-item">
            <select
              className="input-field"
              value={resp.person_id}
              onChange={e => handleResponsibleChange(index, 'person_id', e.target.value)}
            >
              <option value="">{t('selectPerson')}</option>
              {persons.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name} {person.lastname} ({person.dni})
                </option>
              ))}
            </select>
            <select
                className="input-field"
                value={resp.type}
                onChange={e => handleResponsibleChange(index, 'type', e.target.value)}>
                <option value="padre">Padre</option>
                <option value="madre">Madre</option>
                <option value="tutor">Tutor</option>
                <option value="familiar">Familiar</option>
                <option value="otro">Otro</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={resp.can_pickup}
                onChange={e => handleResponsibleChange(index, 'can_pickup', e.target.checked)}
              />
              {t('canPickup')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={resp.can_change_diapers}
                onChange={e => handleResponsibleChange(index, 'can_change_diapers', e.target.checked)}
              />
              {t('canChangeDiapers')}
            </label>
            <Button type="button" variant="danger" onClick={() => removeResponsible(index)}>{t('remove')}</Button>
          </div>
        ))}
        <Button type="button" onClick={addResponsible}>{t('addResponsible')}</Button>
      </div>

      <div className="button-container">
        <Button type="submit" variant="primary">{t('common.save')}</Button>
        {onCancel && (
          <Button type="button" variant="danger" onClick={onCancel}>{t('common.cancel')}</Button>
        )}
      </div>
    </form>
  );
}