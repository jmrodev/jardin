import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '@/styles/components/atoms/toast.css';
import Icon from './Icon';

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastTypeClass = `toast--${type}`;
  const iconName = type === 'success' ? 'check-circle' : 'x-circle';

  return (
    <div className={`toast ${toastTypeClass} ${visible ? 'toast--visible' : ''}`}>
      <div className="toast__icon">
        <Icon name={iconName} />
      </div>
      <p className="toast__message">{message}</p>
      <button 
        className="toast__close-button" 
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        aria-label="Cerrar"
      >
        <Icon name="x" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast; 