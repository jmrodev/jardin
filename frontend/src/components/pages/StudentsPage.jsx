import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FilterPanel from '@/components/molecules/FilterPanel/FilterPanel.jsx';
import EntityGrid from '@/components/organisms/EntityGrid';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import ListPageLayout from '@/components/templates/ListPageLayout';
import api from '@/services/api/api.js';
import '@/styles/pages/students.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const { t } = useTranslation();

  const calculateAge = (birthdate) => {
    if (!birthdate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return `${age} ${t('years_old')}`;
  };

  const studentCardConfig = {
    title: (student) => student.preferred_name || `${student.first_name} ${student.paternal_lastname}`,
    subtitle: (student) => student.classroom_name || t('no_classroom'),
    detail: (student) => calculateAge(student.birthdate),
  };

  const studentDetailConfig = [
    { key: 'first_name', label: t('firstName') },
    { key: 'middle_name', label: t('middleName') },
    { key: 'paternal_lastname', label: t('paternalLastname') },
    { key: 'maternal_lastname', label: t('maternalLastname') },
    { key: 'preferred_name', label: t('preferredName') },
    { key: 'nationality', label: t('nationality') },
    { key: 'dni', label: t('dni') },
    { key: 'birthdate', label: t('birthdate'), type: 'date' },
    { 
      key: 'age', 
      label: t('age'), 
      getValue: (student) => calculateAge(student.birthdate) 
    },
    { key: 'classroom_name', label: t('classroom') },
    { key: 'shift', label: t('shift') },
    { key: 'gender', label: t('gender') },
    { key: 'address', label: t('address') },
    { key: 'phone', label: t('phone') },
    { key: 'email', label: t('email') },
  ];

  const studentFilterConfig = [
    {
      name: 'classroom_id',
      label: t('filters.classroom'),
      type: 'select',
      placeholder: t('filters.allClassrooms'),
      options: classrooms.map((c) => ({ value: c.id, label: c.name })),
    },
    {
      name: 'age',
      label: t('filters.age'),
      type: 'select',
      placeholder: t('filters.allAges'),
      options: [
        { value: '3', label: t('filters.age3') },
        { value: '4', label: t('filters.age4') },
        { value: '5', label: t('filters.age5') },
        { value: '6', label: t('filters.age6') },
      ],
    },
    {
      name: 'shift',
      label: t('filters.shift'),
      type: 'select',
      placeholder: t('filters.allShifts'),
      options: [
        { value: 'Mañana', label: t('filters.morning') },
        { value: 'Tarde', label: t('filters.afternoon') },
      ],
    },
    {
      name: 'gender',
      label: t('filters.gender'),
      type: 'select',
      placeholder: t('filters.allGenders'),
      options: [
        { value: 'Masculino', label: t('filters.male') },
        { value: 'Femenino', label: t('filters.female') },
      ],
    },
    {
      name: 'nationality',
      label: t('filters.nationality'),
      type: 'select',
      placeholder: t('filters.allNationalities'),
      options: [
        { value: 'Española', label: t('nationality.spanish') },
        { value: 'Argentina', label: t('nationality.argentine') },
        { value: 'Mexicana', label: t('nationality.mexican') },
        { value: 'Colombiana', label: t('nationality.colombian') },
        { value: 'Chilena', label: t('nationality.chilean') },
        { value: 'Peruana', label: t('nationality.peruvian') },
        { value: 'Venezolana', label: t('nationality.venezuelan') },
      ],
    },
  ];

  const studentFormConfig = {
    createTitle: t('addStudent'),
    editTitle: t('editStudent'),
    sections: [
      {
        title: t('personal_information'),
        fields: [
          { name: 'first_name', label: t('firstName'), type: 'text', placeholder: t('first_name_placeholder') },
          { name: 'middle_name', label: t('middleName'), type: 'text', placeholder: t('middle_name_placeholder') },
          { name: 'paternal_lastname', label: t('paternalLastname'), type: 'text', placeholder: t('paternal_lastname_placeholder') },
          { name: 'maternal_lastname', label: t('maternalLastname'), type: 'text', placeholder: t('maternal_lastname_placeholder') },
          { name: 'preferred_name', label: t('preferredName'), type: 'text', placeholder: t('preferred_name_placeholder') },
          { name: 'nationality', label: t('nationality'), type: 'text', placeholder: t('nationality_placeholder') },
          { name: 'dni', label: t('dni'), type: 'text', placeholder: t('dni_placeholder') },
          { name: 'birthdate', label: t('birthdate'), type: 'date' },
          { name: 'gender', label: t('gender'), type: 'select', options: [ {value: 'Masculino', label: t('male')}, {value: 'Femenino', label: t('female')} ] },
        ]
      },
      {
        title: t('contact_information'),
        fields: [
          { name: 'address', label: t('address'), type: 'text', placeholder: t('address_placeholder') },
          { name: 'phone', label: t('phone'), type: 'tel', placeholder: t('phone_placeholder') },
          { name: 'email', label: t('email'), type: 'email', placeholder: t('email_placeholder') },
        ]
      },
      {
        title: t('academic_information'),
        fields: [
          { name: 'classroom_id', label: t('classroom'), type: 'select', options: classrooms.map(c => ({ value: c.id, label: c.name })) },
          { name: 'shift', label: t('shift'), type: 'select', options: [ {value: 'Mañana', label: t('morning')}, {value: 'Tarde', label: t('afternoon')} ] },
        ]
      }
    ]
  };

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.persons.list('student', filters);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || t('fetchError'));
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.classrooms.list();
        setClassrooms(response.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };
    fetchClassrooms();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEntityCreated = (newEntity) => {
    setStudents((prev) => [newEntity, ...prev]);
  };

  const handleEntityUpdated = (updatedEntity) => {
    setStudents((prev) =>
      prev.map((e) => (e.id === updatedEntity.id ? updatedEntity : e))
    );
  };

  const handleEntityDeleted = (entityId) => {
    setStudents((prev) => prev.filter((e) => e.id !== entityId));
  };

  return (
    <ListPageLayout
      filters={
        <FilterPanel
          filterConfig={studentFilterConfig}
          onFilterChange={handleFilterChange}
        />
      }
    >
      <div className="students-page-content">
        {loading && <LoadingSpinner />}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <EntityGrid
            entities={students}
            entityType="student"
            onEntityCreated={handleEntityCreated}
            onEntityUpdated={handleEntityUpdated}
            onEntityDeleted={handleEntityDeleted}
            classrooms={classrooms}
            cardConfig={studentCardConfig}
            detailConfig={studentDetailConfig}
            formConfig={studentFormConfig}
          />
        )}
      </div>
    </ListPageLayout>
  );
};

export default StudentsPage; 