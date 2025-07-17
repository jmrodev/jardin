class Person {
  constructor(id, personType, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate) {
    this.id = id;
    this.personType = personType;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.paternal_lastname = paternal_lastname;
    this.maternal_lastname = maternal_lastname;
    this.preferred_name = preferred_name;
    this.nationality = nationality;
    this.dni = dni;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.birthdate = birthdate;
  }
}

export default Person;
