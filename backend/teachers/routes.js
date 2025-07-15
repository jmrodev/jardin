import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector } from '../auth/authorizeRoles.js';
import { createTeacher } from './createTeacher.js';
import { getTeachers } from './getTeachers.js';
import { getTeacher } from './getTeacher.js';
import { updateTeacher } from './updateTeacher.js';
import { deleteTeacher } from './deleteTeacher.js';

const router = express.Router();

router.use(validateToken);

// Teacher management with role-based access
router.post('/', requireAdmin, createTeacher);              // Admin only
router.get('/', requireDirector, getTeachers);              // Admin, Director
router.get('/:id', requireDirector, getTeacher);            // Admin, Director
router.put('/:id', requireAdmin, updateTeacher);            // Admin only
router.delete('/:id', requireAdmin, deleteTeacher);         // Admin only

export const teacherRoutes = router; 