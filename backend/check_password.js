
import bcrypt from 'bcryptjs';

const password = '!Admin1234';
const hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
    return;
  }
  
  if (result) {
    console.log('Password matches!');
  } else {
    console.log('Password does not match.');
  }
});
