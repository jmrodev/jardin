import express from 'express';
import { validarToken } from '../auth/validarToken.js';
import { crearAlumno } from './crearAlumno.js';
import { obtenerAlumnos } from './obtenerAlumnos.js';
import { obtenerAlumno } from './obtenerAlumno.js';
import { actualizarAlumno } from './actualizarAlumno.js';
import { eliminarAlumno } from './eliminarAlumno.js';

const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(validarToken);

router.post('/', crearAlumno);
router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumno);
router.put('/:id', actualizarAlumno);
router.delete('/:id', eliminarAlumno);

export const rutasAlumnos = router; 