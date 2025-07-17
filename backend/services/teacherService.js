import { getConnection } from '../config/database.js';
import Teacher from '../models/Teacher.js';

const getTeachers = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM teachers');
  return rows.map(row => new Teacher(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.hire_date, row.specialization));
};

const getTeacher = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM teachers WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Teacher not found');
  }
  const row = rows[0];
  return new Teacher(row.id, row.name, row.lastname, row.birthdate, row.dni, row.address, row.phone, row.email, row.hire_date, row.specialization);
};

const createTeacher = async (teacherData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, hire_date, specialization } = teacherData;
  const [result] = await connection.query(
    'INSERT INTO teachers (name, lastname, birthdate, dni, address, phone, email, hire_date, specialization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, lastname, birthdate, dni, address, phone, email, hire_date, specialization]
  );
  return { id: result.insertId, ...teacherData };
};

const updateTeacher = async (id, teacherData) => {
  const connection = getConnection();
  const { name, lastname, birthdate, dni, address, phone, email, hire_date, specialization } = teacherData;
  await connection.query(
    'UPDATE teachers SET name = ?, lastname = ?, birthdate = ?, dni = ?, address = ?, phone = ?, email = ?, hire_date = ?, specialization = ? WHERE id = ?',
    [name, lastname, birthdate, dni, address, phone, email, hire_date, specialization, id]
  );
  return { id, ...teacherData };
};

const deleteTeacher = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM teachers WHERE id = ?', [id]);
  return { id };
};

export default {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
