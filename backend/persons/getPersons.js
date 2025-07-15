import { getConnection } from '../config/database.js';

export const getPersons = async (req, res) => {
  try {
    const pool = getConnection();
    const [rows] = await pool.execute('SELECT * FROM persons');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener personas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 