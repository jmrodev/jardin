import React, { useEffect, useState } from 'react';
import { getPersons, createPerson, updatePerson, deletePerson } from '../../../services/api/persons';
import PersonForm from './PersonForm.jsx';

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      alert('Error al obtener personas');
    }
    setLoading(false);
  };

  const handleCreate = async (data) => {
    try {
      await createPerson(data);
      await fetchPersons();
      setShowForm(false);
      alert('Persona creada correctamente');
    } catch (error) {
      alert('Error al crear persona');
    }
  };

  const handleEdit = (person) => {
    setEditPerson(person);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    try {
      await updatePerson(editPerson.id, data);
      await fetchPersons();
      setEditPerson(null);
      setShowForm(false);
      alert('Persona actualizada correctamente');
    } catch (error) {
      alert('Error al actualizar persona');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta persona?')) return;
    try {
      await deletePerson(id);
      await fetchPersons();
      alert('Persona eliminada correctamente');
    } catch (error) {
      alert('Error al eliminar persona');
    }
  };

  const handleCancel = () => {
    setEditPerson(null);
    setShowForm(false);
  };

  return (
    <div>
      <h2>Gestión de personas</h2>
      <button onClick={() => { setShowForm(true); setEditPerson(null); }}>Agregar persona</button>
      {showForm && (
        <PersonForm
          onSubmit={editPerson ? handleUpdate : handleCreate}
          initialData={editPerson || {}}
          submitLabel={editPerson ? 'Actualizar persona' : 'Crear persona'}
        />
      )}
      {showForm && <button onClick={handleCancel}>Cancelar</button>}
      <h3>Listado de personas</h3>
      {loading ? <p>Cargando...</p> : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Relación</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.lastname}</td>
                <td>{person.dni}</td>
                <td>{person.relationship}</td>
                <td>{person.phone}</td>
                <td>{person.email}</td>
                <td>
                  <button onClick={() => handleEdit(person)}>Editar</button>
                  <button onClick={() => handleDelete(person.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 