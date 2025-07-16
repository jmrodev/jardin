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
            <div key={entity.id} className="entity-card">
              <div className="entity-card-header">
                <h3 className="entity-card-title">
                  {entity.name || entity.firstname || entity.title || `ID: ${entity.id}`}
                </h3>
                <div className="entity-card-actions">
                  {onViewDetails && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(entity)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(entity)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(entity.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  )}
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
          title={selectedEntity.name || selectedEntity.firstname || `Detalles de ${entityType}`}
        >
          <div className="entity-details">
            {detailFields.map((field) => (
              <div key={field.key} className="detail-field">
                <strong>{field.label}:</strong>
                <span>
                  {field.type === 'date' 
                    ? formatDate(selectedEntity[field.key])
                    : selectedEntity[field.key] || 'N/A'
                  }
                </span>
              </div>
            ))}
          </div>
        </DetailModal>
      )}
    </div>
  );
} 