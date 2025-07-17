import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/services/api/api.js';
import ListPageLayout from '@/components/templates/ListPageLayout';
import FilterPanel from '@/components/molecules/FilterPanel/FilterPanel.jsx';
import EntityGrid from '@/components/organisms/EntityGrid';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

const ParentsPage = () => {
  const { t } = useTranslation();
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Configuraciones para Padres/Tutores
  const parentCardConfig = {
    title: (parent) => `${parent.name} ${parent.lastname_father}`,
    subtitle: (parent) => parent.email,
    detail: (parent) => parent.phone,
  };

  const parentDetailConfig = [
    { key: 'name', label: t('name') },
    { key: 'lastname_father', label: t('lastnameFather') },
    { key: 'lastname_mother', label: t('lastnameMother') },
    { key: 'dni', label: t('dni') },
    { key: 'birthdate', label: t('birthdate'), type: 'date' },
    { key: 'address', label: t('address') },
    { key: 'phone', label: t('phone') },
    { key: 'email', label: t('email') },
  ];

  const parentFilterConfig = [
    { name: 'name', label: t('name'), type: 'text', placeholder: t('search_by_name') },
  ];

  const parentFormConfig = {
    createTitle: t('addParent'),
    editTitle: t('editParent'),
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

  const fetchParents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.persons.list('parent', filters);
      setParents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || t('fetchError'));
      setParents([]);
    } finally {
      setLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    fetchParents();
  }, [fetchParents]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEntityCreated = (newEntity) => {
    setParents((prev) => [newEntity, ...prev]);
  };

  const handleEntityUpdated = (updatedEntity) => {
    setParents((prev) =>
      prev.map((e) => (e.id === updatedEntity.id ? updatedEntity : e))
    );
  };

  const handleEntityDeleted = (entityId) => {
    setParents((prev) => prev.filter((e) => e.id !== entityId));
  };

  return (
    <ListPageLayout
      filters={
        <FilterPanel
          filterConfig={parentFilterConfig}
          onFilterChange={handleFilterChange}
        />
      }
    >
      {loading && <LoadingSpinner />}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <EntityGrid
          entities={parents}
          entityType="parent"
          cardConfig={parentCardConfig}
          detailConfig={parentDetailConfig}
          formConfig={parentFormConfig}
          onEntityCreated={handleEntityCreated}
          onEntityUpdated={handleEntityUpdated}
          onEntityDeleted={handleEntityDeleted}
        />
      )}
    </ListPageLayout>
  );
};

export default ParentsPage; 