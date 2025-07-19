import Person from './Person.js';

class Parent extends Person {
  constructor(id, name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate, occupation) {
    super(id, 'parent', name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate);
    this.occupation = occupation;
  }
}

export default Parent;
