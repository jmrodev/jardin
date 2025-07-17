import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireTeacher } from '../auth/authorizeRoles.js';
import attendanceController from '../controllers/attendanceController.js';

const router = express.Router();

router.use(validateToken);

// Attendance operations with role-based access
router.post('/', requireTeacher, attendanceController.registerAttendance);       // Admin, Director, Teacher
router.get('/', requireTeacher, attendanceController.getAttendance);             // Admin, Director, Teacher

export const attendanceRoutes = router; 