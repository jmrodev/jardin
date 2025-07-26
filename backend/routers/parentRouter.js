import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(validateToken);

// Parent management with role-based access
router.post('/', requireDirector, asyncHandler(personController.createPersonByType('parent')));
router.get('/', requireTeacher, asyncHandler(personController.getPersonsByType('parent')));
router.get('/:id', requireTeacher, asyncHandler(personController.getPerson));
router.put('/:id', requireDirector, asyncHandler(personController.updatePerson));
router.delete('/:id', requireDirector, asyncHandler(personController.deletePerson));

export const parentRoutes = router; 