import React from 'react';
import styles from './StudentsList.module.css';

export default function StudentsList({ students, onSelect }) {
  return (
    <div className={styles.listContainer}>
      {students.map(student => (
        <div
          key={student.id}
          className={styles.studentCard}
          onClick={() => onSelect && onSelect(student)}
        >
          <span>{student.name}</span>
          {/* Otros datos y acciones */}
        </div>
      ))}
    </div>
  );
} 