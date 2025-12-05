import express from 'express';
import { login } from './login.js';
import { resetAdmin } from './resetAdmin.js';
import { validateToken } from './validateToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/reset-admin', resetAdmin);
router.get('/verify', validateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export const authRoutes = router; 