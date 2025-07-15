import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

export const connectDatabase = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    await pool.getConnection();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

export const getConnection = () => {
  if (!pool) {
    throw new Error('Database not connected');
  }
  return pool;
}; 