import { getConnection } from '../config/database.js';
import { validatePersonData } from './validatePersonData.js';

export const createPerson = async (req, res) => {
  const validation = validatePersonData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
  try {
    const { name, lastname, dni, address, phone, email, relationship } = req.body;
    const pool = getConnection();
    const [result] = await pool.execute(
      'INSERT INTO persons (name, lastname, dni, address, phone, email, relationship) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, lastname, dni, address, phone, email, relationship]
    );
    res.status(201).json({ id: result.insertId, message: 'Persona creada exitosamente' });
  } catch (error) {
    console.error('Error al crear persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 