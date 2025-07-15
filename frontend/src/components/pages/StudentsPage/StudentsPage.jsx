import React, { useEffect, useState } from 'react';
import StudentForm from './StudentForm.jsx';
import StudentsList from './StudentsList.jsx';
import { getStudents, createStudent } from '../../../services/api/students';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>Agregar estudiante</h2>
      <StudentForm onSubmit={handleAddStudent} />
      <h2>Lista de estudiantes</h2>
      {loading ? <p>Cargando...</p> : <StudentsList students={students} />}
    </div>
  );
} 