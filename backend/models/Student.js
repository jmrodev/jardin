import Person from './Person.js';

class Student extends Person {
  constructor(id, name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate, registrationDate, status, classroom_id, shift, gender) {
    super(id, 'student', name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.registrationDate = registrationDate;
    this.status = status;
    this.classroom_id = classroom_id;
    this.shift = shift;
    this.gender = gender;
  }
}

export default Student;
