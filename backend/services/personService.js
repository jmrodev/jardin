import { getConnection } from '../config/database.js';
import Person from '../models/Person.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Parent from '../models/Parent.js';
import Director from '../models/Director.js';

const getAge = (birthdate) => {
  if (!birthdate) return null;
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const personFactory = (row) => {
  let person;
  switch (row.person_type) {
    case 'student':
      person = new Student(row.id, row.name, row.lastname_father, row.lastname_mother, row.dni, row.address, row.phone, row.email, row.birthdate, row.registration_date, row.status, row.classroom_id, row.shift, row.gender);
      // Adjuntar el nombre de la sala obtenido del JOIN
      person.classroom_name = row.classroom_name;
      return person;
    case 'teacher':
      return new Teacher(row.id, row.name, row.lastname_father, row.lastname_mother, row.dni, row.address, row.phone, row.email, row.birthdate, row.hire_date, row.specialization);
    case 'parent':
      return new Parent(row.id, row.name, row.lastname_father, row.lastname_mother, row.dni, row.address, row.phone, row.email, row.birthdate, row.occupation);
    case 'director':
      return new Director(row.id, row.name, row.lastname_father, row.lastname_mother, row.dni, row.address, row.phone, row.email, row.birthdate, row.hire_date, row.administrative_role);
    default:
      person = new Person(row.id, row.person_type, row.name, row.lastname_father, row.lastname_mother, row.dni, row.address, row.phone, row.email, row.birthdate);
      // Adjuntar el nombre de la sala si existe, para ser consistentes
      if (row.classroom_name) {
        person.classroom_name = row.classroom_name;
      }
      return person;
  }
};

const getPersons = async (personType, filters = {}) => {
  const connection = getConnection();
  let query = 'SELECT p.*, c.name as classroom_name FROM persons p LEFT JOIN classrooms c ON p.classroom_id = c.id WHERE 1=1';
  const params = [];

  if (personType) {
    query += ' AND p.person_type = ?';
    params.push(personType);
  }

  // Apply filters
  if (filters.classroom_id) { // Corregido de 'classroom' a 'classroom_id'
    query += ' AND p.classroom_id = ?';
    params.push(filters.classroom_id);
  }
  if (filters.shift) {
    query += ' AND p.shift = ?';
    params.push(filters.shift);
  }
  if (filters.gender) {
    query += ' AND p.gender = ?';
    params.push(filters.gender);
  }

  if (filters.age) {
    const age = parseInt(filters.age, 10);
    if (!isNaN(age)) {
      const today = new Date();
      
      // La fecha más tardía para tener la edad 'age' es hoy mismo, hace 'age' años.
      const latestBirthDate = new Date(
        today.getFullYear() - age,
        today.getMonth(),
        today.getDate()
      );
      
      // La fecha más temprana es justo un año antes de la más tardía.
      const earliestBirthDate = new Date(
        today.getFullYear() - age - 1,
        today.getMonth(),
        today.getDate() + 1
      );

      query += ' AND p.birthdate BETWEEN ? AND ?';
      params.push(
        earliestBirthDate.toISOString().split('T')[0], 
        latestBirthDate.toISOString().split('T')[0]
      );
    }
  }

  const [rows] = await connection.query(query, params);
  const result = rows.map(personFactory)
  return result;
};

const getPerson = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT p.*, c.name as classroom_name FROM persons p LEFT JOIN classrooms c ON p.classroom_id = c.id WHERE p.id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Person not found');
  }
  // La corrección en personFactory soluciona esto para getPerson también
  return personFactory(rows[0]);
};

const createPerson = async (personData) => {
  const connection = getConnection();
  const { person_type, name, lastname_father, lastname_mother, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender } = personData;
  const [result] = await connection.query(
    'INSERT INTO persons (person_type, name, lastname_father, lastname_mother, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [person_type, name, lastname_father, lastname_mother, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender]
  );
  return { id: result.insertId, ...personData };
};

const updatePerson = async (id, personData) => {
  const connection = getConnection();
  const { name, lastname_father, lastname_mother, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender } = personData;
  await connection.query(
    'UPDATE persons SET name = ?, lastname_father = ?, lastname_mother = ?, dni = ?, address = ?, phone = ?, email = ?, birthdate = ?, registration_date = ?, status = ?, hire_date = ?, specialization = ?, occupation = ?, administrative_role = ?, username = ?, password = ?, classroom_id = ?, shift = ?, gender = ? WHERE id = ?',
    [name, lastname_father, lastname_mother, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender, id]
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
