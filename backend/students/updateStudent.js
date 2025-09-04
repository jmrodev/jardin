import { getConnection } from '../config/database.js';
import { validateStudentData } from '../validators/studentValidator.js';

export const updateStudent = async (req, res) => {
  const { id } = req.params;

  // We can reuse the create validation, but it should be adapted for updates
  // For now, we'll use it as is, but a specific update validator would be better.
  const validation = validateStudentData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const pool = getConnection();
  let connection;

  try {
    const {
      firstname, lastname_father, lastname_mother, address, dni, birth_date, gender,
      classroom, shift, special_education, needs_assistant,
      special_diet, celiac, diabetic, takes_dairy,
      care_diseases, medication, diapers, diaper_responsible,
      responsibles // The new array of responsible persons
    } = req.body;
    const userId = req.user.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Update the student record
    const [studentUpdateResult] = await connection.execute(
      `UPDATE students SET
        firstname = ?, lastname_father = ?, lastname_mother = ?, address = ?, dni = ?, 
        birth_date = ?, gender = ?, classroom = ?, shift = ?, special_education = ?, 
        needs_assistant = ?, special_diet = ?, celiac = ?, diabetic = ?, takes_dairy = ?, 
        care_diseases = ?, medication = ?, diapers = ?, diaper_responsible = ?, 
        updated_by = ?
      WHERE id = ?`,
      [
        firstname, lastname_father, lastname_mother, address, dni, 
        birth_date, gender, classroom, shift, special_education, 
        needs_assistant, special_diet, celiac, diabetic, takes_dairy, 
        care_diseases, medication, diapers, diaper_responsible, 
        userId, 
        id
      ]
    );

    if (studentUpdateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Student not found' });
    }

    // 2. Delete existing responsibles for this student
    await connection.execute('DELETE FROM student_responsibles WHERE student_id = ?', [id]);

    // 3. Insert the new set of responsibles
    if (responsibles && Array.isArray(responsibles) && responsibles.length > 0) {
      const responsiblePromises = responsibles.map(resp => {
        return connection.execute(
          `INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, notes, type, created_by, updated_by)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, resp.person_id, resp.can_pickup || false, resp.can_change_diapers || false, resp.notes || '', resp.type, userId, userId]
        );
      });
      await Promise.all(responsiblePromises);
    }

    await connection.commit();

    res.json({ message: 'Student updated successfully' });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(`Error updating student with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};