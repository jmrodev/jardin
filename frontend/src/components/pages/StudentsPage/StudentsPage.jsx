import React, { useEffect, useState } from 'react';
import { getStudents, createStudent } from '../../../services/api/students';
import EntityGridTemplate from '../../templates/EntityGridTemplate';
import StudentForm from './StudentForm';
import { useTranslation } from 'react-i18next';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
    />
  );
} 