# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cainta Motors is a **premium automotive dealership website** built with SvelteKit and Svelte 5. The site features a **sleek, minimalist design system** with Three.js 3D model visualization, showcasing luxury vehicles with an emphasis on premium typography and clean aesthetics. Currently configured for deployment to Vercel with TailwindCSS v4 integration and Lenis smooth scrolling.

## Current Implementation Status

### Completed Features

- ✅ **Premium Design System**: Consistent minimalist styling across all pages
- ✅ **3D Model Viewer**: Interactive Mercedes-Benz Maybach with studio lighting
- ✅ **Video Hero Section**: Premium video background with fade/fly animations
- ✅ **Responsive Layout**: Mobile-first design with perfect desktop scaling
- ✅ **Complete Page Set**: Homepage, Models, Configurator, About, Contact pages
- ✅ **Interactive Forms**: Contact forms with validation and success states
- ✅ **Vehicle Data**: Structured vehicle information with pricing and configurations
- ✅ **Vehicle Cards**: Premium cards with pricing and hover effects
- ✅ **Navigation System**: Header/Footer layout components
- ✅ **Gallery Components**: Image galleries with grayscale hover transitions
- ✅ **Smooth Scrolling**: Lenis library for natural scroll enhancement
- ✅ **Vercel Deployment**: Production-ready configuration with optimized headers

### 3D Implementation Details

- **Current Model**: Mercedes-Benz Maybach 2022 (scale: 0.5)
- **Available Models**: Honda City RS also available in `/static/` directory
- **Camera Position**: [4, 1, 4] with 45° FOV
- **Lighting Setup**: Studio-quality automotive showcase lighting (10+ lights)
- **Interaction**: Auto-rotation with drag controls (no zoom, no pan)
- **Performance**: Optimized with proper centering and material handling
- **Canvas Integration**: Threlte-based with interactivity support

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (Vercel adapter)
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
npm run check:watch

# Linting and formatting
npm run lint        # Prettier check + ESLint
npm run format      # Prettier write

# Deployment
npm run deploy      # Build for production
npm run deploy:preview  # Build and preview with Wrangler
```

## Architecture

### Framework Stack

- **SvelteKit** with Svelte 5 (using runes syntax - `$props()`, `$state()`)
- **TailwindCSS v4** integrated via Vite plugin
- **TypeScript** with strict mode enabled
- **Vercel adapter** for deployment
- **Threlte** for Three.js integration
- **Lucide Svelte** for icons
- **Motion** for animations
- **Lenis** for smooth scrolling

### Project Structure

- `/src/routes/` - SvelteKit file-based routing
- `/src/lib/` - Shared utilities and components ($lib alias)
- `/src/lib/assets/` - Static assets accessible via imports
- `/static/` - Public static files

### Key Configuration Notes

- Uses Svelte 5 runes syntax (not Svelte 4 stores)
- TailwindCSS v4 configured through Vite plugin, not PostCSS
- TypeScript strict mode is enabled
- ESLint configured with TypeScript and Svelte support
- Prettier configured with Svelte and TailwindCSS plugins
- Custom scrollbar styling in app.css
- Touch-action controls for 3D canvas interaction

## Design System Guidelines

### Typography

- **Primary Fonts**: `font-thin` and `font-light` only (never bold/semibold)
- **Color Palette**: Muted tones - `gray-500`, `gray-600`, `red-900`
- **Text Hierarchy**: Consistent sizing with thin weights for premium feel

### UI Components

- **Buttons**: Box outlines with `tracking-widest` and `uppercase` styling
- **Forms**: Sharp borders, no rounded corners, minimal focus states
- **Cards**: `border-gray-800` with subtle `bg-black` backgrounds and group hover effects
- **Icons**: Scaled to `h-3 w-3` for inline elements, `h-4 w-4` for buttons
- **Images**: Grayscale filter with hover transitions to color
- **Typography**: PHP currency formatting for vehicle pricing

### Layout Patterns

- **Homepage Split**: 100vh section with 50/50 3D model and content
- **Responsive**: Mobile-first with `lg:` breakpoints for desktop
- **Spacing**: Generous padding and margins for luxury feel

## Component Architecture

### Key Components

- **ModelViewer** (`/src/lib/components/three/`): Main 3D viewer with Threlte
- **Scene** (`/src/lib/components/three/`): Canvas wrapper with interaction handling
- **VideoHero** (`/src/lib/components/home/`): Hero section with video background
- **EngineeringExcellence** (`/src/lib/components/home/`): 100vh content section
- **VehicleCard** (`/src/lib/components/ui/`): Vehicle display cards with pricing
- **SmoothScrollManager** (`/src/lib/components/`): Lenis smooth scrolling integration

### Data Management

- **Vehicle Data** (`/src/lib/data/vehicles.ts`): Structured vehicle information with TypeScript interfaces
- **Static Assets**: 3D models (.glb files) in `/static/` directory
- **Video Assets**: Hero videos (.mp4) in `/static/` directory
- **Model Textures**: Organized in `/src/lib/models/[vehicle]/textures/` directories
- **Placeholder Images**: Using via.placeholder.com for development

## 3D Implementation (Threlte + Three.js)

### Current Setup

```typescript
// Camera configuration
position={[4, 1, 4]} fov={45} near={0.1} far={100}

// Model scaling and positioning
scale={0.5}
position={[centerOffset.x, centerOffset.y, centerOffset.z]}

// Controls configuration
enablePan={false} enableZoom={false} enableDamping={true}
autoRotate={true} autoRotateSpeed={1.0}
```

### Lighting Configuration

- **Key Light**: DirectionalLight from front-right (intensity: 2.5)
- **Fill Light**: BackLight from back-left (intensity: 1.2)
- **Rim Light**: Strong backlight for edge definition (intensity: 1.8)
- **Accent Spots**: Multiple spotlights for detailed illumination
- **Ambient**: Low ambient light (0.6) for realistic shadows

## Important Development Notes

### Svelte 5 Syntax

- Use `$props()` for component props, not `export let`
- Use `$state()` for reactive state management
- Use Svelte 5 runes syntax throughout

### Styling Conventions

- TailwindCSS classes available globally via app.css
- Follow established design system patterns
- Use `bg-white/6` for subtle card backgrounds
- Maintain consistent `tracking-widest` on buttons

### File Organization

- Components: `/src/lib/components/[category]/`
- 3D Assets: `/static/` directory for GLB files
- Data: `/src/lib/data/` for structured content
- Utilities: `/src/lib/utils/` for helper functions

### Performance Considerations

- 3D models optimized for web (scale 0.5 for Maybach)
- Lighting setup optimized for automotive showcase
- Auto-rotation pauses on user interaction (3 second resume delay)
- Canvas prevents image dragging with CSS user-drag controls
- Video autoplay with fallback gradient background
- Shadow casting and receiving optimized for quality
- Proper vehicle centering with bounding box calculations

## Smooth Scrolling Implementation

### Lenis Configuration

- **Library**: Lenis for natural scroll enhancement
- **Configuration**: `{ autoRaf: true }` for optimal performance
- **Integration**: SmoothScrollManager component in app layout
- **Compatibility**: Works with mouse wheel, trackpad, and touch scrolling

### CSS Optimization

- Removed conflicting `scroll-behavior: smooth` from CSS
- Performance optimizations with GPU acceleration
- Scroll padding for fixed header navigation

### Hero Section Fix

- VideoHero height calculated as `calc(100vh - 5rem)` to account for header
- Ensures chevron down button remains visible

## Deployment Configuration

### Vercel Setup

- **Adapter**: `@sveltejs/adapter-vercel`
- **Framework**: Auto-detected SvelteKit
- **Configuration**: `vercel.json` with optimized headers
- **Performance**: Security headers and long-term caching for static assets

### Build Output

- **Main bundle**: ~33.66 kB (gzipped: ~9.41 kB)
- **Three.js chunk**: ~819.42 kB (gzipped: ~216.56 kB)
- **Total CSS**: ~40.40 kB (gzipped: ~7.58 kB)
