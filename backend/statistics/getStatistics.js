import { getConnection } from '../config/database.js';

export const getStatistics = async (req, res) => {
  try {
    const pool = getConnection();

    const [studentsResult] = await pool.query('SELECT COUNT(*) as count FROM students');
    const [teachersResult] = await pool.query("SELECT COUNT(*) as count FROM staff WHERE role = 'teacher'");
    const [parentsResult] = await pool.query("SELECT COUNT(*) as count FROM persons WHERE relationship IN ('padre', 'madre', 'tutor')");
    
    const [attendanceResult] = await pool.query('SELECT COUNT(*) as total, SUM(present) as present FROM attendance');
    
    const totalAttendance = attendanceResult[0].total || 0;
    const presentAttendance = attendanceResult[0].present || 0;
    const attendancePercentage = totalAttendance > 0 ? (presentAttendance / totalAttendance) * 100 : 0;

    const statistics = {
      students: studentsResult[0].count,
      teachers: teachersResult[0].count,
      parents: parentsResult[0].count,
      attendance: attendancePercentage.toFixed(2),
    };

    res.json(statistics);
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ message: 'Error getting statistics' });
  }
};
