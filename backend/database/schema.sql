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
('Admin', 'System', 'admin', 'admin@kindergarten.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'admin', '11-1111-1111', '2024-01-01', 1, 1),
('Maria', 'Gonzalez', 'director', 'director@kindergarten.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'director', '11-2222-2222', '2024-01-15', 1, 1),
('Ana', 'Martinez', 'teacher', 'teacher@kindergarten.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'teacher', '11-3333-3333', '2024-02-01', 1, 1),
('Carlos', 'Lopez', 'preceptor', 'preceptor@kindergarten.com', '$2a$10$6eYAxcSf.JEaSGhpSWyweOb2MKvYr.RgRXNcG/3CzSudBhQW9/K5G', 'preceptor', '11-4444-4444', '2024-02-15', 1, 1);

-- Actualizar datos existentes con valores de auditoría por defecto
UPDATE staff SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE students SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE persons SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE student_responsibles SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;
UPDATE attendance SET created_by = 1, updated_by = 1 WHERE created_by IS NULL OR updated_by IS NULL;

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
