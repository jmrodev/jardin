import { getConnection } from '../config/database.js';
import { encryptPassword } from '../auth/encryptPassword.js';

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, phone, active } = req.body;
    const pool = getConnection();
    
    let query = 'UPDATE staff SET name = ?, lastname = ?, email = ?, phone = ?';
    let params = [name, lastname, email, phone];
    
    // If new password is provided, encrypt it
    if (password) {
      const encryptedPassword = await encryptPassword(password);
      query += ', password = ?';
      params.push(encryptedPassword);
    }
    
    // If active status is provided
    if (active !== undefined) {
      query += ', active = ?';
      params.push(active);
    }
    
    query += ' WHERE id = ? AND role = ?';
    params.push(id, 'teacher');
    
    const [result] = await pool.execute(query, params);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 