import { getConnection } from '../config/database.js';
import Person from '../models/Person.js';

const getPersons = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM persons');
  return rows.map(row => new Person(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email));
};

const createPerson = async (personData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email } = personData;
  const [result] = await connection.query(
    'INSERT INTO persons (name, lastname, birthdate, dni, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, lastname, birthdate, dni, address, phone, email]
  );
  return { id: result.insertId, ...personData };
};

const updatePerson = async (id, personData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email } = personData;
  await connection.query(
    'UPDATE persons SET name = ?, lastname = ?, birthdate = ?, dni = ?, address = ?, phone = ?, email = ? WHERE id = ?',
    [name, lastname, birthdate, dni, address, phone, email, id]
  );
  return { id, ...personData };
};

const deletePerson = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM persons WHERE id = ?', [id]);
  return { id };
};

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson
};
