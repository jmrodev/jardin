import { getConnection } from '../config/database.js';

export const getTeachers = async (req, res) => {
  try {
    const pool = getConnection();
    const [teachers] = await pool.execute(
      'SELECT id, name, lastname, email, phone, hire_date, active FROM staff WHERE role = ? ORDER BY lastname, name',
      ['teacher']
    );
    
    res.json(teachers);
  } catch (error) {
    console.error('Error getting teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 