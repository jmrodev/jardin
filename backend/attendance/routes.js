import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireTeacher, requireDirector } from '../auth/authorizeRoles.js';
import { registerAttendance } from './registerAttendance.js';
import { getAttendance } from './getAttendance.js';

const router = express.Router();

router.use(validateToken);

// Attendance operations with role-based access
router.post('/', requireTeacher, registerAttendance);       // Admin, Director, Teacher
router.get('/', requireTeacher, getAttendance);             // Admin, Director, Teacher

export const attendanceRoutes = router; 