import { pool } from '../config/database.js';

export const getStatistics = async (req, res) => {
  try {
    // Ejecutar todas las consultas en paralelo para mayor eficiencia
    const [
      [studentsResult],
      [teachersResult],
      [parentsResult],
      [attendanceResult]
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) as count FROM persons WHERE person_type = 'student'"),
      pool.query("SELECT COUNT(*) as count FROM persons WHERE person_type = 'teacher'"),
      pool.query("SELECT COUNT(*) as count FROM persons WHERE person_type = 'parent'"),
      pool.query("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present FROM attendance")
    ]);
    
    const totalAttendance = attendanceResult.total || 0;
    const presentAttendance = attendanceResult.present || 0;
    const attendancePercentage = totalAttendance > 0 ? (presentAttendance / totalAttendance) * 100 : 0;

    const statistics = {
      students: studentsResult.count,
      teachers: teachersResult.count,
      parents: parentsResult.count,
      attendance: attendancePercentage.toFixed(2),
    };

    res.json(statistics);
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ message: 'Error getting statistics' });
  }
};
