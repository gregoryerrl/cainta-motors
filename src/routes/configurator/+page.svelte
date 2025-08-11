<script lang="ts">
	import Scene from '$lib/components/three/Scene.svelte';
	import { Download, Share2 } from 'lucide-svelte';

	interface CarModel {
		id: string;
		modelName: string;
		modelUrl: string;
		scale: number;
		position: [number, number, number];
		target: [number, number, number];
		price: number;
	}

	const carModels: CarModel[] = [
		{
			id: 'mercedes-maybach',
			modelName: 'Mercedes-Benz Maybach 2022',
			modelUrl: '/mercedes-benz_maybach_2022.glb',
			scale: 1,
			position: [4, 2, 4],
			target: [0, 0, 0],
			price: 12500000
		},
		{
			id: 'honda-city-rs',
			modelName: 'Honda City RS',
			modelUrl: '/honda_city_rs.glb',
			scale: 3.8,
			position: [4, 1, 4],
			target: [0, 0, 2.5],
			price: 1115000
		}
	];

	let selectedModel = $state(carModels[0]);
	let isLoading = $state(true); // Start with loading true for initial load
	let loadingKey = $state(0);

	// Initialize first load
	$effect(() => {
		// Only run once on mount
		if (loadingKey === 0) {
			setTimeout(() => {
				isLoading = false;
			}, 2000); // Give time for initial model to load
		}
	});

	// Track loading state when model changes
	function selectModel(model: CarModel) {
		if (selectedModel.id === model.id) return; // Don't reload if same model

		selectedModel = model;
		isLoading = true;
		loadingKey++; // Force re-render of Scene component

		// Use a timeout as fallback since GLTF events might not work properly
		setTimeout(() => {
			isLoading = false;
		}, 2000); // 2 seconds should be enough for model loading
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 0
		}).format(price);
	};
</script>

<svelte:head>
	<title>Configure Your Car - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-center text-4xl font-thin text-white md:text-5xl">Configure Your Dream Car</h1>
		<p class="mt-4 text-center text-lg font-thin text-gray-500">Select your preferred model</p>

		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="relative aspect-video overflow-hidden rounded-lg bg-white/6">
					{#key loadingKey}
						<Scene
							class="h-full w-full"
							scale={selectedModel.scale}
							objectPosition={selectedModel.position}
							model={selectedModel.modelUrl}
							target={selectedModel.target}
						/>
					{/key}

					{#if isLoading}
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						>
							<div class="flex flex-col items-center gap-4">
								<div
									class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-white"
								></div>
								<p class="text-sm font-thin text-gray-300">Loading {selectedModel.modelName}...</p>
							</div>
						</div>
					{/if}
				</div>

				<div class="mt-8 border border-gray-800 bg-white/6 p-6">
					<h2 class="mb-6 text-xl font-thin text-white">Select Model</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#each carModels as model}
							<button
								onclick={() => selectModel(model)}
								class="border p-6 text-left transition-all {selectedModel.id === model.id
									? 'border-red-900 bg-red-900/20'
									: 'border-gray-700 hover:border-gray-600'}"
							>
								<p class="text-lg font-light text-white">
									{model.modelName}
								</p>
								<p class="mt-2 text-sm font-thin text-gray-500">
									Starting from {formatPrice(model.price)}
								</p>
							</button>
						{/each}
					</div>
				</div>

				<div class="mt-6 border border-gray-800 bg-white/6 p-6">
					<h2 class="mb-4 text-xl font-thin text-white">Model Information</h2>
					<div class="space-y-3">
						<p class="font-thin text-gray-400">
							Experience the {selectedModel.modelName} in our interactive 3D viewer. Rotate the model
							by dragging to view from different angles.
						</p>
						<p class="font-thin text-gray-400">
							Contact our dealership for more customization options including colors, wheels,
							interior packages, and additional features.
						</p>
					</div>
				</div>
			</div>

			<div class="lg:col-span-1">
				<div class="sticky top-24 space-y-6">
					<div class="border border-gray-800 bg-white/6 p-6">
						<h2 class="mb-4 text-xl font-thin text-white">Selected Configuration</h2>

						<div class="space-y-4 border-b border-gray-800 pb-4">
							<div>
								<span class="block font-thin text-gray-500">Model</span>
								<span class="text-lg font-light text-white">
									{selectedModel.modelName}
								</span>
							</div>
						</div>

						<div class="mt-4">
							<div class="flex flex-col space-y-2">
								<span class="font-thin text-gray-500">Base Price</span>
								<span class="text-2xl font-thin text-red-900">
									{formatPrice(selectedModel.price)}
								</span>
							</div>
						</div>

						<p class="mt-4 text-xs font-thin text-gray-600">
							*Final price may vary based on additional customizations and features
						</p>
					</div>

					<div class="space-y-3">
						<button
							class="flex w-full items-center justify-center gap-2 border border-red-900 px-6 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
						>
							<Download class="h-4 w-4" />
							Save Configuration
						</button>
						<button
							class="flex w-full items-center justify-center gap-2 border border-white px-6 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black"
						>
							<Share2 class="h-4 w-4" />
							Share
						</button>
						<a
							href="/contact"
							class="block w-full border border-gray-700 bg-white/6 px-6 py-3 text-center text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-gray-700"
						>
							Contact Dealer
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
