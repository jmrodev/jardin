import personService from '../services/personService.js';

const getPersons = (personType) => async (req, res) => {
  try {
    const filters = req.query;
    const persons = await personService.getPersons(personType, filters);
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPerson = async (req, res) => {
  try {
    const person = await personService.getPerson(req.params.id);
    res.json(person);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPerson = (personType) => async (req, res) => {
  try {
    const personData = { ...req.body, person_type: personType };
    const person = await personService.createPerson(personData);
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePerson = async (req, res) => {
  try {
    const person = await personService.updatePerson(req.params.id, req.body);
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePerson = async (req, res) => {
  try {
    await personService.deletePerson(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParentsByStudentId = async (req, res) => {
  try {
    const parents = await personService.getParentsByStudentId(req.params.studentId);
    res.json(parents);
  } catch (error) {
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
  createAndLinkParent
};
