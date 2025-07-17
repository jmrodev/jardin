import { getConnection } from '../config/database.js';
import Parent from '../models/Parent.js';

const getParents = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM parents');
  return rows.map(row => new Parent(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.occupation));
};

const getParent = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM parents WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Parent not found');
  }
  const row = rows[0];
  return new Parent(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.occupation);
};

const createParent = async (parentData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, occupation } = parentData;
  const [result] = await connection.query(
    'INSERT INTO parents (name, lastname, birthdate, dni, address, phone, email, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, lastname, birthdate, dni, address, phone, email, occupation]
  );
  return { id: result.insertId, ...parentData };
};

const updateParent = async (id, parentData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, occupation } = parentData;
  await connection.query(
    'UPDATE parents SET name = ?, lastname = ?, birthdate = ?, dni = ?, address = ?, phone = ?, email = ?, occupation = ? WHERE id = ?',
    [name, lastname, birthdate, dni, address, phone, email, occupation, id]
  );
  return { id, ...parentData };
};

const deleteParent = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM parents WHERE id = ?', [id]);
  return { id };
};

export default {
  getParents,
  getParent,
  createParent,
  updateParent,
  deleteParent
};
