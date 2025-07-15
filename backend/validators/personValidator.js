export function validatePersonData(data) {
  const { name, lastname, birth_date, classroom, dni } = data;
  if (!name || !lastname || !birth_date || !classroom || !dni) {
    return { valid: false, message: 'Todos los campos son obligatorios.' };
  }
  // Validar formato de fecha (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth_date)) {
    return { valid: false, message: 'El formato de la fecha de nacimiento debe ser YYYY-MM-DD.' };
  }
  // Validar longitud de DNI
  if (dni.length < 6 || dni.length > 12) {
    return { valid: false, message: 'El DNI debe tener entre 6 y 12 caracteres.' };
  }
  return { valid: true };
} 