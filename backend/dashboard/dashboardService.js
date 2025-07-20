import { getConnection } from '../config/database.js';

// Helper function to get person counts
const getPersonCounts = async (connection) => {
  const [studentsResult] = await connection.execute(
    'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
  );
  const [teachersResult] = await connection.execute(
    'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
  );
  const [parentsResult] = await connection.execute(
    'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
  );
  return {
    totalStudents: studentsResult[0].count,
    totalTeachers: teachersResult[0].count,
    totalParents: parentsResult[0].count,
  };
};

// Obtener estadísticas generales del dashboard
export const getDashboardStats = async () => {
  let connection;
  try {
    connection = await getConnection();
    const { totalStudents, totalTeachers, totalParents } = await getPersonCounts(connection);
    
    // Calcular tasa de asistencia del día actual
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

    // Calcular tasa basada en estudiantes que deberían asistir hoy
    const attendanceRate = totalStudents > 0 ? 
      Math.round((presentCount / totalStudents) * 100) : 0;
    
    return {
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        attendanceRate,
        todayAttendance: totalAttendance
      }
    };
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas de asistencia del día
export const getTodayAttendance = async () => {
  let connection;
  try {
    connection = await getConnection();
    
    const today = new Date().toISOString().split('T')[0];
    
    const [attendanceResult] = await connection.execute(
      `SELECT a.*, p.name, p.lastname_father 
       FROM attendance a 
       JOIN persons p ON a.student_id = p.id 
       WHERE DATE(a.date) = ?`,
      [today]
    );
    
    const total = attendanceResult.length;
    const present = attendanceResult.filter(a => a.status === 'present').length;
    const absent = attendanceResult.filter(a => a.status === 'absent').length;
    const late = attendanceResult.filter(a => a.status === 'late').length;
    
    return {
      success: true,
      data: {
        total,
        present,
        absent,
        late,
        attendance: attendanceResult
      }
    };
  } catch (error) {
    console.error('Error in getTodayAttendance:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas anuales
export const getYearlyStats = async (year) => {
  let connection;
  try {
    connection = await getConnection();
    const { totalStudents, totalTeachers, totalParents } = await getPersonCounts(connection);
    
    // Estadísticas de asistencia del año
    const [yearAttendanceResult] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM attendance WHERE YEAR(date) = ? GROUP BY status',
      [year]
    );
    
    let totalPresent = 0;
    let totalAttendance = 0;
    
    yearAttendanceResult.forEach(row => {
      totalAttendance += row.count;
      if (row.status === 'present') {
        totalPresent = row.count;
      }
    });
    
    const attendanceRate = totalAttendance > 0 ? Math.round((totalPresent / totalAttendance) * 100) : 0;
    
    return {
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        attendanceRate,
        yearAttendance: totalAttendance,
        year
      }
    };
  } catch (error) {
    console.error('Error in getYearlyStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas mensuales
export const getMonthlyStats = async (year) => {
  let connection;
  try {
    connection = await getConnection();
    const { totalStudents, totalTeachers, totalParents } = await getPersonCounts(connection);
    
    // Estadísticas de asistencia del año
    const [yearAttendanceResult] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM attendance WHERE YEAR(date) = ? GROUP BY status',
      [year]
    );
    
    let totalPresent = 0;
    let totalAttendance = 0;
    
    yearAttendanceResult.forEach(row => {
      totalAttendance += row.count;
      if (row.status === 'present') {
        totalPresent = row.count;
      }
    });
    
    const attendanceRate = totalAttendance > 0 ? Math.round((totalPresent / totalAttendance) * 100) : 0;
    
    // Obtener datos mensuales reales
    const [monthlyAttendanceResult] = await connection.execute(
      'SELECT MONTH(date) as month, status, COUNT(*) as count FROM attendance WHERE YEAR(date) = ? GROUP BY MONTH(date), status ORDER BY month',
      [year]
    );
    
    // Procesar datos mensuales
    const monthlyData = [];
    for (let month = 1; month <= 12; month++) {
      const monthAttendance = monthlyAttendanceResult.filter(a => a.month === month);
      let presentCount = 0;
      let totalCount = 0;
      
      monthAttendance.forEach(row => {
        totalCount += row.count;
        if (row.status === 'present') {
          presentCount += row.count;
        }
      });
      
      const attendance = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
      
      monthlyData.push({
        month,
        attendance,
        students: totalStudents,
        presentCount,
        totalCount
      });
    }
    
    return {
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        attendanceRate,
        monthlyData,
        year
      }
    };
  } catch (error) {
    console.error('Error in getMonthlyStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas semanales
export const getWeeklyStats = async () => {
  let connection;
  try {
    connection = await getConnection();
    const { totalStudents, totalTeachers, totalParents } = await getPersonCounts(connection);
    
    // Obtener fecha de inicio de la semana actual
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const [weekAttendanceResult] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM attendance WHERE date BETWEEN ? AND ? GROUP BY status',
      [startOfWeek, endOfWeek]
    );
    
    let totalPresent = 0;
    let totalAttendance = 0;
    
    weekAttendanceResult.forEach(row => {
      totalAttendance += row.count;
      if (row.status === 'present') {
        totalPresent = row.count;
      }
    });
    
    const attendanceRate = totalAttendance > 0 ? Math.round((totalPresent / totalAttendance) * 100) : 0;
    
    return {
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        attendanceRate,
        weekAttendance: totalAttendance
      }
    };
  } catch (error) {
    console.error('Error in getWeeklyStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas diarias
export const getDailyStats = async () => {
  let connection;
  try {
    connection = await getConnection();
    const { totalStudents, totalTeachers, totalParents } = await getPersonCounts(connection);
    
    // Obtener fecha de inicio de la semana actual
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const [weekAttendanceResult] = await connection.execute(
      'SELECT date, status, COUNT(*) as count FROM attendance WHERE date BETWEEN ? AND ? GROUP BY date, status ORDER BY date DESC',
      [startOfWeek, endOfWeek]
    );
    
    // Agrupar por día
    const dailyData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const dayAttendance = weekAttendanceResult.filter(a => {
        const attendanceDate = new Date(a.date);
        return attendanceDate.toDateString() === date.toDateString();
      });
      
      const presentStudents = dayAttendance.find(a => a.status === 'present')?.count || 0;
      const totalDayStudents = dayAttendance.reduce((sum, a) => sum + a.count, 0);
      const attendance = totalDayStudents > 0 ? Math.round((presentStudents / totalDayStudents) * 100) : 0;
      
      dailyData.push({
        date: date.toISOString(),
        attendance,
        presentStudents,
        totalStudents: totalDayStudents
      });
    }
    
    let totalPresent = 0;
    let totalAttendance = 0;
    
    weekAttendanceResult.forEach(row => {
      totalAttendance += row.count;
      if (row.status === 'present') {
        totalPresent += row.count;
      }
    });
    
    const attendanceRate = totalAttendance > 0 ? Math.round((totalPresent / totalAttendance) * 100) : 0;
    
    return {
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        attendanceRate,
        dailyData
      }
    };
  } catch (error) {
    console.error('Error in getDailyStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Obtener estadísticas demográficas
export const getDemographicStats = async () => {
  let connection;
  try {
    connection = await getConnection();
    
    // Estadísticas por turno
    console.log('🔍 Ejecutando consulta de estadísticas por turno...');
    console.log('📅 Fecha actual (CURDATE):', new Date().toISOString().split('T')[0]);
    
    // Verificar qué fechas hay en la base de datos
    const [dateCheck] = await connection.execute(
      'SELECT DISTINCT DATE(date) as attendance_date FROM attendance ORDER BY attendance_date DESC LIMIT 5'
    );
    console.log('📅 Fechas disponibles en la base de datos:', dateCheck.map(d => d.attendance_date));
    
    const [shiftStats] = await connection.execute(
      `SELECT 
        COALESCE(p.shift, 'Sin turno') as shift,
        COUNT(*) as students,
        0 as present,
        0 as absent
       FROM persons p
       WHERE p.person_type = 'student'
       GROUP BY p.shift`
    );

    // Estadísticas por género
    console.log('🔍 Ejecutando consulta de estadísticas por género...');
    const [genderStats] = await connection.execute(
      `SELECT 
        COALESCE(p.gender, 'Sin género') as gender,
        COUNT(*) as students,
        0 as present,
        0 as absent
       FROM persons p
       WHERE p.person_type = 'student'
       GROUP BY p.gender`
    );

    // Estadísticas por edad
    console.log('🔍 Ejecutando consulta de estadísticas por edad...');
    const [ageStats] = await connection.execute(
      `SELECT 
        COALESCE(YEAR(CURDATE()) - YEAR(p.birthdate), 0) as age,
        COUNT(*) as students,
        0 as present,
        0 as absent
       FROM persons p
       WHERE p.person_type = 'student'
       GROUP BY YEAR(CURDATE()) - YEAR(p.birthdate)
       ORDER BY age`
    );

    // Estadísticas por sala
    console.log('🔍 Ejecutando consulta de estadísticas por sala...');
    const [classroomStats] = await connection.execute(
      `SELECT 
        COALESCE(c.name, 'Sin sala') as classroom,
        COALESCE(p.shift, 'Sin turno') as shift,
        COUNT(*) as students,
        0 as present,
        0 as absent
       FROM persons p
       LEFT JOIN classrooms c ON p.classroom_id = c.id
       WHERE p.person_type = 'student'
       GROUP BY c.name, p.shift
       ORDER BY c.name, p.shift`
    );
    console.log('📊 Resultados de estadísticas por sala:', classroomStats);

    // Procesar datos por turno
    console.log('🔍 Procesando datos por turno...');
    const byShift = {};
    shiftStats.forEach(stat => {
      const shift = stat.shift || 'Sin turno';
      byShift[shift.toLowerCase()] = {
        students: stat.students,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
    });
    console.log('📊 Datos finales por turno:', byShift);

    // Procesar datos por género
    console.log('🔍 Procesando datos por género...');
    const byGender = {};
    genderStats.forEach(stat => {
      const gender = stat.gender || 'Sin género';
      byGender[gender.toLowerCase()] = {
        students: stat.students,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
    });
    console.log('📊 Datos finales por género:', byGender);

    // Procesar datos por edad
    console.log('🔍 Procesando datos por edad...');
    const byAge = {};
    ageStats.forEach(stat => {
      const age = stat.age || 0;
      byAge[`age${age}`] = {
        students: stat.students,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
    });
    console.log('📊 Datos finales por edad:', byAge);

    // Procesar datos por sala
    console.log('🔍 Procesando datos por sala...');
    const byClassroom = {};
    classroomStats.forEach(stat => {
      const classroom = stat.classroom || 'Sin sala';
      const shift = stat.shift || 'Sin turno';
      const key = `${classroom} - ${shift}`;
      byClassroom[key] = {
        classroom: classroom,
        shift: shift,
        students: stat.students,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
      console.log(`📊 Procesado sala ${key}:`, byClassroom[key]);
    });
    console.log('📊 Datos finales por sala:', byClassroom);

    // Asegurar que siempre haya datos por defecto si no hay resultados
    if (Object.keys(byShift).length === 0) {
      byShift['mañana'] = { students: 0, present: 0, absent: 0 };
      byShift['tarde'] = { students: 0, present: 0, absent: 0 };
    }
    
    if (Object.keys(byGender).length === 0) {
      byGender['masculino'] = { students: 0, present: 0, absent: 0 };
      byGender['femenino'] = { students: 0, present: 0, absent: 0 };
    }
    
    if (Object.keys(byAge).length === 0) {
      byAge['age3'] = { students: 0, present: 0, absent: 0 };
      byAge['age4'] = { students: 0, present: 0, absent: 0 };
      byAge['age5'] = { students: 0, present: 0, absent: 0 };
      byAge['age6'] = { students: 0, present: 0, absent: 0 };
    }

    if (Object.keys(byClassroom).length === 0) {
      byClassroom['Sala de 3 - Mañana'] = { classroom: 'Sala de 3', shift: 'Mañana', students: 0, present: 0, absent: 0 };
      byClassroom['Sala de 3 - Tarde'] = { classroom: 'Sala de 3', shift: 'Tarde', students: 0, present: 0, absent: 0 };
      byClassroom['Sala de 4 - Mañana'] = { classroom: 'Sala de 4', shift: 'Mañana', students: 0, present: 0, absent: 0 };
      byClassroom['Sala de 4 - Tarde'] = { classroom: 'Sala de 4', shift: 'Tarde', students: 0, present: 0, absent: 0 };
      byClassroom['Sala de 5 - Mañana'] = { classroom: 'Sala de 5', shift: 'Mañana', students: 0, present: 0, absent: 0 };
      byClassroom['Sala de 5 - Tarde'] = { classroom: 'Sala de 5', shift: 'Tarde', students: 0, present: 0, absent: 0 };
    }

    const result = {
      success: true,
      data: {
        byShift,
        byGender,
        byAge,
        byClassroom
      }
    };
    
    console.log('📊 Resultado final del endpoint demográfico:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error in getDemographicStats:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}; 