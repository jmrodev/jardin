import React, { useEffect, useState } from 'react';
import styles from './StudentsPage.module.css';
import StudentForm from './StudentForm.jsx';
import StudentsList from './StudentsList.jsx';
import StudentDetail from './StudentDetail.jsx';
import { getStudents, createStudent } from '../../../services/api/students';
import { getStudent } from '../../../services/api/students';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert('Error al obtener estudiantes');
    }
    setLoading(false);
  };

  const handleAddStudent = async (studentData) => {
    try {
      await createStudent(studentData);
      await fetchStudents();
      alert('Estudiante agregado correctamente');
    } catch (error) {
      alert('Error al agregar estudiante');
    }
  };

  const handleViewDetail = async (studentId) => {
    setSelectedStudent(studentId);
    try {
      const detail = await getStudent(studentId);
      setStudentDetail(detail);
    } catch (error) {
      alert('Error al obtener detalle del estudiante');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Estudiantes</h1>
      <StudentForm onSubmit={handleAddStudent} />
      <StudentsList students={students} onViewDetail={handleViewDetail} />
      {studentDetail && <StudentDetail student={studentDetail} />}
    </div>
  );
} 