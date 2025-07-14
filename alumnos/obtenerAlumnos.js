import { obtenerConexion } from '../config/database.js';

export const obtenerAlumnos = async (req, res) => {
  try {
    const pool = obtenerConexion();
    const [alumnos] = await pool.execute('SELECT * FROM alumnos ORDER BY apellido, nombre');
    
    res.json(alumnos);
  } catch (error) {
    console.error('Error obteniendo alumnos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 