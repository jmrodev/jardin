import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';

const router = express.Router();

router.use(validateToken);

// Director management with role-based access
router.get('/', requireAdmin, personController.getPersons('director'));
router.get('/:id', requireAdmin, personController.getPerson);
router.post('/', requireAdmin, personController.createPerson('director'));
router.put('/:id', requireAdmin, personController.updatePerson);
router.delete('/:id', requireAdmin, personController.deletePerson);


export const directorRoutes = router; 