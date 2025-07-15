# Kindergarten Management Frontend

Frontend application for the Kindergarten Management System built with React, Vite, and CSS Modules.

## Features

- **Atomic Design Architecture**: Organized components following atoms, molecules, organisms, templates, and pages
- **CSS Modules**: Scoped styling with CSS variables for theming
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Mobile-First**: Responsive design optimized for mobile devices
- **Role-Based Access**: Different permissions based on user roles
- **Modern React**: Built with React 19 and modern hooks

## Architecture

### Atomic Design Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Icon/
│   ├── molecules/      # Simple combinations of atoms
│   │   └── LoadingSpinner/
│   ├── organisms/      # Complex UI components
│   ├── templates/      # Page layouts
│   └── pages/          # Full pages
├── contexts/           # React contexts
├── services/           # API services
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── styles/             # Global styles and variables
```

### Component Principles

- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Atoms and molecules are highly reusable
- **Composition**: Components are built by composing smaller ones
- **Props Interface**: Clear and consistent prop interfaces

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. **Install dependencies**
```bash
pnpm install
```

2. **Create environment file**
```bash
cp .env.example .env
```

3. **Start development server**
```bash
pnpm dev
```

### Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:3000/api
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Design System

### Colors

- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#10b981)
- **Accent**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Info**: Cyan (#06b6d4)

### Typography

- **Font Family**: Inter, system fonts
- **Font Sizes**: xs (12px) to 4xl (36px)
- **Font Weights**: 300 to 700

### Spacing

- **Base Unit**: 4px
- **Scale**: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## User Roles

### Admin
- Full system access
- Manage all users and data
- System configuration

### Director
- Manage staff and students
- View reports and analytics
- Administrative tasks

### Teacher
- View student information
- Manage attendance
- Basic student operations

### Preceptor
- Limited access (coming soon)
- Basic viewing permissions

## Development Guidelines

### Component Structure

Each component should have:
- Component file (`.jsx`)
- Styles file (`.module.css`)
- Index file (`index.js`)

### CSS Modules

- Use CSS variables for theming
- Follow BEM-like naming conventions
- Keep styles scoped to components

### State Management

- Use React Context for global state
- Local state with useState for component-specific data
- Custom hooks for reusable logic

### API Integration

- Centralized API service
- Axios interceptors for auth
- Error handling and loading states

## Contributing

1. Follow Atomic Design principles
2. Write mobile-first CSS
3. Use CSS Modules for styling
4. Implement proper error handling
5. Add loading states for async operations
6. Test with different user roles
