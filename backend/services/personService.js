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
  // Mapeo de campos de DB a constructor
  const args = [
    row.id, 
    row.first_name, 
    row.middle_name, 
    row.paternal_lastname, 
    row.maternal_lastname, 
    row.preferred_name, 
    row.nationality,
    row.dni, 
    row.address, 
    row.phone, 
    row.email, 
    row.birthdate
  ];

  switch (row.person_type) {
    case 'student':
      person = new Student(...args, row.registration_date, row.status, row.classroom_id, row.shift, row.gender);
      person.classroom_name = row.classroom_name; // Adjuntar nombre de la sala
      return person;
    case 'teacher':
      return new Teacher(...args, row.hire_date, row.specialization);
    case 'parent':
      return new Parent(...args, row.occupation);
    case 'director':
      return new Director(...args, row.hire_date, row.administrative_role);
    default:
      person = new Person(row.id, row.person_type, ...args.slice(1));
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
  if (filters.classroom_id) {
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
  if (filters.nationality) {
    query += ' AND p.nationality = ?';
    params.push(filters.nationality);
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
  const persons = rows.map(personFactory);

  // Si estamos pidiendo estudiantes, vamos a buscar y adjuntar a sus padres.
  if (personType === 'student' && persons.length > 0) {
    const studentIds = persons.map(p => p.id);
    const parentsQuery = `
      SELECT 
        p.*, 
        sp.student_id, 
        sp.relationship, 
        sp.can_pickup, 
        sp.is_emergency_contact, 
        sp.can_change_diapers
      FROM persons p
      JOIN student_parents sp ON p.id = sp.parent_id
      WHERE sp.student_id IN (?) AND p.person_type = 'parent'
    `;
    const [parentRows] = await connection.query(parentsQuery, [studentIds]);

    const parentsByStudentId = parentRows.reduce((acc, row) => {
      const parent = personFactory(row);
      parent.relationship = row.relationship;
      parent.can_pickup = row.can_pickup;
      parent.is_emergency_contact = row.is_emergency_contact;
      parent.can_change_diapers = row.can_change_diapers;
      
      if (!acc[row.student_id]) {
        acc[row.student_id] = [];
      }
      acc[row.student_id].push(parent);
      return acc;
    }, {});

    persons.forEach(student => {
      student.parents = parentsByStudentId[student.id] || [];
    });
  }

  return persons;
};

const getPerson = async (id) => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT p.*, c.name as classroom_name FROM persons p LEFT JOIN classrooms c ON p.classroom_id = c.id WHERE p.id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Person not found');
  }
  return personFactory(rows[0]);
};

const createPerson = async (personData) => {
  const connection = getConnection();
  const { person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender } = personData;
  
  const [result] = await connection.query(
    'INSERT INTO persons (person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender]
  );
  return { id: result.insertId, ...personData };
};

const updatePerson = async (id, personData) => {
  const connection = getConnection();
  const { first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender } = personData;
  
  await connection.query(
    'UPDATE persons SET first_name = ?, middle_name = ?, paternal_lastname = ?, maternal_lastname = ?, preferred_name = ?, nationality = ?, dni = ?, address = ?, phone = ?, email = ?, birthdate = ?, registration_date = ?, status = ?, hire_date = ?, specialization = ?, occupation = ?, administrative_role = ?, username = ?, password = ?, classroom_id = ?, shift = ?, gender = ? WHERE id = ?',
    [first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, hire_date, specialization, occupation, administrative_role, username, password, classroom_id, shift, gender, id]
  );
  return { id, ...personData };
};

const deletePerson = async (id) => {
  const connection = getConnection();
  await connection.query('DELETE FROM persons WHERE id = ?', [id]);
  return { id };
};

const getParentsByStudentId = async (studentId) => {
  const connection = getConnection();
  const query = `
    SELECT p.*, sp.relationship, sp.can_pickup, sp.is_emergency_contact, sp.can_change_diapers
    FROM persons p
    JOIN student_parents sp ON p.id = sp.parent_id
    WHERE sp.student_id = ? AND p.person_type = 'parent'
  `;
  
  const [rows] = await connection.query(query, [studentId]);

  // Modificamos el factory temporalmente aquí para añadir los campos de la relación
  const parentsWithRelationship = rows.map(row => {
    const parent = personFactory(row);
    parent.relationship = row.relationship;
    parent.can_pickup = row.can_pickup;
    parent.is_emergency_contact = row.is_emergency_contact;
    parent.can_change_diapers = row.can_change_diapers;
    return parent;
  });

  return parentsWithRelationship;
};

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getParentsByStudentId
};
