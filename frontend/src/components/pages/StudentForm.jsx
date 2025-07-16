import React, { useState, useEffect } from 'react';
import { getPersons } from '../../services/api/persons';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

export default function StudentForm({ onSubmit, onCancel, initialData }) {
  const { t } = useTranslation();
  const [form, setForm] = React.useState({
    firstname: initialData?.firstname || '',
    lastname_father: initialData?.lastname_father || '',
    lastname_mother: initialData?.lastname_mother || '',
    address: initialData?.address || '',
    dni: initialData?.dni || '',
    gender: initialData?.gender || '',
    classroom: initialData?.classroom || '',
    shift: initialData?.shift || '',
    birth_date: initialData?.birth_date || '',
  });
  const [errors, setErrors] = useState({});
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // Obtener personas reales del backend
    const fetchPersons = async () => {
      try {
        const data = await getPersons();
        setPersons(data);
      } catch (error) {
        setPersons([]);
        alert('Error al obtener personas');
      }
    };
    fetchPersons();
  }, []);

  const handleResponsibleChange = (idx, field, value) => {
    const updated = [...form.responsibles];
    updated[idx][field] = value;
    setForm(prev => ({ ...prev, responsibles: updated }));
  };

  const addResponsible = () => {
    setForm(prev => ({
      ...prev,
      responsibles: [
        ...prev.responsibles,
        { person_id: '', can_pickup: false, can_change_diapers: false, type: '', notes: '' }
      ]
    }));
  };

  const removeResponsible = idx => {
    setForm(prev => ({
      ...prev,
      responsibles: prev.responsibles.filter((_, i) => i !== idx)
    }));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="firstname"
        placeholder={t('name')}
        value={form.firstname}
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
        required
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
        <option value="varón">{t('filters.male')}</option>
        <option value="mujer">{t('filters.female')}</option>
      </select>

      <select
        className="input-field"
        name="classroom"
        value={form.classroom}
        onChange={handleChange}
        required
      >
        <option value="">{t('classroom')}</option>
        <option value="Sala 3">Sala 3</option>
        <option value="Sala 4">Sala 4</option>
        <option value="Sala 5">Sala 5</option>
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
        name="birth_date"
        type="date"
        placeholder={t('birthDate')}
        value={form.birth_date}
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