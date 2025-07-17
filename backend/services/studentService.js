import { getConnection } from '../config/database.js';
import Student from '../models/Student.js';

const getStudents = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM students');
  return rows.map(row => new Student(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.registration_date, row.status));
};

const getStudent = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM students WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Student not found');
  }
  const row = rows[0];
  return new Student(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.registration_date, row.status);
};

const createStudent = async (studentData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, registration_date, status } = studentData;
  const [result] = await connection.query(
    'INSERT INTO students (name, lastname, birthdate, dni, address, phone, email, registration_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, lastname, birthdate, dni, address, phone, email, registration_date, status]
  );
  return { id: result.insertId, ...studentData };
};

const updateStudent = async (id, studentData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, registration_date, status } = studentData;
  await connection.query(
    'UPDATE students SET name = ?, lastname = ?, birthdate = ?, dni = ?, address = ?, phone = ?, email = ?, registration_date = ?, status = ? WHERE id = ?',
    [name, lastname, birthdate, dni, address, phone, email, registration_date, status, id]
  );
  return { id, ...studentData };
};

const deleteStudent = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM students WHERE id = ?', [id]);
  return { id };
};

export default {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
