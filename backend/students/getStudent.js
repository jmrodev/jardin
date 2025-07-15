import { getConnection } from '../config/database.js';

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    // Obtener datos del estudiante
    const [students] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
    if (students.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const student = students[0];
    // Obtener responsables
    const [responsibles] = await pool.execute(
      `SELECT sr.*, p.name, p.lastname, p.dni, p.address, p.phone, p.email
       FROM student_responsibles sr
       JOIN persons p ON sr.person_id = p.id
       WHERE sr.student_id = ?`,
      [id]
    );
    res.json({ ...student, responsibles });
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 