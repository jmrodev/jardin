import { rutasAutenticacion } from '../auth/rutas.js';
import { rutasAlumnos } from '../alumnos/rutas.js';
import { rutasMaestras } from '../maestras/rutas.js';
import { rutasPadres } from '../padres/rutas.js';
import { rutasDirectivos } from '../directivos/rutas.js';
import { rutasAsistencia } from '../asistencia/rutas.js';
import { rutasContactos } from '../contactos/rutas.js';

export const configurarRutas = (app) => {
  // Rutas de autenticación
  app.use('/api/auth', rutasAutenticacion);
  
  // Rutas de gestión
  app.use('/api/alumnos', rutasAlumnos);
  app.use('/api/maestras', rutasMaestras);
  app.use('/api/padres', rutasPadres);
  app.use('/api/directivos', rutasDirectivos);
  app.use('/api/asistencia', rutasAsistencia);
  app.use('/api/contactos', rutasContactos);
}; 