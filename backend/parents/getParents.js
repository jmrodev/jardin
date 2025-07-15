import { getConnection } from '../config/database.js';

export const getParents = async (req, res) => {
  try {
    const { student_id } = req.query;
    const pool = getConnection();
    
    let query = `
      SELECT p.*, s.name as student_name, s.lastname as student_lastname 
      FROM parents p 
      JOIN students s ON p.student_id = s.id
    `;
    const params = [];
    
    if (student_id) {
      query += ' WHERE p.student_id = ?';
      params.push(student_id);
    }
    
    query += ' ORDER BY p.lastname, p.name';
    
    const [parents] = await pool.execute(query, params);
    res.json(parents);
  } catch (error) {
    console.error('Error getting parents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 