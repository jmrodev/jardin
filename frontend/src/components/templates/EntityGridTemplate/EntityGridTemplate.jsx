import React, { useState } from 'react';
import DetailModal from '../../atoms/DetailModal';
import Button from '../../atoms/Button';
import formatDate from '../../../utils/formatDate';
import styles from './EntityGridTemplate.module.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../../atoms/Icon';

export default function EntityGridTemplate({
  title,
  entities,
  fields,
  onAdd,
  renderForm,
  entityLabel,
  actions = []
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { t } = useTranslation();

  // Handler para acciones rápidas
  const handleAction = (action, entity) => {
    if (action.label === 'delete') {
      setConfirmDelete({ entity, action });
    } else {
      action.onClick(entity);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmDelete && confirmDelete.action && confirmDelete.action.onClick) {
      confirmDelete.action.onClick(confirmDelete.entity);
    }
    setConfirmDelete(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>{title}</h1>
        <div className={styles.headerActions}>
          <Link to="/dashboard" title={t('goToDashboard')} className={styles.dashboardLink}>
            <Icon name="dashboard" />
            <span className={styles.hideOnMobile}>{t('dashboard')}</span>
          </Link>
          <Button onClick={onAdd}>{t('add')}</Button>
        </div>
      </div>
      {renderForm && <div className={styles.formContainer}>{renderForm}</div>}
      <div className={styles.grid}>
        {entities.map((entity) => (
          <div className={styles.card} key={entity.id}>
            <div className={styles.cardActions}>
              {actions.map((action) => (
                <button
                  key={action.label}
                  className={styles.actionBtn + (action.color === 'danger' ? ' ' + styles.danger : '')}
                  title={action.label}
                  onClick={() => handleAction(action, entity)}
                  type="button"
                >
                  <Icon name={action.icon} />
                </button>
              ))}
            </div>
            <div className={styles.cardMain}>
              {fields.map((field) => (
                <div key={field.key} className={styles.cardField}>
                  <b>{field.label}:</b>{' '}
                  {field.isDate
                    ? formatDate(entity[field.key])
                    : entity[field.key]}
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                setSelected(entity);
                setModalOpen(true);
              }}
              variant="secondary"
            >
              {t('details')}
            </Button>
          </div>
        ))}
      </div>
      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={entityLabel}
      >
        {selected && (
          <div>
            {fields.map((field) => (
              <div key={field.key} className={styles.modalField}>
                <b>{field.label}:</b>{' '}
                {field.isDate
                  ? formatDate(selected[field.key])
                  : selected[field.key]}
              </div>
            ))}
          </div>
        )}
      </DetailModal>
      {/* Modal de confirmación para eliminar */}
      {confirmDelete && (
        <DetailModal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          title={t('confirmDeleteTitle')}
        >
          <div style={{ marginBottom: '1.5rem' }}>{t('confirmDeleteMsg')}</div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button onClick={() => setConfirmDelete(null)} variant="secondary">{t('cancel')}</Button>
            <Button onClick={handleConfirmDelete} variant="danger">{t('delete')}</Button>
          </div>
        </DetailModal>
      )}
    </div>
  );
} 