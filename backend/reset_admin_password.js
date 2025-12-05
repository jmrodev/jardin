
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
    console.log('Usage: node reset_admin_password.js <new_password>');
    process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log(`\nNew password hash for '${password}':\n`);
  console.log(hash);
  console.log('\nTo update the admin password, run the following SQL query in your database:');
  console.log(`UPDATE staff SET password = '${hash}' WHERE username = 'admin';`);
});
