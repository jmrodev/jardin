import { getConnection } from '../config/database.js';
import { validatePersonData } from './validatePersonData.js';

export const updatePerson = async (req, res) => {
  const validation = validatePersonData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
  try {
    const { id } = req.params;
    const { name, lastname, dni, address, phone, email, relationship } = req.body;
    const pool = getConnection();
    await pool.execute(
      'UPDATE persons SET name = ?, lastname = ?, dni = ?, address = ?, phone = ?, email = ?, relationship = ? WHERE id = ?',
      [name, lastname, dni, address, phone, email, relationship, id]
    );
    res.json({ message: 'Persona actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 