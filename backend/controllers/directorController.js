import directorService from '../services/directorService.js';

const getDirectors = async (req, res) => {
  try {
    const directors = await directorService.getDirectors();
    res.json(directors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirector = async (req, res) => {
  try {
    const director = await directorService.getDirector(req.params.id);
    res.json(director);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createDirector = async (req, res) => {
  try {
    const director = await directorService.createDirector(req.body);
    res.status(201).json(director);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDirector = async (req, res) => {
  try {
    const director = await directorService.updateDirector(req.params.id, req.body);
    res.json(director);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDirector = async (req, res) => {
  try {
    await directorService.deleteDirector(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector
};
