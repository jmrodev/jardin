import api from './base.js';

const dashboardService = {
  // Obtener estadísticas generales del dashboard
  getStats() {
    return api.get('/dashboard/stats');
  },

  // Obtener estadísticas de asistencia del día
  getTodayAttendance() {
    return api.get('/dashboard/attendance/today');
  }
};

export default dashboardService; 