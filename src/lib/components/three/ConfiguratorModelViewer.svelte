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
	}: { scale?: number; objectPosition?: any; model?: string; target?: any; selectedColor?: string; accessory?: number } = $props();
	
	let autoRotate = $state(true);
	
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
		enableZoom={false}
		enableDamping={true}
		dampingFactor={0.05}
		rotateSpeed={0.8}
		maxPolarAngle={Math.PI / 2}
		minPolarAngle={0.1}
		{target}
		{autoRotate}
		autoRotateSpeed={1.0}
		on:start={() => {
			autoRotate = false;
		}}
		on:end={() => {
			setTimeout(() => {
				autoRotate = true;
			}, 3000);
		}}
	/>
</T.PerspectiveCamera>

<!-- Enhanced lighting setup for premium automotive showcase -->
<!-- Main key light (from front-right) -->
<T.DirectionalLight
	position={[10, 15, 10]}
	intensity={2.5}
	castShadow
	shadow.camera.left={-10}
	shadow.camera.right={10}
	shadow.camera.top={10}
	shadow.camera.bottom={-10}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
/>

<!-- Fill light (from back-left) -->
<T.DirectionalLight position={[-8, 12, -8]} intensity={1.2} />

<!-- Rim light (from behind) -->
<T.DirectionalLight position={[0, 8, -15]} intensity={1.8} />

<!-- Ambient base lighting -->
<T.AmbientLight intensity={0.6} />

<!-- Front accent spotlights -->
<T.SpotLight position={[6, 8, 6]} angle={0.4} penumbra={0.6} intensity={2} castShadow />
<T.SpotLight position={[-6, 8, 6]} angle={0.4} penumbra={0.6} intensity={1.8} />

<!-- Side highlighting -->
<T.SpotLight position={[12, 6, 0]} angle={0.5} penumbra={0.7} intensity={1.5} />
<T.SpotLight position={[-12, 6, 0]} angle={0.5} penumbra={0.7} intensity={1.3} />

<!-- Ground/undercarriage lighting -->
<T.SpotLight position={[0, 2, 8]} angle={0.8} penumbra={0.8} intensity={1} />

<!-- Rear accent light -->
<T.SpotLight position={[0, 10, -8]} angle={0.6} penumbra={0.5} intensity={1.2} />

<!-- Car models with color change capability -->
<T.Group scale={scale}>
	<CarSelector selectedCar={selectedCar()} {selectedColor} {accessory} />
</T.Group>