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
('Juan', 'Pérez', '12345678', 'Calle Falsa 123', '111111111', 'juan@mail.com', 'padre'),
('María', 'Gómez', '87654321', 'Calle Falsa 123', '222222222', 'maria@mail.com', 'madre'),
('Ana', 'López', '11223344', 'Calle Real 456', '333333333', 'ana@mail.com', 'tutor'),
('Carlos', 'Sánchez', '55667788', 'Calle Real 789', '444444444', 'carlos@mail.com', 'familiar'),
('Laura', 'Martínez', '99887766', 'Calle Nueva 321', '555555555', 'laura@mail.com', 'madre'),
('Pedro', 'García', '33445566', 'Calle Vieja 654', '666666666', 'pedro@mail.com', 'padre'),
('Sofía', 'Ruiz', '22334455', 'Calle Sur 111', '777777777', 'sofia@mail.com', 'tutor'),
('Miguel', 'Torres', '44556677', 'Calle Norte 222', '888888888', 'miguel@mail.com', 'familiar');

-- Poblar la tabla students con varios alumnos
INSERT INTO students (firstname, lastname_father, lastname_mother, address, dni, birth_date, classroom, shift) VALUES
('Pedro', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000001', '2018-05-10', 'Sala 3', 'Mañana'),
('Lucía', 'García', 'Martínez', 'Calle Nueva 321', '10000002', '2017-09-15', 'Sala 4', 'Tarde'),
('Martín', 'Sánchez', 'Ruiz', 'Calle Sur 111', '10000003', '2019-01-20', 'Sala 3', 'Mañana'),
('Valentina', 'Torres', 'López', 'Calle Real 456', '10000004', '2018-12-05', 'Sala 5', 'Tarde'),
('Agustina', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000005', '2017-03-22', 'Sala 4', 'Mañana');

-- Poblar la tabla student_responsibles con asociaciones y permisos
-- Pedro (id=1) tiene como padre a Juan (id=1), madre a María (id=2), tutor a Ana (id=3)
INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, notes, type) VALUES
(1, 1, TRUE, TRUE, '', 'padre'),
(1, 2, TRUE, FALSE, '', 'madre'),
(1, 3, TRUE, TRUE, 'Puede retirar solo los viernes', 'tutor'),
(1, 4, FALSE, TRUE, 'Solo cambia pañales', 'familiar'),
-- Lucía (id=2) tiene como padre a Pedro (id=6), madre a Laura (id=5)
(2, 6, TRUE, FALSE, '', 'padre'),
(2, 5, TRUE, TRUE, '', 'madre'),
-- Martín (id=3) tiene como tutor a Sofía (id=7)
(3, 7, TRUE, TRUE, '', 'tutor'),
-- Valentina (id=4) tiene como familiar a Miguel (id=8)
(4, 8, FALSE, TRUE, 'Solo cambia pañales', 'familiar'),
-- Agustina (id=5) tiene como padre a Juan (id=1), madre a María (id=2)
(5, 1, TRUE, FALSE, '', 'padre'),
(5, 2, TRUE, TRUE, '', 'madre');
