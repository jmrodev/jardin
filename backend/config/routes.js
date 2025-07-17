import express from 'express';
import { authRoutes } from '../auth/routes.js';
import personRoutes from '../persons/routes.js';
import { studentRoutes } from '../students/routes.js';
import { teacherRoutes } from '../teachers/routes.js';
import { parentRoutes } from '../parents/routes.js';
import { directorRoutes } from '../directors/routes.js';
import { attendanceRoutes } from '../attendance/routes.js';
import { contactRoutes } from '../contacts/routes.js';
import auditRoutes from '../audit/routes.js';
import classroomRoutes from '../classrooms/routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/persons', personRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/parents', parentRoutes);
router.use('/directors', directorRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/contacts', contactRoutes);
router.use('/audit', auditRoutes);
router.use('/classrooms', classroomRoutes);

export default router; 