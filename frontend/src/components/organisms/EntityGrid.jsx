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
  createService, // Nueva prop
  updateService, // Nueva prop
  deleteService, // Nueva prop
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
          { name: 'name', label: t('firstName'), type: 'text' },
          { name: 'middle_name', label: t('middleName'), type: 'text' },
          { name: 'lastname_father', label: t('paternalLastname'), type: 'text' },
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
      const response = await createService(entityType, formData);
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
      const response = await updateService(selectedEntity.id, entityType, formData);
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
        await deleteService(entityId, entityType);
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
            <div className="entity-details__section">
              <h3 className="entity-details__section-title">{t('personal_information')}</h3>
              <div className="entity-details__grid">
                {detailConfig.map((field) => (
                  <div key={field.key} className="entity-details__field">
                    <span className="entity-details__label">{field.label}</span>
                    <span className="entity-details__value">{getDisplayValue(selectedEntity, field)}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedEntity.personType === 'student' && (
              <div className="parent-details">
                <h3 className="entity-details__section-title">{t('parents')}</h3>
                <div className="parent-list">
                  {selectedEntity.parents && selectedEntity.parents.length > 0 ? (
                    selectedEntity.parents.map((parent) => (
                      <div key={parent.id} className="parent-item">
                        <Button
                          onClick={() => handleParentClick(parent)}
                          className="button--link"
                        >
                          {parent.relationship}: {parent.name} {parent.lastname_father}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="parent-item">{t('no_parents_found')}</div>
                  )}
                </div>
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
          title={t('detailsOf', { entityName: selectedParent.preferred_name || selectedParent.name })}
        >
          <div className="entity-details">
            <div className="entity-details__section">
              <h3 className="entity-details__section-title">{t('personal_information')}</h3>
              <div className="entity-details__grid">
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('firstName')}</span>
                  <span className="entity-details__value">{selectedParent.name}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('middleName')}</span>
                  <span className="entity-details__value">{selectedParent.middle_name}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('paternalLastname')}</span>
                  <span className="entity-details__value">{selectedParent.lastname_father}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('maternalLastname')}</span>
                  <span className="entity-details__value">{selectedParent.maternal_lastname}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('dni')}</span>
                  <span className="entity-details__value">{selectedParent.dni}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('phone')}</span>
                  <span className="entity-details__value">{selectedParent.phone}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('email')}</span>
                  <span className="entity-details__value">{selectedParent.email}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('relationship')}</span>
                  <span className="entity-details__value">{selectedParent.relationship}</span>
                </div>
              </div>
            </div>
            
            <div className="entity-details__section">
              <h3 className="entity-details__section-title">{t('permissions')}</h3>
              <div className="entity-details__grid">
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('can_pickup')}</span>
                  <span className="entity-details__value">{selectedParent.can_pickup ? t('yes') : t('no')}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('can_change_diapers')}</span>
                  <span className="entity-details__value">{selectedParent.can_change_diapers ? t('yes') : t('no')}</span>
                </div>
                <div className="entity-details__field">
                  <span className="entity-details__label">{t('is_emergency_contact')}</span>
                  <span className="entity-details__value">{selectedParent.is_emergency_contact ? t('yes') : t('no')}</span>
                </div>
              </div>
            </div>
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
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
};

EntityGrid.defaultProps = {
  classrooms: [],
};

export default EntityGrid; 