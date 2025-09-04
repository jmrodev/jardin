import { getConnection } from '../config/database.js';
import { encryptPassword } from '../auth/encryptPassword.js';

export const createTeacher = async (req, res) => {
  try {
    const { name, lastname, email, password, phone, assigned_classroom, username } = req.body;
    const userId = req.user.id;
    const pool = getConnection();
    
    // Encrypt password
    const encryptedPassword = await encryptPassword(password);
    
    const [result] = await pool.execute(
      'INSERT INTO staff (name, lastname, email, password, role, phone, username, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, lastname, email, encryptedPassword, 'teacher', phone, username, userId, userId]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Teacher created successfully'
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 