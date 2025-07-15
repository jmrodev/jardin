import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, deleteStudent } from '../../../services/api/students';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import StudentForm from './StudentForm';
import { useTranslation } from 'react-i18next';
import DetailModal from '../../atoms/DetailModal';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert(t('fetchStudentsError'));
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      await createStudent(studentData);
      await fetchStudents();
      setShowForm(false);
      alert(t('studentAdded'));
    } catch (error) {
      alert(t('addStudentError'));
    }
  };

  const handleEdit = (student) => {
    setEditData(student);
    setEditModalOpen(true);
  };

  const handleEditSave = async (studentData) => {
    try {
      // Asume que existe updateStudent en api/students.js
      await import('../../../services/api/students').then(mod => mod.updateStudent(studentData));
      await fetchStudents();
      setEditModalOpen(false);
      setEditData(null);
      alert(t('studentUpdated'));
    } catch (error) {
      alert(t('editStudentError'));
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditData(null);
  };

  const handleDelete = async (student) => {
    try {
      await deleteStudent(student.id);
      setStudents(students.filter(s => s.id !== student.id));
    } catch (error) {
      alert(t('deleteError'));
    }
  };

  return (
    <EntityGridTemplate
      title={t('studentsManagement')}
      entities={students}
      fields={[
        { key: 'firstname', label: t('name') },
        { key: 'lastname_father', label: t('lastnameFather') },
        { key: 'lastname_mother', label: t('lastnameMother') },
        { key: 'dni', label: t('dni') },
        { key: 'classroom', label: t('classroom') },
        { key: 'birth_date', label: t('birthDate'), isDate: true }
      ]}
      onAdd={() => setShowForm((v) => !v)}
      renderForm={showForm ? (
        <StudentForm onSubmit={handleAddStudent} onCancel={() => setShowForm(false)} />
      ) : null}
      entityLabel={t('studentDetails')}
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
    >
      <DetailModal open={editModalOpen} onClose={handleEditCancel}>
        <StudentForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </EntityGridTemplate>
  );
} 