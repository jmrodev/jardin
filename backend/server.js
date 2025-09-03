import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { configureRoutes } from './config/routes.js';
import { connectDatabase } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';

const app = express();
const PORT = process.env.PORT;

// Configure basic middleware
configureMiddleware(app);

// Configure CORS
app.use(cors());

// Configure routes
configureRoutes(app);

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