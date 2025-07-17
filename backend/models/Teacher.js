import Person from './Person.js';

class Teacher extends Person {
  constructor(id, name, lastname, dni, address, phone, email, birthdate, hireDate, specialization) {
    super(id, 'teacher', name, lastname, dni, address, phone, email, birthdate);
    this.hireDate = hireDate;
    this.specialization = specialization;
  }
}

export default Teacher;
