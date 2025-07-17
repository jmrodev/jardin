import { getConnection } from '../config/database.js';
import Attendance from '../models/Attendance.js';

const getAttendance = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM attendance');
    return rows.map(row => new Attendance(row.id, row.student_id, row.date, row.status));
  } catch (error) {
    console.error('Error getting attendance:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const registerAttendance = async (attendanceData) => {
  let connection;
  try {
    connection = await getConnection();
    const { student_id, date, status } = attendanceData;
    const [result] = await connection.query(
      'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
      [student_id, date, status]
    );
    return { id: result.insertId, ...attendanceData };
  } catch (error) {
    console.error('Error registering attendance:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export default {
  getAttendance,
  registerAttendance
};
