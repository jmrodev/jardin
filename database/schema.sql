-- Crear base de datos
DROP DATABASE IF EXISTS jardin_infantes;
CREATE DATABASE IF NOT EXISTS jardin_infantes;
USE jardin_infantes;

-- Tabla de personal (maestras, directivos)
CREATE TABLE personal (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('maestra', 'directivo', 'admin') NOT NULL,
  telefono VARCHAR(20),
  fecha_ingreso DATE,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de alumnos
CREATE TABLE alumnos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  sala VARCHAR(50) NOT NULL,
  dni VARCHAR(20) UNIQUE,
  direccion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de padres
CREATE TABLE padres (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alumno_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  parentesco ENUM('padre', 'madre', 'tutor') NOT NULL,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE
);

-- Tabla de contactos alternativos
CREATE TABLE contactos_alternativos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alumno_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  parentesco VARCHAR(50),
  direccion TEXT,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE
);

-- Tabla de asistencia
CREATE TABLE asistencia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alumno_id INT NOT NULL,
  fecha DATE NOT NULL,
  presente BOOLEAN DEFAULT FALSE,
  observaciones TEXT,
  registrado_por INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE,
  FOREIGN KEY (registrado_por) REFERENCES personal(id),
  UNIQUE KEY unique_asistencia (alumno_id, fecha)
);

-- Insertar usuario administrador por defecto
INSERT INTO personal (nombre, apellido, email, password, rol) VALUES 
('Admin', 'Sistema', 'admin@jardin.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'); 