import { getConnection } from '../config/database.js';

export const getStudents = async (req, res) => {
  try {
    const pool = getConnection();
    const [students] = await pool.execute('SELECT * FROM students ORDER BY lastname, name');
    
    res.json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 