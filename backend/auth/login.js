import { getConnection } from '../config/database.js';
import { verifyPassword } from './verifyPassword.js';
import { generateToken } from './generateToken.js';

export const login = async (req, res) => {
  let connection;
  try {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`); // Log de depuración

    connection = await getConnection();
    
    const [users] = await connection.execute(
      'SELECT * FROM persons WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      console.log(`Login failed: User not found for username: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await verifyPassword(password, user.password);
    
    if (!validPassword) {
      console.log(`Login failed: Invalid password for username: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    console.log(`Login successful for username: ${username}`);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.person_type,
        // Cuidado: 'name' no existe en la tabla 'persons', usar 'first_name'
        name: user.first_name 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
      console.log('Database connection released.');
    }
  }
}; 