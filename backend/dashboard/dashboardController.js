import { 
  getDashboardStats as getDashboardStatsService, 
  getTodayAttendance as getTodayAttendanceService, 
  getYearlyStats as getYearlyStatsService, 
  getMonthlyStats as getMonthlyStatsService, 
  getWeeklyStats as getWeeklyStatsService, 
  getDailyStats as getDailyStatsService,
  getDemographicStats as getDemographicStatsService
} from './dashboardService.js';

// Obtener estadísticas generales del dashboard
export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();
    res.json(stats);
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas del dashboard' 
    });
  }
};

// Obtener estadísticas de asistencia del día
export const getTodayAttendance = async (req, res) => {
  try {
    const attendance = await getTodayAttendanceService();
    res.json(attendance);
  } catch (error) {
    console.error('Error getting today attendance:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener asistencia del día' 
    });
  }
};

// Obtener estadísticas anuales
export const getYearlyStats = async (req, res) => {
  try {
    const { year } = req.params;
    const stats = await getYearlyStatsService(parseInt(year));
    res.json(stats);
  } catch (error) {
    console.error('Error getting yearly stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas anuales' 
    });
  }
};

// Obtener estadísticas mensuales
export const getMonthlyStats = async (req, res) => {
  try {
    const { year } = req.params;
    const stats = await getMonthlyStatsService(parseInt(year));
    res.json(stats);
  } catch (error) {
    console.error('Error getting monthly stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas mensuales' 
    });
  }
};

// Obtener estadísticas semanales
export const getWeeklyStats = async (req, res) => {
  try {
    const stats = await getWeeklyStatsService();
    res.json(stats);
  } catch (error) {
    console.error('Error getting weekly stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas semanales' 
    });
  }
};

// Obtener estadísticas diarias
export const getDailyStats = async (req, res) => {
  try {
    const stats = await getDailyStatsService();
    res.json(stats);
  } catch (error) {
    console.error('Error getting daily stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas diarias' 
    });
  }
};

// Obtener estadísticas demográficas
export const getDemographicStats = async (req, res) => {
  try {
    const stats = await getDemographicStatsService();
    res.json(stats);
  } catch (error) {
    console.error('Error getting demographic stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas demográficas' 
    });
  }
}; 