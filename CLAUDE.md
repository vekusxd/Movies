# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Vite application for a movies project. It uses modern Vue 3 features including the Composition API with `<script setup>` syntax.

## Development Commands

**Install dependencies:**
```sh
npm install
```

**Run development server with hot-reload:**
```sh
npm run dev
```

**Build for production:**
```sh
npm run build
```

**Preview production build:**
```sh
npm run preview
```

**Lint and auto-fix code:**
```sh
npm run lint
```

**Format code:**
```sh
npm run format
```

## Environment Setup

**Configure environment variables:**

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```

2. Edit `.env` and add your OMDB API key:
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

3. Get a free API key at: https://www.omdbapi.com/apikey.aspx

**Important:**
- `.env` file is git-ignored and should NOT be committed
- Use `.env.example` as a template for other developers
- All environment variables must be prefixed with `VITE_` to be accessible in the client

## Technical Stack

- **Framework:** Vue 3.5+ with Composition API
- **Build Tool:** Vite 7+
- **UI Library:** Element Plus (partial import for pagination component)
- **Linting:** ESLint 9+ with Vue plugin
- **Formatting:** Prettier 3.6+
- **Dev Tools:** vite-plugin-vue-devtools for enhanced debugging

## Code Architecture

### Application Overview

This is a movie search application that uses the OMDB API to search and display movie information. The architecture is intentionally simple with no routing or state management, making it a straightforward single-page application.

### Project Structure

- **src/main.js** - Application entry point that creates and mounts the Vue app
- **src/App.vue** - Root component with movie search functionality, pagination, and grid layout
- **src/components/MovieCard.vue** - Reusable component for displaying individual movie cards
- **index.html** - HTML template with `#app` mount point
- **public/** - Static assets served directly

### Component Architecture

**App.vue (Root Component):**
- Implements movie search with OMDB API integration (`https://www.omdbapi.com`)
- API key stored in environment variable (`VITE_OMDB_API_KEY`)
- Uses Composition API with `ref()` for reactive state (searchQuery, movies, loading, error, currentPage, totalResults)
- API-based pagination: sends page parameter to OMDB API, which returns 10 results per page
- Direct fetch API calls (no service layer abstraction)
- Element Plus pagination component for navigation between pages
- Responsive grid layout with CSS media queries (5→4→3→2→1 columns)
- Keyboard support (Enter key to search)
- Smooth scroll to top on page change

**MovieCard.vue (Child Component):**
- Receives movie data via props (one-way data flow)
- No event emitters (child doesn't communicate back to parent)
- Image error handling with placeholder fallback
- Hover animations using scoped CSS

**Data Flow Pattern:**
- Parent-to-child communication via props only
- No global state management (Vuex/Pinia)
- API calls made directly in components (not extracted to services)

### Path Aliases

The project uses `@` as an alias for the `src` directory (configured in vite.config.js:14-16).

Example: `import Component from '@/components/Component.vue'`

### Vue Component Format

Components use the `<script setup>` syntax, which is the recommended approach for Vue 3 Composition API. This provides better TypeScript inference and more concise code.

Example structure:
```vue
<script setup>
// Component logic here
</script>

<template>
  <!-- Template here -->
</template>

<style scoped>
/* Styles here */
</style>
```

### Styling Approach

- Scoped CSS in single-file components (no CSS framework)
- Responsive design using media queries
- No CSS preprocessor (vanilla CSS)
- Gradient backgrounds and hover effects

## Node Version Requirements

This project requires Node.js version `^20.19.0 || >=22.12.0`

## Code Style

- ESLint is configured with Vue essential rules and Prettier integration
- Formatting is handled by Prettier with skip-formatting configuration to avoid conflicts
- Use `npm run lint` before committing to ensure code quality