import bcrypt from 'bcryptjs';

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}; 