import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
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

  // Colores para las cards de estudiantes (similar al dashboard)
  const cardColors = [
    { iconColor: 'skyblue', borderColor: 'skyblue' },
    { iconColor: 'orange', borderColor: 'orange' },
    { iconColor: 'lime', borderColor: 'lime' },
    { iconColor: 'pink', borderColor: 'pink' },
    { iconColor: 'purple', borderColor: 'purple' },
    { iconColor: 'primary', borderColor: 'primary' },
    { iconColor: 'success', borderColor: 'success' },
    { iconColor: 'warning', borderColor: 'warning' }
  ];

  return (
    <div className="students-list">
      {students.map((student, index) => {
        const colorIndex = index % cardColors.length;
        const colors = cardColors[colorIndex];
        
        return (
          <Card
            key={student.id}
            variant="dashboard"
            icon="User"
            iconColor={colors.iconColor}
            title={`${student.firstname} ${student.lastname_father}`}
            subtitle={student.classroom || t('no_classroom')}
            data-border-color={colors.borderColor}
            actions={
              <div className="card-actions">
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
            }
            footer={
              student.created_at && (
                <span className="card-date">
                  {t('created')}: {formatDate(student.created_at)}
                </span>
              )
            }
          >
            <p>DNI: {student.dni}</p>
            {student.birth_date && (
              <p>{t('birthDate')}: {formatDate(student.birth_date)}</p>
            )}
          </Card>
        );
      })}
    </div>
  );
} 