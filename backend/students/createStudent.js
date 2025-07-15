import { getConnection } from '../config/database.js';

export const createStudent = async (req, res) => {
  try {
    const { name, lastname, birth_date, classroom, dni } = req.body;
    const pool = getConnection();
    
    const [result] = await pool.execute(
      'INSERT INTO students (name, lastname, birth_date, classroom, dni) VALUES (?, ?, ?, ?, ?)',
      [name, lastname, birth_date, classroom, dni]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Student created successfully'
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 