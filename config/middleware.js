import express from 'express';

export const configurarMiddleware = (app) => {
  // Middleware para parsear JSON
  app.use(express.json());
  
  // Middleware para parsear datos de formularios
  app.use(express.urlencoded({ extended: true }));
  
  // Middleware para logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}; 