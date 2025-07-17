import { getConnection } from '../config/database.js';
import Contact from '../models/Contact.js';

const getContacts = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT * FROM contacts');
  return rows.map(row => new Contact(row.id, row.name, row.email, row.message, row.date));
};

const createContact = async (contactData) => {
  const connection = getConnection();
  const { name, email, message } = contactData;
  const [result] = await connection.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );
  return { id: result.insertId, ...contactData };
};

export default {
  getContacts,
  createContact
};
