import Person from './Person.js';

class Teacher extends Person {
  constructor(id, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, hireDate, specialization) {
    super(id, 'teacher', first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.hireDate = hireDate;
    this.specialization = specialization;
  }
}

export default Teacher;
