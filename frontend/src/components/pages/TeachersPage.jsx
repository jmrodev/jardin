import React, { useEffect, useState } from 'react';
import { getPersons, deletePerson, updatePerson } from '../../services/api/person';
import EntityGrid from '../organisms/EntityGrid';
import { useTranslation } from 'react-i18next';
import DetailModal from '../molecules/DetailModal';
import TeacherForm from '../organisms/TeacherForm';
const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getPersons('teacher').then(setTeachers);
  }, []);

  const handleEdit = (teacher) => {
    setEditData(teacher);
    setEditModalOpen(true);
  };

  const handleEditSave = async (teacherData) => {
    try {
      await updatePerson(teacherData.id, teacherData, 'teacher');
      setEditModalOpen(false);
      setEditData(null);
      getPersons('teacher').then(setTeachers);
      alert(t('teacherUpdated'));
    } catch (error) {
      alert(t('editTeacherError'));
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditData(null);
  };

  const handleDelete = async (teacher) => {
    try {
      await deletePerson(teacher.id, 'teacher');
      setTeachers(teachers.filter(t => t.id !== teacher.id));
    } catch (error) {
      alert(t('deleteError'));
    }
  };

  return (
    <EntityGrid
      title={t('teachersManagement')}
      entities={teachers}
      fields={[
        { key: 'name', label: t('name') },
        { key: 'birthDate', label: t('birthDate'), isDate: true }
      ]}
      onAdd={() => setShowForm((v) => !v)}
      renderForm={showForm ? <TeacherForm onSubmit={() => {}} onCancel={() => setShowForm(false)} /> : null}
      entityLabel={t('teacherDetails')}
      actions={[
        {
          label: t('edit'),
          icon: 'edit',
          onClick: handleEdit
        },
        {
          label: t('delete'),
          icon: 'trash',
          color: 'danger',
          onClick: handleDelete
        }
      ]}
    >
      <DetailModal isOpen={editModalOpen} onClose={handleEditCancel}>
        <TeacherForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </EntityGrid>
  );
};

export default TeachersPage; 