import { getPersons, createPerson, updatePerson, deletePerson } from '../../services/api/persons';
import React, { useState, useEffect } from 'react';
import PersonForm from '../organisms/PersonForm';
import EntityGrid from '../organisms/EntityGrid';
import DetailModal from '../molecules/DetailModal';
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

  return (
    <>
      <EntityGrid
        title={t('persons.title')}
        entities={persons}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
        entityType="persona"
        addButtonText={t('persons.add')}
        emptyMessage={t('persons.noPersons')}
        detailFields={[
          { key: 'firstname', label: t('name') },
          { key: 'lastname_father', label: t('lastnameFather') },
          { key: 'lastname_mother', label: t('lastnameMother') },
          { key: 'dni', label: t('dni') },
          { key: 'phone', label: t('phone') },
          { key: 'email', label: 'Email' }
        ]}
        renderEntityCard={(person) => (
          <div className="card-content">
            <p><strong>DNI:</strong> {person.dni}</p>
            <p><strong>Teléfono:</strong> {person.phone}</p>
            <p><strong>Email:</strong> {person.email}</p>
          </div>
        )}
      />
      <DetailModal isOpen={showForm} onClose={handleCancel}>
        <PersonForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingPerson}
        />
      </DetailModal>
    </>
  );
} 