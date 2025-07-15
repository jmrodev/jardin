import { getConnection } from '../config/database.js';

export const getParent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    
    const [parents] = await pool.execute(
      `SELECT p.*, s.name as student_name, s.lastname as student_lastname 
       FROM parents p 
       JOIN students s ON p.student_id = s.id 
       WHERE p.id = ?`,
      [id]
    );
    
    if (parents.length === 0) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    
    res.json(parents[0]);
  } catch (error) {
    console.error('Error getting parent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 