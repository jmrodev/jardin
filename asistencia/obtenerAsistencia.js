import { obtenerConexion } from '../config/database.js';

export const obtenerAsistencia = async (req, res) => {
  try {
    const { fecha, sala, alumno_id } = req.query;
    const pool = obtenerConexion();
    
    let query = `
      SELECT a.*, al.nombre, al.apellido, al.sala 
      FROM asistencia a 
      JOIN alumnos al ON a.alumno_id = al.id 
      WHERE 1=1
    `;
    const params = [];
    
    if (fecha) {
      query += ' AND a.fecha = ?';
      params.push(fecha);
    }
    
    if (sala) {
      query += ' AND al.sala = ?';
      params.push(sala);
    }
    
    if (alumno_id) {
      query += ' AND a.alumno_id = ?';
      params.push(alumno_id);
    }
    
    query += ' ORDER BY al.apellido, al.nombre, a.fecha DESC';
    
    const [asistencia] = await pool.execute(query, params);
    res.json(asistencia);
  } catch (error) {
    console.error('Error obteniendo asistencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 