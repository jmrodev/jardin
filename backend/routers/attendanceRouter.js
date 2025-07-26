import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireTeacher } from '../auth/authorizeRoles.js';
import attendanceController from '../controllers/attendanceController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(validateToken);

// Attendance operations with role-based access
router.post('/', requireTeacher, asyncHandler(attendanceController.registerAttendance));       // Admin, Director, Teacher
router.get('/', requireTeacher, asyncHandler(attendanceController.getAttendance));             // Admin, Director, Teacher

export const attendanceRoutes = router; 