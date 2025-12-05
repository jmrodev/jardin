import { getConnection } from '../config/database.js';
import bcrypt from 'bcryptjs';

export const resetAdmin = async (req, res) => {
  if (process.env.ENABLE_ADMIN_RESET !== 'true') {
    return res.status(403).json({ error: 'Admin reset is disabled' });
  }

  try {
    const pool = getConnection();
    const defaultPassword = 'Admin1234';
    const saltRounds = 10;

    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

    // Update the admin user
    // We assume the admin username is 'admin' based on the schema and previous tasks
    const [result] = await pool.execute(
      'UPDATE staff SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    console.log('Admin password reset to default');

    res.json({
      success: true,
      message: 'Admin password reset successfully to: Admin1234'
    });
  } catch (error) {
    console.error('Reset admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
