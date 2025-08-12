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

# Model optimization (when needed)
npm run optimize:models  # GLTF model optimization script
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
- Loading screens disabled for performance - 3D models load directly

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

- **Mercedes-Benz Maybach 2022**: `/gltf/mercedes-benz_maybach_2022/scene.gltf`
- **Mazda 3**: `/gltf/mazda-3/scene.gltf` (scale: 0.01)
- **Car1 (Porsche Carrera GT)**: `/car1/car1.gltf` - Configurator model with color/accessory support
- **Car2 (McLaren P1)**: `/car2/car2.gltf` - Configurator model with color/accessory support

### Three 3D Systems

#### General Model Viewing (Homepage, Model Pages)

- Uses `Scene.svelte` → `ModelViewer.svelte` → `LazyScene.svelte`
- Loads any GLTF model via `model` prop with `useGltf()` hook approach
- **CRITICAL**: Uses `<T is={loadedGltf.scene} />` for rendering (NOT `<primitive>` or GLTF component)
- Auto-rotation enabled, zoom configurable via `enableZoom` prop
- **Real-time color changing** support via `selectedColor` prop
- Model-specific material targeting for car body parts only
- Component chain: Page → `LazyScene` → `Scene` → `ModelViewer`
- **Distance constraints**: Always set `minDistance={2}` and `maxDistance={15}` to prevent rendering issues

#### Models Page Integration (VehicleCard with 3D)

- **VehicleCard** component supports both static images and 3D models
- Models with `has3DModel: true` display interactive 3D viewers instead of images
- Models with `supportsColorChange: true` show color picker interface
- **Color Selection**: Click color button to open picker, select colors for real-time preview
- **Default Color**: All models start with black (`#000000`) as selected color
- **Material Targeting**: Only Mazda 3 and Maybach support color changes on `/models` page
- **IMPORTANT**: Must use `selectedColor={selectedColor.hex}` (NOT hardcoded string) for reactive color changes

#### Configurator System (Interactive Customization)

- Uses `ConfiguratorScene.svelte` → `ConfiguratorModelViewer.svelte` → `CarSelector.svelte`
- Car1/Car2 generated components with `@threlte/gltf`
- Real-time color changes and accessory visibility
- User-controlled interaction (rotation + zoom)

#### Debug Material System (`/gregoryerrl`)

- Auto-highlighting tool to identify material names for development
- Cycles through all materials with red highlighting (500ms intervals)
- Used to determine which materials represent car body vs interior/chrome/glass
- Essential for configuring model-specific material targeting logic

### Scene Component Props

```typescript
// General viewing (Homepage, Model pages) - with color changing
<LazyScene
  model={vehicle.modelPath}
  scale={vehicle.modelScale}
  objectPosition={vehicle.modelPosition}
  target={vehicle.modelTarget}
  selectedColor={selectedColor.hex}
  priority={true}
  enableZoom={false}
/>

// Model detail pages - with zoom enabled
<LazyScene
  model={vehicle.modelPath}
  scale={vehicle.modelScale}
  objectPosition={vehicle.modelPosition}
  target={vehicle.modelTarget}
  selectedColor={selectedColor.hex}
  priority={true}
  enableZoom={true}
/>

// Configurator (Interactive customization)
<ConfiguratorScene
  model={carModel}
  scale={1}
  objectPosition={[4, 2, 4]}
  target={[0, 0, 0]}
  selectedColor={colorHex}
  accessory={accessoryState}
/>

// Debug material identification
<LazyScene
  materialColors={materialColors}
  onMaterialsLoaded={setAvailableMaterials}
  priority={true}
/>
```

### Controls Configuration

```typescript
// General viewing - Auto-rotate showcase (homepage, models cards)
enablePan={false}
{enableZoom} // Usually false for showcases
enableDamping={true}
autoRotate={true}
autoRotateSpeed={1.0}
minDistance={2} // ALWAYS set these to prevent rendering issues
maxDistance={15} // ALWAYS set these to prevent rendering issues

// Model detail pages - User interaction with zoom
enablePan={false}
enableZoom={true}
zoomSpeed={0.6}
minDistance={2}
maxDistance={15}
autoRotate={true} // Pauses on interaction, resumes after 3s

// Configurator - Full user control
enablePan={false}
enableZoom={true}
zoomSpeed={0.6}
minDistance={2}
maxDistance={15}
autoRotate={false} // User controls
```

### Color Changing Implementation

#### Model Detail Pages (Real-time Color Preview with Zoom)

- **Implementation**: `useGltf()` hook approach (not `<GLTF>` component)
- **Material Targeting**: Model-specific logic to target car body materials only
- **Supported Models**: Mercedes Maybach, Mazda 3
- **Technical**: `material.color = new THREE.Color(selectedColor)` with `needsUpdate = true`
- **Default Color**: Black (`#000000`) is the default selected color for all models
- **Zoom Controls**: Enabled with scroll prevention and distance limits (2-15 units)
- **Auto-rotation**: Pauses during interaction, resumes after 3 seconds

```javascript
// Model-specific material targeting logic
if (model.includes('maybach')) {
  shouldApplyColor = materialName === 'Car_Paint_With_Flakes';
} else if (model.includes('mazda')) {
  shouldApplyColor = materialName === 'material';
}
```

#### Configurator Features (Interactive Customization)

- **Car1**: `Main_Paint` material with `material.color={selectedColor}`
- **Car2**: Multiple `Carpaint` materials with synchronized color binding
- Real-time color preview with 8 available colors

#### Debug Material Identification

- **Debug Route**: `/gregoryerrl` for development material identification
- **Auto-highlighting**: Cycles through materials with red coloring (500ms intervals)
- **Material Discovery**: Used to identify `Car_Paint_With_Flakes` (Maybach), `material` (Mazda)
- **Console Logging**: `🔴 HIGHLIGHTING: material_name` for identification

#### Accessory System

- **Car1**: Gold accent parts `visible={accessory === 1}` (Performance Package)
- **Car2**: Brake calipers on all 4 wheels `visible={accessory === 1}` (Performance Package)
- Instant visibility toggle based on package selection

#### Interaction Controls

- **Desktop**: Mouse wheel zoom, drag rotation, scroll prevention
- **Mobile**: Pinch zoom, touch rotation, touch event prevention
- **Cross-platform**: Smooth damped controls with luxury feel

### Lighting Setup

- Studio-quality automotive showcase lighting with 10+ lights
- Key light, fill light, rim light, and multiple accent spots
- Optimized for metallic car paint and chrome reflections

## Component Architecture

### Key Components

#### 3D Components

- **Scene** (`/src/lib/components/three/`): General purpose 3D canvas wrapper
- **ModelViewer** (`/src/lib/components/three/`): General GLTF model viewer with auto-rotation
- **ConfiguratorScene** (`/src/lib/components/three/`): Interactive 3D canvas for configurator
- **ConfiguratorModelViewer** (`/src/lib/components/three/`): User-controlled 3D viewer with zoom
- **CarSelector** (`/src/lib/components/three/`): Switches between Car1/Car2 generated components
- **Car1Generated** (`/src/lib/components/three/`): Porsche Carrera GT with color/accessory binding
- **Car2Generated** (`/src/lib/components/three/`): McLaren P1 with color/accessory binding

#### UI Components

- **AccordionSection** (`/src/lib/components/ui/`): Collapsible sections with smooth animations
- **VehicleCard** (`/src/lib/components/ui/`): Vehicle display cards with pricing and 3D model integration
- **VideoHero** (`/src/lib/components/home/`): Hero section with video background
- **SmoothScrollManager** (`/src/lib/components/`): Lenis smooth scrolling integration
- **EngineeringExcellence** (`/src/lib/components/home/`): 100vh split section with 3D model

### Data Management

- **Vehicle Data** (`/src/lib/data/vehicles.ts`): Structured vehicle information with TypeScript interfaces
- **Static Assets**: 3D models (.glb files) in `/static/` directory
- **Video Assets**: Hero videos (.mp4) in `/static/` directory
- **Image Assets**: Vehicle images in `/static/[brand]/` directories

## Page Structure

### Key Pages

- **Homepage** (`/`): Video hero, 3D model showcase (Maybach in black), feature sections
- **Models** (`/models`): Grid of available vehicles with filters and 3D model integration with color selection
- **Model Detail** (`/models/[slug]`): Individual vehicle with 3D viewer, gallery, specs
- **Configurator** (`/configurator`): Interactive car customization with real-time 3D preview, color changes, and accessory selection
- **About** (`/about`): Company information with premium layout
- **Contact** (`/contact`): Contact form and dealership information

### Performance Optimizations

- **Mobile Performance**: 3D models disabled on mobile devices (<768px) for speed
- **Gallery Auto-Carousel**: 7-second intervals with crossfade transitions
- **Scroll Prevention**: 3D viewers prevent page scroll when zooming is enabled
- **Direct Loading**: Loading screens removed for faster 3D model rendering
- **Lazy Loading**: Non-priority 3D scenes use intersection observer

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
	has3DModel?: boolean;
	supportsColorChange?: boolean;
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

### Regular Models (/models page)

1. **Honda City RS** - Sedan (no 3D model)
2. **Toyota Vios GR-S** - Sedan (no 3D model)
3. **Mazda 3 Premium** - Sedan with 3D model and color changing (`material`, scale: 0.4)
4. **Mercedes-Benz Maybach S-Class** - Luxury with 3D model and color changing (`Car_Paint_With_Flakes`, scale: 0.5)

### Configurator Models (Interactive Customization)

1. **Car1 (Porsche Carrera GT)** - Sports Car (₱10,000,000)
   - 8 color options with real-time preview
   - Performance Package: Gold accent parts (+₱1,000,000)
   - Generated with `@threlte/gltf` from `/static/car1/car1.gltf`

2. **Car2 (McLaren P1)** - Luxury Sedan (₱15,000,000)
   - 8 color options with synchronized paint materials
   - Performance Package: 4-wheel brake calipers (+₱1,000,000)
   - Generated with `@threlte/gltf` from `/static/car2/car2.gltf`

## Performance Considerations

### 3D Optimization

- 3D models optimized with proper scale factors
- General models: Auto-rotation pauses on user interaction (3 second resume delay)
- Configurator models: User-controlled interaction without auto-rotation
- Studio lighting setup optimized for automotive showcase
- Loading states prevent layout shift

### Interaction Optimization

- **Desktop**: Wheel event prevention stops page scroll conflicts during 3D zoom
- **Mobile**: Touch event prevention stops page zoom/scroll during 3D interaction
- **Cross-platform**: Pinch zoom converted to synthetic wheel events for OrbitControls
- Smooth damped controls with luxury feel (`dampingFactor: 0.05`)

### UI Performance

- Accordion sections reduce initial render load
- Sticky summary section with optimized backdrop blur
- Video autoplay with fallback gradient background
- Lenis smooth scrolling with `{ autoRaf: true }` configuration
- Long-term caching for static assets via Vercel headers

## Deployment

- **Platform**: Vercel (auto-detected SvelteKit)
- **Configuration**: `vercel.json` with security headers and caching rules
- **Adapter**: `@sveltejs/adapter-vercel`
- **Build Output**: ~33KB main bundle, ~819KB Three.js chunk (before gzip)

## 3D Troubleshooting Guide

### Critical Issues and Solutions

#### Issue: 3D Models Not Rendering (Black/Empty Scenes)

**Root Cause**: Setting `minDistance` and `maxDistance` to `undefined` when `enableZoom={false}`

**Solution**: Always set fixed distance constraints:
```typescript
minDistance={2}
maxDistance={15}
```

**Why**: When distance constraints are undefined, the camera can position itself at invalid distances where models are clipped or invisible.

#### Issue: Color Changes Not Working

**Root Causes & Solutions**:

1. **Wrong rendering approach**: 
   - ❌ Don't use `<GLTF>` component for models that need color changes
   - ❌ Don't use `<primitive object={scene} />`
   - ✅ Use `useGltf()` hook with `<T is={loadedGltf.scene} />`

2. **Hardcoded color values**:
   - ❌ `selectedColor="#000000"`
   - ✅ `selectedColor={selectedColor.hex}`

3. **Missing reactivity**:
   - ✅ Ensure `$effect()` accesses reactive variables to trigger updates

#### Issue: 3D Models Disappear When `enableZoom={false}`

**Root Cause**: Camera distance constraints being set to `undefined`

**Solution**: Always provide distance values regardless of zoom setting:
```typescript
minDistance={2}
maxDistance={15}
```

#### Issue: Svelte Self-Closing Tag Warnings

**Root Cause**: Using self-closing tags for non-void HTML elements

**Common Warnings**:
- `<primitive ... />` should be `<primitive ...></primitive>`
- `<div ... />` should be `<div ...></div>`

**Solution**: Always use proper opening/closing tags for non-void elements in Svelte components.

### Working Architecture (DO NOT CHANGE)

The current ModelViewer architecture is:
```
useGltf(model) → $effect() → <T is={loadedGltf.scene} />
```

This specific combination works for:
- ✅ Model rendering
- ✅ Color changing
- ✅ Material targeting
- ✅ Zoom controls

**DO NOT** switch to:
- `GLTF` component approach (breaks color changes)
- `primitive` object rendering (doesn't work in Threlte)
- Conditional distance constraints (breaks rendering)
