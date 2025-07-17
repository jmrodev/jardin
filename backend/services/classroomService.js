import { getConnection } from '../config/database.js';

const getClassrooms = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query('SELECT id, name, description, min_age_suggested, max_age_suggested FROM classrooms');
    return rows;
  } catch (error) {
    console.error('Error getting classrooms:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export default {
  getClassrooms,
}; 