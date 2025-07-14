import { obtenerConexion } from '../config/database.js';

export const obtenerAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = obtenerConexion();
    
    const [alumnos] = await pool.execute(
      'SELECT * FROM alumnos WHERE id = ?',
      [id]
    );
    
    if (alumnos.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json(alumnos[0]);
  } catch (error) {
    console.error('Error obteniendo alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 