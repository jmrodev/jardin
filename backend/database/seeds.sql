-- Mock data for the kindergarten database

-- Use the target database
USE kindergarten_db;

-- =================================================================
-- Staff
-- =================================================================

-- Insert an admin, a director, and two teachers
INSERT INTO staff (name, lastname, username, email, password, role, phone, hire_date)
VALUES
  ('Admin', 'User', 'admin', 'admin@jardin.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'admin', '111-111-1111', '2023-01-10'),
  ('Maria', 'Directora', 'mdirectora', 'mdirectora@jardin.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'director', '222-222-2222', '2023-02-15'),
  ('Laura', 'Maestra', 'lmaestra', 'lmaestra@jardin.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'teacher', '333-333-3333', '2023-03-20'),
  ('Carlos', 'Maestro', 'cmaestro', 'cmaestro@jardin.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'teacher', '444-444-4444', '2023-04-25');

-- =================================================================
-- Persons (Parents/Guardians)
-- =================================================================

-- Insert parents and guardians for the students
INSERT INTO persons (name, lastname, dni, address, phone, email, relationship)
VALUES
  -- Parents for Ana and Sofia
  ('Juan', 'Perez', '11111111', 'Calle Sol 123', '555-111-1111', 'juan.perez@email.com', 'padre'),
  ('Marta', 'Gomez', '22222222', 'Calle Sol 123', '555-222-2222', 'marta.gomez@email.com', 'madre'),

  -- Parents for Luis
  ('Pedro', 'Rodriguez', '33333333', 'Avenida Luna 456', '555-333-3333', 'pedro.rodriguez@email.com', 'padre'),
  ('Lucia', 'Fernandez', '44444444', 'Avenida Luna 456', '555-444-4444', 'lucia.fernandez@email.com', 'madre'),

  -- Guardian for Elena
  ('Isabel', 'Martinez', '55555555', 'Plaza Estrella 789', '555-555-5555', 'isabel.martinez@email.com', 'tutor');

-- =================================================================
-- Students
-- =================================================================

-- Insert students for different classrooms
INSERT INTO students (firstname, lastname_father, lastname_mother, address, dni, birth_date, gender, classroom, shift)
VALUES
  -- Sala 3
  ('Ana', 'Perez', 'Gomez', 'Calle Sol 123', '10101010', '2021-03-15', 'mujer', 'Sala 3', 'Mañana'),
  ('Luis', 'Rodriguez', 'Fernandez', 'Avenida Luna 456', '20202020', '2021-05-20', 'varón', 'Sala 3', 'Mañana'),

  -- Sala 4
  ('Sofia', 'Perez', 'Gomez', 'Calle Sol 123', '30303030', '2020-07-10', 'mujer', 'Sala 4', 'Tarde'),
  ('Elena', 'Martinez', 'N/A', 'Plaza Estrella 789', '40404040', '2020-09-25', 'mujer', 'Sala 4', 'Tarde');

-- =================================================================
-- Student-Person Relationships
-- =================================================================

-- Link students to their parents/guardians and set permissions
INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, type)
VALUES
  -- Ana (student_id=1)
  (1, 1, TRUE, TRUE, 'padre'),  -- Juan Perez
  (1, 2, TRUE, TRUE, 'madre'),  -- Marta Gomez

  -- Luis (student_id=2)
  (2, 3, TRUE, FALSE, 'padre'), -- Pedro Rodriguez
  (2, 4, TRUE, TRUE, 'madre'),  -- Lucia Fernandez

  -- Sofia (student_id=3)
  (3, 1, TRUE, FALSE, 'padre'), -- Juan Perez
  (3, 2, TRUE, FALSE, 'madre'), -- Marta Gomez

  -- Elena (student_id=4)
  (4, 5, TRUE, TRUE, 'tutor'); -- Isabel Martinez

-- =================================================================
-- Attendance
-- =================================================================

-- Insert some attendance records for a few students
INSERT INTO attendance (student_id, date, present, observations, registered_by)
VALUES
  -- Ana
  (1, '2024-05-20', TRUE, 'Participó activamente en clase.', 3),
  (1, '2024-05-21', TRUE, '', 3),
  (1, '2024-05-22', FALSE, 'Ausente por cita médica.', 3),

  -- Luis
  (2, '2024-05-20', TRUE, '', 3),
  (2, '2024-05-21', TRUE, 'Un poco decaído por la tarde.', 3),

  -- Sofia
  (3, '2024-05-20', TRUE, '', 4),
  (3, '2024-05-21', TRUE, '', 4);

