export function validatePersonData(data) {
  const { name, lastname, dni, relationship, email, phone } = data;
  if (!name || !lastname || !dni || !relationship) {
    return { valid: false, message: 'Nombre, apellido, DNI y relación son obligatorios.' };
  }
  // Validación básica de DNI (solo números, longitud mínima)
  if (!/^\d{6,}$/.test(dni)) {
    return { valid: false, message: 'El DNI debe ser numérico y tener al menos 6 dígitos.' };
  }
  // Validación de email si se provee
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { valid: false, message: 'El email no es válido.' };
  }
  // Validación de teléfono si se provee
  if (phone && !/^\d{6,}$/.test(phone)) {
    return { valid: false, message: 'El teléfono debe ser numérico y tener al menos 6 dígitos.' };
  }
  return { valid: true };
} 