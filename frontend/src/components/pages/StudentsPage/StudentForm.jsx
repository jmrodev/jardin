import React, { useState } from 'react';

const initialState = {
  firstname: '',
  lastname_father: '',
  lastname_mother: '',
  address: '',
  dni: '',
  birth_date: '',
  classroom: '',
  shift: '',
  special_education: false,
  needs_assistant: false,
  special_diet: false,
  celiac: false,
  diabetic: false,
  takes_dairy: false,
  care_diseases: '',
  medication: '',
  diapers: false,
  diaper_responsible: '',
  authorized_pickups: ['']
};

export default function StudentForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePickupChange = (idx, value) => {
    const updated = [...form.authorized_pickups];
    updated[idx] = value;
    setForm(prev => ({ ...prev, authorized_pickups: updated }));
  };

  const addPickup = () => {
    setForm(prev => ({ ...prev, authorized_pickups: [...prev.authorized_pickups, ''] }));
  };

  const removePickup = idx => {
    setForm(prev => ({
      ...prev,
      authorized_pickups: prev.authorized_pickups.filter((_, i) => i !== idx)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = 'Requerido';
    if (!form.lastname_father) newErrors.lastname_father = 'Requerido';
    if (!form.lastname_mother) newErrors.lastname_mother = 'Requerido';
    if (!form.address) newErrors.address = 'Requerido';
    if (!form.dni) newErrors.dni = 'Requerido';
    if (!form.birth_date) newErrors.birth_date = 'Requerido';
    if (!form.classroom) newErrors.classroom = 'Requerido';
    if (!form.shift) newErrors.shift = 'Requerido';
    if (!form.authorized_pickups.length || form.authorized_pickups.some(p => !p)) newErrors.authorized_pickups = 'Al menos una persona';
    if (form.special_education && form.needs_assistant === undefined) newErrors.needs_assistant = 'Indique si requiere acompañante';
    if (form.special_diet && (form.celiac === undefined || form.diabetic === undefined || form.takes_dairy === undefined)) newErrors.special_diet = 'Complete info de alimentación especial';
    if (form.care_diseases && !form.medication) newErrors.medication = 'Indique medicación';
    if (form.diapers && !form.diaper_responsible) newErrors.diaper_responsible = 'Indique responsable de pañales';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input name="firstname" placeholder="Nombre" value={form.firstname} onChange={handleChange} />
      {errors.firstname && <span>{errors.firstname}</span>}
      <input name="lastname_father" placeholder="Apellido paterno" value={form.lastname_father} onChange={handleChange} />
      {errors.lastname_father && <span>{errors.lastname_father}</span>}
      <input name="lastname_mother" placeholder="Apellido materno" value={form.lastname_mother} onChange={handleChange} />
      {errors.lastname_mother && <span>{errors.lastname_mother}</span>}
      <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />
      {errors.address && <span>{errors.address}</span>}
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      {errors.dni && <span>{errors.dni}</span>}
      <input name="birth_date" type="date" placeholder="Fecha de nacimiento" value={form.birth_date} onChange={handleChange} />
      {errors.birth_date && <span>{errors.birth_date}</span>}
      <input name="classroom" placeholder="Sala" value={form.classroom} onChange={handleChange} />
      {errors.classroom && <span>{errors.classroom}</span>}
      <input name="shift" placeholder="Turno" value={form.shift} onChange={handleChange} />
      {errors.shift && <span>{errors.shift}</span>}
      <label>
        <input type="checkbox" name="special_education" checked={form.special_education} onChange={handleChange} /> Educación especial
      </label>
      {form.special_education && (
        <label>
          <input type="checkbox" name="needs_assistant" checked={form.needs_assistant} onChange={handleChange} /> Requiere acompañante
        </label>
      )}
      <label>
        <input type="checkbox" name="special_diet" checked={form.special_diet} onChange={handleChange} /> Alimentación especial
      </label>
      {form.special_diet && (
        <>
          <label>
            <input type="checkbox" name="celiac" checked={form.celiac} onChange={handleChange} /> Celíaco
          </label>
          <label>
            <input type="checkbox" name="diabetic" checked={form.diabetic} onChange={handleChange} /> Diabético
          </label>
          <label>
            <input type="checkbox" name="takes_dairy" checked={form.takes_dairy} onChange={handleChange} /> Toma lácteos
          </label>
        </>
      )}
      <input name="care_diseases" placeholder="Enfermedades de cuidado" value={form.care_diseases} onChange={handleChange} />
      {form.care_diseases && (
        <input name="medication" placeholder="Medicación" value={form.medication} onChange={handleChange} />
      )}
      <label>
        <input type="checkbox" name="diapers" checked={form.diapers} onChange={handleChange} /> Usa pañales
      </label>
      {form.diapers && (
        <input name="diaper_responsible" placeholder="Responsable de pañales" value={form.diaper_responsible} onChange={handleChange} />
      )}
      <div>
        <label>Personas autorizadas a retirar:</label>
        {form.authorized_pickups.map((p, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4 }}>
            <input
              value={p}
              onChange={e => handlePickupChange(idx, e.target.value)}
              placeholder={`Persona ${idx + 1}`}
            />
            {form.authorized_pickups.length > 1 && (
              <button type="button" onClick={() => removePickup(idx)}>-</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addPickup}>Agregar persona</button>
        {errors.authorized_pickups && <span>{errors.authorized_pickups}</span>}
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
} 