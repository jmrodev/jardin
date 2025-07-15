# Kindergarten Management System

Complete system for managing students, teachers, parents and attendance in a kindergarten.

## Features

- **Student Management**: Complete CRUD for students with personal information
- **Staff Management**: Teachers and directors with differentiated roles
- **Parent Management**: Parent and guardian information
- **Alternative Contacts**: Additional responsible parties for emergencies
- **Attendance Control**: Daily attendance records with observations
- **Authentication**: Secure login system with JWT
- **Modular Architecture**: One function per file, minimal responsibilities

## Project Structure

```
kindergarten/
├── config/           # System configuration
├── auth/            # Authentication and authorization
├── students/        # Student management
├── teachers/        # Teacher management
├── parents/         # Parent management
├── directors/       # Director management
├── attendance/      # Attendance control
├── contacts/        # Alternative contacts
├── database/        # Database schemas
└── server.js        # Main server
```

## Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd kindergarten
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp env.example .env
# Edit .env with your configurations
```

4. **Setup database**
```bash
# Create MySQL database
mysql -u root -p < database/schema.sql
```

5. **Start server**
```bash
pnpm dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Staff login
- `GET /api/auth/verify` - Verify token

### Students
- `GET /api/students` - List students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Register attendance

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcryptjs
- **Package Manager**: pnpm
- **Architecture**: ES Modules

## Development

The project follows principles of:
- **Single Responsibility**: One function per file
- **Modularity**: Folders organized by domain
- **Security**: JWT authentication, password encryption
- **Scalability**: Architecture prepared for growth 