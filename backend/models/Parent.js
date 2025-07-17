import Person from './Person.js';

class Parent extends Person {
  constructor(id, name, lastname, dni, address, phone, email, birthdate, occupation) {
    super(id, 'parent', name, lastname, dni, address, phone, email, birthdate);
    this.occupation = occupation;
  }
}

export default Parent;
