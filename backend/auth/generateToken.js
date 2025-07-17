import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role: user.person_type 
    },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '8h' }
  );
}; 