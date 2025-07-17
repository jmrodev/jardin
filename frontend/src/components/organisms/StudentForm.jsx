import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

export default function StudentForm({ onSubmit, onCancel, initialData, classrooms = [] }) {
  const { t } = useTranslation();
  
  const [form, setForm] = useState({
    name: initialData?.name || '',
    lastname_father: initialData?.lastname_father || '',
    lastname_mother: initialData?.lastname_mother || '',
    address: initialData?.address || '',
    dni: initialData?.dni || '',
    gender: initialData?.gender || '',
    classroom_id: initialData?.classroom_id || '',
    shift: initialData?.shift || '',
    birthdate: initialData?.birthdate ? new Date(initialData.birthdate).toISOString().split('T')[0] : '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        lastname_father: initialData.lastname_father || '',
        lastname_mother: initialData.lastname_mother || '',
        address: initialData.address || '',
        dni: initialData.dni || '',
        gender: initialData.gender || '',
        classroom_id: initialData.classroom_id || '',
        shift: initialData.shift || '',
        birthdate: initialData.birthdate ? new Date(initialData.birthdate).toISOString().split('T')[0] : '',
      });
    }
  }, [initialData]);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataToSubmit = {
      ...initialData,
      ...form,
      person_type: 'student',
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="name"
        placeholder={t('name')}
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_father"
        placeholder={t('lastnameFather')}
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_mother"
        placeholder={t('lastnameMother')}
        value={form.lastname_mother}
        onChange={handleChange}
      />
      <input
        className="input-field"
        name="address"
        placeholder="Dirección"
        value={form.address}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="dni"
        placeholder={t('dni')}
        value={form.dni}
        onChange={handleChange}
        required
      />
      
      <select
        className="input-field"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">{t('filters.gender')}</option>
        <option value="Masculino">{t('filters.male')}</option>
        <option value="Femenino">{t('filters.female')}</option>
      </select>

      <select
        className="input-field"
        name="classroom_id"
        value={form.classroom_id}
        onChange={handleChange}
        required
      >
        <option value="">{t('classroom')}</option>
        {classrooms.map(classroom => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name}
          </option>
        ))}
      </select>

      <select
        className="input-field"
        name="shift"
        value={form.shift}
        onChange={handleChange}
        required
      >
        <option value="">{t('filters.shift')}</option>
        <option value="Mañana">{t('filters.morning')}</option>
        <option value="Tarde">{t('filters.afternoon')}</option>
      </select>

      <input
        className="input-field"
        name="birthdate"
        type="date"
        placeholder={t('birthDate')}
        value={form.birthdate}
        onChange={handleChange}
        required
      />
      
      <div className="button-container">
        <Button type="submit" variant="primary">{t('common.save')}</Button>
        {onCancel && (
          <Button type="button" variant="danger" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        )}
      </div>
    </form>
  );
} 