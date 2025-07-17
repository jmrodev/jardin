import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import personController from '../controllers/personController.js';

const router = express.Router();

router.use(validateToken);

// Parent management with role-based access
router.post('/', requireDirector, personController.createPerson('parent'));
router.get('/', requireTeacher, personController.getPersons('parent'));
router.get('/:id', requireTeacher, personController.getPerson);
router.put('/:id', requireDirector, personController.updatePerson);
router.delete('/:id', requireDirector, personController.deletePerson);

export const parentRoutes = router; 