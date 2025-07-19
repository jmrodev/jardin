# 🏫 Sistema de Gestión de Jardín de Infantes

Un sistema completo de gestión para jardines de infantes que permite administrar estudiantes, maestros, padres, asistencia y generar reportes estadísticos.

## 📋 Descripción

Este proyecto es una aplicación web full-stack diseñada para la gestión integral de jardines de infantes. Incluye funcionalidades para administrar estudiantes, personal docente, padres/tutores, control de asistencia, y análisis estadísticos.

## ✨ Características Principales

### 👥 Gestión de Personas
- **Estudiantes**: Registro completo con información personal, aula asignada, turno y estado
- **Maestros**: Gestión del personal docente con especializaciones
- **Padres/Tutores**: Información de contacto y relaciones familiares
- **Directores**: Administración de roles directivos
- **Preceptores**: Personal de apoyo educativo

### 📊 Dashboard y Estadísticas
- Panel de control con métricas en tiempo real
- Análisis demográfico de estudiantes
- Gráficos de asistencia
- Reportes personalizables
- Exportación de datos en PDF

### 📚 Gestión de Aulas
- Configuración de salas por edad
- Asignación de estudiantes a aulas
- Control de capacidad y turnos

### ✅ Control de Asistencia
- Registro diario de asistencia
- Estados: presente, ausente, justificado
- Observaciones por estudiante
- Reportes de asistencia

### 🔐 Sistema de Autenticación
- Roles y permisos diferenciados
- Autenticación JWT
- Encriptación de contraseñas
- Control de acceso por funcionalidad

### 🌐 Internacionalización
- Soporte multiidioma (Español/Inglés)
- Interfaz adaptativa
- Formateo de fechas por región

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** con Express.js
- **MySQL** como base de datos
- **JWT** para autenticación
- **bcryptjs** para encriptación
- **express-validator** para validaciones
- **multer** para manejo de archivos

### Frontend
- **React 19** con Vite
- **React Router** para navegación
- **Chart.js** para gráficos
- **i18next** para internacionalización
- **Lucide React** para iconos
- **CSS Modules** para estilos

### Herramientas de Desarrollo
- **ESLint** para linting
- **Vite** como bundler
- **pnpm** como gestor de paquetes

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- MySQL (versión 8.0 o superior)
- pnpm (recomendado) o npm

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd jardin
```

### 2. Configurar la base de datos
```bash
# Acceder a MySQL
mysql -u root -p

# Ejecutar el script de base de datos
source database/schema.sql
```

### 3. Configurar variables de entorno
Crear archivo `.env` en el directorio `backend/`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=kindergarten_db
JWT_SECRET=tu_jwt_secret_super_seguro
```

### 4. Instalar dependencias
```bash
# Instalar dependencias del backend
cd backend
pnpm install

# Instalar dependencias del frontend
cd ../frontend
pnpm install
```

## 🚀 Ejecución

### Opción 1: Script automatizado (Recomendado)
```bash
# Desde el directorio raíz
chmod +x start-dev.sh
./start-dev.sh
```

### Opción 2: Ejecución manual
```bash
# Terminal 1 - Backend
cd backend
pnpm run dev

# Terminal 2 - Frontend
cd frontend
pnpm run dev
```

## 📱 Uso del Sistema

### Acceso Inicial
1. Abrir el navegador en `http://localhost:5173`
2. Usar las credenciales por defecto:
   - **Admin**: `admin` / `password`
   - **Director**: `director_mg` / `password`
   - **Maestro**: `teacher_am` / `password`

### Funcionalidades por Rol

#### 👨‍💼 Administrador
- Gestión completa de todos los usuarios
- Configuración del sistema
- Reportes administrativos

#### 👩‍🏫 Director
- Gestión de personal docente
- Reportes de asistencia
- Análisis estadísticos

#### 👨‍🏫 Maestro
- Registro de asistencia
- Gestión de estudiantes de su aula
- Reportes de su grupo

## 📊 Estructura de la Base de Datos

### Tablas Principales
- **persons**: Información centralizada de todas las personas
- **classrooms**: Configuración de aulas
- **attendance**: Registro de asistencia
- **student_parents**: Relaciones familiares
- **contacts**: Mensajes de contacto

### Tipos de Personas
- `student`: Estudiantes
- `teacher`: Maestros
- `parent`: Padres/Tutores
- `director`: Directores
- `admin`: Administradores
- `preceptor`: Preceptores

## 🔧 Configuración Avanzada

### Personalización de Estilos
Los estilos están organizados en CSS Modules:
```
frontend/src/styles/
├── base/           # Estilos base y variables
├── components/     # Estilos por componente
├── pages/         # Estilos específicos de páginas
└── utilities/     # Clases utilitarias
```

### Agregar Nuevos Idiomas
1. Crear archivo de traducción en `frontend/src/i18n/locales/`
2. Configurar en `frontend/src/i18n/index.js`

### Configuración de Base de Datos
El esquema está en `database/schema.sql` e incluye:
- Datos de ejemplo para testing
- Estructura completa de tablas
- Relaciones y restricciones

## 📁 Estructura del Proyecto

```
jardin/
├── backend/                 # API REST
│   ├── auth/               # Autenticación y autorización
│   ├── controllers/        # Controladores de lógica de negocio
│   ├── models/            # Modelos de datos
│   ├── routes/            # Definición de rutas
│   ├── services/          # Servicios de negocio
│   └── validators/        # Validaciones
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes organizados por Atomic Design
│   │   ├── contexts/      # Contextos de React
│   │   ├── services/      # Servicios de API
│   │   └── styles/        # Estilos CSS
├── database/              # Scripts de base de datos
├── http/                  # Archivos de prueba HTTP
└── start-dev.sh          # Script de desarrollo
```

## 🧪 Testing

### Pruebas HTTP
El directorio `http/` contiene archivos para probar la API:
- Usar con VS Code REST Client o similar
- Configurar variables en `http-client.env.json`

### Datos de Prueba
La base de datos incluye datos de ejemplo:
- 30 estudiantes
- 20 padres/tutores
- 14 maestros
- 2 directores
- 3 aulas configuradas

## 🚨 Solución de Problemas

### Puertos en Uso
```bash
# Verificar puertos
lsof -i :3000  # Backend
lsof -i :5173  # Frontend

# Liberar puertos
kill -9 <PID>
```

### Problemas de Base de Datos
```bash
# Reiniciar MySQL
sudo systemctl restart mariadb

# Verificar conexión
mysql -u root -p -e "USE kindergarten_db; SHOW TABLES;"
```

### Problemas de Dependencias
```bash
# Limpiar cache
pnpm store prune

# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Equipo de Desarrollo** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Comunidad de React y Node.js
- Contribuidores de las librerías utilizadas
- Equipo de testing y feedback

---

**Nota**: Este sistema está diseñado para jardines de infantes y cumple con estándares de seguridad y privacidad para el manejo de datos de menores. 