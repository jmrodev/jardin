import { getConnection } from '../config/database.js';

export const getParents = async (req, res) => {
  try {
    const { student_id } = req.query;
    const pool = getConnection();

    let query = `
      SELECT
        sr.id AS responsible_id,
        p.id AS person_id,
        p.name,
        p.lastname,
        p.dni,
        p.phone,
        p.email,
        sr.type AS relationship,
        sr.can_pickup,
        sr.can_change_diapers,
        sr.notes,
        s.id AS student_id,
        s.firstname AS student_firstname,
        s.lastname_father AS student_lastname_father,
        s.lastname_mother AS student_lastname_mother
      FROM student_responsibles sr
      JOIN persons p ON sr.person_id = p.id
      JOIN students s ON sr.student_id = s.id
    `;
    const params = [];

    if (student_id) {
      query += ' WHERE sr.student_id = ?';
      params.push(student_id);
    }

    query += ' ORDER BY p.lastname, p.name';

    const [responsibles] = await pool.execute(query, params);
    res.json(responsibles);
  } catch (error) {
    console.error('Error getting parents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 