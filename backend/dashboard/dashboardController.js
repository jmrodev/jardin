import { getDashboardStatsService } from './dashboardService.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();
    res.json(stats);
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ 
      message: 'Error al obtener estadísticas del dashboard',
      error: error.message 
    });
  }
}; 