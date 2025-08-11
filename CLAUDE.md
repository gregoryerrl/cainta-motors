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

- **SvelteKit** with Svelte 5 (using runes syntax - `$props()`, `$state()`, `$effect()`)
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
- **Color Palette**: Muted tones - `gray-500`, `gray-600`, `gray-700`, `gray-800`, `red-900`
- **Text Hierarchy**: Consistent sizing with thin weights for premium feel
- **Letter Spacing**: Use `tracking-wider` and `tracking-widest` for luxury aesthetic
- **Text Transform**: `uppercase` for labels and buttons

### UI Components

- **Buttons**: Box outlines with `tracking-widest` and `uppercase` styling
- **Forms**: Sharp borders, no rounded corners, minimal focus states
- **Cards**: `border-gray-800` with subtle `bg-white/6` backgrounds and group hover effects
- **Icons**: Scaled to `h-3 w-3` for inline elements, `h-4 w-4` for buttons
- **Images**: Grayscale filter with hover transitions to color
- **Typography**: Currency formatting for vehicle pricing
- **Hover Effects**: Subtle transitions with `hover:bg-red-900/20` or `hover:bg-white/5`

### Layout Patterns

- **Spacing**: Generous padding (`py-20`, `mt-24`) for luxury feel
- **Borders**: Consistent use of `border-gray-800` for structure
- **Backgrounds**: `bg-black` with `bg-white/6` for cards
- **Grid Gaps**: Use `gap-px` with `bg-gray-800` for grid separators

## 3D Implementation (Threlte + Three.js)

### Available 3D Models

- **Mercedes-Benz Maybach 2022**: `/mercedes-benz_maybach_2022.glb`
- **Honda City RS**: `/honda_city_rs.glb`
- **Mazda 3**: `/mazda-3.glb`

### Model Configuration

Each vehicle in `/src/lib/data/vehicles.ts` includes:
- `modelPath`: Path to GLB file
- `modelScale`: Scale factor for proper sizing
- `modelPosition`: Camera position [x, y, z]
- `modelTarget`: OrbitControls target point [x, y, z]

### Scene Component Props

```typescript
<Scene 
  model={vehicle.modelPath}
  scale={vehicle.modelScale}
  objectPosition={vehicle.modelPosition}
  target={vehicle.modelTarget}
/>
```

### Controls Configuration

```typescript
// OrbitControls settings
enablePan={false} 
enableZoom={false} 
enableDamping={true}
autoRotate={true} 
autoRotateSpeed={1.0}
target={[x, y, z]} // Dynamic based on model
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
- **EngineeringExcellence** (`/src/lib/components/home/`): 100vh split section with 3D model

### Data Management

- **Vehicle Data** (`/src/lib/data/vehicles.ts`): Structured vehicle information with TypeScript interfaces
- **Static Assets**: 3D models (.glb files) in `/static/` directory
- **Video Assets**: Hero videos (.mp4) in `/static/` directory
- **Image Assets**: Vehicle images in `/static/[brand]/` directories

## Page Structure

### Key Pages

- **Homepage** (`/`): Video hero, 3D model showcase, feature sections
- **Models** (`/models`): Grid of available vehicles with filters
- **Model Detail** (`/models/[slug]`): Individual vehicle with 3D viewer, gallery, specs
- **Configurator** (`/configurator`): Model selection with 3D preview
- **About** (`/about`): Company information with premium layout
- **Contact** (`/contact`): Contact form and dealership information

### Loading States

- 3D models use timeout-based loading (2 seconds)
- Loading spinners with `animate-spin` and backdrop blur
- Minimum loading time for smooth transitions

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

<!-- Effects -->
<script lang="ts">
  $effect(() => {
    // Runs when dependencies change
  });
</script>
```

## Vehicle Data Structure

```typescript
interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  price: number;
  year: number;
  category: 'sedan' | 'suv' | 'hatchback' | 'sports' | 'luxury';
  image: string;
  images: string[];
  modelPath?: string;
  modelScale?: number;
  modelPosition?: [number, number, number];
  modelTarget?: [number, number, number];
  features: string[];
  specifications: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    drivetrain: string;
    fuelType: string;
    fuelCapacity: string;
    seatingCapacity: number;
    dimensions: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
    };
  };
  colors: {
    name: string;
    hex: string;
  }[];
}
```

## Current Vehicle Inventory

1. **Honda City RS** - Sedan with 3D model
2. **Toyota Vios GR-S** - Sedan (no 3D model)
3. **Mazda 3 Premium** - Sedan with 3D model
4. **Mercedes-Benz Maybach S-Class** - Luxury with 3D model

## Performance Considerations

- 3D models optimized with proper scale factors
- Auto-rotation pauses on user interaction (3 second resume delay)
- Video autoplay with fallback gradient background
- Lenis smooth scrolling with `{ autoRaf: true }` configuration
- Long-term caching for static assets via Vercel headers
- Loading states prevent layout shift

## Deployment

- **Platform**: Vercel (auto-detected SvelteKit)
- **Configuration**: `vercel.json` with security headers and caching rules
- **Adapter**: `@sveltejs/adapter-vercel`
- **Build Output**: ~33KB main bundle, ~819KB Three.js chunk (before gzip)