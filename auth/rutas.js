import express from 'express';
import { login } from './login.js';
import { validarToken } from './validarToken.js';

const router = express.Router();

router.post('/login', login);
router.get('/verificar', validarToken, (req, res) => {
  res.json({ valido: true, usuario: req.usuario });
});

export const rutasAutenticacion = router; 