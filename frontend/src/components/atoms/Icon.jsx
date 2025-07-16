import React from 'react';
import * as LucideIcons from 'lucide-react';

// Convierte 'layout-dashboard' a 'LayoutDashboard'
function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

const Icon = ({ name, ...props }) => {
  const pascalName = toPascalCase(name);
  const IconComponent = LucideIcons[pascalName];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
};

export default Icon;
