import { getConnection } from '../config/database.js';

export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    const [result] = await pool.execute(
      'DELETE FROM parents WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    
    res.json({ message: 'Parent deleted successfully' });
  } catch (error) {
    console.error('Error deleting parent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 