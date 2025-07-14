import express from 'express';
import { validarToken } from '../auth/validarToken.js';
import { registrarAsistencia } from './registrarAsistencia.js';
import { obtenerAsistencia } from './obtenerAsistencia.js';

const router = express.Router();

router.use(validarToken);

router.post('/', registrarAsistencia);
router.get('/', obtenerAsistencia);

export const rutasAsistencia = router; 