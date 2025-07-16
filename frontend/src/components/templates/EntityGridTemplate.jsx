import React, { useState } from 'react';
import DetailModal from '../atoms/DetailModal';
import Button from '../atoms/Button';
import formatDate from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

export default function EntityGridTemplate({ 
  title, 
  entities, 
  onAdd, 
  onEdit, 
  onDelete, 
  onViewDetails,
  isLoading,
  error,
  entityType = 'entity',
  renderEntityCard,
  addButtonText,
  emptyMessage,
  detailFields = []
}) {
  const { t } = useTranslation();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="entity-grid-container">
      <div className="entity-grid-header">
        <h2 className="entity-grid-title">{title}</h2>
        {onAdd && (
          <Button onClick={onAdd} variant="primary">
            <Icon name="Plus" size={16} />
            {addButtonText || t('common.add')}
          </Button>
        )}
      </div>

      {entities.length === 0 ? (
        <div className="empty-state">
          <Icon name="Inbox" size={48} />
          <p>{emptyMessage || t('common.noData')}</p>
        </div>
      ) : (
        <div className="entity-grid">
          {entities.map((entity) => (
            <div 
              key={entity.id} 
              className="entity-card"
              onClick={() => handleViewDetails(entity)}
              style={{ cursor: 'pointer' }}
            >
              <div className="entity-card-header">
                <div className="entity-card-title">
                  <div className="student-firstname">{entity.firstname}</div>
                  <div className="student-lastnames">
                    {entity.lastname_father} {entity.lastname_mother}
                  </div>
                </div>
              </div>
              
              <div className="entity-card-content">
                {renderEntityCard ? (
                  renderEntityCard(entity)
                ) : (
                  <div>
                    {entity.description && <p>{entity.description}</p>}
                    {entity.email && <p>Email: {entity.email}</p>}
                    {entity.phone && <p>Teléfono: {entity.phone}</p>}
                    {entity.created_at && (
                      <p>Creado: {formatDate(entity.created_at)}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="entity-card-footer">
                {entity.updated_at && (
                  <span className="entity-card-date">
                    Actualizado: {formatDate(entity.updated_at)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEntity && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            selectedEntity.firstname 
              ? `${selectedEntity.firstname} ${selectedEntity.lastname_father || ''} ${selectedEntity.lastname_mother || ''}`.trim()
              : selectedEntity.name || `Detalles de ${entityType}`
          }
        >
          <div className="modal-actions">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEdit(selectedEntity);
                  handleCloseModal();
                }}
              >
                <Icon name="Edit" size={16} />
                Editar
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onDelete(selectedEntity.id);
                  handleCloseModal();
                }}
              >
                <Icon name="Trash2" size={16} />
                Eliminar
              </Button>
            )}
          </div>
          
          {/* Información Personal */}
          <div className="detail-section">
            <h3 className="detail-section-title">Información Personal</h3>
            {detailFields.filter(field => 
              ['firstname', 'lastname_father', 'lastname_mother', 'dni', 'gender', 'birth_date', 'age'].includes(field.key)
            ).map((field) => {
              let value = 'N/A';
              
              if (field.type === 'date') {
                value = selectedEntity[field.key] ? formatDate(selectedEntity[field.key]) : 'N/A';
              } else if (field.type === 'calculated' && field.key === 'age') {
                // Calcular edad para el modal
                const today = new Date();
                const birth = new Date(selectedEntity.birth_date);
                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                  age--;
                }
                value = `${age} años`;
              } else {
                value = selectedEntity[field.key] || 'N/A';
              }
              
              return (
                <div key={field.key} className="detail-field">
                  <strong>{field.label}:</strong>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>

          {/* Información Académica */}
          <div className="detail-section">
            <h3 className="detail-section-title">Información Académica</h3>
            {detailFields.filter(field => 
              ['classroom', 'shift'].includes(field.key)
            ).map((field) => (
              <div key={field.key} className="detail-field">
                <strong>{field.label}:</strong>
                <span>{selectedEntity[field.key] || 'N/A'}</span>
              </div>
            ))}
          </div>

          {/* Información de Contacto */}
          <div className="detail-section">
            <h3 className="detail-section-title">Información de Contacto</h3>
            {detailFields.filter(field => 
              ['address'].includes(field.key)
            ).map((field) => (
              <div key={field.key} className="detail-field">
                <strong>{field.label}:</strong>
                <span>{selectedEntity[field.key] || 'N/A'}</span>
              </div>
            ))}
          </div>

          {/* Información del Sistema */}
          <div className="detail-section">
            <h3 className="detail-section-title">Información del Sistema</h3>
            {detailFields.filter(field => 
              ['created_at', 'updated_at'].includes(field.key)
            ).map((field) => {
              const value = field.type === 'date' 
                ? (selectedEntity[field.key] ? formatDate(selectedEntity[field.key]) : 'N/A')
                : (selectedEntity[field.key] || 'N/A');
              
              return (
                <div key={field.key} className="detail-field">
                  <strong>{field.label}:</strong>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </DetailModal>
      )}
    </div>
  );
} 