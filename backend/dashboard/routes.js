import express from 'express';
import { getDashboardStats } from './dashboardController.js';
import { authorizeRoles } from '../auth/authorizeRoles.js';

const router = express.Router();

// Obtener estadísticas generales del dashboard
router.get('/stats', authorizeRoles(['admin', 'director', 'teacher']), getDashboardStats);

// Obtener estadísticas de asistencia del día
router.get('/attendance/today', authorizeRoles(['admin', 'director', 'teacher']), getDashboardStats);

export default router; 