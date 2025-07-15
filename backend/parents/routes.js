import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireDirector, requireTeacher } from '../auth/authorizeRoles.js';
import { createParent } from './createParent.js';
import { getParents } from './getParents.js';
import { getParent } from './getParent.js';
import { updateParent } from './updateParent.js';
import { deleteParent } from './deleteParent.js';

const router = express.Router();

router.use(validateToken);

// Parent management with role-based access
router.post('/', requireDirector, createParent);            // Admin, Director
router.get('/', requireTeacher, getParents);                // Admin, Director, Teacher
router.get('/:id', requireTeacher, getParent);              // Admin, Director, Teacher
router.put('/:id', requireDirector, updateParent);          // Admin, Director
router.delete('/:id', requireDirector, deleteParent);       // Admin, Director

export const parentRoutes = router; 