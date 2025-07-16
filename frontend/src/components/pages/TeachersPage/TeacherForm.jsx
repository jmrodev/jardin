import React, { useState } from 'react';
import styles from '../StudentsPage/StudentForm.module.css';
import { useTranslation } from 'react-i18next';

export default function TeacherForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState({
    firstname: initialData?.firstname || '',
    lastname_father: initialData?.lastname_father || '',
    lastname_mother: initialData?.lastname_mother || '',
    dni: initialData?.dni || '',
    subject: initialData?.subject || '',
    birth_date: initialData?.birth_date || '',
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
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        className={styles.inputField}
        name="firstname"
        placeholder={t('teachers.firstname')}
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="lastname_father"
        placeholder={t('teachers.lastnameFather')}
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="lastname_mother"
        placeholder={t('teachers.lastnameMother')}
        value={form.lastname_mother}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="dni"
        placeholder={t('teachers.dni')}
        value={form.dni}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="subject"
        placeholder="Materia"
        value={form.subject}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="birth_date"
        type="date"
        placeholder="Fecha de nacimiento"
        value={form.birth_date}
        onChange={handleChange}
        required
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="submit">{t('teachers.save')}</button>
        {onCancel && (
          <button className={`${styles.button} ${styles.cancelButton}`} type="button" onClick={onCancel}>{t('teachers.cancel')}</button>
        )}
      </div>
    </form>
  );
} 