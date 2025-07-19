import Person from './Person.js';

class Teacher extends Person {
  constructor(id, name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate, hireDate, specialization) {
    super(id, 'teacher', name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.hireDate = hireDate;
    this.specialization = specialization;
  }
}

export default Teacher;
