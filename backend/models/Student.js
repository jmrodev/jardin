import Person from './Person.js';

class Student extends Person {
  constructor(id, name, lastname, birthdate, dni, address, phone, email, registrationDate, status) {
    super(id, name, lastname, birthdate, dni, address, phone, email);
    this.registrationDate = registrationDate;
    this.status = status;
  }
}

export default Student;
