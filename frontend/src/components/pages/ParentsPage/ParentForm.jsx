import React, { useState } from 'react';
import styles from '../StudentsPage/StudentForm.module.css';

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
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        name="email"
        placeholder="Email"
        value={form.email}
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