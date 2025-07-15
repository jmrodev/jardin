import { getConnection } from '../config/database.js';

export const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    const [teachers] = await pool.execute(
      'SELECT id, name, lastname, email, phone, hire_date, active FROM staff WHERE id = ? AND role = ?',
      [id, 'teacher']
    );
    
    if (teachers.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    res.json(teachers[0]);
  } catch (error) {
    console.error('Error getting teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 