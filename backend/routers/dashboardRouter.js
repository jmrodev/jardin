import express from 'express';
import { getStats, getTodayAttendance, getYearlyStats, getMonthlyStats, getWeeklyStats, getDailyStats, getDemographicStats } from '../dashboard/dashboardController.js';
import { validateToken } from '../auth/validateToken.js';
import { authorizeRoles } from '../auth/authorizeRoles.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// Rutas del dashboard
router.get('/stats', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getStats));
router.get('/attendance/today', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getTodayAttendance));

// Rutas de estadísticas detalladas
router.get('/stats/yearly/:year', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getYearlyStats));
router.get('/stats/monthly/:year', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getMonthlyStats));
router.get('/stats/weekly', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getWeeklyStats));
router.get('/stats/daily', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getDailyStats));
router.get('/stats/demographic', validateToken, authorizeRoles(['admin', 'directivo', 'maestro']), asyncHandler(getDemographicStats));

export default router; 