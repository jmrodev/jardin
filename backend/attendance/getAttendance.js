import { getConnection } from '../config/database.js';

export const getAttendance = async (req, res) => {
  try {
    const { date, classroom, student_id } = req.query;
    const pool = getConnection();
    
    let query = `
      SELECT a.*, s.name, s.lastname, s.classroom 
      FROM attendance a 
      JOIN students s ON a.student_id = s.id 
      WHERE 1=1
    `;
    const params = [];
    
    if (date) {
      query += ' AND a.date = ?';
      params.push(date);
    }
    
    if (classroom) {
      query += ' AND s.classroom = ?';
      params.push(classroom);
    }
    
    if (student_id) {
      query += ' AND a.student_id = ?';
      params.push(student_id);
    }
    
    query += ' ORDER BY s.lastname, s.name, a.date DESC';
    
    const [attendance] = await pool.execute(query, params);
    res.json(attendance);
  } catch (error) {
    console.error('Error getting attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 