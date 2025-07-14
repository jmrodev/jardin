# Archivos HTTP para Pruebas del Sistema

Esta carpeta contiene archivos organizados para probar todas las funcionalidades del sistema de gestión del jardín de infantes.

## Estructura de Carpetas

```
http/
├── auth/
│   └── login.http              # Login y verificación de tokens
├── alumnos/
│   ├── crear-alumno.http       # Crear nuevos alumnos
│   ├── obtener-alumnos.http    # Obtener listado y detalles
│   ├── actualizar-alumno.http  # Modificar datos de alumnos
│   └── eliminar-alumno.http    # Eliminar alumnos
├── asistencia/
│   ├── registrar-asistencia.http  # Registrar asistencia diaria
│   └── obtener-asistencia.http    # Consultar registros
├── maestras/
│   └── maestras.http           # Gestión de maestras
├── padres/
│   └── padres.http             # Gestión de padres
├── directivos/
│   └── directivos.http         # Gestión de directivos
├── contactos/
│   └── contactos.http          # Contactos alternativos
├── http-client.env.json        # Variables de entorno
└── README.md                   # Esta documentación
```

## Cómo Usar

### 1. Configurar Variables
Edita `http-client.env.json` para configurar:
- `host`: URL del servidor
- `authToken`: Token de autenticación (se llena automáticamente)

### 2. Flujo de Pruebas

1. **Login** (`auth/login.http`)
   - Ejecuta el login para obtener el token
   - El token se guarda automáticamente en `authToken`

2. **Crear Datos** (archivos `crear-*.http`)
   - Crea alumnos, maestras, etc.

3. **Consultar Datos** (archivos `obtener-*.http`)
   - Verifica que los datos se crearon correctamente

4. **Modificar Datos** (archivos `actualizar-*.http`)
   - Prueba las actualizaciones

5. **Eliminar Datos** (archivos `eliminar-*.http`)
   - Prueba las eliminaciones

### 3. Credenciales por Defecto

```
Email: admin@jardin.com
Contraseña: password
```

## Extensiones Recomendadas

- **REST Client** (VS Code): Para ejecutar archivos .http
- **Thunder Client**: Alternativa ligera a Postman

## Notas

- Los archivos usan la variable `{{authToken}}` que se llena automáticamente
- Cada archivo tiene múltiples ejemplos para diferentes casos
- Los comentarios explican qué hace cada request 