import parentService from '../services/parentService.js';

const getParents = async (req, res) => {
  try {
    const parents = await parentService.getParents();
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParent = async (req, res) => {
  try {
    const parent = await parentService.getParent(req.params.id);
    res.json(parent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createParent = async (req, res) => {
  try {
    const parent = await parentService.createParent(req.body);
    res.status(201).json(parent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateParent = async (req, res) => {
  try {
    const parent = await parentService.updateParent(req.params.id, req.body);
    res.json(parent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteParent = async (req, res) => {
  try {
    await parentService.deleteParent(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getParents,
  getParent,
  createParent,
  updateParent,
  deleteParent
};
