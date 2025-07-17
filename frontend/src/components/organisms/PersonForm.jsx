import React, { useState } from 'react';
import Button from '../atoms/Button';

const initialState = {
  firstname: '',
  lastname_father: '',
  lastname_mother: '',
  dni: '',
  phone: '',
  email: '',
};

export default function PersonForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(initialData || initialState);

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
        placeholder="Nombre"
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_father"
        placeholder="Apellido paterno"
        value={form.lastname_father}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="lastname_mother"
        placeholder="Apellido materno"
        value={form.lastname_mother}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="button-container">
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