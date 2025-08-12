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

<!-- Professional Studio Lighting Setup for Color Accuracy -->
<!-- Primary Key Light - Balanced intensity -->
<T.DirectionalLight
	position={[10, 10, 5]}
	intensity={1.8}
	color={0xffffff}
	castShadow
	shadow.camera.left={-20}
	shadow.camera.right={20}
	shadow.camera.top={20}
	shadow.camera.bottom={-20}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	shadow.bias={-0.0005}
/>

<!-- Fill Light - Opposite side for balanced illumination -->
<T.DirectionalLight
	position={[-8, 6, -3]}
	intensity={0.9}
	color={0xffffff}
/>

<!-- Rim Light - Highlights edges and contours -->
<T.DirectionalLight
	position={[-10, 15, -8]}
	intensity={0.6}
	color={0xffffff}
/>

<!-- Front Fill Light - Better visibility for dark colors -->
<T.DirectionalLight
	position={[0, 5, 12]}
	intensity={0.5}
	color={0xffffff}
/>

<!-- Ambient Light - Increased for better dark color visibility -->
<T.AmbientLight intensity={0.7} color={0xffffff} />

<!-- Natural Sky/Ground - Brighter ground reflection -->
<T.HemisphereLight 
	color={0xffffff} 
	groundColor={0xf0f0f0}
	intensity={0.4} 
/>

<!-- Car models with color change capability -->
<T.Group {scale}>
	<CarSelector selectedCar={selectedCar()} {selectedColor} {accessory} />
</T.Group>
