import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, deleteStudent } from '../../services/api/students';
import EntityGrid from '../organisms/EntityGrid';
import StudentForm from '../organisms/StudentForm';
import StudentFilters from '../molecules/StudentFilters/StudentFilters';
import { useTranslation } from 'react-i18next';
import DetailModal from '../molecules/DetailModal';
import Button from '../atoms/Button'; // Import Button for toggle
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
  const [viewMode, setViewMode] = useState('card'); // New state for view mode

  const { t } = useTranslation();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, filters]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
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
      console.error("Error adding student:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        alert(`${t('addStudentError')}: ${error.response.data.error || 'Server error'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(`${t('addStudentError')}: No response from server.`);
      } else {
        console.error('Error', error.message);
        alert(`${t('addStudentError')}: ${error.message}`);
      }
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
    <div className="card-content">
      <div className="student-info">
        <p className="student-details">{student.classroom} • {student.shift}</p>
        <p className="student-age">{calculateAge(student.birth_date)} {t('filters.years')} • {student.gender}</p>
      </div>
    </div>
  );

  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'firstname', header: t('name') },
    { key: 'lastname_father', header: t('lastnameFather') },
    { key: 'lastname_mother', header: t('lastnameMother') },
    { key: 'dni', header: t('dni') },
    { key: 'classroom', header: t('classroom') },
    { key: 'shift', header: t('filters.shift') },
    { key: 'gender', header: t('filters.gender') },
    { key: 'birth_date', header: t('birthDate'), render: (date) => formatDate(date) },
    { key: 'created_at', header: t('common.createdAt'), render: (date) => formatDate(date) },
    { key: 'updated_at', header: t('common.updatedAt'), render: (date) => formatDate(date) },
  ];

  return (
    <div className="students-page">
      <StudentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <EntityGrid
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

      {/* Modals remain the same */}
      {showForm && (
        <DetailModal isOpen={showForm} onClose={() => setShowForm(false)}>
          <StudentForm onSubmit={handleAddStudent} onCancel={() => setShowForm(false)} />
        </DetailModal>
      )}

      <DetailModal isOpen={editModalOpen} onClose={handleEditCancel}>
        <StudentForm initialData={editData} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      </DetailModal>
    </div>
  );
} 