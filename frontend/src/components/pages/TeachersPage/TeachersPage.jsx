import React, { useEffect, useState } from 'react';
import { getTeachers, deleteTeacher } from '../../../services/api/teachers';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import { useTranslation } from 'react-i18next';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  const handleEdit = (teacher) => {
    // Aquí lógica para abrir modal de edición
    alert(t('edit') + ': ' + teacher.name);
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
      renderForm={showForm ? <div>{t('teacherFormPlaceholder')}</div> : null}
      entityLabel={t('teacherDetails')}
      actions={[
        {
          label: t('edit'),
          icon: 'edit',
          onClick: handleEdit
        },
        {
          label: t('delete'),
          icon: 'delete',
          color: 'danger',
          onClick: handleDelete
        }
      ]}
    />
  );
};

export default TeachersPage; 