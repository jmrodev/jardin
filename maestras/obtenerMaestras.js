import { obtenerConexion } from '../config/database.js';

export const obtenerMaestras = async (req, res) => {
  try {
    const pool = obtenerConexion();
    const [maestras] = await pool.execute(
      'SELECT id, nombre, apellido, email, telefono, fecha_ingreso, activo FROM personal WHERE rol = ? ORDER BY apellido, nombre',
      ['maestra']
    );
    
    res.json(maestras);
  } catch (error) {
    console.error('Error obteniendo maestras:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 