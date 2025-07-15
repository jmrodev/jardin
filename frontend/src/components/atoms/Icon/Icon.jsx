import * as LucideIcons from 'lucide-react';
import styles from './Icon.module.css';

const Icon = ({ 
  name, 
  size = 20, 
  color = 'currentColor', 
  className = '',
  ...props 
}) => {
  const IconComponent = LucideIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={`${styles.icon} ${className}`}
      {...props}
    />
  );
};

export default Icon; 