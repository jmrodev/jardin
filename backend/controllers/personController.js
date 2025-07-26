import personService from '../services/personService.js';

// Generic getPersons for /persons route (person_type from query)
const getPersons = async (req, res) => {
  try {
    const personType = req.query.person_type; // Get person_type from query for generic route
    const filters = req.query;
    const persons = await personService.getPersons(personType, filters);
    res.json(persons);
  } catch (error) {
    console.error('Error in getPersons (generic):', error);
    res.status(500).json({ message: error.message });
  }
};

// Generic createPerson for /persons route (person_type from body)
const createPerson = async (req, res) => {
  try {
    const personData = { ...req.body }; // person_type should be in req.body
    if (!personData.person_type) {
      return res.status(400).json({ message: 'person_type is required in request body.' });
    }
    const person = await personService.createPerson(personData);
    res.status(201).json(person);
  } catch (error) {
    console.error('Error in createPerson (generic):', error);
    res.status(500).json({ message: error.message });
  }
};

// Higher-order function for specific person types (e.g., /students, /parents)
const getPersonsByType = (personType) => async (req, res) => {
  try {
    const filters = req.query;
    const persons = await personService.getPersons(personType, filters);
    res.json(persons);
  } catch (error) {
    console.error(`Error in getPersonsByType (${personType}):`, error);
    res.status(500).json({ message: error.message });
  }
};

// Higher-order function for specific person types (e.g., /students, /parents)
const createPersonByType = (personType) => async (req, res) => {
  try {
    const personData = { ...req.body, person_type: personType };
    const person = await personService.createPerson(personData);
    res.status(201).json(person);
  } catch (error) {
    console.error(`Error in createPersonByType (${personType}):`, error);
    res.status(500).json({ message: error.message });
  }
};

const getPerson = async (req, res) => {
  try {
    const person = await personService.getPerson(req.params.id);
    res.json(person);
  } catch (error) {
    console.error('Error in getPerson:', error);
    res.status(404).json({ message: error.message });
  }
};

const updatePerson = async (req, res) => {
  try {
    const person = await personService.updatePerson(req.params.id, req.body);
    res.json(person);
  } catch (error) {
    console.error('Error in updatePerson:', error);
    res.status(500).json({ message: error.message });
  }
};

const deletePerson = async (req, res) => {
  try {
    await personService.deletePerson(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error in deletePerson:', error);
    res.status(500).json({ message: error.message });
  }
};

const getParentsByStudentId = async (req, res) => {
  try {
    const parents = await personService.getParentsByStudentId(req.params.studentId);
    res.json(parents);
  } catch (error) {
    console.error('Error in getParentsByStudentId:', error);
    res.status(500).json({ message: error.message });
  }
};

const createAndLinkParent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const parentData = req.body;
    const newParent = await personService.createAndLinkParent(studentId, parentData);
    res.status(201).json(newParent);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const message = error.sqlMessage.includes('email') 
        ? 'El correo electrónico ingresado ya existe.' 
        : error.sqlMessage.includes('dni')
        ? 'El DNI ingresado ya está registrado.'
        : 'Los datos ingresados contienen un valor duplicado que debe ser único.';
      return res.status(409).json({ message });
    }
    console.error('Error in createAndLinkParent controller:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el responsable.', stack: process.env.NODE_ENV === 'development' ? error.stack : undefined });
  }
};

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getParentsByStudentId,
  createAndLinkParent,
  getPersonsByType, // Export the new higher-order functions
  createPersonByType,
};
