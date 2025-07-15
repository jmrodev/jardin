import React from 'react';
import styles from './StudentsList.module.css';

function StudentCard({ student }) {
  if (!student) {
    return (
      <div className={styles.studentCard}>
        <span>Sin datos de estudiante</span>
      </div>
    );
  }
  return (
    <div className={styles.studentCard}>
      <strong>{student.name || student.firstname || 'Sin nombre'}</strong>
      {student.lastname_father && <span>Apellido paterno: {student.lastname_father}</span>}
      {student.lastname_mother && <span>Apellido materno: {student.lastname_mother}</span>}
      {student.dni && <span>DNI: {student.dni}</span>}
      {student.classroom && <span>Sala: {student.classroom}</span>}
      {student.birth_date && <span>Nacimiento: {student.birth_date}</span>}
    </div>
  );
}

export default function StudentsList({ students = [], onSelect }) {
  if (!students.length) {
    return (
      <div className={styles.listContainer}>
        <StudentCard student={null} />
      </div>
    );
  }
  return (
    <div className={styles.listContainer}>
      {students.map(student => (
        <div key={student.id} onClick={() => onSelect && onSelect(student)}>
          <StudentCard student={student} />
        </div>
      ))}
    </div>
  );
} 