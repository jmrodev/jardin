import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';

export default function ParentForm({ onSubmit, onCancel, initialData }) {
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
        placeholder={t('parents.firstname')}
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_father"
        placeholder={t('parents.lastnameFather')}
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_mother"
        placeholder={t('parents.lastnameMother')}
        value={form.lastname_mother}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="dni"
        placeholder={t('parents.dni')}
        value={form.dni}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="phone"
        placeholder={t('parents.phone')}
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="email"
        placeholder={t('parents.email')}
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="button-container">
        <Button type="submit" variant="primary">{t('parents.save')}</Button>
        {onCancel && (
          <Button type="button" variant="danger" onClick={onCancel}>{t('parents.cancel')}</Button>
        )}
      </div>
    </form>
  );
} 