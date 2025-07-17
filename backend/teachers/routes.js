import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector } from '../auth/authorizeRoles.js';
import teacherController from '../controllers/teacherController.js';

const router = express.Router();

router.use(validateToken);

// Teacher management with role-based access
router.post('/', requireAdmin, teacherController.createTeacher);              // Admin only
router.get('/', requireDirector, teacherController.getTeachers);              // Admin, Director
router.get('/:id', requireDirector, teacherController.getTeacher);            // Admin, Director
router.put('/:id', requireAdmin, teacherController.updateTeacher);            // Admin only
router.delete('/:id', requireAdmin, teacherController.deleteTeacher);         // Admin only

export const teacherRoutes = router; 