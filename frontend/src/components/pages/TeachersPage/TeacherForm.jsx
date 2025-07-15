import React, { useState } from 'react';
import styles from '../StudentsPage/StudentForm.module.css';

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

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        className={styles.inputField}
        name="firstname"
        placeholder="Nombre"
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="lastname_father"
        placeholder="Apellido paterno"
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="lastname_mother"
        placeholder="Apellido materno"
        value={form.lastname_mother}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="dni"
        placeholder="DNI"
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
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button className={styles.button} type="submit">Guardar</button>
        {onCancel && (
          <button className={styles.button} type="button" onClick={onCancel} style={{ background: 'var(--color-danger)' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
} 