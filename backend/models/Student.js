import Person from './Person.js';

class Student extends Person {
  constructor(id, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registrationDate, status, classroom_id, shift, gender) {
    super(id, 'student', first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.registrationDate = registrationDate;
    this.status = status;
    this.classroom_id = classroom_id;
    this.shift = shift;
    this.gender = gender;
  }
}

export default Student;
