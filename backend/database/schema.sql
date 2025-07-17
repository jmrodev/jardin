-- Create database
DROP DATABASE IF EXISTS kindergarten_db;
CREATE DATABASE IF NOT EXISTS kindergarten_db;
USE kindergarten_db;

-- Persons table with Single Table Inheritance
CREATE TABLE persons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  person_type ENUM('student', 'teacher', 'director', 'parent', 'admin', 'preceptor') NOT NULL,

  -- Common fields for all persons
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
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

  -- Fields for parents
  occupation VARCHAR(100),

  -- Fields for teachers
  specialization VARCHAR(100),

  -- Fields for directors
  administrative_role VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (created_by) REFERENCES persons(id),
  FOREIGN KEY (updated_by) REFERENCES persons(id)
);

-- Attendance table
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'justified') NOT NULL,
  observations TEXT,
  registered_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY (registered_by) REFERENCES persons(id),
  UNIQUE KEY unique_attendance (student_id, date)
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
-- DATA POPULATION SCRIPT (v2 - Complete & Consistent Data)
-- =================================================================

-- Deactivate foreign key checks to truncate tables
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate tables to clear all previous data and reset auto-increment
TRUNCATE TABLE attendance;
TRUNCATE TABLE persons;

-- Reactivate foreign key checks
SET FOREIGN_KEY_CHECKS = 1;


-- Insert Staff: Admin, Directors, Preceptors, Teachers
-- Note: All users share a default password: 'password' -> $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO persons (id, person_type, name, lastname, dni, address, phone, email, birthdate, username, password, hire_date, administrative_role, specialization) VALUES
-- Admin (ID: 1)
(1, 'admin', 'Admin', 'Global', '10000000A', 'Av. del Sistema 123', '600111111', 'admin@jardin.com', '1980-01-01', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-01-01', 'System Administrator', NULL),
-- Directors (IDs: 2, 3)
(2, 'director', 'Maria', 'Gonzalez', '20000000B', 'Calle Principal 456', '600222222', 'director.mg@jardin.com', '1975-05-10', 'director_mg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-02-01', 'General Director', NULL),
(3, 'director', 'Carlos', 'Rodriguez', '30000000C', 'Plaza Central 789', '600333333', 'director.cr@jardin.com', '1982-08-20', 'director_cr', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-03-01', 'Academic Director', NULL),
-- Preceptors (IDs: 4, 5)
(4, 'preceptor', 'Laura', 'Fernandez', '40000000D', 'Paseo de la Reforma 101', '600444444', 'preceptor.lf@jardin.com', '1990-11-15', 'preceptor_lf', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-04-01', NULL, NULL),
(5, 'preceptor', 'Sofia', 'Perez', '50000000E', 'Calle Secundaria 212', '600555555', 'preceptor.sp@jardin.com', '1992-02-25', 'preceptor_sp', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-05-01', NULL, NULL),
-- Teachers (IDs: 6-14)
(6, 'teacher', 'Ana', 'Martinez', '60000000F', 'Av. de los Maestros 303', '600666666', 'teacher.am@jardin.com', '1988-07-30', 'teacher_am', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-06-01', NULL, 'Early Childhood Education'),
(7, 'teacher', 'Juan', 'Lopez', '70000000G', 'Calle del Saber 404', '600777777', 'teacher.jl@jardin.com', '1991-09-05', 'teacher_jl', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-07-01', NULL, 'Psychomotricity'),
(8, 'teacher', 'Lucia', 'Garcia', '80000000H', 'Rincon del Arte 505', '600888888', 'teacher.lg@jardin.com', '1985-04-12', 'teacher_lg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-08-01', NULL, 'Music and Arts'),
(9, 'teacher', 'David', 'Sanchez', '90000000I', 'Paseo de los Niños 606', '600999999', 'teacher.ds@jardin.com', '1993-01-20', 'teacher_ds', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-09-01', NULL, 'Early Childhood Education'),
(10, 'teacher', 'Elena', 'Romero', '11000000J', 'Av. Integracion 707', '611000000', 'teacher.er@jardin.com', '1989-06-18', 'teacher_er', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-10-01', NULL, 'Special Needs Education'),
(11, 'teacher', 'Pablo', 'Diaz', '12000000K', 'Calle del Deporte 808', '612111111', 'teacher.pd@jardin.com', '1994-03-10', 'teacher_pd', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-11-01', NULL, 'Psychomotricity'),
(12, 'teacher', 'Carmen', 'Alonso', '13000000L', 'Plaza de la Musica 909', '613222222', 'teacher.ca@jardin.com', '1986-12-01', 'teacher_ca', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2023-12-01', NULL, 'Music and Arts'),
(13, 'teacher', 'Adrian', 'Moreno', '14000000M', 'Av. del Crecimiento 111', '614333333', 'teacher.am2@jardin.com', '1995-05-22', 'teacher_am2', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-01', NULL, 'Early Childhood Education'),
(14, 'teacher', 'Isabel', 'Jimenez', '15000000N', 'Ronda del Futuro 222', '615444444', 'teacher.ij@jardin.com', '1990-10-03', 'teacher_ij', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-02-01', NULL, 'Early Childhood Education');

-- Insert Students (IDs: 15-44)
INSERT INTO persons (id, person_type, name, lastname, dni, address, phone, email, birthdate, registration_date, status) VALUES
(15, 'student', 'Lucas', 'Vega', '78901234A', 'Calle Falsa 123', '620111111', 'lucas.vega@email.com', '2021-03-15', '2024-03-01', 'active'),
(16, 'student', 'Martina', 'Rios', '78901234B', 'Av. Siempreviva 742', '620222222', 'martina.rios@email.com', '2021-05-20', '2024-03-01', 'active'),
(17, 'student', 'Hugo', 'Castillo', '78901234C', 'Paseo del Prado 10', '620333333', 'hugo.castillo@email.com', '2021-07-10', '2024-03-01', 'active'),
(18, 'student', 'Valeria', 'Navarro', '78901234D', 'Calle Alcala 200', '620444444', 'valeria.navarro@email.com', '2021-09-05', '2024-03-01', 'active'),
(19, 'student', 'Mateo', 'Soto', '78901234E', 'Gran Via 50', '620555555', 'mateo.soto@email.com', '2021-11-25', '2024-03-01', 'active'),
(20, 'student', 'Sofia', 'Molina', '78901234F', 'Plaza Mayor 1', '620666666', 'sofia.molina@email.com', '2020-02-18', '2024-03-01', 'active'),
(21, 'student', 'Leo', 'Herrera', '78901234G', 'Calle Serrano 30', '620777777', 'leo.herrera@email.com', '2020-04-30', '2024-03-01', 'active'),
(22, 'student', 'Julia', 'Castro', '78901234H', 'Paseo de la Castellana 150', '620888888', 'julia.castro@email.com', '2020-06-22', '2024-03-01', 'active'),
(23, 'student', 'Daniel', 'Ortega', '78901234I', 'Calle Goya 80', '620999999', 'daniel.ortega@email.com', '2020-08-14', '2024-03-01', 'active'),
(24, 'student', 'Alba', 'Gimenez', '78901234J', 'Av. de America 25', '621000000', 'alba.gimenez@email.com', '2020-10-09', '2024-03-01', 'active'),
(25, 'student', 'Enzo', 'Reyes', '78901234K', 'Calle Princesa 5', '621111111', 'enzo.reyes@email.com', '2021-01-12', '2024-03-01', 'active'),
(26, 'student', 'Olivia', 'Vargas', '78901234L', 'Calle Fuencarral 99', '621222222', 'olivia.vargas@email.com', '2021-03-28', '2024-03-01', 'active'),
(27, 'student', 'Mario', 'Guerrero', '78901234M', 'Paseo de las Delicias 33', '621333333', 'mario.guerrero@email.com', '2021-05-19', '2024-03-01', 'active'),
(28, 'student', 'Alejandra', 'Cano', '78901234N', 'Ronda de Valencia 12', '621444444', 'alejandra.cano@email.com', '2021-07-02', '2024-03-01', 'active'),
(29, 'student', 'Diego', 'Prieto', '78901234P', 'Calle Atocha 45', '621555555', 'diego.prieto@email.com', '2021-09-11', '2024-03-01', 'active'),
(30, 'student', 'Carla', 'Santos', '78901234Q', 'Calle Hortaleza 67', '621666666', 'carla.santos@email.com', '2020-02-05', '2024-03-01', 'active'),
(31, 'student', 'Javier', 'Gallego', '78901234R', 'Av. Reina Victoria 88', '621777777', 'javier.gallego@email.com', '2020-04-01', '2024-03-01', 'active'),
(32, 'student', 'Lucia', 'Pascual', '78901234S', 'Calle de Bravo Murillo 123', '621888888', 'lucia.pascual@email.com', '2020-06-13', '2024-03-01', 'active'),
(33, 'student', 'Marcos', 'Blanco', '78901234T', 'Calle de Lopez de Hoyos 210', '621999999', 'marcos.blanco@email.com', '2020-08-27', '2024-03-01', 'active'),
(34, 'student', 'Irene', 'Iglesias', '78901234U', 'Paseo de la Habana 55', '622000000', 'irene.iglesias@email.com', '2020-10-30', '2024-03-01', 'active'),
(35, 'student', 'Samuel', 'Sanz', '78901234V', 'Calle de Arturo Soria 300', '622111111', 'samuel.sanz@email.com', '2021-01-21', '2024-03-01', 'active'),
(36, 'student', 'Aitana', 'Medina', '78901234W', 'Av. de los Poblados 50', '622222222', 'aitana.medina@email.com', '2021-04-14', '2024-03-01', 'active'),
(37, 'student', 'Hector', 'Rojas', '78901234X', 'Calle de la Oca 19', '622333333', 'hector.rojas@email.com', '2021-06-08', '2024-03-01', 'active'),
(38, 'student', 'Sara', 'Suarez', '78901234Y', 'Av. de la Albufera 140', '622444444', 'sara.suarez@email.com', '2021-08-01', '2024-03-01', 'active'),
(39, 'student', 'Ruben', 'Gil', '78901234Z', 'Calle de Marcelo Usera 1', '622555555', 'ruben.gil@email.com', '2021-10-18', '2024-03-01', 'active'),
(40, 'student', 'Marina', 'Vicente', '67890123A', 'Av. de Moratalaz 100', '622666666', 'marina.vicente@email.com', '2020-03-10', '2024-03-01', 'active'),
(41, 'student', 'Oscar', 'Mora', '67890123B', 'Calle del Camino de los Vinateros 5', '622777777', 'oscar.mora@email.com', '2020-05-14', '2024-03-01', 'active'),
(42, 'student', 'Claudia', 'Serrano', '67890123C', 'Paseo de la Alameda de Osuna 20', '622888888', 'claudia.serrano@email.com', '2020-07-25', '2024-03-01', 'active'),
(43, 'student', 'Jorge', 'Roca', '67890123D', 'Calle de Alcala 500', '622999999', 'jorge.roca@email.com', '2020-09-09', '2024-03-01', 'active'),
(44, 'student', 'Nerea', 'Hernandez', '67890123E', 'Av. del Cardenal Herrera Oria 150', '623000000', 'nerea.hernandez@email.com', '2020-11-11', '2024-03-01', 'active');


-- Insert Parents/Guardians (IDs: 45-64)
INSERT INTO persons (id, person_type, name, lastname, dni, address, phone, email, birthdate, occupation) VALUES
(45, 'parent', 'Javier', 'Vega', '56789012A', 'Calle Falsa 123', '630111111', 'j.vega@email.com', '1985-01-10', 'Architect'),
(46, 'parent', 'Isabel', 'Rios', '56789012B', 'Av. Siempreviva 742', '630222222', 'i.rios@email.com', '1988-02-20', 'Doctor'),
(47, 'parent', 'Fernando', 'Castillo', '56789012C', 'Paseo del Prado 10', '630333333', 'f.castillo@email.com', '1982-03-15', 'Engineer'),
(48, 'parent', 'Beatriz', 'Navarro', '56789012D', 'Calle Alcala 200', '630444444', 'b.navarro@email.com', '1990-04-25', 'Lawyer'),
(49, 'parent', 'Roberto', 'Soto', '56789012E', 'Gran Via 50', '630555555', 'r.soto@email.com', '1986-05-30', 'Designer'),
(50, 'parent', 'Gabriela', 'Molina', '56789012F', 'Plaza Mayor 1', '630666666', 'g.molina@email.com', '1989-06-05', 'Accountant'),
(51, 'parent', 'Miguel', 'Herrera', '56789012G', 'Calle Serrano 30', '630777777', 'm.herrera@email.com', '1984-07-12', 'Chef'),
(52, 'parent', 'Silvia', 'Castro', '56789012H', 'Paseo de la Castellana 150', '630888888', 's.castro@email.com', '1987-08-18', 'Nurse'),
(53, 'parent', 'Ricardo', 'Ortega', '56789012I', 'Calle Goya 80', '630999999', 'r.ortega@email.com', '1983-09-22', 'Mechanic'),
(54, 'parent', 'Natalia', 'Gimenez', '56789012J', 'Av. de America 25', '631000000', 'n.gimenez@email.com', '1991-10-28', 'Journalist'),
(55, 'parent', 'Oscar', 'Cruz', '45678901K', 'Calle Princesa 5', '631111111', 'o.cruz@email.com', '1985-11-03', 'Pilot'),
(56, 'parent', 'Raquel', 'Reyes', '45678901L', 'Calle Fuencarral 99', '631222222', 'r.reyes@email.com', '1988-12-09', 'Scientist'),
(57, 'parent', 'Jorge', 'Vargas', '45678901M', 'Paseo de las Delicias 33', '631333333', 'j.vargas@email.com', '1982-01-14', 'Photographer'),
(58, 'parent', 'Esther', 'Guerrero', '45678901N', 'Ronda de Valencia 12', '631444444', 'e.guerrero@email.com', '1990-02-19', 'Musician'),
(59, 'parent', 'Francisco', 'Cano', '45678901P', 'Calle Atocha 45', '631555555', 'f.cano@email.com', '1986-03-25', 'Artist'),
(60, 'parent', 'Teresa', 'Prieto', '45678901Q', 'Calle Hortaleza 67', '631666666', 't.prieto@email.com', '1989-04-01', 'Veterinarian'),
(61, 'parent', 'Hector', 'Santos', '45678901R', 'Av. Reina Victoria 88', '631777777', 'h.santos@email.com', '1984-05-07', 'Police Officer'),
(62, 'parent', 'Monica', 'Gallego', '45678901S', 'Calle de Bravo Murillo 123', '631888888', 'm.gallego@email.com', '1987-06-13', 'Firefighter'),
(63, 'parent', 'Sergio', 'Pascual', '45678901T', 'Calle de Lopez de Hoyos 210', '631999999', 's.pascual@email.com', '1983-07-19', 'Software Developer'),
(64, 'parent', 'Cristina', 'Blanco', '45678901U', 'Paseo de la Habana 55', '632000000', 'c.blanco@email.com', '1991-08-24', 'Project Manager');


-- Insert Attendance Records for the last 3 days
-- Assuming today is 2024-05-24
INSERT INTO attendance (student_id, date, status, registered_by) VALUES
-- Day 1: 2024-05-22
(15, '2024-05-22', 'present', 6), (16, '2024-05-22', 'present', 6), (17, '2024-05-22', 'absent', 6),
(18, '2024-05-22', 'present', 7), (19, '2024-05-22', 'justified', 7), (20, '2024-05-22', 'present', 7),
(21, '2024-05-22', 'present', 8), (22, '2024-05-22', 'present', 8), (23, '2024-05-22', 'present', 9),
(24, '2024-05-22', 'absent', 9), (25, '2024-05-22', 'present', 10), (26, '2024-05-22', 'present', 10),

-- Day 2: 2024-05-23
(15, '2024-05-23', 'present', 11), (16, '2024-05-23', 'absent', 11), (17, '2024-05-23', 'present', 11),
(18, '2024-05-23', 'present', 12), (19, '2024-05-23', 'present', 12), (20, '2024-05-23', 'justified', 12),
(21, '2024-05-23', 'present', 13), (22, '2024-05-23', 'present', 13), (23, '2024-05-23', 'absent', 14),
(24, '2024-05-23', 'present', 14), (25, '2024-05-23', 'present', 6), (26, '2024-05-23', 'justified', 6),

-- Day 3: 2024-05-24
(15, '2024-05-24', 'present', 7), (16, '2024-05-24', 'present', 7), (17, '2024-05-24', 'present', 7),
(18, '2024-05-24', 'absent', 8), (19, '2024-05-24', 'present', 8), (20, '2024-05-24', 'present', 8),
(21, '2024-05-24', 'justified', 9), (22, '2024-05-24', 'present', 9), (23, '2024-05-24', 'present', 10),
(24, '2024-05-24', 'present', 10), (25, '2024-05-24', 'absent', 11), (26, '2024-05-24', 'present', 11);
