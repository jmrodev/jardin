import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import studentController from '../controllers/studentController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(validateToken);

// CRUD operations with role-based access
router.post('/', requireDirector, studentController.createStudent);           // Admin, Director
router.get('/', requireTeacher, studentController.getStudents);               // Admin, Director, Teacher
router.get('/:id', requireTeacher, studentController.getStudent);             // Admin, Director, Teacher
router.put('/:id', requireDirector, studentController.updateStudent);         // Admin, Director
router.delete('/:id', requireAdmin, studentController.deleteStudent);         // Admin only

export const studentRoutes = router; 