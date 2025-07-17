import personService from '../services/personService.js';

const getPersons = async (req, res) => {
  try {
    const persons = await personService.getPersons();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPerson = async (req, res) => {
  try {
    const person = await personService.createPerson(req.body);
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
  createPerson,
  updatePerson,
  deletePerson
};
