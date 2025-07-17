import attendanceService from '../services/attendanceService.js';

const getAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendance();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.registerAttendance(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAttendance,
  registerAttendance
};
