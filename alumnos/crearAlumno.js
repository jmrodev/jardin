import { obtenerConexion } from '../config/database.js';

export const crearAlumno = async (req, res) => {
  try {
    const { nombre, apellido, fecha_nacimiento, sala, dni } = req.body;
    const pool = obtenerConexion();
    
    const [resultado] = await pool.execute(
      'INSERT INTO alumnos (nombre, apellido, fecha_nacimiento, sala, dni) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, fecha_nacimiento, sala, dni]
    );
    
    res.status(201).json({
      id: resultado.insertId,
      mensaje: 'Alumno creado exitosamente'
    });
  } catch (error) {
    console.error('Error creando alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 