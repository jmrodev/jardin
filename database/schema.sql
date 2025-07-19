-- Create database
DROP DATABASE IF EXISTS kindergarten_db;
CREATE DATABASE IF NOT EXISTS kindergarten_db;
USE kindergarten_db;

-- Tabla para almacenar información de todas las personas (estudiantes, padres, personal)
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    person_type ENUM('student', 'teacher', 'parent', 'director', 'admin', 'preceptor') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    paternal_lastname VARCHAR(100) NOT NULL,
    maternal_lastname VARCHAR(100),
    preferred_name VARCHAR(100),
    nationality VARCHAR(50),
    dni VARCHAR(20) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    birthdate DATE,

    -- Fields for staff (teacher, director, admin, preceptor)
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    hire_date DATE,
    active BOOLEAN DEFAULT TRUE,

    -- Fields for students
    registration_date DATE,
    status VARCHAR(50),
    classroom VARCHAR(50),
    shift VARCHAR(50),
    gender VARCHAR(50),

    -- Fields for parents
    occupation VARCHAR(100),

    -- Fields for teachers
    specialization VARCHAR(100),

    -- Fields for directors
    administrative_role VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED,
    updated_by BIGINT UNSIGNED,
    FOREIGN KEY (created_by) REFERENCES persons(id),
    FOREIGN KEY (updated_by) REFERENCES persons(id)
);

-- Classrooms table
CREATE TABLE classrooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  min_age_suggested INT,
  max_age_suggested INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add classroom_id to persons table after classrooms is created
ALTER TABLE persons
  ADD COLUMN classroom_id INT,
  ADD FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE SET NULL;


-- Attendance table
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT UNSIGNED NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'justified') NOT NULL,
  observations TEXT,
  registered_by BIGINT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY (registered_by) REFERENCES persons(id),
  UNIQUE KEY unique_attendance (student_id, date)
);

-- Student-Parent Relationship table
CREATE TABLE student_parents (
  student_id BIGINT UNSIGNED NOT NULL,
  parent_id BIGINT UNSIGNED NOT NULL,
  relationship VARCHAR(50) NOT NULL, -- e.g., 'Padre', 'Madre', 'Tutor Legal'
  can_pickup BOOLEAN DEFAULT TRUE,
  can_change_diapers BOOLEAN DEFAULT FALSE,
  is_emergency_contact BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (student_id, parent_id),
  FOREIGN KEY (student_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES persons(id) ON DELETE CASCADE
);

-- Contacts table
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =================================================================
-- DATA POPULATION SCRIPT (v4 - Internationalized Names & Nationality)
-- =================================================================

-- Deactivate foreign key checks to clear tables
SET FOREIGN_KEY_CHECKS = 0;

-- Clear tables to reset all previous data and auto-increment
DELETE FROM attendance;
DELETE FROM student_parents;
DELETE FROM persons;
DELETE FROM classrooms;

-- Reset auto-increment counters
ALTER TABLE attendance AUTO_INCREMENT = 1;
ALTER TABLE student_parents AUTO_INCREMENT = 1;
ALTER TABLE persons AUTO_INCREMENT = 1;
ALTER TABLE classrooms AUTO_INCREMENT = 1;

-- Reactivate foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Classrooms
INSERT INTO classrooms (id, name, min_age_suggested, max_age_suggested, description) VALUES
(1, 'Sala de 3', 2, 3, 'Sala para niños de 3 años, enfocada en el desarrollo temprano.'),
(2, 'Sala de 4', 3, 4, 'Sala para niños de 4 años, con actividades pre-lectoescritura.'),
(3, 'Sala de 5', 4, 5, 'Sala para niños de 5 años, preparando para el ingreso a primaria.');

-- Insert Staff: Admin, Directors, Preceptors, Teachers
-- Note: All users share a default password: 'password' -> $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO persons (id, person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, username, password, hire_date, administrative_role, specialization) VALUES
-- Admin (ID: 1)
(1, 'admin', 'Admin', 'General', 'Global', 'System', 'Admin', 'Española', '10000000A', 'Av. del Sistema 123', '600111111', 'admin@jardin.com', '1980-01-01', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-01-01', 'System Administrator', NULL),
-- Directors (IDs: 2, 3)
(2, 'director', 'Maria', 'Isabel', 'Gonzalez', 'Perez', 'Maria', 'Española', '20000000B', 'Calle Principal 456', '600222222', 'director.mg@jardin.com', '1975-05-10', 'director_mg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-02-01', 'General Director', NULL),
(3, 'director', 'Carlos', 'Alberto', 'Rodriguez', 'Gomez', 'Carlos', 'Mexicana', '30000000C', 'Plaza Central 789', '600333333', 'director.cr@jardin.com', '1982-08-20', 'director_cr', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-03-01', 'Academic Director', NULL),
-- Preceptors (IDs: 4, 5)
(4, 'preceptor', 'Laura', NULL, 'Fernandez', 'Ruiz', 'Lau', 'Argentina', '40000000D', 'Paseo de la Reforma 101', '600444444', 'preceptor.lf@jardin.com', '1990-11-15', 'preceptor_lf', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-04-01', NULL, NULL),
(5, 'preceptor', 'Sofia', 'Valentina', 'Perez', 'Diaz', 'Sofia', 'Chilena', '50000000E', 'Calle Secundaria 212', '600555555', 'preceptor.sp@jardin.com', '1992-02-25', 'preceptor_sp', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-05-01', NULL, NULL),
-- Teachers (IDs: 6-14)
(6, 'teacher', 'Ana', 'Sofia', 'Martinez', 'Lopez', 'Ana', 'Colombiana', '60000000F', 'Av. de los Maestros 303', '600666666', 'teacher.am@jardin.com', '1988-07-30', 'teacher_am', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-06-01', NULL, 'Early Childhood Education'),
(7, 'teacher', 'Juan', 'Carlos', 'Lopez', 'Hernandez', 'Juan', 'Española', '70000000G', 'Calle del Saber 404', '600777777', 'teacher.jl@jardin.com', '1991-09-05', 'teacher_jl', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-07-01', NULL, 'Psychomotricity'),
(8, 'teacher', 'Lucia', NULL, 'Garcia', 'Moreno', 'Luci', 'Peruana', '80000000H', 'Rincon del Arte 505', '600888888', 'teacher.lg@jardin.com', '1985-04-12', 'teacher_lg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-08-01', NULL, 'Music and Arts'),
(9, 'teacher', 'David', NULL, 'Sanchez', 'Jimenez', 'David', 'Española', '90000000I', 'Paseo de los Niños 606', '600999999', 'teacher.ds@jardin.com', '1993-01-20', 'teacher_ds', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-09-01', NULL, 'Early Childhood Education'),
(10, 'teacher', 'Elena', 'Maria', 'Romero', 'Navarro', 'Elena', 'Argentina', '11000000J', 'Av. Integracion 707', '611000000', 'teacher.er@jardin.com', '1989-06-18', 'teacher_er', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-10-01', NULL, 'Special Needs Education'),
(11, 'teacher', 'Pablo', 'Andres', 'Diaz', 'Serrano', 'Pablo', 'Española', '12000000K', 'Calle del Deporte 808', '612111111', 'teacher.pd@jardin.com', '1994-03-10', 'teacher_pd', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-11-01', NULL, 'Psychomotricity'),
(12, 'teacher', 'Carmen', NULL, 'Alonso', 'Iglesias', 'Carmen', 'Española', '13000000L', 'Plaza de la Musica 909', '613222222', 'teacher.ca@jardin.com', '1986-12-01', 'teacher_ca', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-12-01', NULL, 'Music and Arts'),
(13, 'teacher', 'Adrian', 'Jose', 'Moreno', 'Blanco', 'Adrian', 'Venezolana', '14000000M', 'Av. del Crecimiento 111', '614333333', 'teacher.am2@jardin.com', '1995-05-22', 'teacher_am2', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-01', NULL, 'Early Childhood Education'),
(14, 'teacher', 'Isabel', NULL, 'Jimenez', 'Santos', 'Isa', 'Española', '15000000N', 'Ronda del Futuro 222', '615444444', 'teacher.ij@jardin.com', '1990-10-03', 'teacher_ij', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-02-01', NULL, 'Early Childhood Education');

-- Insert Students (IDs: 15-44) - DISTRIBUCIÓN DESEQUILIBRADA REALISTA
-- Sala de 3: 8 estudiantes (5 mañana, 3 tarde) - Más popular
-- Sala de 4: 12 estudiantes (8 mañana, 4 tarde) - Sala más grande
-- Sala de 5: 14 estudiantes (10 mañana, 4 tarde) - Sala más grande, preferencia mañana
-- Género: 18 varones, 16 mujeres (ligeramente más varones)
INSERT INTO persons (id, person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, registration_date, status, classroom_id, shift, gender) VALUES
-- SALA DE 3 (8 estudiantes) - Sala pequeña, mayoría mañana
(15, 'student', 'Lucas', 'Mateo', 'Vega', 'Gomez', 'Lucas', 'Española', '78901234A', 'Calle Falsa 123', '620111111', 'lucas.vega@email.com', '2021-03-15', '2024-03-01', 'active', 1, 'Mañana', 'Masculino'),
(16, 'student', 'Martina', NULL, 'Rios', 'Castillo', 'Martina', 'Argentina', '78901234B', 'Av. Siempreviva 742', '620222222', 'martina.rios@email.com', '2021-05-20', '2024-03-01', 'active', 1, 'Mañana', 'Femenino'),
(17, 'student', 'Hugo', NULL, 'Castillo', 'Navarro', 'Hugo', 'Chilena', '78901234C', 'Paseo del Prado 10', '620333333', 'hugo.castillo@email.com', '2021-07-10', '2024-03-01', 'active', 1, 'Mañana', 'Masculino'),
(18, 'student', 'Valeria', 'Sofia', 'Navarro', 'Soto', 'Valeria', 'Española', '78901234D', 'Calle Alcala 200', '620444444', 'valeria.navarro@email.com', '2021-09-05', '2024-03-01', 'active', 1, 'Mañana', 'Femenino'),
(19, 'student', 'Mateo', NULL, 'Soto', 'Molina', 'Mateo', 'Peruana', '78901234E', 'Gran Via 50', '620555555', 'mateo.soto@email.com', '2021-11-25', '2024-03-01', 'active', 1, 'Mañana', 'Masculino'),
(20, 'student', 'Sofia', NULL, 'Molina', 'Herrera', 'Sofi', 'Española', '78901234F', 'Plaza Mayor 1', '620666666', 'sofia.molina@email.com', '2020-02-18', '2024-03-01', 'active', 1, 'Tarde', 'Femenino'),
(21, 'student', 'Leo', 'Daniel', 'Herrera', 'Castro', 'Leo', 'Mexicana', '78901234G', 'Calle Serrano 30', '620777777', 'leo.herrera@email.com', '2020-04-30', '2024-03-01', 'active', 1, 'Tarde', 'Masculino'),
(22, 'student', 'Julia', NULL, 'Castro', 'Ortega', 'Julia', 'Española', '78901234H', 'Paseo de la Castellana 150', '620888888', 'julia.castro@email.com', '2020-06-22', '2024-03-01', 'active', 1, 'Tarde', 'Femenino'),

-- SALA DE 4 (12 estudiantes) - Sala mediana, mayoría mañana
(23, 'student', 'Daniel', NULL, 'Ortega', 'Gimenez', 'Dani', 'Colombiana', '78901234I', 'Calle Goya 80', '620999999', 'daniel.ortega@email.com', '2020-08-14', '2024-03-01', 'active', 2, 'Mañana', 'Masculino'),
(24, 'student', 'Alba', 'Lucia', 'Gimenez', 'Reyes', 'Alba', 'Española', '78901234J', 'Av. de America 25', '621000000', 'alba.gimenez@email.com', '2020-10-09', '2024-03-01', 'active', 2, 'Mañana', 'Femenino'),
(25, 'student', 'Enzo', NULL, 'Reyes', 'Vargas', 'Enzo', 'Uruguaya', '78901234K', 'Calle Princesa 5', '621111111', 'enzo.reyes@email.com', '2021-01-12', '2024-03-01', 'active', 2, 'Mañana', 'Masculino'),
(26, 'student', 'Olivia', 'Maria', 'Vargas', 'Guerrero', 'Olivia', 'Española', '78901234L', 'Calle Fuencarral 99', '621222222', 'olivia.vargas@email.com', '2021-03-28', '2024-03-01', 'active', 2, 'Mañana', 'Femenino'),
(27, 'student', 'Mario', NULL, 'Guerrero', 'Cano', 'Mario', 'Española', '78901234M', 'Paseo de las Delicias 33', '621333333', 'mario.guerrero@email.com', '2021-05-19', '2024-03-01', 'active', 2, 'Mañana', 'Masculino'),
(28, 'student', 'Alejandra', 'de la Cruz', 'Cano', 'Prieto', 'Ale', 'Mexicana', '78901234N', 'Ronda de Valencia 12', '621444444', 'alejandra.cano@email.com', '2021-07-02', '2024-03-01', 'active', 2, 'Mañana', 'Femenino'),
(29, 'student', 'Diego', 'Nicolas', 'Prieto', 'Santos', 'Diego', 'Española', '78901234P', 'Calle Atocha 45', '621555555', 'diego.prieto@email.com', '2021-09-11', '2024-03-01', 'active', 2, 'Mañana', 'Masculino'),
(30, 'student', 'Carla', NULL, 'Santos', 'Gallego', 'Carla', 'Portuguesa', '78901234Q', 'Calle Hortaleza 67', '621666666', 'carla.santos@email.com', '2020-02-05', '2024-03-01', 'active', 2, 'Mañana', 'Femenino'),
(31, 'student', 'Javier', 'Francisco', 'Gallego', 'Pascual', 'Javi', 'Española', '78901234R', 'Av. Reina Victoria 88', '621777777', 'javier.gallego@email.com', '2020-04-01', '2024-03-01', 'active', 2, 'Tarde', 'Masculino'),
(32, 'student', 'Lucia', 'Isabel', 'Pascual', 'Blanco', 'Lucia', 'Española', '78901234S', 'Calle de Bravo Murillo 123', '621888888', 'lucia.pascual@email.com', '2020-06-13', '2024-03-01', 'active', 2, 'Tarde', 'Femenino'),
(33, 'student', 'Marcos', NULL, 'Blanco', 'Iglesias', 'Marcos', 'Andorrana', '78901234T', 'Calle de Lopez de Hoyos 210', '621999999', 'marcos.blanco@email.com', '2020-08-27', '2024-03-01', 'active', 2, 'Tarde', 'Masculino'),
(34, 'student', 'Irene', 'Sofia', 'Iglesias', 'Sanz', 'Irene', 'Española', '78901234U', 'Paseo de la Habana 55', '622000000', 'irene.iglesias@email.com', '2020-10-30', '2024-03-01', 'active', 2, 'Tarde', 'Femenino'),

-- SALA DE 5 (14 estudiantes) - Sala más grande, mayoría mañana
(35, 'student', 'Samuel', 'de los Reyes', 'Sanz', 'Medina', 'Samu', 'Española', '78901234V', 'Calle de Arturo Soria 300', '622111111', 'samuel.sanz@email.com', '2021-01-21', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(36, 'student', 'Aitana', NULL, 'Medina', 'Rojas', 'Aitana', 'Española', '78901234W', 'Av. de los Poblados 50', '622222222', 'aitana.medina@email.com', '2021-04-14', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(37, 'student', 'Hector', 'David', 'Rojas', 'Suarez', 'Hector', 'Peruana', '78901234X', 'Calle de la Oca 19', '622333333', 'hector.rojas@email.com', '2021-06-08', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(38, 'student', 'Sara', 'Isabella', 'Suarez', 'Gil', 'Sarita', 'Española', '78901234Y', 'Av. de la Albufera 140', '622444444', 'sara.suarez@email.com', '2021-08-01', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(39, 'student', 'Ruben', NULL, 'Gil', 'Vicente', 'Ruben', 'Mexicana', '78901234Z', 'Calle de Marcelo Usera 1', '622555555', 'ruben.gil@email.com', '2021-10-18', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(40, 'student', 'Marina', 'Paz', 'Vicente', 'Mora', 'Marina', 'Española', '67890123A', 'Av. de Moratalaz 100', '622666666', 'marina.vicente@email.com', '2020-03-10', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(41, 'student', 'Oscar', NULL, 'Mora', 'Serrano', 'Oscar', 'Española', '67890123B', 'Calle del Camino de los Vinateros 5', '622777777', 'oscar.mora@email.com', '2020-05-14', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(42, 'student', 'Claudia', 'Isabel', 'Serrano', 'Roca', 'Claudia', 'Argentina', '67890123C', 'Paseo de la Alameda de Osuna 20', '622888888', 'claudia.serrano@email.com', '2020-07-25', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(43, 'student', 'Jorge', 'Luis', 'Roca', 'Hernandez', 'Jorge', 'Española', '67890123D', 'Calle de Alcala 500', '622999999', 'jorge.roca@email.com', '2020-09-09', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(44, 'student', 'Nerea', NULL, 'Hernandez', 'Vega', 'Nerea', 'Española', '67890123E', 'Av. del Cardenal Herrera Oria 150', '623000000', 'nerea.hernandez@email.com', '2020-11-11', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(45, 'student', 'Adrian', 'Jose', 'Vega', 'Torres', 'Adrian', 'Española', '67890123F', 'Calle de la Princesa 25', '623111111', 'adrian.vega@email.com', '2020-01-15', '2024-03-01', 'active', 3, 'Mañana', 'Masculino'),
(46, 'student', 'Elena', 'Maria', 'Torres', 'Flores', 'Elena', 'Española', '67890123G', 'Av. de la Paz 75', '623222222', 'elena.torres@email.com', '2020-12-20', '2024-03-01', 'active', 3, 'Mañana', 'Femenino'),
(47, 'student', 'Pablo', 'Andres', 'Flores', 'Cruz', 'Pablo', 'Española', '67890123H', 'Calle del Sol 45', '623333333', 'pablo.flores@email.com', '2020-08-05', '2024-03-01', 'active', 3, 'Tarde', 'Masculino'),
(48, 'student', 'Carmen', 'Isabel', 'Cruz', 'Reyes', 'Carmen', 'Española', '67890123I', 'Paseo de la Estrella 90', '623444444', 'carmen.cruz@email.com', '2020-06-12', '2024-03-01', 'active', 3, 'Tarde', 'Femenino');


-- Insert Parents/Guardians (IDs: 69-92) - Después de los estudiantes
INSERT INTO persons (id, person_type, first_name, middle_name, paternal_lastname, maternal_lastname, preferred_name, nationality, dni, address, phone, email, birthdate, occupation) VALUES
(69, 'parent', 'Javier', 'Andres', 'Vega', 'Gomez', 'Javier', 'Española', '56789012A', 'Calle Falsa 123', '630111111', 'j.vega@email.com', '1985-01-10', 'Architect'),
(70, 'parent', 'Isabel', 'Margarita', 'Rios', 'Castillo', 'Isabel', 'Argentina', '56789012B', 'Av. Siempreviva 742', '630222222', 'i.rios@email.com', '1988-02-20', 'Doctor'),
(71, 'parent', 'Fernando', NULL, 'Castillo', 'Navarro', 'Fernando', 'Chilena', '56789012C', 'Paseo del Prado 10', '630333333', 'f.castillo@email.com', '1982-03-15', 'Engineer'),
(72, 'parent', 'Beatriz', 'Ana', 'Navarro', 'Soto', 'Bea', 'Española', '56789012D', 'Calle Alcala 200', '630444444', 'b.navarro@email.com', '1990-04-25', 'Lawyer'),
(73, 'parent', 'Roberto', 'Carlos', 'Soto', 'Molina', 'Roberto', 'Peruana', '56789012E', 'Gran Via 50', '630555555', 'r.soto@email.com', '1986-05-30', 'Designer'),
(74, 'parent', 'Gabriela', 'Fernanda', 'Molina', 'Herrera', 'Gabi', 'Española', '56789012F', 'Plaza Mayor 1', '630666666', 'g.molina@email.com', '1989-06-05', 'Accountant'),
(75, 'parent', 'Miguel', 'Angel', 'Herrera', 'Castro', 'Miguel', 'Mexicana', '56789012G', 'Calle Serrano 30', '630777777', 'm.herrera@email.com', '1984-07-12', 'Chef'),
(76, 'parent', 'Silvia', NULL, 'Castro', 'Ortega', 'Silvia', 'Española', '56789012H', 'Paseo de la Castellana 150', '630888888', 's.castro@email.com', '1987-08-18', 'Nurse'),
(77, 'parent', 'Ricardo', 'Antonio', 'Ortega', 'Gimenez', 'Ricardo', 'Colombiana', '56789012I', 'Calle Goya 80', '630999999', 'r.ortega@email.com', '1983-09-22', 'Mechanic'),
(78, 'parent', 'Natalia', 'Jimena', 'Gimenez', 'Reyes', 'Nati', 'Española', '56789012J', 'Av. de America 25', '631000000', 'n.gimenez@email.com', '1991-10-28', 'Journalist'),
(79, 'parent', 'Oscar', 'Eduardo', 'Cruz', 'Vargas', 'Oscar', 'Uruguaya', '45678901K', 'Calle Princesa 5', '631111111', 'o.cruz@email.com', '1985-11-03', 'Pilot'),
(80, 'parent', 'Raquel', NULL, 'Reyes', 'Guerrero', 'Raquel', 'Española', '45678901L', 'Calle Fuencarral 99', '631222222', 'r.reyes@email.com', '1988-12-09', 'Scientist'),
(81, 'parent', 'Jorge', 'Luis', 'Vargas', 'Cano', 'Jorge', 'Española', '45678901M', 'Paseo de las Delicias 33', '631333333', 'j.vargas@email.com', '1982-01-14', 'Photographer'),
(82, 'parent', 'Esther', NULL, 'Guerrero', 'Prieto', 'Esther', 'Mexicana', '45678901N', 'Ronda de Valencia 12', '631444444', 'e.guerrero@email.com', '1990-02-19', 'Musician'),
(83, 'parent', 'Francisco', 'Javier', 'Cano', 'Santos', 'Paco', 'Española', '45678901P', 'Calle Atocha 45', '631555555', 'f.cano@email.com', '1986-03-25', 'Artist'),
(84, 'parent', 'Teresa', 'de Jesus', 'Prieto', 'Gallego', 'Tere', 'Portuguesa', '45678901Q', 'Calle Hortaleza 67', '631666666', 't.prieto@email.com', '1989-04-01', 'Veterinarian'),
(85, 'parent', 'Hector', NULL, 'Santos', 'Pascual', 'Hector', 'Española', '45678901R', 'Av. Reina Victoria 88', '631777777', 'h.santos@email.com', '1984-05-07', 'Police Officer'),
(86, 'parent', 'Monica', 'Andrea', 'Gallego', 'Blanco', 'Moni', 'Andorrana', '45678901S', 'Calle de Bravo Murillo 123', '631888888', 'm.gallego@email.com', '1987-06-13', 'Firefighter'),
(87, 'parent', 'Sergio', NULL, 'Pascual', 'Iglesias', 'Sergio', 'Española', '45678901T', 'Calle de Lopez de Hoyos 210', '631999999', 's.pascual@email.com', '1983-07-19', 'Software Developer'),
(88, 'parent', 'Cristina', 'Beatriz', 'Blanco', 'Sanz', 'Cris', 'Española', '45678901U', 'Paseo de la Habana 55', '632000000', 'c.blanco@email.com', '1991-08-24', 'Project Manager'),
(89, 'parent', 'Roberto', 'Carlos', 'Vega', 'Torres', 'Roberto', 'Española', '45678901V', 'Calle de la Princesa 25', '632111111', 'r.vega@email.com', '1986-09-15', 'Teacher'),
(90, 'parent', 'Maria', 'Isabel', 'Torres', 'Flores', 'Maria', 'Española', '45678901W', 'Av. de la Paz 75', '632222222', 'm.torres@email.com', '1989-03-22', 'Nurse'),
(91, 'parent', 'Carlos', 'Alberto', 'Flores', 'Cruz', 'Carlos', 'Española', '45678901X', 'Calle del Sol 45', '632333333', 'c.flores@email.com', '1984-11-08', 'Engineer'),
(92, 'parent', 'Ana', 'Sofia', 'Cruz', 'Reyes', 'Ana', 'Española', '45678901Y', 'Paseo de la Estrella 90', '632444444', 'a.cruz@email.com', '1987-12-03', 'Doctor');


-- Insert Student-Parent Relationships - RELACIONES DESEQUILIBRADAS
-- Algunos estudiantes tienen ambos padres, otros solo uno, algunos con abuelos
INSERT INTO student_parents (student_id, parent_id, relationship, can_pickup, is_emergency_contact, can_change_diapers) VALUES
-- Sala de 3 - Relaciones simples
(15, 69, 'Padre', TRUE, TRUE, TRUE),
(16, 70, 'Madre', TRUE, TRUE, TRUE),
(17, 71, 'Padre', TRUE, TRUE, TRUE),
(18, 72, 'Madre', TRUE, TRUE, TRUE),
(19, 73, 'Padre', TRUE, TRUE, FALSE),
(20, 74, 'Madre', TRUE, TRUE, TRUE),
(21, 75, 'Padre', TRUE, TRUE, TRUE),
(22, 76, 'Madre', TRUE, TRUE, TRUE),

-- Sala de 4 - Algunas familias con ambos padres
(23, 77, 'Padre', TRUE, TRUE, FALSE),
(24, 78, 'Madre', TRUE, TRUE, TRUE),
(25, 79, 'Tutor Legal', TRUE, FALSE, FALSE),
(25, 80, 'Madre', TRUE, TRUE, TRUE),
(26, 81, 'Padre', TRUE, TRUE, TRUE),
(27, 82, 'Madre', TRUE, TRUE, TRUE),
(28, 83, 'Padre', TRUE, TRUE, FALSE),
(29, 84, 'Abuela', TRUE, TRUE, TRUE),
(30, 85, 'Padre', TRUE, TRUE, TRUE),
(31, 86, 'Madre', TRUE, TRUE, TRUE),
(32, 87, 'Padre', TRUE, TRUE, TRUE),
(33, 88, 'Madre', TRUE, TRUE, TRUE),

-- Sala de 5 - Familias más complejas, algunos sin padre
(35, 69, 'Padre', TRUE, TRUE, TRUE),
(36, 70, 'Madre', TRUE, TRUE, TRUE),
(37, 71, 'Padre', TRUE, TRUE, TRUE),
(38, 72, 'Madre', TRUE, TRUE, TRUE),
(39, 73, 'Padre', TRUE, TRUE, FALSE),
(40, 74, 'Madre', TRUE, TRUE, TRUE),
(41, 75, 'Padre', TRUE, TRUE, TRUE),
(42, 76, 'Madre', TRUE, TRUE, TRUE),
(43, 77, 'Padre', TRUE, TRUE, FALSE),
(44, 78, 'Madre', TRUE, TRUE, TRUE),
(45, 89, 'Padre', TRUE, TRUE, TRUE),
(46, 90, 'Madre', TRUE, TRUE, TRUE),
(47, 91, 'Padre', TRUE, TRUE, TRUE),
(48, 92, 'Madre', TRUE, TRUE, TRUE);


-- Insert Attendance Records - DISTRIBUCIÓN DESEQUILIBRADA REALISTA
-- Patrones realistas: más ausencias en lunes, mejor asistencia en miércoles, variación por sala
INSERT INTO attendance (student_id, date, status, registered_by) VALUES
-- Day 1: 2025-01-15 (Miércoles) - Mejor asistencia
-- Sala de 3: 7/8 presentes (87.5%)
(15, '2025-01-15', 'present', 6), (16, '2025-01-15', 'present', 6), (17, '2025-01-15', 'present', 6),
(18, '2025-01-15', 'present', 6), (19, '2025-01-15', 'present', 6), (20, '2025-01-15', 'present', 6),
(21, '2025-01-15', 'justified', 6), (22, '2025-01-15', 'present', 6),

-- Sala de 4: 10/12 presentes (83.3%)
(23, '2025-01-15', 'present', 7), (24, '2025-01-15', 'present', 7), (25, '2025-01-15', 'present', 7),
(26, '2025-01-15', 'present', 7), (27, '2025-01-15', 'present', 7), (28, '2025-01-15', 'present', 7),
(29, '2025-01-15', 'present', 7), (30, '2025-01-15', 'present', 7), (31, '2025-01-15', 'absent', 7),
(32, '2025-01-15', 'present', 7), (33, '2025-01-15', 'justified', 7), (34, '2025-01-15', 'present', 7),

-- Sala de 5: 12/14 presentes (85.7%)
(35, '2025-01-15', 'present', 8), (36, '2025-01-15', 'present', 8), (37, '2025-01-15', 'present', 8),
(38, '2025-01-15', 'present', 8), (39, '2025-01-15', 'present', 8), (40, '2025-01-15', 'present', 8),
(41, '2025-01-15', 'present', 8), (42, '2025-01-15', 'present', 8), (43, '2025-01-15', 'present', 8),
(44, '2025-01-15', 'present', 8), (45, '2025-01-15', 'absent', 8), (46, '2025-01-15', 'present', 8),
(47, '2025-01-15', 'justified', 8), (48, '2025-01-15', 'present', 8),

-- Day 2: 2025-01-16 (Jueves) - Asistencia media
-- Sala de 3: 6/8 presentes (75%)
(15, '2025-01-16', 'present', 6), (16, '2025-01-16', 'present', 6), (17, '2025-01-16', 'absent', 6),
(18, '2025-01-16', 'present', 6), (19, '2025-01-16', 'present', 6), (20, '2025-01-16', 'present', 6),
(21, '2025-01-16', 'justified', 6), (22, '2025-01-16', 'present', 6),

-- Sala de 4: 9/12 presentes (75%)
(23, '2025-01-16', 'present', 7), (24, '2025-01-16', 'present', 7), (25, '2025-01-16', 'present', 7),
(26, '2025-01-16', 'absent', 7), (27, '2025-01-16', 'present', 7), (28, '2025-01-16', 'present', 7),
(29, '2025-01-16', 'present', 7), (30, '2025-01-16', 'present', 7), (31, '2025-01-16', 'justified', 7),
(32, '2025-01-16', 'present', 7), (33, '2025-01-16', 'present', 7), (34, '2025-01-16', 'absent', 7),

-- Sala de 5: 11/14 presentes (78.6%)
(35, '2025-01-16', 'present', 8), (36, '2025-01-16', 'present', 8), (37, '2025-01-16', 'present', 8),
(38, '2025-01-16', 'present', 8), (39, '2025-01-16', 'absent', 8), (40, '2025-01-16', 'present', 8),
(41, '2025-01-16', 'present', 8), (42, '2025-01-16', 'present', 8), (43, '2025-01-16', 'justified', 8),
(44, '2025-01-16', 'present', 8), (45, '2025-01-16', 'present', 8), (46, '2025-01-16', 'present', 8),
(47, '2025-01-16', 'absent', 8), (48, '2025-01-16', 'present', 8),

-- Day 3: 2025-01-17 (Viernes) - Asistencia variable por sala
-- Sala de 3: 5/8 presentes (62.5%) - Peor asistencia
(15, '2025-01-17', 'present', 6), (16, '2025-01-17', 'absent', 6), (17, '2025-01-17', 'present', 6),
(18, '2025-01-17', 'present', 6), (19, '2025-01-17', 'absent', 6), (20, '2025-01-17', 'justified', 6),
(21, '2025-01-17', 'present', 6), (22, '2025-01-17', 'present', 6),

-- Sala de 4: 8/12 presentes (66.7%) - Asistencia media
(23, '2025-01-17', 'present', 7), (24, '2025-01-17', 'present', 7), (25, '2025-01-17', 'absent', 7),
(26, '2025-01-17', 'present', 7), (27, '2025-01-17', 'present', 7), (28, '2025-01-17', 'justified', 7),
(29, '2025-01-17', 'present', 7), (30, '2025-01-17', 'absent', 7), (31, '2025-01-17', 'present', 7),
(32, '2025-01-17', 'present', 7), (33, '2025-01-17', 'absent', 7), (34, '2025-01-17', 'present', 7),

-- Sala de 5: 10/14 presentes (71.4%) - Mejor asistencia
(35, '2025-01-17', 'present', 8), (36, '2025-01-17', 'present', 8), (37, '2025-01-17', 'absent', 8),
(38, '2025-01-17', 'present', 8), (39, '2025-01-17', 'present', 8), (40, '2025-01-17', 'justified', 8),
(41, '2025-01-17', 'present', 8), (42, '2025-01-17', 'present', 8), (43, '2025-01-17', 'absent', 8),
(44, '2025-01-17', 'present', 8), (45, '2025-01-17', 'present', 8), (46, '2025-01-17', 'present', 8),
(47, '2025-01-17', 'absent', 8), (48, '2025-01-17', 'present', 8);
