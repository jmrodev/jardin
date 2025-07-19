import express from 'express';
import { getStats, getTodayAttendance, getYearlyStats, getMonthlyStats, getWeeklyStats, getDailyStats, getDemographicStats } from './dashboardController.js';
import { validateToken } from '../auth/validateToken.js';
import { authorizeRoles } from '../auth/authorizeRoles.js';

const router = express.Router();

// Rutas del dashboard
router.get('/stats', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getStats);
router.get('/attendance/today', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getTodayAttendance);

// Rutas de estadísticas detalladas
router.get('/stats/yearly/:year', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getYearlyStats);
router.get('/stats/monthly/:year', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getMonthlyStats);
router.get('/stats/weekly', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getWeeklyStats);
router.get('/stats/daily', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getDailyStats);
router.get('/stats/demographic', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), getDemographicStats);

export default router; 