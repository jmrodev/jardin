import React, { useEffect, useState } from 'react';
import { getTeachers, deleteTeacher } from '../../../services/api/teachers';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';
import DetailModal from '../../atoms/DetailModal';
import TeacherForm from './TeacherForm';
import { updateTeacher } from '../../../services/api/teachers';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  const handleEdit = (teacher) => {
    setEditData(teacher);
    setEditModalOpen(true);
  };

  const handleEditSave = async (teacherData) => {
    try {
      await updateTeacher(teacherData);
      setEditModalOpen(false);
      setEditData(null);
      getTeachers().then(setTeachers);
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
      await deleteTeacher(teacher.id);
      setTeachers(teachers.filter(t => t.id !== teacher.id));
    } catch (error) {
      alert(t('deleteError'));
    }
  };

  return (
    <EntityGridTemplate
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
      <DetailModal open={editModalOpen} onClose={handleEditCancel}>
        <TeacherForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </EntityGridTemplate>
  );
};

export default TeachersPage; 