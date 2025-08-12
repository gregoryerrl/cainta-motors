<script lang="ts">
	import { vehicles } from '$lib/data/vehicles';
	import LazyScene from '$lib/components/three/LazyScene.svelte';

	// Get vehicles with 3D models for debugging
	const vehiclesWithModels = vehicles.filter(v => v.has3DModel && v.modelPath);
	
	let selectedVehicle = $state(vehiclesWithModels[0]);
	let materialColors = $state<Record<string, string>>({});
	let availableMaterials = $state<string[]>([]);
	
	// Auto-cycling state
	let isAutoHighlighting = $state(false);
	let currentMaterialIndex = $state(0);
	let autoHighlightInterval: number;

	// Highlight color for auto-cycling
	const highlightColor = '#ff0000'; // Bright red

	function updateMaterialColor(materialName: string, color: string) {
		console.log('Updating material color:', materialName, color);
		materialColors[materialName] = color;
		// Trigger reactivity
		materialColors = { ...materialColors };
		console.log('Updated materialColors:', materialColors);
	}

	function resetAllMaterials() {
		stopAutoHighlight();
		materialColors = {};
		availableMaterials = [];
	}

	// Auto-highlight functions
	function startAutoHighlight() {
		if (availableMaterials.length === 0) return;
		
		isAutoHighlighting = true;
		currentMaterialIndex = 0;
		materialColors = {}; // Reset all colors
		
		console.log('Starting auto-highlight with materials:', availableMaterials);
		
		autoHighlightInterval = setInterval(() => {
			// Reset previous material
			if (currentMaterialIndex > 0) {
				const prevMaterial = availableMaterials[currentMaterialIndex - 1];
				delete materialColors[prevMaterial];
			} else if (currentMaterialIndex === 0 && availableMaterials.length > 1) {
				// Reset the last material when starting over
				const lastMaterial = availableMaterials[availableMaterials.length - 1];
				delete materialColors[lastMaterial];
			}
			
			// Highlight current material
			const currentMaterial = availableMaterials[currentMaterialIndex];
			materialColors[currentMaterial] = highlightColor;
			materialColors = { ...materialColors }; // Trigger reactivity
			
			console.log(`🔴 HIGHLIGHTING: ${currentMaterial} (${currentMaterialIndex + 1}/${availableMaterials.length})`);
			
			currentMaterialIndex = (currentMaterialIndex + 1) % availableMaterials.length;
		}, 500); // 500ms delay as requested
	}
	
	function stopAutoHighlight() {
		isAutoHighlighting = false;
		if (autoHighlightInterval) {
			clearInterval(autoHighlightInterval);
		}
		materialColors = {}; // Reset all colors
	}

	// Called by the debug ModelViewer to report available materials
	function setAvailableMaterials(materials: string[]) {
		console.log('Debug page received materials:', materials);
		availableMaterials = materials;
		materialColors = { ...materialColors };
		console.log('Debug page materialColors:', materialColors);
	}
</script>

<svelte:head>
	<title>Debug Material Colors - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-center text-4xl font-thin text-white mb-8">Debug Material Colors</h1>
		
		<!-- Vehicle Selector -->
		<div class="mb-8 text-center">
			<h2 class="text-lg font-thin text-gray-300 mb-4 uppercase tracking-wider">Select Vehicle</h2>
			<div class="flex justify-center gap-4">
				{#each vehiclesWithModels as vehicle}
					<button
						onclick={() => { selectedVehicle = vehicle; resetAllMaterials(); }}
						class="border px-4 py-2 text-sm font-thin tracking-wider uppercase transition-all {selectedVehicle.id === vehicle.id
							? 'border-red-900 bg-red-900/20 text-white'
							: 'border-gray-700 text-gray-300 hover:border-gray-600'}"
					>
						{vehicle.brand} {vehicle.model}
					</button>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- 3D Model -->
			<div>
				<h3 class="text-lg font-thin text-gray-300 mb-4 uppercase tracking-wider">3D Model</h3>
				<div class="relative aspect-video overflow-hidden border border-gray-800 bg-white/6">
					{#key selectedVehicle.id}
						<LazyScene
							class="h-full w-full"
							model={selectedVehicle.modelPath}
							scale={selectedVehicle.modelScale || 1}
							objectPosition={selectedVehicle.modelPosition || [4, 2, 4]}
							target={selectedVehicle.modelTarget || [0, 0, 0]}
							selectedColor="#ffffff"
							materialColors={materialColors}
							onMaterialsLoaded={setAvailableMaterials}
							priority={true}
						/>
					{/key}
				</div>
			</div>

			<!-- Material Controls -->
			<div>
				<h3 class="text-lg font-thin text-gray-300 mb-4 uppercase tracking-wider">
					Auto Material Highlighter ({availableMaterials.length} materials)
				</h3>
				
				<div class="border border-gray-800 bg-white/6 p-6">
					{#if availableMaterials.length === 0}
						<p class="text-gray-500 text-sm mb-4">Loading materials...</p>
					{:else}
						<div class="mb-6">
							<p class="text-sm font-thin text-gray-300 mb-4">
								This will cycle through all {availableMaterials.length} materials, highlighting each one in red for 500ms.
								Watch the 3D model and browser console to identify which parts change.
							</p>
							
							{#if isAutoHighlighting}
								<div class="mb-4 p-3 border border-red-900 bg-red-900/20">
									<p class="text-sm font-thin text-white">
										🔴 Auto-highlighting active... 
										Currently highlighting: <strong>{availableMaterials[currentMaterialIndex] || 'N/A'}</strong>
									</p>
									<p class="text-xs font-thin text-gray-300 mt-1">
										Progress: {currentMaterialIndex + 1} / {availableMaterials.length}
									</p>
								</div>
							{/if}
						</div>
					{/if}
					
					<div class="space-y-3">
						{#if !isAutoHighlighting}
							<button
								onclick={startAutoHighlight}
								disabled={availableMaterials.length === 0}
								class="w-full border border-red-900 px-4 py-3 text-sm font-thin tracking-widest text-white uppercase transition-all hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Start Auto-Highlighting
							</button>
						{:else}
							<button
								onclick={stopAutoHighlight}
								class="w-full border border-yellow-600 px-4 py-3 text-sm font-thin tracking-widest text-white uppercase transition-all hover:bg-yellow-600/20"
							>
								Stop Auto-Highlighting
							</button>
						{/if}
						
						<button
							onclick={resetAllMaterials}
							class="w-full border border-gray-700 px-4 py-2 text-xs font-thin tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-white/5"
						>
							Reset & Clear
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Instructions -->
		<div class="mt-8 border border-gray-800 bg-white/6 p-6">
			<h3 class="text-lg font-thin text-white mb-3 uppercase tracking-wider">Debug Instructions</h3>
			<ul class="text-sm font-thin text-gray-300 space-y-2">
				<li>• Select a vehicle from the tabs above</li>
				<li>• Click "Start Auto-Highlighting" to cycle through all materials</li>
				<li>• Watch the 3D model - each material will turn red for 500ms</li>
				<li>• Check browser console for material names: "🔴 HIGHLIGHTING: material_name"</li>
				<li>• Identify which materials represent the car body vs interior/chrome/glass</li>
				<li>• Use this info to update the production material targeting logic</li>
			</ul>
		</div>
	</div>
</section>