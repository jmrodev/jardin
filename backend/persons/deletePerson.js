import { getConnection } from '../config/database.js';

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getConnection();
    await pool.execute('DELETE FROM persons WHERE id = ?', [id]);
    res.json({ message: 'Persona eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 