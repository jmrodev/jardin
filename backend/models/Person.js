const fields = [
  'id', 'person_type', 'name', 'middle_name', 'lastname_father', 'lastname_mother', 
  'preferred_name', 'nationality', 'dni', 'address', 'phone', 'email', 
  'birthdate', 'username', 'password', 'hire_date', 'active', 
  'registration_date', 'status', 'classroom', 'shift', 'gender', 
  'occupation', 'specialization', 'administrative_role', 
  'created_at', 'updated_at', 'created_by', 'updated_by'
];

class Person {
  constructor(id, personType, name, lastname_father, lastname_mother, middle_name, preferred_name, nationality, dni, address, phone, email, birthdate) {
    this.id = id;
    this.personType = personType;
    this.name = name;
    this.lastname_father = lastname_father;
    this.lastname_mother = lastname_mother;
    this.middle_name = middle_name;
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
