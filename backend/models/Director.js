import Person from './Person.js';

class Director extends Person {
  constructor(id, name, lastname, birthdate, dni, address, phone, email, hireDate, administrativeRole) {
    super(id, name, lastname, birthdate, dni, address, phone, email);
    this.hireDate = hireDate;
    this.administrativeRole = administrativeRole;
  }
}

export default Director;
