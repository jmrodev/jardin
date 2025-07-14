import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { configurarRutas } from './config/rutas.js';
import { conectarBaseDatos } from './config/database.js';
import { configurarMiddleware } from './config/middleware.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware básico
configurarMiddleware(app);

// Configurar CORS
app.use(cors());

// Configurar rutas
configurarRutas(app);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Sistema de Gestión - Jardín de Infantes' });
});

// Iniciar servidor
const iniciarServidor = async () => {
  try {
    await conectarBaseDatos();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor(); 