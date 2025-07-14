import { obtenerConexion } from '../config/database.js';
import { verificarPassword } from './verificarPassword.js';
import { generarToken } from './generarToken.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = obtenerConexion();
    
    const [usuarios] = await pool.execute(
      'SELECT * FROM personal WHERE email = ?',
      [email]
    );
    
    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const usuario = usuarios[0];
    const passwordValido = await verificarPassword(password, usuario.password);
    
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = generarToken(usuario);
    
    res.json({
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 