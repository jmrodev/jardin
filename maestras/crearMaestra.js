import { obtenerConexion } from '../config/database.js';
import { encriptarPassword } from '../auth/encriptarPassword.js';

export const crearMaestra = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, sala_asignada } = req.body;
    const pool = obtenerConexion();
    
    // Encriptar contraseña
    const passwordEncriptado = await encriptarPassword(password);
    
    const [resultado] = await pool.execute(
      'INSERT INTO personal (nombre, apellido, email, password, rol, telefono) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, passwordEncriptado, 'maestra', telefono]
    );
    
    res.status(201).json({
      id: resultado.insertId,
      mensaje: 'Maestra creada exitosamente'
    });
  } catch (error) {
    console.error('Error creando maestra:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 