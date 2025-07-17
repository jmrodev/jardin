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

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};
