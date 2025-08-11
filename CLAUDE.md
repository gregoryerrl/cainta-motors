# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cainta Motors is a **premium automotive dealership website** built with SvelteKit and Svelte 5. The site features a **sleek, minimalist design system** with Three.js 3D model visualization, showcasing luxury vehicles with an emphasis on premium typography and clean aesthetics. Currently configured for deployment to Vercel with TailwindCSS v4 integration and Lenis smooth scrolling.

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
```

## Architecture

### Framework Stack

- **SvelteKit** with Svelte 5 (using runes syntax - `$props()`, `$state()`)
- **TailwindCSS v4** integrated via Vite plugin (NOT PostCSS)
- **TypeScript** with strict mode enabled
- **Vercel adapter** for deployment
- **Threlte** for Three.js integration
- **Lucide Svelte** for icons
- **Motion** for animations
- **Lenis** for smooth scrolling

### Key Configuration Notes

- Uses Svelte 5 runes syntax (not Svelte 4 stores)
- TailwindCSS v4 configured through Vite plugin in `vite.config.ts`
- TypeScript strict mode is enabled
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

## 3D Implementation (Threlte + Three.js)

### Current Models

- **Mercedes-Benz Maybach 2022**: `/static/Mercedes_Benz_Maybach_2022.glb` (scale: 0.5)
- **Honda City RS**: `/static/Honda_City_RS.glb` (available for use)

### Camera & Controls Configuration

```typescript
// Camera
position={[4, 1, 4]} fov={45} near={0.1} far={100}

// Controls
enablePan={false} enableZoom={false} enableDamping={true}
autoRotate={true} autoRotateSpeed={1.0}
```

### Lighting Setup

- Studio-quality automotive showcase lighting with 10+ lights
- Key light, fill light, rim light, and multiple accent spots
- Optimized for metallic car paint and chrome reflections

## Component Architecture

### Key Components

- **ModelViewer** (`/src/lib/components/three/`): Main 3D viewer with Threlte
- **Scene** (`/src/lib/components/three/`): Canvas wrapper with interaction handling
- **VideoHero** (`/src/lib/components/home/`): Hero section with video background
- **VehicleCard** (`/src/lib/components/ui/`): Vehicle display cards with pricing
- **SmoothScrollManager** (`/src/lib/components/`): Lenis smooth scrolling integration

### Data Management

- **Vehicle Data** (`/src/lib/data/vehicles.ts`): Structured vehicle information with TypeScript interfaces
- **Static Assets**: 3D models (.glb files) in `/static/` directory
- **Video Assets**: Hero videos (.mp4) in `/static/` directory

## Svelte 5 Syntax

```svelte
<!-- Component props -->
<script lang="ts">
  let { propName = defaultValue }: { propName: Type } = $props();
</script>

<!-- Reactive state -->
<script lang="ts">
  let count = $state(0);
</script>
```

## Performance Considerations

- 3D models optimized for web (scale 0.5 for Maybach)
- Auto-rotation pauses on user interaction (3 second resume delay)
- Video autoplay with fallback gradient background
- Lenis smooth scrolling with `{ autoRaf: true }` configuration
- Long-term caching for static assets via Vercel headers

## Deployment

- **Platform**: Vercel (auto-detected SvelteKit)
- **Configuration**: `vercel.json` with security headers and caching rules
- **Adapter**: `@sveltejs/adapter-vercel`
- **Build Output**: ~33KB main bundle, ~819KB Three.js chunk (before gzip)