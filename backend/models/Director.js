import Person from './Person.js';

class Director extends Person {
  constructor(id, name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate, hireDate, administrativeRole) {
    super(id, 'director', name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.hireDate = hireDate;
    this.administrativeRole = administrativeRole;
  }
}

export default Director;
