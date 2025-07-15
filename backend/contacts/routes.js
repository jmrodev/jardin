import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireTeacher } from '../auth/authorizeRoles.js';

const router = express.Router();

router.use(validateToken);

// Alternative contacts with role-based access
router.get('/', requireTeacher, (req, res) => {             // Admin, Director, Teacher
  res.json({ message: 'Alternative contacts management' });
});

export const contactRoutes = router; 