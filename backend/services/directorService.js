import { getConnection } from '../config/database.js';
import Director from '../models/Director.js';

const getDirectors = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM directors');
  return rows.map(row => new Director(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.hire_date, row.administrative_role));
};

const getDirector = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM directors WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Director not found');
  }
  const row = rows[0];
  return new Director(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.hire_date, row.administrative_role);
};

const createDirector = async (directorData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, hire_date, administrative_role } = directorData;
  const [result] = await connection.query(
    'INSERT INTO directors (name, lastname, birthdate, dni, address, phone, email, hire_date, administrative_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, lastname, birthdate, dni, address, phone, email, hire_date, administrative_role]
  );
  return { id: result.insertId, ...directorData };
};

const updateDirector = async (id, directorData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, hire_date, administrative_role } = directorData;
  await connection.query(
    'UPDATE directors SET name = ?, lastname = ?, birthdate = ?, dni = ?, address = ?, phone = ?, email = ?, hire_date = ?, administrative_role = ? WHERE id = ?',
    [name, lastname, birthdate, dni, address, phone, email, hire_date, administrative_role, id]
  );
  return { id, ...directorData };
};

const deleteDirector = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM directors WHERE id = ?', [id]);
  return { id };
};

export default {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector
};
