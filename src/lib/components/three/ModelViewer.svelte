<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, useGltf } from '@threlte/extras';
	import { getContext, onMount } from 'svelte';
	import * as THREE from 'three';

	let {
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '/mercedes-benz_maybach_2022.glb',
		target = [0, 0, 0],
		selectedColor = '#ffffff',
		materialColors = {},
		onMaterialsLoaded
	}: { 
		scale?: number; 
		objectPosition?: any; 
		model?: string; 
		target?: any; 
		selectedColor?: string;
		materialColors?: Record<string, string>;
		onMaterialsLoaded?: (materials: string[]) => void;
	} = $props();
	let centerOffset = $state({ x: 0, y: 0, z: 0 });
	let autoRotate = $state(true);

	// Get loading context to report 3D model loading status
	const loadingContext = getContext<{
		registerAsset: (id: string) => void;
		updateAsset: (
			id: string,
			status: 'pending' | 'loading' | 'loaded' | 'error',
			progress?: number
		) => void;
	}>('loading');

	// Register 3D model asset on mount
	onMount(() => {
		if (loadingContext) {
			loadingContext.registerAsset('3d-model');
		}
	});


	// Use the same approach as the working configurator
	const gltf = useGltf(model);

	// Store loaded GLTF for color changes
	let loadedGltf: any = null;

	// Store available materials for debug mode
	let availableMaterials: string[] = [];

	// Load GLTF initially
	$effect(() => {
		gltf.then((gltfData) => {
			loadedGltf = gltfData;
			
			// Extract material names for debug mode
			const materials: string[] = [];
			gltfData.scene.traverse((child: any) => {
				if (child.isMesh && child.material && child.material.name) {
					if (!materials.includes(child.material.name)) {
						materials.push(child.material.name);
					}
				}
			});
			availableMaterials = materials.sort();
			
			// Report materials to debug page
			if (onMaterialsLoaded) {
				onMaterialsLoaded(availableMaterials);
			}
			
			if (gltfData) {
				applyColors(gltfData.scene);
			}
		}).catch((error) => {
			console.error('GLTF loading failed:', error);
		});
	});

	// Apply colors when selectedColor or materialColors change
	$effect(() => {
		console.log('ModelViewer effect triggered - loadedGltf:', !!loadedGltf, 'materialColors keys:', Object.keys(materialColors), 'selectedColor:', selectedColor);
		if (loadedGltf) {
			applyColors(loadedGltf.scene);
		}
	});

	// New unified color application function
	function applyColors(scene: any) {
		const isDebugMode = Object.keys(materialColors).length > 0;
		if (isDebugMode) {
			console.log('Debug mode - materialColors:', materialColors);
		}
		
		scene.traverse((child: any) => {
			if (child.isMesh && child.material) {
				const material = child.material;
				const materialName = material.name || 'unnamed';
				
				// Check if we're in debug mode (individual material colors)
				if (isDebugMode && materialColors[materialName]) {
					// Debug mode: Apply specific color for this material
					console.log('Applying debug color to:', materialName, materialColors[materialName]);
					material.color = new THREE.Color(materialColors[materialName]);
					material.needsUpdate = true;
				} else {
					// Normal mode: Apply selectedColor to car body materials only
					const lowerName = materialName.toLowerCase();
					let shouldApplyColor = false;
					
					if (model.includes('maybach')) {
						// Maybach: Car_Paint_With_Flakes is the body
						shouldApplyColor = materialName === 'Car_Paint_With_Flakes';
					} else if (model.includes('honda')) {
						// Honda: Need to identify the correct material via debug (camera was too far)
						shouldApplyColor = materialName === 'material';
					} else if (model.includes('mazda')) {
						// Mazda: material is the body
						shouldApplyColor = materialName === 'material';
					} else {
						// Fallback: Conservative approach
						shouldApplyColor = lowerName.includes('paint') || materialName === 'material';
					}
						
					if (shouldApplyColor) {
						material.color = new THREE.Color(selectedColor);
						material.needsUpdate = true;
					}
				}
			}
		});
	}

	// Legacy function for backwards compatibility
	function applyColorToMaterials(scene: any, color: string) {
		console.log('Applying color:', color);
		let materialsFound: string[] = [];
		let materialsChanged: string[] = [];
		
		scene.traverse((child: any) => {
			if (child.isMesh && child.material) {
				const material = child.material;
				const materialName = material.name || 'unnamed';
				materialsFound.push(materialName);
				
				// Model-specific material targeting
				const lowerName = materialName.toLowerCase();
				let shouldApplyColor = false;
				
				if (model.includes('maybach')) {
					// Maybach: Car_Paint_With_Flakes is the body
					shouldApplyColor = materialName === 'Car_Paint_With_Flakes';
				} else if (model.includes('honda')) {
					// Honda: Need to identify the correct material via debug (camera was too far)
					shouldApplyColor = materialName === 'material';
				} else if (model.includes('mazda')) {
					// Mazda: material is the body
					shouldApplyColor = materialName === 'material';
				} else {
					// Fallback: Conservative approach
					shouldApplyColor = lowerName.includes('paint') || materialName === 'material';
				}
					
				if (shouldApplyColor) {
					console.log('Applying color to material:', materialName);
					material.color = new THREE.Color(color);
					material.needsUpdate = true;
					materialsChanged.push(materialName);
				}
			}
		});
		console.log('All materials found:', materialsFound);
		console.log('Materials changed:', materialsChanged);
	}

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

<!-- Wrapper group to center the model properly -->
<T.Group>
	{#await gltf}
		<!-- Loading state -->
		<T.Group>
			<!-- Empty while loading -->
		</T.Group>
	{:then loadedGltf}
		<!-- Use the scene directly like a regular GLTF component -->
		<T.Group {scale} position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
			<T is={loadedGltf.scene} />
		</T.Group>
	{:catch error}
		<T.Group>
			<!-- Error state -->
			{console.error('GLTF render error:', error)}
		</T.Group>
	{/await}
</T.Group>
