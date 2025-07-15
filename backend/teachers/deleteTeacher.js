import { getConnection } from '../config/database.js';

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    // Instead of deleting, deactivate the teacher
    const [result] = await pool.execute(
      'UPDATE staff SET active = FALSE WHERE id = ? AND role = ?',
      [id, 'teacher']
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    res.json({ message: 'Teacher deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 