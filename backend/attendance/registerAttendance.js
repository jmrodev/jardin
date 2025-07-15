import { getConnection } from '../config/database.js';

export const registerAttendance = async (req, res) => {
  try {
    const { student_id, date, present, observations } = req.body;
    const pool = getConnection();
    
    // Check if attendance record already exists for this date and student
    const [existing] = await pool.execute(
      'SELECT id FROM attendance WHERE student_id = ? AND date = ?',
      [student_id, date]
    );
    
    if (existing.length > 0) {
      // Update existing record
      await pool.execute(
        'UPDATE attendance SET present = ?, observations = ? WHERE student_id = ? AND date = ?',
        [present, observations, student_id, date]
      );
    } else {
      // Create new record
      await pool.execute(
        'INSERT INTO attendance (student_id, date, present, observations) VALUES (?, ?, ?, ?)',
        [student_id, date, present, observations]
      );
    }
    
    res.json({ message: 'Attendance registered successfully' });
  } catch (error) {
    console.error('Error registering attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 