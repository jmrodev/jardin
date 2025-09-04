import { getConnection } from '../config/database.js';

export const getStudents = async (req, res) => {
  try {
    const pool = getConnection();

    // Pagination and Sorting parameters
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const orderBy = req.query.orderBy || 'id';
    const orderDirection = req.query.orderDirection === 'desc' ? 'DESC' : 'ASC';

    const allowedOrderByColumns = [
      'id', 'firstname', 'lastname_father', 'lastname_mother', 'dni',
      'birth_date', 'gender', 'classroom', 'shift', 'created_at', 'updated_at'
    ];

    if (!allowedOrderByColumns.includes(orderBy)) {
      return res.status(400).json({ error: 'Invalid orderBy column' });
    }

    // 1. Get total count
    const [totalRows] = await pool.execute(`SELECT COUNT(*) as total FROM students`);
    const total = totalRows[0].total;

    // 2. Get paginated student IDs
    const [studentIdRows] = await pool.execute(
      `SELECT id FROM students ORDER BY ${orderBy} ${orderDirection} LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const studentIds = studentIdRows.map(row => row.id);

    if (studentIds.length === 0) {
      return res.json({
        data: [],
        pagination: { total, limit, offset }
      });
    }

    // 3. Fetch all data for those IDs
    const [rows] = await pool.execute(
      `
      SELECT
        s.id, s.firstname, s.lastname_father, s.lastname_mother, s.address, s.dni,
        s.birth_date, s.gender, s.classroom, s.shift, s.special_education,
        s.needs_assistant, s.special_diet, s.celiac, s.diabetic, s.takes_dairy,
        s.care_diseases, s.medication, s.diapers, s.diaper_responsible,
        s.created_at, s.updated_at,
        COALESCE(CONCAT(creator.name, ' ', creator.lastname), 'Sistema') as created_by_name,
        COALESCE(CONCAT(updater.name, ' ', updater.lastname), 'Sistema') as updated_by_name,
        sr.person_id,
        p.name as person_name,
        p.lastname as person_lastname,
        p.dni as person_dni,
        p.phone as person_phone,
        p.email as person_email,
        sr.can_pickup,
        sr.can_change_diapers,
        sr.type as responsible_type,
        sr.notes as responsible_notes
      FROM students s
      LEFT JOIN staff creator ON s.created_by = creator.id
      LEFT JOIN staff updater ON s.updated_by = updater.id
      LEFT JOIN student_responsibles sr ON s.id = sr.student_id
      LEFT JOIN persons p ON sr.person_id = p.id
      WHERE s.id IN (?)
      ORDER BY s.${orderBy} ${orderDirection}
    `,
      [studentIds]
    );

    // 4. Process the results
    const studentsMap = new Map();

    rows.forEach(row => {
      if (!studentsMap.has(row.id)) {
        studentsMap.set(row.id, {
          ...row, // Add all student fields
          responsibles: []
        });
      }

      if (row.person_id) {
        studentsMap.get(row.id).responsibles.push({
          person_id: row.person_id,
          name: row.person_name,
          lastname: row.person_lastname,
          dni: row.person_dni,
          phone: row.person_phone,
          email: row.person_email,
          can_pickup: row.can_pickup,
          can_change_diapers: row.can_change_diapers,
          type: row.responsible_type,
          notes: row.responsible_notes
        });
      }
    });

    const students = Array.from(studentsMap.values());

    // 5. Return response
    res.json({
      data: students,
      pagination: {
        total,
        limit,
        offset
      }
    });

  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};