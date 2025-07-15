import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      // Dashboard
      'dashboard.title': 'Gestión de Jardín de Infantes',
      'dashboard.welcome': 'Bienvenido, {{name}}!',
      'dashboard.role': 'Has iniciado sesión como:',
      'dashboard.permissions': 'Tus Permisos:',
      'dashboard.fullAccess': '✅ Acceso completo al sistema',
      'dashboard.manageStaff': '✅ Gestionar personal y datos',
      'dashboard.viewStudents': '✅ Ver estudiantes y gestionar asistencia',
      'dashboard.limitedAccess': '⚠️ Acceso limitado (próximamente)',
      'dashboard.quickActions': 'Acciones Rápidas:',
      'dashboard.viewStudentsBtn': 'Ver Estudiantes',
      'dashboard.manageTeachersBtn': 'Gestionar Maestros',
      'dashboard.attendanceBtn': 'Asistencia',
      'dashboard.logout': 'Cerrar Sesión',
      
      // Students Page
      'students.title': 'Gestión de Estudiantes',
      'students.backToDashboard': 'Volver al Dashboard',
      'students.addStudent': 'Agregar Estudiante',
      'students.searchPlaceholder': 'Buscar estudiantes...',
      'students.allClassrooms': 'Todas las Salas',
      'students.noStudentsFound': 'No se encontraron estudiantes',
      'students.noStudentsMessage': 'Intenta ajustar tu búsqueda o filtros',
      'students.view': 'Ver',
      'students.edit': 'Editar',
      'students.birth': 'Nacimiento:',
      'students.totalStudents': 'Total de Estudiantes',
      'students.filteredResults': 'Resultados Filtrados',
      'students.classrooms': 'Salas',
      
      // Teachers Page
      'teachers.title': 'Gestión de Maestros',
      'teachers.backToDashboard': 'Volver al Dashboard',
      'teachers.addTeacher': 'Agregar Maestro',
      'teachers.searchPlaceholder': 'Buscar maestros...',
      'teachers.allRoles': 'Todos los Roles',
      'teachers.noTeachersFound': 'No se encontraron maestros',
      'teachers.noTeachersMessage': 'Intenta ajustar tu búsqueda o filtros',
      'teachers.view': 'Ver',
      'teachers.edit': 'Editar',
      'teachers.hireDate': 'Fecha de Contratación:',
      'teachers.totalTeachers': 'Total de Maestros',
      'teachers.filteredResults': 'Resultados Filtrados',
      'teachers.roles': 'Roles',
      
      // Attendance Page
      'attendance.title': 'Gestión de Asistencia',
      'attendance.backToDashboard': 'Volver al Dashboard',
      'attendance.recordAttendance': 'Registrar Asistencia',
      'attendance.date': 'Fecha:',
      'attendance.classroom': 'Sala:',
      'attendance.allClassrooms': 'Todas las Salas',
      'attendance.present': 'Presente',
      'attendance.absent': 'Ausente',
      'attendance.observations': 'Observaciones',
      'attendance.save': 'Guardar Asistencia',
      'attendance.totalPresent': 'Total Presentes',
      'attendance.totalAbsent': 'Total Ausentes',
      'attendance.attendanceRate': 'Tasa de Asistencia',
      
      // Login Page
      'login.title': 'Iniciar Sesión',
      'login.subtitle': 'Sistema de Gestión de Jardín de Infantes',
      'login.username': 'Usuario',
      'login.password': 'Contraseña',
      'login.loginButton': 'Iniciar Sesión',
      'login.error': 'Error de autenticación',
      'login.invalidCredentials': 'Usuario o contraseña incorrectos',
      
      // Common
      'common.loading': 'Cargando...',
      'common.error': 'Error',
      'common.success': 'Éxito',
      'common.cancel': 'Cancelar',
      'common.save': 'Guardar',
      'common.delete': 'Eliminar',
      'common.confirm': 'Confirmar',
      'common.back': 'Volver',
      'common.next': 'Siguiente',
      'common.previous': 'Anterior',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.clear': 'Limpiar',
      'common.actions': 'Acciones',
      'common.details': 'Detalles',
      'common.edit': 'Editar',
      'common.view': 'Ver',
      'common.add': 'Agregar',
      'common.remove': 'Remover',
      'common.yes': 'Sí',
      'common.no': 'No',
      'common.ok': 'OK',
      
      // Roles
      'roles.admin': 'Administrador',
      'roles.director': 'Director',
      'roles.teacher': 'Maestro',
      'roles.preceptor': 'Preceptor',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.students': 'Estudiantes',
      'nav.teachers': 'Maestros',
      'nav.attendance': 'Asistencia',
      'nav.settings': 'Configuración',
      'nav.profile': 'Perfil',
      
      // Language
      'language.spanish': 'Español',
      'language.english': 'Inglés',
      'language.select': 'Seleccionar idioma',
    }
  },
  en: {
    translation: {
      // Dashboard
      'dashboard.title': 'Kindergarten Management',
      'dashboard.welcome': 'Welcome, {{name}}!',
      'dashboard.role': 'You are logged in as:',
      'dashboard.permissions': 'Your Permissions:',
      'dashboard.fullAccess': '✅ Full system access',
      'dashboard.manageStaff': '✅ Manage staff and data',
      'dashboard.viewStudents': '✅ View students and manage attendance',
      'dashboard.limitedAccess': '⚠️ Limited access (coming soon)',
      'dashboard.quickActions': 'Quick Actions:',
      'dashboard.viewStudentsBtn': 'View Students',
      'dashboard.manageTeachersBtn': 'Manage Teachers',
      'dashboard.attendanceBtn': 'Attendance',
      'dashboard.logout': 'Logout',
      
      // Students Page
      'students.title': 'Students Management',
      'students.backToDashboard': 'Back to Dashboard',
      'students.addStudent': 'Add Student',
      'students.searchPlaceholder': 'Search students...',
      'students.allClassrooms': 'All Classrooms',
      'students.noStudentsFound': 'No students found',
      'students.noStudentsMessage': 'Try adjusting your search or filters',
      'students.view': 'View',
      'students.edit': 'Edit',
      'students.birth': 'Birth:',
      'students.totalStudents': 'Total Students',
      'students.filteredResults': 'Filtered Results',
      'students.classrooms': 'Classrooms',
      
      // Teachers Page
      'teachers.title': 'Teachers Management',
      'teachers.backToDashboard': 'Back to Dashboard',
      'teachers.addTeacher': 'Add Teacher',
      'teachers.searchPlaceholder': 'Search teachers...',
      'teachers.allRoles': 'All Roles',
      'teachers.noTeachersFound': 'No teachers found',
      'teachers.noTeachersMessage': 'Try adjusting your search or filters',
      'teachers.view': 'View',
      'teachers.edit': 'Edit',
      'teachers.hireDate': 'Hire Date:',
      'teachers.totalTeachers': 'Total Teachers',
      'teachers.filteredResults': 'Filtered Results',
      'teachers.roles': 'Roles',
      
      // Attendance Page
      'attendance.title': 'Attendance Management',
      'attendance.backToDashboard': 'Back to Dashboard',
      'attendance.recordAttendance': 'Record Attendance',
      'attendance.date': 'Date:',
      'attendance.classroom': 'Classroom:',
      'attendance.allClassrooms': 'All Classrooms',
      'attendance.present': 'Present',
      'attendance.absent': 'Absent',
      'attendance.observations': 'Observations',
      'attendance.save': 'Save Attendance',
      'attendance.totalPresent': 'Total Present',
      'attendance.totalAbsent': 'Total Absent',
      'attendance.attendanceRate': 'Attendance Rate',
      
      // Login Page
      'login.title': 'Login',
      'login.subtitle': 'Kindergarten Management System',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.loginButton': 'Login',
      'login.error': 'Authentication error',
      'login.invalidCredentials': 'Invalid username or password',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.confirm': 'Confirm',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.clear': 'Clear',
      'common.actions': 'Actions',
      'common.details': 'Details',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.add': 'Add',
      'common.remove': 'Remove',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.ok': 'OK',
      
      // Roles
      'roles.admin': 'Administrator',
      'roles.director': 'Director',
      'roles.teacher': 'Teacher',
      'roles.preceptor': 'Preceptor',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.students': 'Students',
      'nav.teachers': 'Teachers',
      'nav.attendance': 'Attendance',
      'nav.settings': 'Settings',
      'nav.profile': 'Profile',
      
      // Language
      'language.spanish': 'Spanish',
      'language.english': 'English',
      'language.select': 'Select language',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 