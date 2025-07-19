import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Card = ({
  children,
  className = '',
  variant = 'default', // 'default', 'dashboard', 'student'
  icon,
  iconColor = 'primary',
  title,
  subtitle,
  description,
  actions,
  footer,
  onClick,
  hoverable = true,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    hoverable && 'card--hoverable',
    onClick && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'card-icon',
    `card-icon--${iconColor}`
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {(icon || title) && (
        <div className="card-header">
          {icon && (
            <div className={iconClasses}>
              <Icon name={icon} size={24} />
            </div>
          )}
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className="card-content">
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>

      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'dashboard', 'student']),
  icon: PropTypes.string,
  iconColor: PropTypes.oneOf(['primary', 'skyblue', 'orange', 'lime', 'pink', 'purple', 'success', 'warning', 'danger']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool
};

export default Card; 