import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin } from '../auth/authorizeRoles.js';
import directorController from '../controllers/directorController.js';

const router = express.Router();

router.use(validateToken);

// Director management with role-based access
router.get('/', requireAdmin, directorController.getDirectors);
router.get('/:id', requireAdmin, directorController.getDirector);
router.post('/', requireAdmin, directorController.createDirector);
router.put('/:id', requireAdmin, directorController.updateDirector);
router.delete('/:id', requireAdmin, directorController.deleteDirector);


export const directorRoutes = router; 