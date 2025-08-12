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
- **Car1 (Porsche Carrera GT)**: `/car1/car1.gltf` - Configurator model with color/accessory support
- **Car2 (McLaren P1)**: `/car2/car2.gltf` - Configurator model with color/accessory support

### Three 3D Systems

#### General Model Viewing (Homepage, Model Pages)

- Uses `Scene.svelte` → `ModelViewer.svelte` → `LazyScene.svelte`
- Loads any GLTF model via `model` prop with `useGltf()` hook approach
- Auto-rotation enabled, zoom disabled
- **Real-time color changing** support via `selectedColor` prop
- Model-specific material targeting for car body parts only
- Component chain: Page → `LazyScene` → `Scene` → `ModelViewer`

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
// General viewing - Auto-rotate showcase
enablePan={false}
enableZoom={false}
enableDamping={true}
autoRotate={true}
autoRotateSpeed={1.0}

// Configurator - User interaction
enablePan={false}
enableZoom={true}
zoomSpeed={0.6}
minDistance={2}
maxDistance={15}
autoRotate={false} // User controls
```

### Color Changing Implementation

#### Model Detail Pages (Real-time Color Preview)

- **Implementation**: `useGltf()` hook approach (not `<GLTF>` component)
- **Material Targeting**: Model-specific logic to target car body materials only
- **Supported Models**: Mercedes Maybach, Mazda 3, Honda City (camera repositioned)
- **Technical**: `material.color = new THREE.Color(selectedColor)` with `needsUpdate = true`

```javascript
// Model-specific material targeting logic
if (model.includes('maybach')) {
  shouldApplyColor = materialName === 'car_chrome';
} else if (model.includes('mazda')) {
  shouldApplyColor = materialName.includes('16'); // material_16
} else if (model.includes('honda')) {
  shouldApplyColor = materialName === 'material'; // To be verified
}
```

#### Configurator Features (Interactive Customization)

- **Car1**: `Main_Paint` material with `material.color={selectedColor}`
- **Car2**: Multiple `Carpaint` materials with synchronized color binding
- Real-time color preview with 8 available colors

#### Debug Material Identification

- **Debug Route**: `/gregoryerrl` for development material identification
- **Auto-highlighting**: Cycles through materials with red coloring (500ms intervals)
- **Material Discovery**: Used to identify `car_chrome` (Maybach), `material_16` (Mazda)
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
- **VehicleCard** (`/src/lib/components/ui/`): Vehicle display cards with pricing
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

- **Homepage** (`/`): Video hero, 3D model showcase, feature sections
- **Models** (`/models`): Grid of available vehicles with filters
- **Model Detail** (`/models/[slug]`): Individual vehicle with 3D viewer, gallery, specs
- **Configurator** (`/configurator`): Interactive car customization with real-time 3D preview, color changes, and accessory selection
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

### Regular Models (3D Viewing with Color Changing)

1. **Honda City RS** - Sedan with 3D model and color changing (material TBD)
2. **Toyota Vios GR-S** - Sedan (no 3D model)
3. **Mazda 3 Premium** - Sedan with 3D model and color changing (`material_16`)
4. **Mercedes-Benz Maybach S-Class** - Luxury with 3D model and color changing (`car_chrome`)

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
