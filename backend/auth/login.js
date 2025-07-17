import { getConnection } from '../config/database.js';
import { verifyPassword } from './verifyPassword.js';
import { generateToken } from './generateToken.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = getConnection();
    
    const [users] = await pool.execute(
      'SELECT * FROM persons WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await verifyPassword(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.person_type,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 