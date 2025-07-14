import express from 'express';
import { validarToken } from '../auth/validarToken.js';

const router = express.Router();

router.use(validarToken);

// Rutas básicas para padres (implementar funciones específicas después)
router.get('/', (req, res) => {
  res.json({ mensaje: 'Gestión de padres' });
});

export const rutasPadres = router; 