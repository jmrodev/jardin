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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (created_by) REFERENCES staff(id),
  FOREIGN KEY (updated_by) REFERENCES staff(id),
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
  relationship ENUM('padre', 'madre', 'tutor', 'familiar', 'otro') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (created_by) REFERENCES staff(id),
  FOREIGN KEY (updated_by) REFERENCES staff(id)
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
  authorized_pickups JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (created_by) REFERENCES staff(id),
  FOREIGN KEY (updated_by) REFERENCES staff(id)
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES staff(id),
  FOREIGN KEY (updated_by) REFERENCES staff(id)
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (registered_by) REFERENCES staff(id),
  FOREIGN KEY (created_by) REFERENCES staff(id),
  FOREIGN KEY (updated_by) REFERENCES staff(id),
  UNIQUE KEY unique_attendance (student_id, date),
  INDEX idx_attendance_date (date),
  INDEX idx_attendance_student_date (student_id, date),
  INDEX idx_attendance_present (present),
  INDEX idx_attendance_registered_by (registered_by)
);

-- Insert default users with different roles
INSERT INTO staff (name, lastname, username, email, password, role, phone, hire_date, created_by, updated_by) VALUES 
('Admin', 'System', 'admin', 'admin@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '11-1111-1111', '2024-01-01', 1, 1),
('Maria', 'Gonzalez', 'director', 'director@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'director', '11-2222-2222', '2024-01-15', 1, 1),
('Ana', 'Martinez', 'teacher', 'teacher@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', '11-3333-3333', '2024-02-01', 1, 1),
('Carlos', 'Lopez', 'preceptor', 'preceptor@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'preceptor', '11-4444-4444', '2024-02-15', 1, 1);

-- Actualizar datos existentes con valores de auditoría por defecto
UPDATE staff SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE students SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE persons SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE student_responsibles SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE attendance SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;

-- Poblar la tabla persons con datos de ejemplo
INSERT INTO persons (name, lastname, dni, address, phone, email, relationship, created_by, updated_by) VALUES
-- Padres y madres
('Juan', 'Pérez', '12345678', 'Calle Falsa 123', '111111111', 'juan@mail.com', 'padre', 1, 1),
('María', 'Gómez', '87654321', 'Calle Falsa 123', '222222222', 'maria@mail.com', 'madre', 1, 1),
('Roberto', 'García', '33445566', 'Calle Vieja 654', '666666666', 'roberto@mail.com', 'padre', 1, 1),
('Laura', 'Martínez', '99887766', 'Calle Nueva 321', '555555555', 'laura@mail.com', 'madre', 1, 1),
('Carlos', 'López', '11223344', 'Calle Real 456', '333333333', 'carlos@mail.com', 'padre', 1, 1),
('Ana', 'Sánchez', '55667788', 'Calle Real 789', '444444444', 'ana@mail.com', 'madre', 1, 1),
('Miguel', 'Torres', '44556677', 'Calle Norte 222', '888888888', 'miguel@mail.com', 'padre', 1, 1),
('Sofía', 'Ruiz', '22334455', 'Calle Sur 111', '777777777', 'sofia@mail.com', 'madre', 1, 1),
('Fernando', 'Díaz', '99887755', 'Calle Este 333', '999999999', 'fernando@mail.com', 'padre', 1, 1),
('Carmen', 'Vega', '88776644', 'Calle Oeste 444', '000000000', 'carmen@mail.com', 'madre', 1, 1),
('Luis', 'Mendoza', '77665533', 'Calle Centro 555', '111111112', 'luis@mail.com', 'padre', 1, 1),
('Patricia', 'Castro', '66554422', 'Calle Plaza 666', '222222223', 'patricia@mail.com', 'madre', 1, 1),

-- Tutores y familiares
('Elena', 'Morales', '55443311', 'Calle Jardín 777', '333333334', 'elena@mail.com', 'tutor', 1, 1),
('Ricardo', 'Flores', '44332200', 'Calle Parque 888', '444444445', 'ricardo@mail.com', 'tutor', 1, 1),
('Isabel', 'Rojas', '33221199', 'Calle Bosque 999', '555555556', 'isabel@mail.com', 'familiar', 1, 1),
('Diego', 'Silva', '22110088', 'Calle Río 111', '666666667', 'diego@mail.com', 'familiar', 1, 1),
('Valeria', 'Cruz', '11009977', 'Calle Montaña 222', '777777778', 'valeria@mail.com', 'tutor', 1, 1),
('Andrés', 'Reyes', '00998866', 'Calle Valle 333', '888888889', 'andres@mail.com', 'familiar', 1, 1);

-- Poblar la tabla students con varios alumnos
INSERT INTO students (firstname, lastname_father, lastname_mother, address, dni, birth_date, gender, classroom, shift, created_by, updated_by) VALUES
-- Sala 3 - Mañana (3-4 años)
('Pedro', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000001', '2021-05-10', 'varón', 'Sala 3', 'Mañana', 1, 1),
('Martín', 'Sánchez', 'Ruiz', 'Calle Sur 111', '10000003', '2021-01-20', 'varón', 'Sala 3', 'Mañana', 1, 1),
('Santiago', 'López', 'Sánchez', 'Calle Real 456', '10000006', '2021-08-15', 'varón', 'Sala 3', 'Mañana', 1, 1),
('Emma', 'Torres', 'López', 'Calle Real 456', '10000007', '2020-11-30', 'mujer', 'Sala 3', 'Mañana', 1, 1),
('Mateo', 'Díaz', 'Vega', 'Calle Este 333', '10000008', '2021-03-12', 'varón', 'Sala 3', 'Mañana', 1, 1),

-- Sala 4 - Mañana (4-5 años)
('Agustina', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000005', '2020-03-22', 'mujer', 'Sala 4', 'Mañana', 1, 1),
('Benjamín', 'Mendoza', 'Castro', 'Calle Centro 555', '10000009', '2020-07-08', 'varón', 'Sala 4', 'Mañana', 1, 1),
('Sofía', 'Morales', 'Flores', 'Calle Jardín 777', '10000010', '2020-12-25', 'mujer', 'Sala 4', 'Mañana', 1, 1),
('Lucas', 'Rojas', 'Silva', 'Calle Bosque 999', '10000011', '2020-04-18', 'varón', 'Sala 4', 'Mañana', 1, 1),
('Isabella', 'Cruz', 'Reyes', 'Calle Montaña 222', '10000012', '2020-09-03', 'mujer', 'Sala 4', 'Mañana', 1, 1),

-- Sala 4 - Tarde (4-5 años)
('Lucía', 'García', 'Martínez', 'Calle Nueva 321', '10000002', '2020-09-15', 'mujer', 'Sala 4', 'Tarde', 1, 1),
('Tomás', 'García', 'Martínez', 'Calle Nueva 321', '10000013', '2020-06-20', 'varón', 'Sala 4', 'Tarde', 1, 1),
('Mía', 'López', 'Sánchez', 'Calle Real 456', '10000014', '2020-01-14', 'mujer', 'Sala 4', 'Tarde', 1, 1),
('Nicolás', 'Torres', 'López', 'Calle Real 456', '10000015', '2020-10-07', 'varón', 'Sala 4', 'Tarde', 1, 1),
('Camila', 'Díaz', 'Vega', 'Calle Este 333', '10000016', '2020-02-28', 'mujer', 'Sala 4', 'Tarde', 1, 1),

-- Sala 5 - Mañana (5-6 años)
('Valentina', 'Torres', 'López', 'Calle Real 456', '10000004', '2020-12-05', 'mujer', 'Sala 5', 'Mañana', 1, 1),
('Alejandro', 'Mendoza', 'Castro', 'Calle Centro 555', '10000017', '2019-08-12', 'varón', 'Sala 5', 'Mañana', 1, 1),
('Victoria', 'Morales', 'Flores', 'Calle Jardín 777', '10000018', '2019-11-30', 'mujer', 'Sala 5', 'Mañana', 1, 1),
('Daniel', 'Rojas', 'Silva', 'Calle Bosque 999', '10000019', '2019-05-25', 'varón', 'Sala 5', 'Mañana', 1, 1),
('Gabriela', 'Cruz', 'Reyes', 'Calle Montaña 222', '10000020', '2019-12-10', 'mujer', 'Sala 5', 'Mañana', 1, 1),

-- Sala 5 - Tarde (5-6 años)
('Joaquín', 'Pérez', 'Gómez', 'Calle Falsa 123', '10000021', '2019-07-18', 'varón', 'Sala 5', 'Tarde', 1, 1),
('Renata', 'Sánchez', 'Ruiz', 'Calle Sur 111', '10000022', '2019-03-05', 'mujer', 'Sala 5', 'Tarde', 1, 1),
('Maximiliano', 'García', 'Martínez', 'Calle Nueva 321', '10000023', '2019-09-22', 'varón', 'Sala 5', 'Tarde', 1, 1),
('Antonella', 'López', 'Sánchez', 'Calle Real 456', '10000024', '2019-01-15', 'mujer', 'Sala 5', 'Tarde', 1, 1),
('Thiago', 'Torres', 'López', 'Calle Real 456', '10000025', '2019-06-08', 'varón', 'Sala 5', 'Tarde', 1, 1);

-- Poblar la tabla student_responsibles con asociaciones y permisos
-- Sala 3 - Mañana
INSERT INTO student_responsibles (student_id, person_id, can_pickup, can_change_diapers, notes, type, created_by, updated_by) VALUES
-- Pedro (id=1) - Padre y madre con permisos completos
(1, 1, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),
(1, 2, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(1, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Martín (id=3) - Solo padre con permisos
(3, 5, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),
(3, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Santiago (id=6) - Padre y madre
(6, 7, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(6, 8, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Emma (id=7) - Madre y tutor
(7, 9, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(7, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Mateo (id=8) - Padre y familiar
(8, 10, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),
(8, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Sala 4 - Mañana
-- Agustina (id=5) - Padre y madre
(5, 1, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(5, 2, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Benjamín (id=9) - Solo padre
(9, 11, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),

-- Sofía (id=10) - Madre y tutor
(10, 12, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(10, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Lucas (id=11) - Padre y familiar
(11, 5, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(11, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Isabella (id=12) - Madre y tutor
(12, 6, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(12, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Sala 4 - Tarde
-- Lucía (id=2) - Padre y madre
(2, 3, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(2, 4, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Tomás (id=13) - Solo padre
(13, 3, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),

-- Mía (id=14) - Madre y familiar
(14, 4, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(14, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Nicolás (id=15) - Padre y tutor
(15, 7, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(15, 13, TRUE, TRUE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Camila (id=16) - Madre y familiar
(16, 8, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(16, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Sala 5 - Mañana
-- Valentina (id=4) - Padre y madre
(4, 9, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(4, 10, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Alejandro (id=17) - Solo padre
(17, 11, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),

-- Victoria (id=18) - Madre y tutor
(18, 12, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(18, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Daniel (id=19) - Padre y familiar
(19, 1, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(19, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Gabriela (id=20) - Madre y tutor
(20, 2, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(20, 13, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Sala 5 - Tarde
-- Joaquín (id=21) - Padre y madre
(21, 1, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(21, 2, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Renata (id=22) - Solo madre
(22, 4, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),

-- Maximiliano (id=23) - Padre y familiar
(23, 3, TRUE, FALSE, 'Padre principal', 'padre', 1, 1),
(23, 14, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1),

-- Antonella (id=24) - Madre y tutor
(24, 6, TRUE, TRUE, 'Madre principal', 'madre', 1, 1),
(24, 15, TRUE, FALSE, 'Tutor de emergencia', 'tutor', 1, 1),

-- Thiago (id=25) - Padre y familiar
(25, 7, TRUE, TRUE, 'Padre principal', 'padre', 1, 1),
(25, 16, FALSE, TRUE, 'Familiar que ayuda con pañales', 'familiar', 1, 1);

-- ===== SISTEMA DE AUDITORÍA =====

-- Tabla de auditoría para registrar todos los cambios
CREATE TABLE audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id INT NOT NULL,
  action ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  old_values JSON,
  new_values JSON,
  changed_by INT NOT NULL,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  FOREIGN KEY (changed_by) REFERENCES staff(id),
  INDEX idx_audit_table_record (table_name, record_id),
  INDEX idx_audit_changed_by (changed_by),
  INDEX idx_audit_changed_at (changed_at),
  INDEX idx_audit_action (action)
);

-- Triggers para auditoría automática de todas las tablas
DELIMITER //

-- ===== TRIGGERS PARA STUDENTS =====
CREATE TRIGGER students_audit_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
  VALUES ('students', NEW.id, 'CREATE', JSON_OBJECT(
    'firstname', NEW.firstname,
    'lastname_father', NEW.lastname_father,
    'lastname_mother', NEW.lastname_mother,
    'address', NEW.address,
    'dni', NEW.dni,
    'birth_date', NEW.birth_date,
    'gender', NEW.gender,
    'classroom', NEW.classroom,
    'shift', NEW.shift,
    'special_education', NEW.special_education,
    'needs_assistant', NEW.needs_assistant,
    'special_diet', NEW.special_diet,
    'celiac', NEW.celiac,
    'diabetic', NEW.diabetic,
    'takes_dairy', NEW.takes_dairy,
    'care_diseases', NEW.care_diseases,
    'medication', NEW.medication,
    'diapers', NEW.diapers,
    'diaper_responsible', NEW.diaper_responsible,
    'authorized_pickups', NEW.authorized_pickups
  ), NEW.created_by);
END//

CREATE TRIGGER students_audit_update
AFTER UPDATE ON students
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
  VALUES ('students', NEW.id, 'UPDATE', JSON_OBJECT(
    'firstname', OLD.firstname,
    'lastname_father', OLD.lastname_father,
    'lastname_mother', OLD.lastname_mother,
    'address', OLD.address,
    'dni', OLD.dni,
    'birth_date', OLD.birth_date,
    'gender', OLD.gender,
    'classroom', OLD.classroom,
    'shift', OLD.shift,
    'special_education', OLD.special_education,
    'needs_assistant', OLD.needs_assistant,
    'special_diet', OLD.special_diet,
    'celiac', OLD.celiac,
    'diabetic', OLD.diabetic,
    'takes_dairy', OLD.takes_dairy,
    'care_diseases', OLD.care_diseases,
    'medication', OLD.medication,
    'diapers', OLD.diapers,
    'diaper_responsible', OLD.diaper_responsible,
    'authorized_pickups', OLD.authorized_pickups
  ), JSON_OBJECT(
    'firstname', NEW.firstname,
    'lastname_father', NEW.lastname_father,
    'lastname_mother', NEW.lastname_mother,
    'address', NEW.address,
    'dni', NEW.dni,
    'birth_date', NEW.birth_date,
    'gender', NEW.gender,
    'classroom', NEW.classroom,
    'shift', NEW.shift,
    'special_education', NEW.special_education,
    'needs_assistant', NEW.needs_assistant,
    'special_diet', NEW.special_diet,
    'celiac', NEW.celiac,
    'diabetic', NEW.diabetic,
    'takes_dairy', NEW.takes_dairy,
    'care_diseases', NEW.care_diseases,
    'medication', NEW.medication,
    'diapers', NEW.diapers,
    'diaper_responsible', NEW.diaper_responsible,
    'authorized_pickups', NEW.authorized_pickups
  ), NEW.updated_by);
END//

CREATE TRIGGER students_audit_delete
BEFORE DELETE ON students
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
  VALUES ('students', OLD.id, 'DELETE', JSON_OBJECT(
    'firstname', OLD.firstname,
    'lastname_father', OLD.lastname_father,
    'lastname_mother', OLD.lastname_mother,
    'address', OLD.address,
    'dni', OLD.dni,
    'birth_date', OLD.birth_date,
    'gender', OLD.gender,
    'classroom', OLD.classroom,
    'shift', OLD.shift,
    'special_education', OLD.special_education,
    'needs_assistant', OLD.needs_assistant,
    'special_diet', OLD.special_diet,
    'celiac', OLD.celiac,
    'diabetic', OLD.diabetic,
    'takes_dairy', OLD.takes_dairy,
    'care_diseases', OLD.care_diseases,
    'medication', OLD.medication,
    'diapers', OLD.diapers,
    'diaper_responsible', OLD.diaper_responsible,
    'authorized_pickups', OLD.authorized_pickups
  ), OLD.updated_by);
END//

-- ===== TRIGGERS PARA PERSONS =====
CREATE TRIGGER persons_audit_insert
AFTER INSERT ON persons
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
  VALUES ('persons', NEW.id, 'CREATE', JSON_OBJECT(
    'name', NEW.name,
    'lastname', NEW.lastname,
    'dni', NEW.dni,
    'address', NEW.address,
    'phone', NEW.phone,
    'email', NEW.email,
    'relationship', NEW.relationship
  ), NEW.created_by);
END//

CREATE TRIGGER persons_audit_update
AFTER UPDATE ON persons
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
  VALUES ('persons', NEW.id, 'UPDATE', JSON_OBJECT(
    'name', OLD.name,
    'lastname', OLD.lastname,
    'dni', OLD.dni,
    'address', OLD.address,
    'phone', OLD.phone,
    'email', OLD.email,
    'relationship', OLD.relationship
  ), JSON_OBJECT(
    'name', NEW.name,
    'lastname', NEW.lastname,
    'dni', NEW.dni,
    'address', NEW.address,
    'phone', NEW.phone,
    'email', NEW.email,
    'relationship', NEW.relationship
  ), NEW.updated_by);
END//

CREATE TRIGGER persons_audit_delete
BEFORE DELETE ON persons
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
  VALUES ('persons', OLD.id, 'DELETE', JSON_OBJECT(
    'name', OLD.name,
    'lastname', OLD.lastname,
    'dni', OLD.dni,
    'address', OLD.address,
    'phone', OLD.phone,
    'email', OLD.email,
    'relationship', OLD.relationship
  ), OLD.updated_by);
END//

-- ===== TRIGGERS PARA STUDENT_RESPONSIBLES =====
CREATE TRIGGER student_responsibles_audit_insert
AFTER INSERT ON student_responsibles
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
  VALUES ('student_responsibles', NEW.id, 'CREATE', JSON_OBJECT(
    'student_id', NEW.student_id,
    'person_id', NEW.person_id,
    'can_pickup', NEW.can_pickup,
    'can_change_diapers', NEW.can_change_diapers,
    'notes', NEW.notes,
    'type', NEW.type
  ), NEW.created_by);
END//

CREATE TRIGGER student_responsibles_audit_update
AFTER UPDATE ON student_responsibles
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
  VALUES ('student_responsibles', NEW.id, 'UPDATE', JSON_OBJECT(
    'student_id', OLD.student_id,
    'person_id', OLD.person_id,
    'can_pickup', OLD.can_pickup,
    'can_change_diapers', OLD.can_change_diapers,
    'notes', OLD.notes,
    'type', OLD.type
  ), JSON_OBJECT(
    'student_id', NEW.student_id,
    'person_id', NEW.person_id,
    'can_pickup', NEW.can_pickup,
    'can_change_diapers', NEW.can_change_diapers,
    'notes', NEW.notes,
    'type', NEW.type
  ), NEW.updated_by);
END//

CREATE TRIGGER student_responsibles_audit_delete
BEFORE DELETE ON student_responsibles
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
  VALUES ('student_responsibles', OLD.id, 'DELETE', JSON_OBJECT(
    'student_id', OLD.student_id,
    'person_id', OLD.person_id,
    'can_pickup', OLD.can_pickup,
    'can_change_diapers', OLD.can_change_diapers,
    'notes', OLD.notes,
    'type', OLD.type
  ), OLD.updated_by);
END//

-- ===== TRIGGERS PARA STAFF =====
CREATE TRIGGER staff_audit_insert
AFTER INSERT ON staff
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
  VALUES ('staff', NEW.id, 'CREATE', JSON_OBJECT(
    'name', NEW.name,
    'lastname', NEW.lastname,
    'username', NEW.username,
    'email', NEW.email,
    'role', NEW.role,
    'phone', NEW.phone,
    'hire_date', NEW.hire_date,
    'active', NEW.active
  ), NEW.created_by);
END//

CREATE TRIGGER staff_audit_update
AFTER UPDATE ON staff
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
  VALUES ('staff', NEW.id, 'UPDATE', JSON_OBJECT(
    'name', OLD.name,
    'lastname', OLD.lastname,
    'username', OLD.username,
    'email', OLD.email,
    'role', OLD.role,
    'phone', OLD.phone,
    'hire_date', OLD.hire_date,
    'active', OLD.active
  ), JSON_OBJECT(
    'name', NEW.name,
    'lastname', NEW.lastname,
    'username', NEW.username,
    'email', NEW.email,
    'role', NEW.role,
    'phone', NEW.phone,
    'hire_date', NEW.hire_date,
    'active', NEW.active
  ), NEW.updated_by);
END//

CREATE TRIGGER staff_audit_delete
BEFORE DELETE ON staff
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
  VALUES ('staff', OLD.id, 'DELETE', JSON_OBJECT(
    'name', OLD.name,
    'lastname', OLD.lastname,
    'username', OLD.username,
    'email', OLD.email,
    'role', OLD.role,
    'phone', OLD.phone,
    'hire_date', OLD.hire_date,
    'active', OLD.active
  ), OLD.updated_by);
END//

-- ===== TRIGGERS PARA ATTENDANCE =====
CREATE TRIGGER attendance_audit_insert
AFTER INSERT ON attendance
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
  VALUES ('attendance', NEW.id, 'CREATE', JSON_OBJECT(
    'student_id', NEW.student_id,
    'date', NEW.date,
    'present', NEW.present,
    'observations', NEW.observations,
    'registered_by', NEW.registered_by
  ), NEW.registered_by);
END//

CREATE TRIGGER attendance_audit_update
AFTER UPDATE ON attendance
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
  VALUES ('attendance', NEW.id, 'UPDATE', JSON_OBJECT(
    'student_id', OLD.student_id,
    'date', OLD.date,
    'present', OLD.present,
    'observations', OLD.observations,
    'registered_by', OLD.registered_by
  ), JSON_OBJECT(
    'student_id', NEW.student_id,
    'date', NEW.date,
    'present', NEW.present,
    'observations', NEW.observations,
    'registered_by', NEW.registered_by
  ), NEW.registered_by);
END//

CREATE TRIGGER attendance_audit_delete
BEFORE DELETE ON attendance
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
  VALUES ('attendance', OLD.id, 'DELETE', JSON_OBJECT(
    'student_id', OLD.student_id,
    'date', OLD.date,
    'present', OLD.present,
    'observations', OLD.observations,
    'registered_by', OLD.registered_by
  ), OLD.registered_by);
END//

DELIMITER ;

-- Vistas para facilitar consultas de auditoría
CREATE VIEW students_audit_view AS
SELECT 
  al.id,
  al.table_name,
  al.record_id,
  al.action,
  al.old_values,
  al.new_values,
  al.changed_at,
  CONCAT(s.name, ' ', s.lastname) as changed_by_name,
  s.role as changed_by_role,
  al.ip_address,
  al.user_agent
FROM audit_log al
JOIN staff s ON al.changed_by = s.id
WHERE al.table_name = 'students'
ORDER BY al.changed_at DESC;

CREATE VIEW persons_audit_view AS
SELECT 
  al.id,
  al.table_name,
  al.record_id,
  al.action,
  al.old_values,
  al.new_values,
  al.changed_at,
  CONCAT(s.name, ' ', s.lastname) as changed_by_name,
  s.role as changed_by_role,
  al.ip_address,
  al.user_agent
FROM audit_log al
JOIN staff s ON al.changed_by = s.id
WHERE al.table_name = 'persons'
ORDER BY al.changed_at DESC;

CREATE VIEW student_responsibles_audit_view AS
SELECT 
  al.id,
  al.table_name,
  al.record_id,
  al.action,
  al.old_values,
  al.new_values,
  al.changed_at,
  CONCAT(s.name, ' ', s.lastname) as changed_by_name,
  s.role as changed_by_role,
  al.ip_address,
  al.user_agent
FROM audit_log al
JOIN staff s ON al.changed_by = s.id
WHERE al.table_name = 'student_responsibles'
ORDER BY al.changed_at DESC;

CREATE VIEW staff_audit_view AS
SELECT 
  al.id,
  al.table_name,
  al.record_id,
  al.action,
  al.old_values,
  al.new_values,
  al.changed_at,
  CONCAT(s.name, ' ', s.lastname) as changed_by_name,
  s.role as changed_by_role,
  al.ip_address,
  al.user_agent
FROM audit_log al
JOIN staff s ON al.changed_by = s.id
WHERE al.table_name = 'staff'
ORDER BY al.changed_at DESC;

CREATE VIEW attendance_audit_view AS
SELECT 
  al.id,
  al.table_name,
  al.record_id,
  al.action,
  al.old_values,
  al.new_values,
  al.changed_at,
  CONCAT(s.name, ' ', s.lastname) as changed_by_name,
  s.role as changed_by_role,
  al.ip_address,
  al.user_agent
FROM audit_log al
JOIN staff s ON al.changed_by = s.id
WHERE al.table_name = 'attendance'
ORDER BY al.changed_at DESC;

-- Índices adicionales para optimizar consultas de auditoría
CREATE INDEX idx_students_created_by ON students(created_by);
CREATE INDEX idx_students_updated_by ON students(updated_by);
CREATE INDEX idx_students_created_at ON students(created_at);
CREATE INDEX idx_students_updated_at ON students(updated_at);

CREATE INDEX idx_persons_created_by ON persons(created_by);
CREATE INDEX idx_persons_updated_by ON persons(updated_by);
CREATE INDEX idx_persons_created_at ON persons(created_at);
CREATE INDEX idx_persons_updated_at ON persons(updated_at);

CREATE INDEX idx_student_responsibles_created_by ON student_responsibles(created_by);
CREATE INDEX idx_student_responsibles_updated_by ON student_responsibles(updated_by);
CREATE INDEX idx_student_responsibles_created_at ON student_responsibles(created_at);
CREATE INDEX idx_student_responsibles_updated_at ON student_responsibles(updated_at);

CREATE INDEX idx_staff_created_by ON staff(created_by);
CREATE INDEX idx_staff_updated_by ON staff(updated_by);
CREATE INDEX idx_staff_created_at ON staff(created_at);
CREATE INDEX idx_staff_updated_at ON staff(updated_at);

CREATE INDEX idx_attendance_created_by ON attendance(created_by);
CREATE INDEX idx_attendance_updated_by ON attendance(updated_by);
CREATE INDEX idx_attendance_created_at ON attendance(created_at);
CREATE INDEX idx_attendance_updated_at ON attendance(updated_at);
