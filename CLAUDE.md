# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spuddy is a shopping list PWA (Progressive Web App) built with Astro, React, and TypeScript. It focuses on mobile ease-of-use and features drag-and-drop functionality, swipe gestures, and InstantDB sync. The app is designed for creating and managing shopping lists with intuitive mobile interactions.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture

### Framework Stack

- **Astro 5** with React integration for SSG/SSR capabilities
- **React 19** for interactive components
- **TypeScript** with strict configuration
- **TailwindCSS 4** with DaisyUI for styling
- **Vite PWA** for progressive web app features

### Key Technologies

- **@dnd-kit/react** - Modern drag and drop system for list reordering
- **Motion (Framer Motion)** - Animations and gestures
- **Fuse.js** - Fuzzy search functionality
- **Local Storage** - Client-side data persistence

### Project Structure

#### Core Directories

- `src/components/` - React components with focus on list interactions
- `src/pages/` - Astro pages including demos for different list types
- `src/hooks/` - Custom React hooks for state management
- `src/content/` - Static data (products, categories, posts) with Astro collections
- `src/singletons/` - Shared instances like drag-drop-manager

#### Key Components

- **List.tsx** - Main draggable shopping list component
- **SortableListItem.tsx** - Individual draggable list items
- **SectionedList.tsx** - Grouped list with category sections
- **SwipeListItem.tsx** - List items with swipe-to-delete gestures
- **Navigation.tsx** - App navigation with animated footer

#### Content System

The app uses Astro's content collections for structured data:

- `products.json` - Product catalog with emojis and multi-language variants
- `categories.json` - Product categories with localization
- `posts/` - Markdown content for blog/documentation

### State Management

- Local storage hooks for persisting drag order and user data
- Custom hooks pattern for reusable state logic
- Singleton pattern for shared drag-drop manager

### Mobile-First Design

- Touch-optimized drag and drop interactions
- Swipe gestures for item deletion
- PWA configuration for native app-like experience
- Responsive design with mobile-first approach

## Development Notes

### Drag and Drop System

The app uses @dnd-kit/react with a custom singleton manager for consistent drag behavior across components. Items can be reordered within lists and sections.

### Content Localization

Products and categories support English (en) and Lithuanian (lt) variants, defined in JSON collections with Zod schemas for type safety.

### Demo Pages

Multiple demo pages showcase different list interaction patterns:

- `list-demo.astro` - Basic draggable list
- `sectioned-list-demo.astro` - Categorized lists
- `navigation-demo.astro` - App navigation patterns

### Styling System

- TailwindCSS 4 with Vite integration
- DaisyUI components for consistent design
- Custom CSS in `src/styles/global.css`
- Prettier with Astro and Tailwind plugins for code formatting
