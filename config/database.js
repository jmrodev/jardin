import mysql from 'mysql2/promise';

const configuracionDB = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'jmro',
  password: process.env.DB_PASSWORD || 'jmro1975',
  database: process.env.DB_NAME || 'jardin_infantes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

export const conectarBaseDatos = async () => {
  try {
    pool = mysql.createPool(configuracionDB);
    await pool.getConnection();
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    throw error;
  }
};

export const obtenerConexion = () => {
  if (!pool) {
    throw new Error('Base de datos no conectada');
  }
  return pool;
}; 