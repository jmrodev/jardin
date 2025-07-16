import { getPersons, createPerson, updatePerson, deletePerson } from '../../services/api/persons';
import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import MainLayout from '../templates/MainLayout';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPerson(null);
    setShowForm(true);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('common.confirmDelete'))) {
      try {
        await deletePerson(id);
        fetchPersons();
      } catch (error) {
        console.error('Error deleting person:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingPerson) {
        await updatePerson(editingPerson.id, formData);
      } else {
        await createPerson(formData);
      }
      setShowForm(false);
      setEditingPerson(null);
      fetchPersons();
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPerson(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p className="loading-text">{t('common.loading')}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="persons-page">
        <div className="persons-header">
          <h2 className="persons-title">{t('persons.title')}</h2>
          <Button onClick={handleAdd} variant="primary">
            {t('persons.add')}
          </Button>
        </div>

        {showForm && (
          <div className="form-overlay">
            <PersonForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingPerson}
            />
          </div>
        )}

        <div className="persons-grid">
          {persons.map((person) => (
            <div key={person.id} className="person-card">
              <div className="person-card-header">
                <h3 className="person-card-title">
                  {person.firstname} {person.lastname_father}
                </h3>
                <div className="person-card-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(person)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(person.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
              <div className="person-card-content">
                <p>DNI: {person.dni}</p>
                <p>Teléfono: {person.phone}</p>
                <p>Email: {person.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 