import { getConnection } from '../config/database.js';

export const getDashboardStatsService = async () => {
  let connection;
  try {
    connection = await getConnection();
    
    // Obtener conteo de estudiantes
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const studentsCount = studentsResult[0].count;

    // Obtener conteo de maestros
    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const teachersCount = teachersResult[0].count;

    // Obtener conteo de padres/tutores
    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const parentsCount = parentsResult[0].count;

    // Obtener asistencia del día actual
    const today = new Date().toISOString().split('T')[0];
    let attendanceResult;
    try {
      [attendanceResult] = await connection.execute(
        'SELECT status, COUNT(*) as count FROM attendance WHERE DATE(date) = ? GROUP BY status',
        [today]
      );
    } catch (attendanceError) {
      console.log('No attendance data for today, using default values');
      attendanceResult = [];
    }

    // Calcular porcentaje de asistencia
    let presentCount = 0;
    let totalAttendance = 0;
    
    attendanceResult.forEach(row => {
      totalAttendance += row.count;
      if (row.status === 'present') {
        presentCount = row.count;
      }
    });

    const todayAttendancePercent = studentsCount > 0 ? 
      Math.round((presentCount / studentsCount) * 100) : 0;

    return {
      students: studentsCount,
      teachers: teachersCount,
      parents: parentsCount,
      todayAttendance: todayAttendancePercent,
      attendanceDetails: {
        present: presentCount,
        absent: totalAttendance - presentCount,
        total: totalAttendance
      }
    };
  } catch (error) {
    console.error('Error in dashboard stats service:', error);
    throw new Error('Error al calcular estadísticas del dashboard');
  } finally {
    if (connection) {
      connection.release();
    }
  }
}; 