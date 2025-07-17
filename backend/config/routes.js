import { authRoutes } from '../auth/routes.js';
import { studentRoutes } from '../students/routes.js';
import { teacherRoutes } from '../teachers/routes.js';
import { parentRoutes } from '../parents/routes.js';
import { directorRoutes } from '../directors/routes.js';
import { attendanceRoutes } from '../attendance/routes.js';
import { contactRoutes } from '../contacts/routes.js';
import personsRouter from '../persons/routes.js';
import auditRoutes from '../audit/routes.js';

export const configureRoutes = (app) => {
  // Authentication routes
  app.use('/api/auth', authRoutes);
  
  // Management routes
  app.use('/api/students', studentRoutes);
  app.use('/api/teachers', teacherRoutes);
  app.use('/api/parents', parentRoutes);
  app.use('/api/directors', directorRoutes);
  app.use('/api/attendance', attendanceRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/persons', personsRouter);
  app.use('/api/audit', auditRoutes);
}; 