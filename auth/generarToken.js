import jwt from 'jsonwebtoken';

export const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '8h' }
  );
}; 