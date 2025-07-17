import express from 'express';
import classroomController from '../controllers/classroomController.js';
import { validateToken } from '../auth/validateToken.js';
import { authorizeRoles } from '../auth/authorizeRoles.js';

const router = express.Router();

// Proteger todas las rutas de classrooms
router.use(validateToken);

// Obtener todas las salas
router.get('/', authorizeRoles('admin', 'director', 'teacher', 'preceptor'), classroomController.getClassrooms);

export default router; 