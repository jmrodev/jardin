import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(validateToken);

// CRUD operations with role-based access
router.post('/', requireDirector, personController.createPerson('student'));
router.get('/', requireTeacher, personController.getPersons('student'));
router.get('/:id', requireTeacher, personController.getPerson);
router.get('/:studentId/parents', requireTeacher, personController.getParentsByStudentId);
router.put('/:id', requireDirector, personController.updatePerson);
router.delete('/:id', requireAdmin, personController.deletePerson);

export const studentRoutes = router; 