import express from 'express';
import { authRoutes } from '../routers/authRouter.js';
import personRoutes from '../routers/personRouter.js';
import { studentRoutes } from '../routers/studentRouter.js';
import { teacherRoutes } from '../routers/teacherRouter.js';
import { parentRoutes } from '../routers/parentRouter.js';
import { directorRoutes } from '../routers/directorRouter.js';
import { attendanceRoutes } from '../routers/attendanceRouter.js';
import { contactRoutes } from '../routers/contactRouter.js';
import auditRoutes from '../routers/auditRouter.js';
import classroomRoutes from '../routers/classroomRouter.js';
import dashboardRoutes from '../routers/dashboardRouter.js';
import { statisticsRoutes } from '../statistics/routes.js';

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
router.use('/dashboard', dashboardRoutes);
router.use('/statistics', statisticsRoutes);

export default router; 