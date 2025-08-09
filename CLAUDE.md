# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cainta Motors is a premium automotive website built with SvelteKit and Svelte 5, designed to showcase luxury vehicles with 3D visualization and high-definition imagery. The project is configured for deployment to Cloudflare and uses TailwindCSS v4 with Vite integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (Cloudflare adapter)
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
npm run check:watch

# Linting and formatting
npm run lint        # Prettier check + ESLint
npm run format      # Prettier write
```

## Architecture

### Framework Stack
- **SvelteKit** with Svelte 5 (using runes syntax - `$props()`, `@render`)
- **TailwindCSS v4** integrated via Vite plugin
- **TypeScript** with strict mode enabled
- **Cloudflare adapter** for deployment

### Project Structure
- `/src/routes/` - SvelteKit file-based routing
- `/src/lib/` - Shared utilities and components ($lib alias)
- `/src/lib/assets/` - Static assets accessible via imports
- `/static/` - Public static files

### Key Configuration Notes
- Uses Svelte 5 runes syntax (not Svelte 4 stores)
- TailwindCSS configured through Vite plugin, not PostCSS
- TypeScript strict mode is enabled
- ESLint configured with TypeScript and Svelte support
- Prettier configured with Svelte and TailwindCSS plugins

### Planned Features (from README)
- Three.js integration for 3D vehicle models
- Interactive vehicle configurator
- High-definition image galleries
- Vehicle comparison tools
- Multi-language support

## Important Development Notes

- When creating Svelte components, use Svelte 5 syntax with `$props()` and `@render`
- TailwindCSS classes are available globally via app.css
- The project structure suggests components should go in `/src/lib/components/`
- 3D models and related assets should be placed in `/src/lib/models/`
- Utility functions belong in `/src/lib/utils/`