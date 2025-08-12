<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import CarSelector from './CarSelector.svelte';

	let {
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '/car1/car1.gltf',
		target = [0, 0, 0],
		selectedColor = '#ffffff',
		accessory = 0
	}: {
		scale?: number;
		objectPosition?: any;
		model?: string;
		target?: any;
		selectedColor?: string;
		accessory?: number;
	} = $props();

	let autoRotate = $state(false); // Disabled for configurator - user controls

	// Determine which car to show based on model path
	const selectedCar = $derived(() => {
		if (model.includes('car1')) return 'car1';
		if (model.includes('car2')) return 'car2';
		return 'car1';
	});
</script>

<T.PerspectiveCamera makeDefault position={objectPosition} fov={45} near={0.1} far={100}>
	<OrbitControls
		enablePan={false}
		enableZoom={true}
		enableDamping={true}
		dampingFactor={0.05}
		rotateSpeed={0.8}
		zoomSpeed={0.6}
		minDistance={2}
		maxDistance={15}
		maxPolarAngle={Math.PI / 2}
		minPolarAngle={0.1}
		{target}
		{autoRotate}
	/>
</T.PerspectiveCamera>

<!-- Optimized automotive lighting setup (5 lights total) -->
<!-- Main key light with optimized shadows -->
<T.DirectionalLight
	position={[10, 15, 10]}
	intensity={2.2}
	castShadow
	shadow.camera.left={-8}
	shadow.camera.right={8}
	shadow.camera.top={8}
	shadow.camera.bottom={-8}
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
	shadow.bias={-0.001}
/>

<!-- Fill light (no shadows for performance) -->
<T.DirectionalLight position={[-8, 10, -5]} intensity={1.0} />

<!-- Ambient lighting for overall illumination -->
<T.AmbientLight intensity={0.7} />

<!-- Hemisphere light for natural sky/ground lighting -->
<T.HemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.8} />

<!-- Single accent spotlight for highlights -->
<T.SpotLight
	position={[0, 12, 0]}
	angle={0.6}
	penumbra={0.8}
	intensity={1.5}
	target.position={[0, 0, 0]}
/>

<!-- Car models with color change capability -->
<T.Group {scale}>
	<CarSelector selectedCar={selectedCar()} {selectedColor} {accessory} />
</T.Group>
