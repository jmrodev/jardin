import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(validateToken);

// Teacher management with role-based access
router.post('/', requireAdmin, asyncHandler(personController.createPersonByType('teacher')));
router.get('/', requireDirector, asyncHandler(personController.getPersonsByType('teacher')));
router.get('/:id', requireDirector, asyncHandler(personController.getPerson));
router.put('/:id', requireAdmin, asyncHandler(personController.updatePerson));
router.delete('/:id', requireAdmin, asyncHandler(personController.deletePerson));

export const teacherRoutes = router; 