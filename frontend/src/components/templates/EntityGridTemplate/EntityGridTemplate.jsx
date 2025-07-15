import React, { useState } from 'react';
import DetailModal from '../../atoms/DetailModal';
import Button from '../../atoms/Button';
import formatDate from '../../../utils/formatDate';
import styles from './EntityGridTemplate.module.css';
import { useTranslation } from 'react-i18next';

export default function EntityGridTemplate({
  title,
  entities,
  fields,
  onAdd,
  renderForm,
  entityLabel
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>{title}</h1>
        <Button onClick={onAdd}>{t('add')}</Button>
      </div>
      {renderForm && <div className={styles.formContainer}>{renderForm}</div>}
      <div className={styles.grid}>
        {entities.map((entity) => (
          <div className={styles.card} key={entity.id}>
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
    </div>
  );
} 