import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Input from '../../atoms/Input';
import LoadingSpinner from '../../molecules/LoadingSpinner';
import styles from './StudentsPage.module.css';

const StudentsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAdmin, isDirector, isTeacher } = useAuth();
  const { theme } = useTheme();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClassroom, setFilterClassroom] = useState('');

  // Datos de ejemplo (en un proyecto real vendrían de la API)
  const mockStudents = [
    { id: 1, name: 'Ana', lastname: 'García', classroom: 'Sala 3 años', birthDate: '2021-03-15' },
    { id: 2, name: 'Carlos', lastname: 'López', classroom: 'Sala 4 años', birthDate: '2020-08-22' },
    { id: 3, name: 'María', lastname: 'Rodríguez', classroom: 'Sala 5 años', birthDate: '2019-11-10' },
    { id: 4, name: 'Juan', lastname: 'Martínez', classroom: 'Sala 3 años', birthDate: '2021-01-05' },
    { id: 5, name: 'Sofía', lastname: 'Fernández', classroom: 'Sala 4 años', birthDate: '2020-06-18' },
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddStudent = () => {
    // TODO: Implementar modal o página para agregar estudiante
    alert('Función de agregar estudiante - En desarrollo');
  };

  const handleEditStudent = (studentId) => {
    // TODO: Implementar edición de estudiante
    alert(`Editar estudiante ID: ${studentId} - En desarrollo`);
  };

  const handleViewStudent = (studentId) => {
    // TODO: Implementar vista detallada de estudiante
    alert(`Ver detalles del estudiante ID: ${studentId} - En desarrollo`);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassroom = !filterClassroom || student.classroom === filterClassroom;
    return matchesSearch && matchesClassroom;
  });

  const classrooms = [...new Set(students.map(student => student.classroom))];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className={styles.backButton}
            >
              <Icon name="ArrowLeft" size={20} />
              {t('students.backToDashboard')}
            </Button>
            <h1 className={styles.title}>{t('students.title')}</h1>
          </div>
          
          <div className={styles.headerActions}>
            {(isAdmin || isDirector) && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddStudent}
                className={styles.addButton}
              >
                <Icon name="Plus" size={16} />
                {t('students.addStudent')}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.filters}>
          <div className={styles.searchSection}>
            <Input
              type="text"
              placeholder={t('students.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterSection}>
            <select
              value={filterClassroom}
              onChange={(e) => setFilterClassroom(e.target.value)}
              className={styles.classroomFilter}
            >
              <option value="">{t('students.allClassrooms')}</option>
              {classrooms.map(classroom => (
                <option key={classroom} value={classroom}>{classroom}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.studentsList}>
          {filteredStudents.length === 0 ? (
            <div className={styles.emptyState}>
              <Icon name="Users" size={48} className={styles.emptyIcon} />
              <h3>{t('students.noStudentsFound')}</h3>
              <p>{t('students.noStudentsMessage')}</p>
            </div>
          ) : (
            <div className={styles.studentsGrid}>
              {filteredStudents.map(student => (
                <div key={student.id} className={styles.studentCard}>
                  <div className={styles.studentInfo}>
                    <h3 className={styles.studentName}>
                      {student.name} {student.lastname}
                    </h3>
                    <p className={styles.studentClassroom}>{student.classroom}</p>
                    <p className={styles.studentBirthDate}>
                      {t('students.birth')} {new Date(student.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className={styles.studentActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewStudent(student.id)}
                      className={styles.actionButton}
                    >
                      <Icon name="Eye" size={16} />
                      {t('students.view')}
                    </Button>
                    
                    {(isAdmin || isDirector) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStudent(student.id)}
                        className={styles.actionButton}
                      >
                        <Icon name="Edit" size={16} />
                        {t('students.edit')}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h4>{t('students.totalStudents')}</h4>
            <p className={styles.statNumber}>{students.length}</p>
          </div>
          <div className={styles.statCard}>
            <h4>{t('students.filteredResults')}</h4>
            <p className={styles.statNumber}>{filteredStudents.length}</p>
          </div>
          <div className={styles.statCard}>
            <h4>{t('students.classrooms')}</h4>
            <p className={styles.statNumber}>{classrooms.length}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentsPage; 