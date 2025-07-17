import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/atoms/Button';
import DetailModal from '@/components/molecules/DetailModal';
import EntityForm from '@/components/organisms/EntityForm'; // Usamos el genérico
import api from '@/services/api/api.js';
import formatDate from '@/utils/formatDate';
import '@/styles/components/organisms/entity-grid.css';

const EntityGrid = ({
  entities,
  entityType,
  onEntityCreated,
  onEntityUpdated,
  onEntityDeleted,
  classrooms,
  cardConfig,
  detailConfig,
  formConfig, // Nueva prop
}) => {
  const { t } = useTranslation();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const getDisplayValue = (entity, fieldConfig) => {
    const value = entity[fieldConfig.key];

    if (fieldConfig.type === 'date') {
      return value ? formatDate(value) : '';
    }
    if (fieldConfig.getValue) {
      return fieldConfig.getValue(entity);
    }
    // Si el valor es null o undefined, devolver cadena vacía en lugar de 'notAssigned'
    return value || '';
  };

  const handleCardClick = (entity) => {
    setSelectedEntity(entity);
    setDetailModalOpen(true);
  };

  const openEditModal = (entity) => {
    setSelectedEntity(entity);
    setDetailModalOpen(false);
    setEditModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedEntity(null);
    setCreateModalOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      const response = await api.persons.create(entityType, formData);
      onEntityCreated(response.data);
      setCreateModalOpen(false);
    } catch (error) {
      console.error(`Error creating ${entityType}:`, error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await api.persons.update(selectedEntity.id, entityType, formData);
      onEntityUpdated(response.data);
      setEditModalOpen(false);
      setSelectedEntity(null);
    } catch (error) {
      console.error(`Error updating ${entityType}:`, error);
    }
  };

  const handleDelete = async (entityId) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await api.persons.delete(entityId, entityType);
        onEntityDeleted(entityId);
        setDetailModalOpen(false);
        setSelectedEntity(null);
      } catch (error) {
        console.error(`Error deleting ${entityType}:`, error);
      }
    }
  };

  const renderCardContent = (entity) => (
    <div className="card-content-wrapper">
      <h4>{cardConfig.title(entity)}</h4>
      {/* Para el subtítulo (la sala), mantenemos la lógica de 'Sin sala' si no existe */}
      <p>{cardConfig.subtitle(entity) || t('no_classroom')}</p>
      <span>{cardConfig.detail(entity)}</span>
    </div>
  );

  return (
    <div className="entity-grid-container">
      <div className="entity-grid-header">
        <h2>{t(`${entityType}sManagement`)}</h2>
        <Button onClick={openCreateModal} className="button--primary">
          {`${t('addNew')} ${t(entityType)}`}
        </Button>
      </div>

      {entities.length === 0 ? (
        <p className="no-results-message">{t('no_results')}</p>
      ) : (
        <div className="entity-grid">
          {entities.map((entity) => (
            <div
              key={entity.id}
              className="card"
              onClick={() => handleCardClick(entity)}
            >
              {renderCardContent(entity)}
            </div>
          ))}
        </div>
      )}

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={t('detailsOf', { entityName: selectedEntity ? cardConfig.title(selectedEntity) : '' })}
      >
        {selectedEntity && (
          <div className="entity-details">
            <ul>
              {detailConfig.map((field) => (
                <li key={field.key}>
                  <strong>{field.label}:</strong> {getDisplayValue(selectedEntity, field)}
                </li>
              ))}
            </ul>
            <div className="entity-details__actions">
              <Button onClick={() => openEditModal(selectedEntity)} className="button--secondary">{t('edit')}</Button>
              <Button onClick={() => handleDelete(selectedEntity.id)} className="button--danger">{t('delete')}</Button>
            </div>
          </div>
        )}
      </DetailModal>

      <DetailModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <EntityForm
          formConfig={formConfig}
          initialData={selectedEntity}
          onSubmit={handleUpdate}
          onCancel={() => setEditModalOpen(false)}
        />
      </DetailModal>

      <DetailModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <EntityForm
          formConfig={formConfig}
          onSubmit={handleCreate}
          onCancel={() => setCreateModalOpen(false)}
        />
      </DetailModal>
    </div>
  );
};

EntityGrid.propTypes = {
  entities: PropTypes.array.isRequired,
  entityType: PropTypes.string.isRequired,
  onEntityCreated: PropTypes.func.isRequired,
  onEntityUpdated: PropTypes.func.isRequired,
  onEntityDeleted: PropTypes.func.isRequired,
  classrooms: PropTypes.array,
  cardConfig: PropTypes.shape({
    title: PropTypes.func.isRequired,
    subtitle: PropTypes.func.isRequired,
    detail: PropTypes.func.isRequired,
  }).isRequired,
  detailConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      getValue: PropTypes.func,
    })
  ).isRequired,
  formConfig: PropTypes.object.isRequired,
};

EntityGrid.defaultProps = {
  classrooms: [],
};

export default EntityGrid; 