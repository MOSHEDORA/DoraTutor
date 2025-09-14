# CodeMentor AI - Personalized Programming Learning Platform

## Overview

CodeMentor AI is a comprehensive full-stack web application designed to provide personalized programming education through AI-powered tutoring, interactive visualizations, and adaptive learning paths. The platform combines modern web technologies with educational content management to create an engaging learning experience for developers of all skill levels.

The application features a React-based frontend with a clean, modern UI built using shadcn/ui components, an Express.js backend API, and PostgreSQL database for data persistence. The platform supports multiple programming languages and provides interactive features like AI chat assistance, progress tracking, custom content uploads, and visual programming concept demonstrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with **React 18** and **TypeScript**, using **Vite** as the build tool for fast development and optimized production builds. The UI is constructed with **shadcn/ui** components, providing a consistent design system with **Tailwind CSS** for styling. The application uses **Wouter** for lightweight client-side routing and **TanStack Query** for efficient server state management and data fetching.

The frontend follows a modular component structure with dedicated pages for dashboard, AI tutor, learning paths, visualizations, and LLM model interactions. Custom hooks manage complex state logic, particularly for chat functionality and mobile responsiveness detection.

### Backend Architecture
The server is built with **Express.js** and **TypeScript**, providing a RESTful API architecture. The application uses **ESM modules** throughout for modern JavaScript module support. The server implements middleware for request logging, error handling, and file upload processing using **multer**.

The backend follows a layered architecture with separate modules for:
- Route definitions and API endpoints
- Database access through a storage abstraction layer
- AI service integration for learning path generation and chat responses
- File upload handling for custom content processing

### Data Storage Solutions
The application uses **PostgreSQL** as the primary database, accessed through **Drizzle ORM** with **Neon Database** as the cloud provider. The database schema includes tables for users, learning paths, modules, user progress tracking, custom content, chat messages, and user statistics.

The storage layer implements an abstraction pattern with interfaces defining data access methods, allowing for potential database provider changes while maintaining consistent API contracts throughout the application.

### Authentication and Authorization
The current implementation uses session-based authentication patterns, though specific auth providers are not explicitly configured in the visible codebase. The application structure suggests user-based access control with user IDs used throughout the data access layer.

### UI/UX Design System
The application implements a comprehensive design system using **shadcn/ui** with extensive customization through CSS custom properties for theming. The design supports both light and dark modes with a sophisticated color palette and typography system using Inter and JetBrains Mono fonts.

The component library includes advanced UI patterns like accordions, dialogs, command palettes, data tables, and interactive visualizations with consistent styling and accessibility features.

## External Dependencies

### Database and Storage
- **Neon Database**: Cloud PostgreSQL provider for production database hosting
- **Drizzle Kit**: Database migration and schema management tooling

### UI and Styling
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library providing consistent iconography
- **Class Variance Authority**: Utility for creating type-safe component variants

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced development experience  
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### React Ecosystem
- **TanStack Query**: Server state management and data synchronization
- **React Hook Form**: Form handling with validation
- **Wouter**: Lightweight routing solution
- **React Day Picker**: Date selection components

### Backend Services
- **Express.js**: Web application framework
- **Multer**: File upload handling middleware
- **Connect PG Simple**: PostgreSQL session storage
- **WebSocket (ws)**: Real-time communication support

### Development Experience
- **Replit Integration**: Development environment plugins for Replit platform
- **TSX**: TypeScript execution for development
- Various development utilities for error handling, runtime overlays, and development banners

The application is designed to be deployment-ready with environment-based configuration and production build optimization, supporting both development and production deployment scenarios.