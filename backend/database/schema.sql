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

-- Insert default users with different roles
INSERT INTO persons (person_type, name, lastname, username, email, password, role, phone, hire_date, created_by, updated_by) VALUES
('admin', 'Admin', 'System', 'admin', 'admin@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '11-1111-1111', '2024-01-01', 1, 1),
('director', 'Maria', 'Gonzalez', 'director', 'director@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'director', '11-2222-2222', '2024-01-15', 1, 1),
('teacher', 'Ana', 'Martinez', 'teacher', 'teacher@kindergarten.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', '11-3333-3333', '2024-02-01', 1, 1);
