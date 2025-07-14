import express from 'express';
import { validarToken } from '../auth/validarToken.js';

const router = express.Router();

router.use(validarToken);

// Rutas básicas para directivos (implementar funciones específicas después)
router.get('/', (req, res) => {
  res.json({ mensaje: 'Gestión de directivos' });
});

export const rutasDirectivos = router; 