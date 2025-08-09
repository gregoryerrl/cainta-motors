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

<T.PerspectiveCamera makeDefault position={[2.5, 1.8, 2.5]} fov={45} near={0.1} far={100}>
	<OrbitControls
		enablePan={false}
		enableZoom={true}
		enableDamping={true}
		dampingFactor={0.05}
		rotateSpeed={0.8}
		zoomSpeed={1.2}
		minDistance={1.2}
		maxDistance={6}
		maxPolarAngle={Math.PI / 2}
		minPolarAngle={0.1}
		target={[0, 0, 0.6]}
		{autoRotate}
		autoRotateSpeed={1.0}
		on:start={() => {
			autoRotate = false;
			console.log('User interaction - stopping auto-rotation');
		}}
		on:end={() => {
			// Resume auto-rotation after 3 seconds of no interaction
			setTimeout(() => {
				autoRotate = true;
				console.log('Resuming auto-rotation');
			}, 3000);
		}}
	/>
</T.PerspectiveCamera>

<!-- Enhanced lighting for better material visibility -->
<T.DirectionalLight
	position={[10, 15, 10]}
	intensity={2}
	castShadow
	shadow.camera.left={-10}
	shadow.camera.right={10}
	shadow.camera.top={10}
	shadow.camera.bottom={-10}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
/>

<T.DirectionalLight position={[-10, 10, -10]} intensity={1} />

<T.AmbientLight intensity={0.8} />

<T.SpotLight position={[5, 10, 5]} angle={0.3} penumbra={0.5} intensity={1.5} castShadow />

<T.SpotLight position={[-5, 10, -5]} angle={0.3} penumbra={0.5} intensity={1} />

<!-- Wrapper group to center the model properly -->
<T.Group>
	<GLTF
		url="/honda_city_rs.glb"
		scale={1.2}
		position={[centerOffset.x, centerOffset.y, centerOffset.z]}
		castShadow
		receiveShadow
		on:load={handleLoad}
	/>
</T.Group>
