import { getConnection } from '../config/database.js';
import { encryptPassword } from '../auth/encryptPassword.js';

export const createTeacher = async (req, res) => {
  try {
    const { name, lastname, email, password, phone, assigned_classroom } = req.body;
    const pool = getConnection();
    
    // Encrypt password
    const encryptedPassword = await encryptPassword(password);
    
    const [result] = await pool.execute(
      'INSERT INTO staff (name, lastname, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, lastname, email, encryptedPassword, 'teacher', phone]
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