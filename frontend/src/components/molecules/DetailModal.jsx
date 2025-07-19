import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Icon from '@/components/atoms/Icon';
import '@/styles/components/atoms/modal.css';

const DetailModal = ({ isOpen, onClose, title, children, variant = 'default' }) => {
  if (!isOpen) return null;

  // Colores para los separadores de modales
  const modalColors = [
    { borderColor: '#00bfff', name: 'skyblue' },
    { borderColor: '#ff8c00', name: 'orange' },
    { borderColor: '#32cd32', name: 'lime' },
    { borderColor: '#ff69b4', name: 'pink' },
    { borderColor: '#9370db', name: 'purple' },
    { borderColor: 'var(--color-primary)', name: 'primary' },
    { borderColor: 'var(--color-success)', name: 'success' },
    { borderColor: 'var(--color-warning)', name: 'warning' }
  ];

  // Seleccionar color basado en el título o usar uno por defecto
  const getModalColor = () => {
    if (title) {
      const titleHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return modalColors[titleHash % modalColors.length];
    }
    return modalColors[0]; // skyblue por defecto
  };

  const selectedColor = getModalColor();

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        data-modal-variant={variant}
        style={{ '--modal-border-color': selectedColor.borderColor }}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="modal-close-button">
            <Icon name="X" size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'form', 'details', 'confirm']),
};

DetailModal.defaultProps = {
  title: '',
  variant: 'default',
};

export default DetailModal; 