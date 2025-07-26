import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(validateToken);

// Director management with role-based access
router.get('/', requireAdmin, asyncHandler(personController.getPersonsByType('director')));
router.get('/:id', requireAdmin, asyncHandler(personController.getPerson));
router.post('/', requireAdmin, asyncHandler(personController.createPersonByType('director')));
router.put('/:id', requireAdmin, asyncHandler(personController.updatePerson));
router.delete('/:id', requireAdmin, asyncHandler(personController.deletePerson));


export const directorRoutes = router; 