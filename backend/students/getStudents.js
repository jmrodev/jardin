import { getConnection } from '../config/database.js';

export const getStudents = async (req, res) => {
  try {
    const pool = getConnection();
    const [rows] = await pool.execute(
      `SELECT 
        s.id, s.firstname, s.lastname_father, s.lastname_mother, s.address, s.dni, 
        s.birth_date, s.gender, s.classroom, s.shift, s.special_education, 
        s.needs_assistant, s.special_diet, s.celiac, s.diabetic, s.takes_dairy, 
        s.care_diseases, s.medication, s.diapers, s.diaper_responsible, 
        s.authorized_pickups, s.created_at, s.updated_at,
        COALESCE(CONCAT(creator.name, ' ', creator.lastname), 'Sistema') as created_by_name,
        COALESCE(CONCAT(updater.name, ' ', updater.lastname), 'Sistema') as updated_by_name
      FROM students s
      LEFT JOIN staff creator ON s.created_by = creator.id
      LEFT JOIN staff updater ON s.updated_by = updater.id`
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