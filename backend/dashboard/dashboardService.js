import { getConnection } from '../config/database.js';

// Obtener estadísticas generales del dashboard
export const getDashboardStats = async () => {
  let connection;
  try {
    connection = await getConnection();
    
    // Obtener conteo de estudiantes
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const totalStudents = studentsResult[0].count;

    // Obtener conteo de maestros
    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const totalTeachers = teachersResult[0].count;

    // Obtener conteo de padres/tutores
    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const totalParents = parentsResult[0].count;
    
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
    
    // Obtener conteos básicos
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const totalStudents = studentsResult[0].count;

    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const totalTeachers = teachersResult[0].count;

    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const totalParents = parentsResult[0].count;
    
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
    
    // Obtener conteos básicos
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const totalStudents = studentsResult[0].count;

    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const totalTeachers = teachersResult[0].count;

    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const totalParents = parentsResult[0].count;
    
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
    
    // Obtener conteos básicos
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const totalStudents = studentsResult[0].count;

    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const totalTeachers = teachersResult[0].count;

    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const totalParents = parentsResult[0].count;
    
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
    
    // Obtener conteos básicos
    const [studentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "student"'
    );
    const totalStudents = studentsResult[0].count;

    const [teachersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "teacher"'
    );
    const totalTeachers = teachersResult[0].count;

    const [parentsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM persons WHERE person_type = "parent"'
    );
    const totalParents = parentsResult[0].count;
    
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
      const totalStudents = dayAttendance.reduce((sum, a) => sum + a.count, 0);
      const attendance = totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0;
      
      dailyData.push({
        date: date.toISOString(),
        attendance,
        presentStudents,
        totalStudents
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
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent
       FROM persons p
       LEFT JOIN attendance a ON p.id = a.student_id AND DATE(a.date) = CURDATE()
       WHERE p.person_type = 'student'
       GROUP BY p.shift`
    );
    // console.log('📊 Resultados de estadísticas por turno:', shiftStats);

    // Estadísticas por género
    console.log('🔍 Ejecutando consulta de estadísticas por género...');
    const [genderStats] = await connection.execute(
      `SELECT 
        COALESCE(p.gender, 'Sin género') as gender,
        COUNT(*) as students,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent
       FROM persons p
       LEFT JOIN attendance a ON p.id = a.student_id AND DATE(a.date) = CURDATE()
       WHERE p.person_type = 'student'
       GROUP BY p.gender`
    );
    // console.log('📊 Resultados de estadísticas por género:', genderStats);

    // Estadísticas por edad
    console.log('🔍 Ejecutando consulta de estadísticas por edad...');
    const [ageStats] = await connection.execute(
      `SELECT 
        COALESCE(YEAR(CURDATE()) - YEAR(p.birthdate), 0) as age,
        COUNT(*) as students,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent
       FROM persons p
       LEFT JOIN attendance a ON p.id = a.student_id AND DATE(a.date) = CURDATE()
       WHERE p.person_type = 'student'
       GROUP BY YEAR(CURDATE()) - YEAR(p.birthdate)
       ORDER BY age`
    );
    // console.log('📊 Resultados de estadísticas por edad:', ageStats);

    // Procesar datos por turno
    console.log('🔍 Procesando datos por turno...');
    const byShift = {};
    shiftStats.forEach(stat => {
      const shift = stat.shift || 'Sin turno';
      const attendance = stat.students > 0 ? 
        Math.round((stat.present / stat.students) * 100) : 0;
      
      byShift[shift.toLowerCase()] = {
        students: stat.students,
        attendance,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
      // console.log(`📊 Procesado turno ${shift}:`, byShift[shift.toLowerCase()]);
    });
    console.log('📊 Datos finales por turno:', byShift);

    // Procesar datos por género
    console.log('🔍 Procesando datos por género...');
    const byGender = {};
    genderStats.forEach(stat => {
      const gender = stat.gender || 'Sin género';
      const attendance = stat.students > 0 ? 
        Math.round((stat.present / stat.students) * 100) : 0;
      
      byGender[gender.toLowerCase()] = {
        students: stat.students,
        attendance,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
      // console.log(`📊 Procesado género ${gender}:`, byGender[gender.toLowerCase()]);
    });
    console.log('📊 Datos finales por género:', byGender);

    // Procesar datos por edad
    console.log('🔍 Procesando datos por edad...');
    const byAge = {};
    ageStats.forEach(stat => {
      const age = stat.age || 0;
      const attendance = stat.students > 0 ? 
        Math.round((stat.present / stat.students) * 100) : 0;
      
      byAge[`age${age}`] = {
        students: stat.students,
        attendance,
        present: stat.present || 0,
        absent: stat.absent || 0
      };
      // console.log(`📊 Procesado edad ${age}:`, byAge[`age${age}`]);
    });
    console.log('📊 Datos finales por edad:', byAge);

    // Asegurar que siempre haya datos por defecto si no hay resultados
    if (Object.keys(byShift).length === 0) {
      byShift['mañana'] = { students: 0, attendance: 0, present: 0, absent: 0 };
      byShift['tarde'] = { students: 0, attendance: 0, present: 0, absent: 0 };
    }
    
    if (Object.keys(byGender).length === 0) {
      byGender['masculino'] = { students: 0, attendance: 0, present: 0, absent: 0 };
      byGender['femenino'] = { students: 0, attendance: 0, present: 0, absent: 0 };
    }
    
    if (Object.keys(byAge).length === 0) {
      byAge['age3'] = { students: 0, attendance: 0, present: 0, absent: 0 };
      byAge['age4'] = { students: 0, attendance: 0, present: 0, absent: 0 };
      byAge['age5'] = { students: 0, attendance: 0, present: 0, absent: 0 };
    }

    const result = {
      success: true,
      data: {
        byShift,
        byGender,
        byAge
      }
    };
    
    console.log('📊 Resultado final del endpoint demográfico:', result);
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