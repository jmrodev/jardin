import { obtenerConexion } from '../config/database.js';

export const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = obtenerConexion();
    
    const [resultado] = await pool.execute(
      'DELETE FROM alumnos WHERE id = ?',
      [id]
    );
    
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json({ mensaje: 'Alumno eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 