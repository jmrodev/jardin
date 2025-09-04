import { validateBasePerson } from './baseValidator.js';

export function validateStudentData(data) {
  const base = validateBasePerson(data);
  if (!base.valid) return base;

  const {
    classroom, shift, special_education,
    needs_assistant, special_diet, celiac, diabetic, takes_dairy,
    care_diseases, medication, diapers, diaper_responsible
  } = data;

  if (!classroom || !shift) {
    return { valid: false, message: 'Faltan campos obligatorios: sala o turno.' };
  }

  if (special_education) {
    if (needs_assistant === undefined) {
      return { valid: false, message: 'Indicar si requiere acompañante.' };
    }
  }

  if (special_diet) {
    if (celiac === undefined || diabetic === undefined || takes_dairy === undefined) {
      return { valid: false, message: 'Completar información de alimentación especial (celíaco, diabético, lácteos).' };
    }
  }

  if (care_diseases && !medication) {
    return { valid: false, message: 'Indicar medicación si hay enfermedades de cuidado.' };
  }

  if (diapers) {
    if (!diaper_responsible) {
      return { valid: false, message: 'Indicar persona responsable de cambiar los pañales.' };
    }
  }

  

  return { valid: true };
} 