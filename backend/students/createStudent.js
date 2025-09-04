import { getConnection } from '../config/database.js';
import { validateStudentData } from '../validators/studentValidator.js';

export const createStudent = async (req, res) => {
  const validation = validateStudentData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const pool = getConnection();
  let connection; // Declare connection here to be accessible in catch block

  try {
    const {
      firstname, lastname_father, lastname_mother, address, dni, birth_date, gender,
      classroom, shift, special_education, needs_assistant,
      special_diet, celiac, diabetic, takes_dairy,
      care_diseases, medication, diapers, diaper_responsible,
      responsibles // This is the new array of responsible persons
    } = req.body;
    const userId = req.user.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insert the student
    const [studentResult] = await connection.execute(
      `INSERT INTO students (
        firstname, lastname_father, lastname_mother, address, dni, birth_date, gender,
        classroom, shift, special_education, needs_assistant,
        special_diet, celiac, diabetic, takes_dairy,
        care_diseases, medication, diapers, diaper_responsible,
        created_by, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname, lastname_father, lastname_mother, address, dni, birth_date, gender,
        classroom, shift, special_education, needs_assistant,
        special_diet, celiac, diabetic, takes_dairy,
        care_diseases, medication, diapers, diaper_responsible,
        userId, userId
      ]
    );

    const studentId = studentResult.insertId;

    // 2. Insert into student_responsibles
    if (responsibles && Array.isArray(responsibles) && responsibles.length > 0) {
      const responsiblePromises = responsibles.map(resp => {
        return connection.execute(
          `INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, notes, type, created_by, updated_by)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [studentId, resp.person_id, resp.can_pickup || false, resp.can_change_diapers || false, resp.notes || '', resp.type, userId, userId]
        );
      });
      await Promise.all(responsiblePromises);
    }

    await connection.commit();

    res.status(201).json({
      id: studentId,
      message: 'Estudiante creado exitosamente'
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error creando estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear estudiante.' });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};