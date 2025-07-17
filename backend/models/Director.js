import Person from './Person.js';

class Director extends Person {
  constructor(id, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, hireDate, administrativeRole) {
    super(id, 'director', first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.hireDate = hireDate;
    this.administrativeRole = administrativeRole;
  }
}

export default Director;
