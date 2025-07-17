import Person from './Person.js';

class Parent extends Person {
  constructor(id, name, lastname, birthdate, dni, address, phone, email, occupation) {
    super(id, name, lastname, birthdate, dni, address, phone, email);
    this.occupation = occupation;
  }
}

export default Parent;
