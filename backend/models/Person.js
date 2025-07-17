class Person {
  constructor(id, personType, name, lastname_father, lastname_mother, dni, address, phone, email, birthdate) {
    this.id = id;
    this.personType = personType;
    this.name = name;
    this.lastname_father = lastname_father;
    this.lastname_mother = lastname_mother;
    this.dni = dni;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.birthdate = birthdate;
  }
}

export default Person;
