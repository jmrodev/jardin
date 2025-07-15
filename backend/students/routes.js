import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import { createStudent } from './createStudent.js';
import { getStudents } from './getStudents.js';
import { getStudent } from './getStudent.js';
import { updateStudent } from './updateStudent.js';
import { deleteStudent } from './deleteStudent.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(validateToken);

// CRUD operations with role-based access
router.post('/', requireDirector, createStudent);           // Admin, Director
router.get('/', requireTeacher, getStudents);               // Admin, Director, Teacher
router.get('/:id', requireTeacher, getStudent);             // Admin, Director, Teacher
router.put('/:id', requireDirector, updateStudent);         // Admin, Director
router.delete('/:id', requireAdmin, deleteStudent);         // Admin only

export const studentRoutes = router; 