import express from 'express';
import { login } from './login.js';
import { validateToken } from './validateToken.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', validateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export const authRoutes = router; 