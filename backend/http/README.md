# HTTP Files for System Testing

This folder contains organized files to test all functionalities of the kindergarten management system.

## Folder Structure

```
http/
├── auth/
│   └── login.http              # Login and token verification
├── students/
│   ├── create-student.http     # Create new students
│   ├── get-students.http       # Get list and details
│   ├── update-student.http     # Modify student data
│   └── delete-student.http     # Delete students
├── attendance/
│   ├── register-attendance.http  # Register daily attendance
│   └── get-attendance.http       # Query records
├── teachers/
│   └── teachers.http           # Teacher management
├── parents/
│   └── parents.http            # Parent management
├── directors/
│   └── directors.http          # Director management
├── contacts/
│   └── contacts.http           # Alternative contacts
├── http-client.env.json        # Environment variables
└── README.md                   # This documentation
```

## How to Use

### 1. Configure Variables
Edit `http-client.env.json` to configure:
- `host`: Server URL
- `authToken`: Authentication token (filled automatically)

### 2. Testing Flow

1. **Login** (`auth/login.http`)
   - Execute login to get token
   - Token is automatically saved in `authToken`

2. **Create Data** (`create-*.http` files)
   - Create students, teachers, etc.

3. **Query Data** (`get-*.http` files)
   - Verify that data was created correctly

4. **Modify Data** (`update-*.http` files)
   - Test updates

5. **Delete Data** (`delete-*.http` files)
   - Test deletions

### 3. Default Credentials

```
Email: admin@kindergarten.com
Password: password
```

## Recommended Extensions

- **REST Client** (VS Code): To execute .http files
- **Thunder Client**: Lightweight alternative to Postman

## Notes

- Files use the `{{authToken}}` variable that is filled automatically
- Each file has multiple examples for different cases
- Comments explain what each request does 