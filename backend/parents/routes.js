import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import parentController from '../controllers/parentController.js';

const router = express.Router();

router.use(validateToken);

// Parent management with role-based access
router.post('/', requireDirector, parentController.createParent);            // Admin, Director
router.get('/', requireTeacher, parentController.getParents);                // Admin, Director, Teacher
router.get('/:id', requireTeacher, parentController.getParent);              // Admin, Director, Teacher
router.put('/:id', requireDirector, parentController.updateParent);          // Admin, Director
router.delete('/:id', requireDirector, parentController.deleteParent);       // Admin, Director

export const parentRoutes = router; 