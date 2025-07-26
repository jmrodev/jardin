import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(validateToken);

// CRUD operations with role-based access
router.post('/', requireDirector, asyncHandler(personController.createPersonByType('student')));
router.get('/', requireTeacher, asyncHandler(personController.getPersonsByType('student')));
router.get('/:id', requireTeacher, asyncHandler(personController.getPerson));
router.get('/:studentId/parents', requireTeacher, asyncHandler(personController.getParentsByStudentId));

// Vincular un nuevo padre a un estudiante
router.post('/:studentId/parents', requireDirector, asyncHandler(personController.createAndLinkParent));

router.put('/:id', requireDirector, asyncHandler(personController.updatePerson));
router.delete('/:id', requireAdmin, asyncHandler(personController.deletePerson));

export const studentRoutes = router; 