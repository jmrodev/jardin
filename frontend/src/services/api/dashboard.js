import api from './base.js';

const dashboardService = {
  // Obtener estadísticas generales del dashboard
  getStats() {
    return api.get('/dashboard/stats');
  },

  // Obtener estadísticas de asistencia del día
  getTodayAttendance() {
    return api.get('/dashboard/attendance/today');
  },

  // Obtener estadísticas anuales
  getYearlyStats(year) {
    return api.get(`/dashboard/stats/yearly/${year}`);
  },

  // Obtener estadísticas mensuales
  getMonthlyStats(year) {
    return api.get(`/dashboard/stats/monthly/${year}`);
  },

  // Obtener estadísticas semanales
  getWeeklyStats() {
    return api.get('/dashboard/stats/weekly');
  },

  // Obtener estadísticas diarias
  getDailyStats() {
    return api.get('/dashboard/stats/daily');
  },

  // Obtener estadísticas demográficas
  getDemographicStats() {
    return api.get('/dashboard/stats/demographic');
  }
};

export default dashboardService; 