import classroomService from '../services/classroomService.js';

const getClassrooms = async (req, res, next) => {
  try {
    const classrooms = await classroomService.getClassrooms();
    res.json(classrooms);
  } catch (error) {
    next(error);
  }
};

export default {
  getClassrooms,
}; 