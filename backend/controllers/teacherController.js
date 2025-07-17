import teacherService from '../services/teacherService.js';

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacher(req.params.id);
    res.json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    await teacherService.deleteTeacher(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
