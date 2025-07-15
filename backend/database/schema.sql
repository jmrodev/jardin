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

-- Parents table
CREATE TABLE parents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  relationship ENUM('father', 'mother', 'guardian') NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_parents_student_id (student_id),
  INDEX idx_parents_relationship (relationship),
  INDEX idx_parents_name (name, lastname),
  INDEX idx_parents_email (email)
);

-- Alternative contacts table
CREATE TABLE alternative_contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  relationship VARCHAR(50),
  address TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_contacts_student_id (student_id),
  INDEX idx_contacts_relationship (relationship),
  INDEX idx_contacts_name (name, lastname),
  INDEX idx_contacts_phone (phone)
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
