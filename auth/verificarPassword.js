import bcrypt from 'bcryptjs';

export const verificarPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}; 