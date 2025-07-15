import { getConnection } from '../config/database.js';

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, birth_date, classroom, dni, address } = req.body;
    const pool = getConnection();
    
    const [result] = await pool.execute(
      'UPDATE students SET name = ?, lastname = ?, birth_date = ?, classroom = ?, dni = ?, address = ? WHERE id = ?',
      [name, lastname, birth_date, classroom, dni, address, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 