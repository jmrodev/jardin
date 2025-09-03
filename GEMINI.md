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