import { getConnection } from '../config/database.js';

export const updateParent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, phone, email, relationship } = req.body;
    const pool = getConnection();
    
    const [result] = await pool.execute(
      'UPDATE parents SET name = ?, lastname = ?, phone = ?, email = ?, relationship = ? WHERE id = ?',
      [name, lastname, phone, email, relationship, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    
    res.json({ message: 'Parent updated successfully' });
  } catch (error) {
    console.error('Error updating parent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 