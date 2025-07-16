-- Create database
DROP DATABASE IF EXISTS kindergarten_db;
CREATE DATABASE IF NOT EXISTS kindergarten_db;
USE kindergarten_db;

-- Staff table (teachers, directors, preceptors)
CREATE TABLE staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('teacher', 'director', 'admin', 'preceptor') NOT NULL,
  phone VARCHAR(20),
  hire_date DATE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_staff_role (role),
  INDEX idx_staff_active (active),
  INDEX idx_staff_username (username),
  INDEX idx_staff_email (email),
  INDEX idx_staff_name (name, lastname)
);

-- Persons table (padres, madres, tutores, familiares, etc.)
CREATE TABLE IF NOT EXISTS persons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(100),
  relationship ENUM('padre', 'madre', 'tutor', 'familiar', 'otro') NOT NULL
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname_father VARCHAR(100) NOT NULL,
  lastname_mother VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  dni VARCHAR(20) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('varón', 'mujer') NOT NULL,
  classroom VARCHAR(50) NOT NULL,
  shift VARCHAR(50) NOT NULL,
  special_education BOOLEAN DEFAULT FALSE,
  needs_assistant BOOLEAN DEFAULT NULL,
  special_diet BOOLEAN DEFAULT FALSE,
  celiac BOOLEAN DEFAULT NULL,
  diabetic BOOLEAN DEFAULT NULL,
  takes_dairy BOOLEAN DEFAULT NULL,
  care_diseases TEXT DEFAULT NULL,
  medication TEXT DEFAULT NULL,
  diapers BOOLEAN DEFAULT FALSE,
  diaper_responsible VARCHAR(100) DEFAULT NULL,
  authorized_pickups JSON DEFAULT NULL
);

-- Student responsibles table (padre, madre, tutores, familiares, etc. con permisos)
CREATE TABLE IF NOT EXISTS student_responsibles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  person_id INT NOT NULL,
  can_pickup BOOLEAN DEFAULT FALSE,
  can_change_diapers BOOLEAN DEFAULT FALSE,
  notes TEXT,
  type ENUM('padre', 'madre', 'tutor', 'familiar', 'otro') NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  present BOOLEAN DEFAULT FALSE,
  observations TEXT,
  registered_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (registered_by) REFERENCES staff(id),
  UNIQUE KEY unique_attendance (student_id, date),
  INDEX idx_attendance_date (date),
  INDEX idx_attendance_student_date (student_id, date),
  INDEX idx_attendance_present (present),
  INDEX idx_attendance_registered_by (registered_by)
);

-- Insert default users with different roles
INSERT INTO staff (name, lastname, username, email, password, role, phone, hire_date) VALUES 
('Admin', 'System', 'admin', 'admin@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '11-1111-1111', '2024-01-01'),
('Maria', 'Gonzalez', 'director', 'director@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'director', '11-2222-2222', '2024-01-15'),
('Ana', 'Martinez', 'teacher', 'teacher@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', '11-3333-3333', '2024-02-01'),
('Carlos', 'Lopez', 'preceptor', 'preceptor@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'preceptor', '11-4444-4444', '2024-02-15');

-- Poblar la tabla persons con datos de ejemplo
INSERT INTO persons (name, lastname, dni, address, phone, email, relationship) VALUES
-- Padres y madres
('Juan', 'Pérez', '12345678', 'Calle Falsa 123', '111111111', 'juan@mail.com', 'padre'),
('María', 'Gómez', '87654321', 'Calle Falsa 123', '222222222', 'maria@mail.com', 'madre'),
('Roberto', 'García', '33445566', 'Calle Vieja 654', '666666666', 'roberto@mail.com', 'padre'),
('Laura', 'Martínez', '99887766', 'Calle Nueva 321', '555555555', 'laura@mail.com', 'madre'),
('Carlos', 'López', '11223344', 'Calle Real 456', '333333333', 'carlos@mail.com', 'padre'),
('Ana', 'Sánchez', '55667788', 'Calle Real 789', '444444444', 'ana@mail.com', 'madre'),
('Miguel', 'Torres', '44556677', 'Calle Norte 222', '888888888', 'miguel@mail.com', 'padre'),
('Sofía', 'Ruiz', '22334455', 'Calle Sur 111', '777777777', 'sofia@mail.com', 'madre'),
('Fernando', 'Díaz', '99887755', 'Calle Este 333', '999999999', 'fernando@mail.com', 'padre'),
('Carmen', 'Vega', '88776644', 'Calle Oeste 444', '000000000', 'carmen@mail.com', 'madre'),
('Luis', 'Mendoza', '77665533', 'Calle Centro 555', '111111112', 'luis@mail.com', 'padre'),
('Patricia', 'Castro', '66554422', 'Calle Plaza 666', '222222223', 'patricia@mail.com', 'madre'),

-- Tutores y familiares
('Elena', 'Morales', '55443311', 'Calle Jardín 777', '333333334', 'elena@mail.com', 'tutor'),
('Ricardo', 'Flores', '44332200', 'Calle Parque 888', '444444445', 'ricardo@mail.com', 'tutor'),
('Isabel', 'Rojas', '33221199', 'Calle Bosque 999', '555555556', 'isabel@mail.com', 'familiar'),
('Diego', 'Silva', '22110088', 'Calle Río 111', '666666667', 'diego@mail.com', 'familiar'),
('Valeria', 'Cruz', '11009977', 'Calle Montaña 222', '777777778', 'valeria@mail.com', 'tutor'),
('Andrés', 'Reyes', '00998866', 'Calle Valle 333', '888888889', 'andres@mail.com', 'familiar');

-- Poblar la tabla students con varios alumnos
INSERT INTO students (firstname, lastname_father, lastname_mother, address, dni, birth_date, gender, classroom, shift) VALUES
-- Sala 3 - Mañana (3-4 años)
('Pedro', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000001', '2021-05-10', 'varón', 'Sala 3', 'Mañana'),
('Martín', 'Sánchez', 'Ruiz', 'Calle Sur 111', '10000003', '2021-01-20', 'varón', 'Sala 3', 'Mañana'),
('Santiago', 'López', 'Sánchez', 'Calle Real 456', '10000006', '2021-08-15', 'varón', 'Sala 3', 'Mañana'),
('Emma', 'Torres', 'López', 'Calle Real 456', '10000007', '2020-11-30', 'mujer', 'Sala 3', 'Mañana'),
('Mateo', 'Díaz', 'Vega', 'Calle Este 333', '10000008', '2021-03-12', 'varón', 'Sala 3', 'Mañana'),

-- Sala 4 - Mañana (4-5 años)
('Agustina', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000005', '2020-03-22', 'mujer', 'Sala 4', 'Mañana'),
('Benjamín', 'Mendoza', 'Castro', 'Calle Centro 555', '10000009', '2020-07-08', 'varón', 'Sala 4', 'Mañana'),
('Sofía', 'Morales', 'Flores', 'Calle Jardín 777', '10000010', '2020-12-25', 'mujer', 'Sala 4', 'Mañana'),
('Lucas', 'Rojas', 'Silva', 'Calle Bosque 999', '10000011', '2020-04-18', 'varón', 'Sala 4', 'Mañana'),
('Isabella', 'Cruz', 'Reyes', 'Calle Montaña 222', '10000012', '2020-09-03', 'mujer', 'Sala 4', 'Mañana'),

-- Sala 4 - Tarde (4-5 años)
('Lucía', 'García', 'Martínez', 'Calle Nueva 321', '10000002', '2020-09-15', 'mujer', 'Sala 4', 'Tarde'),
('Tomás', 'García', 'Martínez', 'Calle Nueva 321', '10000013', '2020-06-20', 'varón', 'Sala 4', 'Tarde'),
('Mía', 'López', 'Sánchez', 'Calle Real 456', '10000014', '2020-01-14', 'mujer', 'Sala 4', 'Tarde'),
('Nicolás', 'Torres', 'López', 'Calle Real 456', '10000015', '2020-10-07', 'varón', 'Sala 4', 'Tarde'),
('Camila', 'Díaz', 'Vega', 'Calle Este 333', '10000016', '2020-02-28', 'mujer', 'Sala 4', 'Tarde'),

-- Sala 5 - Mañana (5-6 años)
('Valentina', 'Torres', 'López', 'Calle Real 456', '10000004', '2020-12-05', 'mujer', 'Sala 5', 'Mañana'),
('Alejandro', 'Mendoza', 'Castro', 'Calle Centro 555', '10000017', '2019-08-12', 'varón', 'Sala 5', 'Mañana'),
('Victoria', 'Morales', 'Flores', 'Calle Jardín 777', '10000018', '2019-11-30', 'mujer', 'Sala 5', 'Mañana'),
('Daniel', 'Rojas', 'Silva', 'Calle Bosque 999', '10000019', '2019-05-25', 'varón', 'Sala 5', 'Mañana'),
('Gabriela', 'Cruz', 'Reyes', 'Calle Montaña 222', '10000020', '2019-12-10', 'mujer', 'Sala 5', 'Mañana'),

-- Sala 5 - Tarde (5-6 años)
('Joaquín', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000021', '2019-07-18', 'varón', 'Sala 5', 'Tarde'),
('Renata', 'Sánchez', 'Ruiz', 'Calle Sur 111', '10000022', '2019-03-05', 'mujer', 'Sala 5', 'Tarde'),
('Maximiliano', 'García', 'Martínez', 'Calle Nueva 321', '10000023', '2019-09-22', 'varón', 'Sala 5', 'Tarde'),
('Antonella', 'López', 'Sánchez', 'Calle Real 456', '10000024', '2019-01-15', 'mujer', 'Sala 5', 'Tarde'),
('Thiago', 'Torres', 'López', 'Calle Real 456', '10000025', '2019-06-08', 'varón', 'Sala 5', 'Tarde');

-- Poblar la tabla student_responsibles con asociaciones y permisos
-- Sala 3 - Mañana
INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, notes, type) VALUES
-- Pedro (id=1) - Padre y madre con permisos completos
(1, 1, TRUE, TRUE, 'Padre principal', 'padre'),
(1, 2, TRUE, TRUE, 'Madre principal', 'madre'),
(1, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Martín (id=3) - Solo padre con permisos
(3, 5, TRUE, TRUE, 'Padre principal', 'padre'),
(3, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Santiago (id=6) - Padre y madre
(6, 7, TRUE, FALSE, 'Padre principal', 'padre'),
(6, 8, TRUE, TRUE, 'Madre principal', 'madre'),

-- Emma (id=7) - Madre y tutor
(7, 9, TRUE, TRUE, 'Madre principal', 'madre'),
(7, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Mateo (id=8) - Padre y familiar
(8, 10, TRUE, TRUE, 'Padre principal', 'padre'),
(8, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Sala 4 - Mañana
-- Agustina (id=5) - Padre y madre
(5, 1, TRUE, FALSE, 'Padre principal', 'padre'),
(5, 2, TRUE, TRUE, 'Madre principal', 'madre'),

-- Benjamín (id=9) - Solo padre
(9, 11, TRUE, TRUE, 'Padre principal', 'padre'),

-- Sofía (id=10) - Madre y tutor
(10, 12, TRUE, TRUE, 'Madre principal', 'madre'),
(10, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Lucas (id=11) - Padre y familiar
(11, 5, TRUE, FALSE, 'Padre principal', 'padre'),
(11, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Isabella (id=12) - Madre y tutor
(12, 6, TRUE, TRUE, 'Madre principal', 'madre'),
(12, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Sala 4 - Tarde
-- Lucía (id=2) - Padre y madre
(2, 3, TRUE, FALSE, 'Padre principal', 'padre'),
(2, 4, TRUE, TRUE, 'Madre principal', 'madre'),

-- Tomás (id=13) - Solo padre
(13, 3, TRUE, TRUE, 'Padre principal', 'padre'),

-- Mía (id=14) - Madre y familiar
(14, 4, TRUE, TRUE, 'Madre principal', 'madre'),
(14, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Nicolás (id=15) - Padre y tutor
(15, 7, TRUE, FALSE, 'Padre principal', 'padre'),
(15, 13, TRUE, TRUE, 'Tutor de emergencia', 'tutor'),

-- Camila (id=16) - Madre y familiar
(16, 8, TRUE, TRUE, 'Madre principal', 'madre'),
(16, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Sala 5 - Mañana
-- Valentina (id=4) - Padre y madre
(4, 9, TRUE, FALSE, 'Padre principal', 'padre'),
(4, 10, TRUE, TRUE, 'Madre principal', 'madre'),

-- Alejandro (id=17) - Solo padre
(17, 11, TRUE, TRUE, 'Padre principal', 'padre'),

-- Victoria (id=18) - Madre y tutor
(18, 12, TRUE, TRUE, 'Madre principal', 'madre'),
(18, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Daniel (id=19) - Padre y familiar
(19, 1, TRUE, FALSE, 'Padre principal', 'padre'),
(19, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Gabriela (id=20) - Madre y tutor
(20, 2, TRUE, TRUE, 'Madre principal', 'madre'),
(20, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Sala 5 - Tarde
-- Joaquín (id=21) - Padre y madre
(21, 1, TRUE, FALSE, 'Padre principal', 'padre'),
(21, 2, TRUE, TRUE, 'Madre principal', 'madre'),

-- Renata (id=22) - Solo madre
(22, 4, TRUE, TRUE, 'Madre principal', 'madre'),

-- Maximiliano (id=23) - Padre y familiar
(23, 3, TRUE, FALSE, 'Padre principal', 'padre'),
(23, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar'),

-- Antonella (id=24) - Madre y tutor
(24, 6, TRUE, TRUE, 'Madre principal', 'madre'),
(24, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor'),

-- Thiago (id=25) - Padre y familiar
(25, 7, TRUE, TRUE, 'Padre principal', 'padre'),
(25, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar');
