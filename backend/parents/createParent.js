import { getConnection } from '../config/database.js';

export const createParent = async (req, res) => {
  try {
    const { student_id, name, lastname, phone, email, relationship } = req.body;
    const pool = getConnection();
    
    // Verify that the student exists
    const [students] = await pool.execute(
      'SELECT id FROM students WHERE id = ?',
      [student_id]
    );
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO parents (student_id, name, lastname, phone, email, relationship) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, name, lastname, phone, email, relationship]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Parent created successfully'
    });
  } catch (error) {
    console.error('Error creating parent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 