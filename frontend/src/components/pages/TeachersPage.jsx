import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/services/api/api.js';
import ListPageLayout from '@/components/templates/ListPageLayout';
import FilterPanel from '@/components/molecules/FilterPanel/FilterPanel.jsx';
import EntityGrid from '@/components/organisms/EntityGrid';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

const TeachersPage = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Configuraciones para Profesores
  const teacherCardConfig = {
    title: (teacher) => `${teacher.name} ${teacher.lastname_father}`,
    subtitle: (teacher) => teacher.email,
    detail: (teacher) => teacher.phone,
  };

  const teacherDetailConfig = [
    { key: 'name', label: t('name') },
    { key: 'lastname_father', label: t('lastnameFather') },
    { key: 'lastname_mother', label: t('lastnameMother') },
    { key: 'dni', label: t('dni') },
    { key: 'birthdate', label: t('birthdate'), type: 'date' },
    { key: 'address', label: t('address') },
    { key: 'phone', label: t('phone') },
    { key: 'email', label: t('email') },
  ];

  const teacherFilterConfig = [
    // Por ahora, un filtro simple. Se pueden añadir más si es necesario.
    { name: 'name', label: t('name'), type: 'text', placeholder: t('search_by_name') },
  ];

  const teacherFormConfig = {
    createTitle: t('addTeacher'),
    editTitle: t('editTeacher'),
    sections: [
      {
        title: t('personal_information'),
        fields: [
            { name: 'name', label: t('name'), type: 'text' },
            { name: 'lastname_father', label: t('lastnameFather'), type: 'text' },
            { name: 'lastname_mother', label: t('lastnameMother'), type: 'text' },
            { name: 'dni', label: t('dni'), type: 'text' },
            { name: 'birthdate', label: t('birthdate'), type: 'date' },
        ]
      },
      {
        title: t('contact_information'),
        fields: [
          { name: 'address', label: t('address'), type: 'text' },
          { name: 'phone', label: t('phone'), type: 'tel' },
          { name: 'email', label: t('email'), type: 'email' },
        ]
      },
    ]
  };

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.persons.list('teacher', filters);
      setTeachers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || t('fetchError'));
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEntityCreated = (newEntity) => {
    setTeachers((prev) => [newEntity, ...prev]);
  };

  const handleEntityUpdated = (updatedEntity) => {
    setTeachers((prev) =>
      prev.map((e) => (e.id === updatedEntity.id ? updatedEntity : e))
    );
  };

  const handleEntityDeleted = (entityId) => {
    setTeachers((prev) => prev.filter((e) => e.id !== entityId));
  };

  return (
    <ListPageLayout
      filters={
        <FilterPanel
          filterConfig={teacherFilterConfig}
          onFilterChange={handleFilterChange}
        />
      }
    >
      {loading && <LoadingSpinner />}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <EntityGrid
          entities={teachers}
          entityType="teacher"
          cardConfig={teacherCardConfig}
          detailConfig={teacherDetailConfig}
          formConfig={teacherFormConfig}
          onEntityCreated={handleEntityCreated}
          onEntityUpdated={handleEntityUpdated}
          onEntityDeleted={handleEntityDeleted}
        />
      )}
    </ListPageLayout>
  );
};

export default TeachersPage; 