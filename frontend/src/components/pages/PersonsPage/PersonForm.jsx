import React, { useState } from 'react';
import styles from './PersonForm.module.css';
import Button from '../../atoms/Button/Button';

const initialState = {
  name: '',
  lastname: '',
  dni: '',
  address: '',
  phone: '',
  email: '',
  relationship: '', // 'padre', 'madre', 'tutor', 'familiar', 'otro'
};

const relationshipOptions = [
  { value: '', label: 'Seleccione relación' },
  { value: 'padre', label: 'Padre' },
  { value: 'madre', label: 'Madre' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'otro', label: 'Otro' },
];

export default function PersonForm({ onSubmit, initialData = {}, submitLabel = 'Guardar' }) {
  const [form, setForm] = useState({ ...initialState, ...initialData });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Requerido';
    if (!form.lastname) newErrors.lastname = 'Requerido';
    if (!form.dni) newErrors.dni = 'Requerido';
    if (!form.relationship) newErrors.relationship = 'Requerido';
    if (form.dni && !/^\d{6,}$/.test(form.dni)) newErrors.dni = 'El DNI debe ser numérico y tener al menos 6 dígitos.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'El email no es válido.';
    if (form.phone && !/^\d{6,}$/.test(form.phone)) newErrors.phone = 'El teléfono debe ser numérico y tener al menos 6 dígitos.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input 
        name="name" 
        placeholder="Nombre" 
        value={form.name} 
        onChange={handleChange}
        className={errors.name ? styles.error : ''}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}
      
      <input 
        name="lastname" 
        placeholder="Apellido" 
        value={form.lastname} 
        onChange={handleChange}
        className={errors.lastname ? styles.error : ''}
      />
      {errors.lastname && <span className={styles.error}>{errors.lastname}</span>}
      
      <input 
        name="dni" 
        placeholder="DNI" 
        value={form.dni} 
        onChange={handleChange}
        className={errors.dni ? styles.error : ''}
      />
      {errors.dni && <span className={styles.error}>{errors.dni}</span>}
      
      <input 
        name="address" 
        placeholder="Dirección" 
        value={form.address} 
        onChange={handleChange}
      />
      
      <input 
        name="phone" 
        placeholder="Teléfono" 
        value={form.phone} 
        onChange={handleChange}
        className={errors.phone ? styles.error : ''}
      />
      {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      
      <input 
        name="email" 
        placeholder="Email" 
        value={form.email} 
        onChange={handleChange}
        className={errors.email ? styles.error : ''}
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}
      
      <select 
        name="relationship" 
        value={form.relationship} 
        onChange={handleChange}
        className={errors.relationship ? styles.error : ''}
      >
        {relationshipOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.relationship && <span className={styles.error}>{errors.relationship}</span>}
      
      <Button type="submit" variant="primary">{submitLabel}</Button>
    </form>
  );
} 