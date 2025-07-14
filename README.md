# Sistema de Gestión - Jardín de Infantes

Sistema completo para la gestión de alumnos, maestras, padres y asistencia de un jardín de infantes.

## Características

- **Gestión de Alumnos**: CRUD completo de alumnos con información personal
- **Gestión de Personal**: Maestras y directivos con roles diferenciados
- **Gestión de Padres**: Información de padres y tutores
- **Contactos Alternativos**: Responsables adicionales para emergencias
- **Control de Asistencia**: Registro diario de asistencia con observaciones
- **Autenticación**: Sistema de login seguro con JWT
- **Arquitectura Modular**: Una función por archivo, responsabilidades mínimas

## Estructura del Proyecto

```
jardin/
├── config/           # Configuración del sistema
├── auth/            # Autenticación y autorización
├── alumnos/         # Gestión de alumnos
├── maestras/        # Gestión de maestras
├── padres/          # Gestión de padres
├── directivos/      # Gestión de directivos
├── asistencia/      # Control de asistencia
├── contactos/       # Contactos alternativos
├── database/        # Esquemas de base de datos
└── server.js        # Servidor principal
```

## Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd jardin
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

4. **Configurar base de datos**
```bash
# Crear base de datos MySQL
mysql -u root -p < database/schema.sql
```

5. **Iniciar servidor**
```bash
pnpm dev
```

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Login de personal
- `GET /api/auth/verificar` - Verificar token

### Alumnos
- `GET /api/alumnos` - Listar alumnos
- `POST /api/alumnos` - Crear alumno
- `GET /api/alumnos/:id` - Obtener alumno
- `PUT /api/alumnos/:id` - Actualizar alumno
- `DELETE /api/alumnos/:id` - Eliminar alumno

### Asistencia
- `GET /api/asistencia` - Obtener registros de asistencia
- `POST /api/asistencia` - Registrar asistencia

## Tecnologías

- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT, bcryptjs
- **Package Manager**: pnpm
- **Arquitectura**: ES Modules

## Desarrollo

El proyecto sigue principios de:
- **Responsabilidad única**: Una función por archivo
- **Modularidad**: Carpetas organizadas por dominio
- **Seguridad**: Autenticación JWT, encriptación de contraseñas
- **Escalabilidad**: Arquitectura preparada para crecimiento 