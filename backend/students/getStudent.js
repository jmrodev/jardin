import { getConnection } from '../config/database.js';

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    const [students] = await pool.execute(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(students[0]);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 