import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireAdmin } from '../auth/authorizeRoles.js';

const router = express.Router();

router.use(validateToken);

// Director management with role-based access
router.get('/', requireAdmin, (req, res) => {               // Admin only
  res.json({ message: 'Directors management' });
});

export const directorRoutes = router; 