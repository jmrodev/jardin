import { obtenerConexion } from '../config/database.js';

export const registrarAsistencia = async (req, res) => {
  try {
    const { alumno_id, fecha, presente, observaciones } = req.body;
    const pool = obtenerConexion();
    
    // Verificar si ya existe registro para esa fecha y alumno
    const [existentes] = await pool.execute(
      'SELECT id FROM asistencia WHERE alumno_id = ? AND fecha = ?',
      [alumno_id, fecha]
    );
    
    if (existentes.length > 0) {
      // Actualizar registro existente
      await pool.execute(
        'UPDATE asistencia SET presente = ?, observaciones = ? WHERE alumno_id = ? AND fecha = ?',
        [presente, observaciones, alumno_id, fecha]
      );
    } else {
      // Crear nuevo registro
      await pool.execute(
        'INSERT INTO asistencia (alumno_id, fecha, presente, observaciones) VALUES (?, ?, ?, ?)',
        [alumno_id, fecha, presente, observaciones]
      );
    }
    
    res.json({ mensaje: 'Asistencia registrada exitosamente' });
  } catch (error) {
    console.error('Error registrando asistencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 