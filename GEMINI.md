# Gemini Project Guidelines

This document provides instructions and conventions to follow when working on this project.

## General

*   This is a monorepo with a `frontend` and a `backend` directory.
*   The project uses `pnpm` as the package manager. Always use `pnpm install`, `pnpm add`, etc. instead of `npm` or `yarn`.

## Backend

The backend is a Node.js application using Express.

*   **Language:** JavaScript (ESM)
*   **Framework:** Express.js
*   **Database:** MySQL (`mysql2` driver). The schema is defined in `database/schema.sql`.
*   **Authentication:** JWT-based authentication is implemented in the `auth/` directory.
*   **Running the backend:**
    *   To start the development server with watch mode: `pnpm dev` in the `backend` directory.
    *   To start the server for production: `pnpm start` in the `backend` directory.
*   **Environment:** The backend uses a `.env` file for configuration. Refer to `.env.example` for the required variables.
*   **Testing:** There is no automated test suite. The `http/` directory contains `.http` files for manual API testing with a REST client.

## Frontend

The frontend is a React application built with Vite.

*   **Framework:** React 19
*   **Language:** JavaScript (JSX)
*   **Bundler:** Vite
*   **Styling:** Plain CSS with a structured approach. Global styles are in `src/styles/`, and component-specific styles are co-located with the components.
*   **Routing:** `react-router-dom` is used for client-side routing.
*   **API Communication:** `axios` is used for making API calls to the backend.
*   **Internationalization:** `i18next` is set up for translations.
*   **Running the frontend:**
    *   To start the development server: `pnpm dev` in the `frontend` directory.
    *   To build for production: `pnpm build` in the `frontend` directory.
*   **Linting:**
    *   ESLint is configured in `eslint.config.js`.
    *   To run the linter: `pnpm lint` in the `frontend` directory.
## Gemini Added Context

### Teacher and Parent Creation

*   **Teacher Creation Bug:** The `createTeacher` function (`backend/teachers/createTeacher.js`) was missing the `username` field, which is a `NOT NULL` and `UNIQUE` requirement for the `staff` table. This has been fixed by modifying the function to accept and use the `username` from the request body.
*   **Parent/Person Relationship:** In the database, a "parent" is represented as a `person` (in the `persons` table) who is then linked to a `student` via the `student_responsibles` table. This is a composition/association, not direct inheritance. The `createParent` function (`backend/parents/createParent.js`) is currently flawed as it attempts to insert into a non-existent `parents` table.
*   **Staff as Parents:** To allow staff members to be parents of students, they must also have a record in the `persons` table. This leads to data duplication (name, DNI, etc.) between `staff` and `persons` tables. The user has opted for this approach for simplicity, rather than a more complex schema change to link `staff` and `persons` directly.

### Audit Logs

*   **Audit Log Access:** The `/api/audit/logs` endpoint can be used to retrieve system change history.
*   **Authentication/Authorization Fixes:**
    *   The `validateToken` middleware was not applied to audit routes, causing "User not authenticated" errors. This has been fixed by adding `router.use(validateToken);` in `backend/audit/routes.js`.
    *   The `authorizeRoles` middleware was incorrectly called with an array of roles (e.g., `authorizeRoles(['admin', 'director'])`), leading to "Access denied. Insufficient permissions." errors. This has been fixed by calling it with individual roles (e.g., `authorizeRoles('admin', 'director')`).
*   **Dashboard Integration:** An "Audit Logs" card has been added to the dashboard (`frontend/src/components/organisms/DashboardGrid.jsx`) linking to a new `AuditLogsPage` (`frontend/src/components/pages/AuditLogsPage.jsx`). Translation keys for this feature have been added to `frontend/src/i18n/index.js`.

### General

*   **Port Configuration:** Both frontend and backend are configured to use port `3001`.
*   **Sample Data Creation:** A script (`create_sample_data.js`) has been used to create a sample student and teacher.
*   **Default Admin Credentials:** The default admin username is `admin` and the password is `Admin1234`.
