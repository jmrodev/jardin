export function validateBasePerson(data) {
  const { firstname, lastname_father, lastname_mother, address, dni, birth_date } = data;
  if (!firstname || !lastname_father || !lastname_mother || !address || !dni || !birth_date) {
    return { valid: false, message: 'Faltan campos obligatorios: nombre, apellidos (padre y madre), dirección, DNI o fecha de nacimiento.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth_date)) {
    return { valid: false, message: 'El formato de la fecha de nacimiento debe ser YYYY-MM-DD.' };
  }
  if (dni.length < 6 || dni.length > 12) {
    return { valid: false, message: 'El DNI debe tener entre 6 y 12 caracteres.' };
  }
  return { valid: true };
} 