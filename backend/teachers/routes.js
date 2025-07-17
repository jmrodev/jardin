import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin, requireDirector } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';

const router = express.Router();

router.use(validateToken);

// Teacher management with role-based access
router.post('/', requireAdmin, personController.createPerson('teacher'));
router.get('/', requireDirector, personController.getPersons('teacher'));
router.get('/:id', requireDirector, personController.getPerson);
router.put('/:id', requireAdmin, personController.updatePerson);
router.delete('/:id', requireAdmin, personController.deletePerson);

export const teacherRoutes = router; 