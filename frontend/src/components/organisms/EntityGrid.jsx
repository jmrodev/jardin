import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/atoms/Button';
import DetailModal from '@/components/molecules/DetailModal';
import EntityForm from '@/components/organisms/EntityForm'; // Usamos el genérico
import personService from '@/services/api/persons'; // Única fuente para la API de personas
import formatDate from '@/utils/formatDate';
import '@/styles/components/organisms/entity-grid.css';
import { useToast } from '@/contexts/ToastContext'; // Importar useToast

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
  const [selectedParent, setSelectedParent] = useState(null);
  const [isParentDetailModalOpen, setParentDetailModalOpen] = useState(false);
  const [isCreateParentModalOpen, setCreateParentModalOpen] = useState(false);
  const { showToast } = useToast(); // Usar el hook de toast

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

  const handleParentClick = (parent) => {
    setSelectedParent(parent);
    setParentDetailModalOpen(true);
  };

  const handleCreateParent = async (parentData) => {
    if (!selectedEntity) {
      showToast('Error: No se ha seleccionado un estudiante.', 'error');
      return;
    }

    try {
      const newParent = await personService.createAndLinkParent(selectedEntity.id, parentData);
      showToast('Responsable creado y vinculado con éxito', 'success');
      // Actualizar el estado local para reflejar el cambio en la UI
      setSelectedEntity(prev => ({
        ...prev,
        parents: [...(prev.parents || []), newParent.data]
      }));
      setCreateParentModalOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear y vincular el responsable.';
      showToast(errorMessage, 'error');
      console.error("Error creating and linking parent:", error);
    }
  };

  const parentFormConfig = {
    createTitle: t('addParent'),
    sections: [
      {
        title: t('personal_information'),
        fields: [
          { name: 'first_name', label: t('firstName'), type: 'text' },
          { name: 'middle_name', label: t('middleName'), type: 'text' },
          { name: 'paternal_lastname', label: t('paternalLastname'), type: 'text' },
          { name: 'maternal_lastname', label: t('maternalLastname'), type: 'text' },
          { name: 'dni', label: t('dni'), type: 'text' },
          { name: 'phone', label: t('phone'), type: 'tel' },
          { name: 'email', label: t('email'), type: 'email' },
          { name: 'birthdate', label: t('birthdate'), type: 'date' },
        ]
      },
      {
        title: t('relationship_information'),
        fields: [
          { name: 'relationship', label: t('relationship'), type: 'text', defaultValue: 'Tutor Legal' },
          { name: 'can_pickup', label: t('can_pickup'), type: 'checkbox', defaultValue: true },
          { name: 'can_change_diapers', label: t('can_change_diapers'), type: 'checkbox', defaultValue: false },
          { name: 'is_emergency_contact', label: t('is_emergency_contact'), type: 'checkbox', defaultValue: false },
        ]
      }
    ]
  };

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
      const response = await personService.create(entityType, formData);
      onEntityCreated(response.data);
      setCreateModalOpen(false);
      showToast(`${t(entityType)} ${t('created_successfully')}`, 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || `Error creating ${entityType}`;
      showToast(errorMessage, 'error');
      console.error(`Error creating ${entityType}:`, error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await personService.update(selectedEntity.id, entityType, formData);
      onEntityUpdated(response.data);
      setEditModalOpen(false);
      setSelectedEntity(null);
      showToast(`${t(entityType)} ${t('updated_successfully')}`, 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || `Error updating ${entityType}`;
      showToast(errorMessage, 'error');
      console.error(`Error updating ${entityType}:`, error);
    }
  };

  const handleDelete = async (entityId) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await personService.delete(entityId, entityType);
        onEntityDeleted(entityId);
        setDetailModalOpen(false);
        setSelectedEntity(null);
        showToast(`${t(entityType)} ${t('deleted_successfully')}`, 'success');
      } catch (error) {
        const errorMessage = error.response?.data?.message || `Error deleting ${entityType}`;
        showToast(errorMessage, 'error');
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

            {selectedEntity.personType === 'student' && (
              <div className="parent-details">
                <h4>{t('parents')}</h4>
                <ul className="parent-list">
                  {selectedEntity.parents && selectedEntity.parents.length > 0 ? (
                    selectedEntity.parents.map((parent) => (
                      <li key={parent.id}>
                        <Button
                          onClick={() => handleParentClick(parent)}
                          className="button--link"
                        >
                          {parent.relationship}: {parent.first_name} {parent.paternal_lastname}
                        </Button>
                      </li>
                    ))
                  ) : (
                    <li>{t('no_parents_found')}</li>
                  )}
                </ul>
                <Button onClick={() => setCreateParentModalOpen(true)} className="button--primary button--small">{t('addParent')}</Button>
              </div>
            )}
            
            <div className="entity-details__actions">
              <Button onClick={() => openEditModal(selectedEntity)} className="button--secondary">{t('edit')}</Button>
              <Button onClick={() => handleDelete(selectedEntity.id)} className="button--danger">{t('delete')}</Button>
            </div>
          </div>
        )}
      </DetailModal>

      {/* Modal para CREAR un nuevo responsable */}
      <DetailModal isOpen={isCreateParentModalOpen} onClose={() => setCreateParentModalOpen(false)}>
        <EntityForm
          formConfig={parentFormConfig}
          onSubmit={handleCreateParent}
          onCancel={() => setCreateParentModalOpen(false)}
        />
      </DetailModal>

      {selectedParent && (
        <DetailModal
          isOpen={isParentDetailModalOpen}
          onClose={() => setParentDetailModalOpen(false)}
          title={t('detailsOf', { entityName: selectedParent.preferred_name || selectedParent.first_name })}
        >
          <div className="entity-details">
            <ul>
              <li><strong>{t('firstName')}:</strong> {selectedParent.first_name}</li>
              {selectedParent.middle_name && <li><strong>{t('middleName')}:</strong> {selectedParent.middle_name}</li>}
              <li><strong>{t('preferredName')}:</strong> {selectedParent.preferred_name || 'N/A'}</li>
              <li><strong>{t('age')}:</strong> {calculateAge(selectedParent.birthdate)}</li>
              <li><strong>{t('dni')}:</strong> {selectedParent.dni}</li>
              <li><strong>{t('phone')}:</strong> {selectedParent.phone}</li>
              <li><strong>{t('email')}:</strong> {selectedParent.email}</li>
              <li><strong>{t('relationship')}:</strong> {selectedParent.relationship}</li>
              <li><strong>{t('can_pickup')}:</strong> {selectedParent.can_pickup ? t('yes') : t('no')}</li>
              <li><strong>{t('can_change_diapers')}:</strong> {selectedParent.can_change_diapers ? t('yes') : t('no')}</li>
              <li><strong>{t('is_emergency_contact')}:</strong> {selectedParent.is_emergency_contact ? t('yes') : t('no')}</li>
            </ul>
          </div>
        </DetailModal>
      )}

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