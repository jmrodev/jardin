import { obtenerConexion } from '../config/database.js';

export const actualizarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento, sala, dni } = req.body;
    const pool = obtenerConexion();
    
    const [resultado] = await pool.execute(
      'UPDATE alumnos SET nombre = ?, apellido = ?, fecha_nacimiento = ?, sala = ?, dni = ? WHERE id = ?',
      [nombre, apellido, fecha_nacimiento, sala, dni, id]
    );
    
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json({ mensaje: 'Alumno actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 