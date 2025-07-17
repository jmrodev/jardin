import Person from './Person.js';

class Student extends Person {
  constructor(id, name, lastname, dni, address, phone, email, birthdate, registrationDate, status) {
    super(id, 'student', name, lastname, dni, address, phone, email, birthdate);
    this.registrationDate = registrationDate;
    this.status = status;
  }
}

export default Student;
