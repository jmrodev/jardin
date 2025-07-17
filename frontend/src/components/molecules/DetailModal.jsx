import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

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
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="modal" tabIndex={0}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <Icon name="X" size={18} />
            <span>{t('close')}</span>
          </Button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
} 