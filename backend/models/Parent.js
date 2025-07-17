import Person from './Person.js';

class Parent extends Person {
  constructor(id, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, occupation) {
    super(id, 'parent', first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.occupation = occupation;
  }
}

export default Parent;
