import { getConnection } from '../config/database.js';
import Attendance from '../models/Attendance.js';

const getAttendance = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM attendance');
  return rows.map(row => new Attendance(row.id, row.student_id, row.date, row.status));
};

const registerAttendance = async (attendanceData) => {
  const connection = getConnection();
  const { student_id, date, status } = attendanceData;
  const [result] = await connection.query(
    'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
    [student_id, date, status]
  );
  return { id: result.insertId, ...attendanceData };
};

export default {
  getAttendance,
  registerAttendance
};
