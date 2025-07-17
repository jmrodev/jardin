import { getConnection } from '../config/database.js';
import Person from '../models/Person.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Parent from '../models/Parent.js';
import Director from '../models/Director.js';

const personFactory = (row) => {
  switch (row.person_type) {
    case 'student':
      return new Student(row.id, row.name, row.lastname, row.dni, row.address, row.phone, row.email, row.birthdate, row.registration_date, row.status);
    case 'teacher':
      return new Teacher(row.id, row.name, row.lastname, row.dni, row.address, row.phone, row.email, row.birthdate, row.hire_date, row.specialization);
    case 'parent':
      return new Parent(row.id, row.name, row.lastname, row.dni, row.address, row.phone, row.email, row.birthdate, row.occupation);
    case 'director':
      return new Director(row.id, row.name, row.lastname, row.dni, row.address, row.phone, row.email, row.birthdate, row.hire_date, row.administrative_role);
    default:
      return new Person(row.id, row.person_type, row.name, row.lastname, row.dni, row.address, row.phone, row.email, row.birthdate);
  }
};

const getPersons = async (personType) => {
  const connection = getConnection();
  let query = 'SELECT * FROM persons';
  const params = [];
  if (personType) {
    query += ' WHERE person_type = ?';
    params.push(personType);
  }
  const [rows] = await connection.query(query, params);
  return rows.map(personFactory);
};

const getPerson = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM persons WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Person not found');
  }
  return personFactory(rows[0]);
};

const createPerson = async (personData) => {
  const connection = getConnection();
  const { person_type, name, lastname, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password } = personData;
  const [result] = await connection.query(
    'INSERT INTO persons (person_type, name, lastname, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [person_type, name, lastname, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password]
  );
  return { id: result.insertId, ...personData };
};

const updatePerson = async (id, personData) => {
  const connection = getConnection();
  const { name, lastname, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password } = personData;
  await connection.query(
    'UPDATE persons SET name = ?, lastname = ?, dni = ?, address = ?, phone = ?, email = ?, birthdate = ?, registration_date = ?, status = ?, hire_date = ?, specialization = ?, occupation = ?, administrative_role = ?, username = ?, password = ? WHERE id = ?',
    [name, lastname, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, id]
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
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};
