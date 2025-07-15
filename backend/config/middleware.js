import express from 'express';

export const configureMiddleware = (app) => {
  // Middleware to parse JSON
  app.use(express.json());
  
  // Middleware to parse form data
  app.use(express.urlencoded({ extended: true }));
  
  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}; 