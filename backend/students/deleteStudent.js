import { getConnection } from '../config/database.js';

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    const [result] = await pool.execute(
      'DELETE FROM students WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 