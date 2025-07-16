import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, deleteStudent } from '../../services/api/students';
import EntityGridTemplate from '../templates/EntityGridTemplate';
import StudentForm from './StudentForm';
import StudentFilters from '../molecules/StudentFilters/StudentFilters';
import { useTranslation } from 'react-i18next';
import DetailModal from '../atoms/DetailModal';
import formatDate from '../../utils/formatDate';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filters, setFilters] = useState({
    classroom: '',
    shift: '',
    age: '',
    gender: ''
  });
  const { t } = useTranslation();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, filters]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert(t('fetchStudentsError'));
    }
  };

  // Función para calcular la edad basada en la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Función para aplicar filtros
  const applyFilters = () => {
    let filtered = [...students];

    // Filtro por sala
    if (filters.classroom) {
      filtered = filtered.filter(student => student.classroom === filters.classroom);
    }

    // Filtro por turno
    if (filters.shift) {
      filtered = filtered.filter(student => student.shift === filters.shift);
    }

    // Filtro por edad
    if (filters.age) {
      filtered = filtered.filter(student => {
        const age = calculateAge(student.birth_date);
        return age === parseInt(filters.age);
      });
    }

    // Filtro por género
    if (filters.gender) {
      filtered = filtered.filter(student => student.gender === filters.gender);
    }

    setFilteredStudents(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      classroom: '',
      shift: '',
      age: '',
      gender: ''
    });
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
      await import('../../services/api/students').then(mod => mod.updateStudent(studentData));
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

  const handleDelete = async (studentId) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await deleteStudent(studentId);
        setStudents(students.filter(s => s.id !== studentId));
        alert(t('studentDeleted'));
      } catch (error) {
        alert(t('deleteError'));
      }
    }
  };

  // Función para renderizar el contenido de cada card de estudiante
  const renderStudentCard = (student) => (
    <div className="student-card-content">
      <div className="student-info">
        <p className="student-details">{student.classroom} • {student.shift}</p>
        <p className="student-age">{calculateAge(student.birth_date)} {t('filters.years')} • {student.gender}</p>
      </div>
    </div>
  );

  return (
    <div className="students-page">
      {/* Componente de filtros */}
      <StudentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <EntityGridTemplate
        title={t('studentsManagement')}
        entities={filteredStudents}
        onAdd={() => setShowForm(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="estudiante"
        renderEntityCard={renderStudentCard}
        addButtonText={t('addStudent')}
        emptyMessage={filteredStudents.length === 0 && students.length > 0 ? t('filters.noResults') : t('noStudents')}
        detailFields={[
          { key: 'firstname', label: t('name') },
          { key: 'lastname_father', label: t('lastnameFather') },
          { key: 'lastname_mother', label: t('lastnameMother') },
          { key: 'dni', label: t('dni') },
          { key: 'address', label: 'Dirección' },
          { key: 'classroom', label: t('classroom') },
          { key: 'shift', label: t('filters.shift') },
          { key: 'gender', label: t('filters.gender') },
          { key: 'birth_date', label: t('birthDate'), type: 'date' },
          { key: 'age', label: t('filters.age'), type: 'calculated' },
          { key: 'created_at', label: 'Fecha de registro', type: 'date' },
          { key: 'updated_at', label: 'Última actualización', type: 'date' }
        ]}
      />

      {/* Modal para agregar nuevo estudiante */}
      {showForm && (
        <DetailModal isOpen={showForm} onClose={() => setShowForm(false)}>
          <StudentForm onSubmit={handleAddStudent} onCancel={() => setShowForm(false)} />
        </DetailModal>
      )}

      {/* Modal para editar estudiante */}
      <DetailModal isOpen={editModalOpen} onClose={handleEditCancel}>
        <StudentForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </div>
  );
} 