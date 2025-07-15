import { getConnection } from '../config/database.js';
import { validateStudentData } from '../validators/studentValidator.js';

export const createStudent = async (req, res) => {
  const validation = validateStudentData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
  try {
    const {
      firstname, lastname_father, lastname_mother, address, dni, birth_date,
      classroom, shift, special_education, needs_assistant,
      special_diet, celiac, diabetic, takes_dairy,
      care_diseases, medication, diapers, diaper_responsible,
      authorized_pickups
    } = req.body;
    const pool = getConnection();
    const [result] = await pool.execute(
      `INSERT INTO students (
        firstname, lastname_father, lastname_mother, address, dni, birth_date,
        classroom, shift, special_education, needs_assistant,
        special_diet, celiac, diabetic, takes_dairy,
        care_diseases, medication, diapers, diaper_responsible,
        authorized_pickups
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname, lastname_father, lastname_mother, address, dni, birth_date,
        classroom, shift, special_education, needs_assistant,
        special_diet, celiac, diabetic, takes_dairy,
        care_diseases, medication, diapers, diaper_responsible,
        JSON.stringify(authorized_pickups)
      ]
    );
    res.status(201).json({
      id: result.insertId,
      message: 'Estudiante creado exitosamente'
    });
  } catch (error) {
    console.error('Error creando estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 