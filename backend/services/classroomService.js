import { getConnection } from '../config/database.js';

const getClassrooms = async () => {
  const connection = getConnection();
  const [rows] = await connection.query('SELECT id, name, description, min_age_suggested, max_age_suggested FROM classrooms');
  return rows;
};

export default {
  getClassrooms,
}; 