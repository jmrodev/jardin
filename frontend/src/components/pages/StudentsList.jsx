import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import formatDate from '../../utils/formatDate';

export default function StudentsList({ students, onEdit, onDelete, onViewDetails }) {
  const { t } = useTranslation();

  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="Users" size={48} />
        <p>{t('students.noStudents')}</p>
      </div>
    );
  }

  return (
    <div className="students-list">
      {students.map((student) => (
        <div key={student.id} className="student-card">
          <div className="student-card-header">
            <h3 className="student-card-title">
              {student.firstname} {student.lastname_father}
            </h3>
            <div className="student-card-actions">
              {onViewDetails && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(student)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(student)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(student.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              )}
            </div>
          </div>
          
          <div className="student-card-content">
            <p>DNI: {student.dni}</p>
            <p>Sala: {student.classroom}</p>
            {student.birth_date && (
              <p>Fecha de nacimiento: {formatDate(student.birth_date)}</p>
            )}
          </div>

          <div className="student-card-footer">
            {student.created_at && (
              <span className="student-card-date">
                Creado: {formatDate(student.created_at)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 