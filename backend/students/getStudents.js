import { getConnection } from '../config/database.js';

export const getStudents = async (req, res) => {
  try {
    const pool = getConnection();
    const [rows] = await pool.execute(
      'SELECT id, firstname, lastname_father, lastname_mother, address, dni, birth_date, classroom, shift, special_education, needs_assistant, special_diet, celiac, diabetic, takes_dairy, care_diseases, medication, diapers, diaper_responsible, authorized_pickups FROM students'
    );
    const students = rows.map(student => ({
      ...student,
      authorized_pickups: typeof student.authorized_pickups === 'string'
        ? JSON.parse(student.authorized_pickups)
        : student.authorized_pickups
    }));
    res.json(students);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 