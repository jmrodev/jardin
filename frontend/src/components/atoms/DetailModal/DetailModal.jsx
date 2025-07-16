import React, { useEffect, useRef } from 'react';
import styles from './DetailModal.module.css';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Button from '../Button';

export default function DetailModal({ isOpen, onClose, title, children }) {
  const { t } = useTranslation();
  const overlayRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cerrar al hacer click fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className={styles.modal} tabIndex={0}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={styles.closeBtn}
          >
            <Icon name="close" size={18} />
            <span>{t('close')}</span>
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
} 