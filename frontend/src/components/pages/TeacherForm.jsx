import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';

export default function TeacherForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState({
    firstname: initialData?.firstname || '',
    lastname_father: initialData?.lastname_father || '',
    lastname_mother: initialData?.lastname_mother || '',
    dni: initialData?.dni || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  const { t } = useTranslation();

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="firstname"
        placeholder={t('teachers.firstname')}
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_father"
        placeholder={t('teachers.lastnameFather')}
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_mother"
        placeholder={t('teachers.lastnameMother')}
        value={form.lastname_mother}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="dni"
        placeholder={t('teachers.dni')}
        value={form.dni}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="phone"
        placeholder={t('teachers.phone')}
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="email"
        placeholder={t('teachers.email')}
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="button-container">
        <Button type="submit" variant="primary">{t('teachers.save')}</Button>
        {onCancel && (
          <Button type="button" variant="danger" onClick={onCancel}>{t('teachers.cancel')}</Button>
        )}
      </div>
    </form>
  );
} 