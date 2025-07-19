// Sistema de alertas automáticas para estadísticas
export class AlertSystem {
  constructor() {
    this.alerts = [];
    this.thresholds = {
      attendance: {
        warning: 85,
        critical: 70
      },
      teacherStudentRatio: {
        warning: 0.25,
        critical: 0.2
      },
      parentStudentRatio: {
        warning: 1.2,
        critical: 1.0
      }
    };
  }

  // Analizar estadísticas y generar alertas
  analyzeStats(stats, period, year) {
    this.alerts = [];
    
    // Alerta de asistencia
    this.checkAttendanceAlert(stats.attendanceRate);
    
    // Alerta de ratio maestro-estudiante
    this.checkTeacherStudentRatio(stats.totalStudents, stats.totalTeachers);
    
    // Alerta de ratio padre-estudiante
    this.checkParentStudentRatio(stats.totalStudents, stats.totalParents);
    
    // Alerta de tendencia
    this.checkTrendAlert(stats, period, year);
    
    return this.alerts;
  }

  checkAttendanceAlert(attendanceRate) {
    if (!attendanceRate) return;
    
    if (attendanceRate < this.thresholds.attendance.critical) {
      this.alerts.push({
        type: 'critical',
        category: 'attendance',
        title: 'Asistencia Crítica',
        message: `La tasa de asistencia (${attendanceRate}%) está por debajo del umbral crítico (${this.thresholds.attendance.critical}%). Se requiere acción inmediata.`,
        icon: 'AlertTriangle',
        action: 'Revisar políticas de asistencia y comunicación con padres'
      });
    } else if (attendanceRate < this.thresholds.attendance.warning) {
      this.alerts.push({
        type: 'warning',
        category: 'attendance',
        title: 'Asistencia Baja',
        message: `La tasa de asistencia (${attendanceRate}%) está por debajo del umbral recomendado (${this.thresholds.attendance.warning}%).`,
        icon: 'AlertCircle',
        action: 'Implementar estrategias de mejora'
      });
    }
  }

  checkTeacherStudentRatio(students, teachers) {
    if (!students || !teachers) return;
    
    const ratio = teachers / students;
    
    if (ratio < this.thresholds.teacherStudentRatio.critical) {
      this.alerts.push({
        type: 'critical',
        category: 'staffing',
        title: 'Ratio Maestro-Estudiante Crítico',
        message: `El ratio maestro-estudiante (${ratio.toFixed(2)}:1) está por debajo del umbral crítico (${this.thresholds.teacherStudentRatio.critical}:1).`,
        icon: 'Users',
        action: 'Considerar contratar más maestros urgentemente'
      });
    } else if (ratio < this.thresholds.teacherStudentRatio.warning) {
      this.alerts.push({
        type: 'warning',
        category: 'staffing',
        title: 'Ratio Maestro-Estudiante Bajo',
        message: `El ratio maestro-estudiante (${ratio.toFixed(2)}:1) está por debajo del umbral recomendado (${this.thresholds.teacherStudentRatio.warning}:1).`,
        icon: 'UserPlus',
        action: 'Evaluar necesidad de contratar más maestros'
      });
    }
  }

  checkParentStudentRatio(students, parents) {
    if (!students || !parents) return;
    
    const ratio = parents / students;
    
    if (ratio < this.thresholds.parentStudentRatio.critical) {
      this.alerts.push({
        type: 'critical',
        category: 'parental',
        title: 'Participación de Padres Crítica',
        message: `El ratio padre-estudiante (${ratio.toFixed(2)}:1) está por debajo del umbral crítico (${this.thresholds.parentStudentRatio.critical}:1).`,
        icon: 'UserCheck',
        action: 'Implementar programas de involucramiento parental'
      });
    } else if (ratio < this.thresholds.parentStudentRatio.warning) {
      this.alerts.push({
        type: 'warning',
        category: 'parental',
        title: 'Participación de Padres Baja',
        message: `El ratio padre-estudiante (${ratio.toFixed(2)}:1) está por debajo del umbral recomendado (${this.thresholds.parentStudentRatio.warning}:1).`,
        icon: 'UserPlus',
        action: 'Fomentar mayor participación de padres'
      });
    }
  }

  checkTrendAlert(stats, period, year) {
    // Simular datos del período anterior para comparación
    const previousStats = this.getPreviousPeriodStats(period, year);
    const attendanceChange = (stats.attendanceRate || 0) - (previousStats.attendanceRate || 0);
    
    if (attendanceChange < -10) {
      this.alerts.push({
        type: 'critical',
        category: 'trend',
        title: 'Deterioro Significativo en Asistencia',
        message: `La asistencia ha disminuido ${Math.abs(attendanceChange)}% comparado con el período anterior.`,
        icon: 'TrendingDown',
        action: 'Investigar causas del deterioro y tomar medidas correctivas'
      });
    } else if (attendanceChange < -5) {
      this.alerts.push({
        type: 'warning',
        category: 'trend',
        title: 'Disminución en Asistencia',
        message: `La asistencia ha disminuido ${Math.abs(attendanceChange)}% comparado con el período anterior.`,
        icon: 'TrendingDown',
        action: 'Monitorear tendencia y considerar intervenciones'
      });
    } else if (attendanceChange > 5) {
      this.alerts.push({
        type: 'success',
        category: 'trend',
        title: 'Mejora en Asistencia',
        message: `¡Excelente! La asistencia ha mejorado ${attendanceChange}% comparado con el período anterior.`,
        icon: 'TrendingUp',
        action: 'Mantener las buenas prácticas implementadas'
      });
    }
  }

  getPreviousPeriodStats(period, year) {
    // Datos simulados del período anterior
    const previousStats = {
      yearly: { attendanceRate: 78, totalStudents: 28 },
      monthly: { attendanceRate: 82, totalStudents: 29 },
      weekly: { attendanceRate: 85, totalStudents: 30 },
      daily: { attendanceRate: 87, totalStudents: 30 }
    };
    return previousStats[period] || { attendanceRate: 0, totalStudents: 0 };
  }

  // Obtener alertas por tipo
  getAlertsByType(type) {
    return this.alerts.filter(alert => alert.type === type);
  }

  // Obtener alertas por categoría
  getAlertsByCategory(category) {
    return this.alerts.filter(alert => alert.category === category);
  }

  // Obtener alertas críticas
  getCriticalAlerts() {
    return this.getAlertsByType('critical');
  }

  // Obtener alertas de advertencia
  getWarningAlerts() {
    return this.getAlertsByType('warning');
  }

  // Obtener alertas de éxito
  getSuccessAlerts() {
    return this.getAlertsByType('success');
  }

  // Verificar si hay alertas críticas
  hasCriticalAlerts() {
    return this.getCriticalAlerts().length > 0;
  }

  // Obtener resumen de alertas
  getAlertSummary() {
    const critical = this.getCriticalAlerts().length;
    const warnings = this.getWarningAlerts().length;
    const successes = this.getSuccessAlerts().length;
    
    return {
      total: this.alerts.length,
      critical,
      warnings,
      successes,
      hasIssues: critical > 0 || warnings > 0
    };
  }
}

// Instancia global del sistema de alertas
export const alertSystem = new AlertSystem(); 