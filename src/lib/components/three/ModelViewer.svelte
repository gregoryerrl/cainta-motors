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
		onMaterialsLoaded,
		enableZoom = false
	}: { 
		scale?: number; 
		objectPosition?: any; 
		model?: string; 
		target?: any; 
		selectedColor?: string;
		materialColors?: Record<string, string>;
		onMaterialsLoaded?: (materials: string[]) => void;
		enableZoom?: boolean;
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
			
			// Debug: Log model info
			console.log('🚗 GLTF Model loaded:', model);
			console.log('📏 Scene bounding box:', gltfData.scene.children.length, 'children');
			
			// Calculate bounding box for debugging
			const box = new THREE.Box3().setFromObject(gltfData.scene);
			const size = box.getSize(new THREE.Vector3());
			const center = box.getCenter(new THREE.Vector3());
			console.log('📦 Model size:', size);
			console.log('📍 Model center:', center);
			
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
			console.log('🎨 Materials found:', availableMaterials);
			
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
					} else if (model.includes('audi') || model.includes('2013')) {
						// Audi TT: Coloured material is the car body paint
						shouldApplyColor = materialName === 'AAudi_TTRSPlusCoupe_2014Coloured_Material1';
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
				} else if (model.includes('audi') || model.includes('2013')) {
					// Audi TT: Coloured material is the car body paint
					shouldApplyColor = materialName === 'AAudi_TTRSPlusCoupe_2014Coloured_Material1';
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
		{enableZoom}
		enableDamping={true}
		dampingFactor={0.05}
		rotateSpeed={0.8}
		maxPolarAngle={Math.PI / 2}
		minPolarAngle={0.1}
		{target}
		{autoRotate}
		autoRotateSpeed={1.0}
		zoomSpeed={0.6}
		minDistance={2}
		maxDistance={15}
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
