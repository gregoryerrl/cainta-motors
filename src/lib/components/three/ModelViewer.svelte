<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, GLTF } from '@threlte/extras';
	import * as THREE from 'three';

	let centerOffset = $state({ x: 0, y: 0, z: 0 });
	let autoRotate = $state(true);

	// Center the model when it loads - force center for vehicle
	function handleLoad(e: any) {
		const { scene } = e.detail;

		// Calculate bounding box
		const box = new THREE.Box3().setFromObject(scene);
		const center = box.getCenter(new THREE.Vector3());
		const size = box.getSize(new THREE.Vector3());
		const min = box.min;
		const max = box.max;

		// For a car, we want to center it differently:
		// X: true geometric center (left-right)
		// Y: keep it on ground level (don't center vertically)
		// Z: center of wheelbase (front-rear center)
		const vehicleCenter = {
			x: -center.x, // Center left-right
			y: -min.y, // Keep on ground
			z: -center.z // Center front-rear (wheelbase center)
		};

		centerOffset = vehicleCenter;

		// Setup shadows and materials
		scene.traverse((child: any) => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				if (child.material) {
					child.material.needsUpdate = true;
				}
			}
		});

		console.log('=== MODEL CENTERING DEBUG ===');
		console.log('Bounding box min:', min);
		console.log('Bounding box max:', max);
		console.log('Geometric center:', center);
		console.log('Model size:', size);
		console.log('Applied vehicle offset:', vehicleCenter);
		console.log('=============================');
	}
</script>

<T.PerspectiveCamera makeDefault position={[4, 1, 4]} fov={45} near={0.1} far={100}>
	<OrbitControls
		enablePan={false}
		enableZoom={false}
		enableDamping={true}
		dampingFactor={0.05}
		rotateSpeed={0.8}
		maxPolarAngle={Math.PI / 2}
		minPolarAngle={0.1}
		target={[0, 0, 0]}
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

<!-- Wrapper group to center the model properly -->
<T.Group>
	<GLTF
		url="/mercedes-benz_maybach_2022.glb"
		scale={0.5}
		position={[centerOffset.x, centerOffset.y, centerOffset.z]}
		castShadow
		receiveShadow
		on:load={handleLoad}
	/>
</T.Group>
