import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './config/routes.js'; // Importar el enrutador por defecto
import { connectDatabase } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Configure basic middleware (excluding body parsers now)
configureMiddleware(app);

// Configure CORS
app.use(cors());

// Configure routes
app.use('/api', apiRouter); // Usar el enrutador principal bajo /api

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Kindergarten Management System' });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 