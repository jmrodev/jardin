import { getConnection } from '../config/database.js';
import Contact from '../models/Contact.js';

const getContacts = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM contacts');
    return rows.map(row => new Contact(row.id, row.name, row.email, row.message, row.date));
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const createContact = async (contactData) => {
  let connection;
  try {
    connection = await getConnection();
    const { name, email, message } = contactData;
    const [result] = await connection.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    return { id: result.insertId, ...contactData };
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export default {
  getContacts,
  createContact
};
