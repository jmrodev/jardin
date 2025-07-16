import React, { useEffect, useState } from 'react';
import { getPersons, createPerson, updatePerson, deletePerson } from '../../../services/api/persons';
import PersonForm from './PersonForm.jsx';
import MainLayout from '../../templates/MainLayout';
import Button from '../../atoms/Button/Button';
import styles from './PersonsPage.module.css';
import { useTranslation } from 'react-i18next';

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      alert(t('fetchPersonsError'));
    }
    setLoading(false);
  };

  const handleCreate = async (data) => {
    try {
      await createPerson(data);
      await fetchPersons();
      setShowForm(false);
      alert(t('personCreated'));
    } catch (error) {
      alert(t('createPersonError'));
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
      alert(t('personUpdated'));
    } catch (error) {
      alert(t('updatePersonError'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDeleteMsg'))) return;
    try {
      await deletePerson(id);
      await fetchPersons();
      alert(t('personDeleted'));
    } catch (error) {
      alert(t('deletePersonError'));
    }
  };

  const handleCancel = () => {
    setEditPerson(null);
    setShowForm(false);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1>{t('personsManagement')}</h1>
          <Button onClick={() => { setShowForm(true); setEditPerson(null); }}>{t('addPerson')}</Button>
        </div>
        {showForm && (
          <div>
            <PersonForm
              onSubmit={editPerson ? handleUpdate : handleCreate}
              initialData={editPerson || {}}
              submitLabel={editPerson ? t('updatePerson') : t('createPerson')}
            />
            <Button onClick={handleCancel}>{t('cancel')}</Button>
          </div>
        )}
        <h3>{t('personsList')}</h3>
        {loading ? <p>{t('loading')}</p> : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('lastname')}</th>
                <th>{t('dni')}</th>
                <th>{t('relationship')}</th>
                <th>{t('phone')}</th>
                <th>{t('email')}</th>
                <th>{t('actions')}</th>
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
                  <td className={styles.actions}>
                    <Button onClick={() => handleEdit(person)}>{t('edit')}</Button>
                    <Button onClick={() => handleDelete(person.id)} variant="danger">{t('delete')}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
} 