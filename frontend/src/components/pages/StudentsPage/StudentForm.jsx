import React, { useState, useEffect } from 'react';
import { getPersons } from '../../../services/api/persons';
import styles from './StudentForm.module.css';
import Button from '../../atoms/Button/Button';

export default function StudentForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = React.useState({
    firstname: initialData?.firstname || '',
    lastname_father: initialData?.lastname_father || '',
    lastname_mother: initialData?.lastname_mother || '',
    dni: initialData?.dni || '',
    classroom: initialData?.classroom || '',
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
        name="classroom"
        placeholder="Sala"
        value={form.classroom}
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
        <Button type="submit" variant="primary">Guardar</Button>
        {onCancel && (
          <Button type="button" variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
} 