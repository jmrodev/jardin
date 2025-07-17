import Person from './Person.js';

class Teacher extends Person {
  constructor(id, name, lastname, birthdate, dni, address, phone, email, hireDate, specialization) {
    super(id, name, lastname, birthdate, dni, address, phone, email);
    this.hireDate = hireDate;
    this.specialization = specialization;
  }
}

export default Teacher;
