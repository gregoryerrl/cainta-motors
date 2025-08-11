<script lang="ts">
	import ConfiguratorScene from '$lib/components/three/ConfiguratorScene.svelte';
	import { Download, Share2 } from 'lucide-svelte';

	// Color options similar to the example
	const colors = [
		{ name: 'Red', hex: '#FF0000' },
		{ name: 'Green', hex: '#1a5e1a' },
		{ name: 'Blue', hex: '#0000FF' },
		{ name: 'Purple', hex: '#A020F0' },
		{ name: 'Orange', hex: '#ffa500' },
		{ name: 'Grey', hex: '#59555b' },
		{ name: 'Black', hex: '#222222' },
		{ name: 'White', hex: '#ececec' }
	];

	// Car options
	const carOptions = [
		{ id: 'car1', name: 'Sports Car', model: '/car1/car1.gltf', price: 100000 },
		{ id: 'car2', name: 'Luxury Sedan', model: '/car2/car2.gltf', price: 150000 }
	];

	// State management
	let selectedCar = $state('car1');
	let selectedColor = $state(colors[2]); // Default to blue
	let accessory = $state(0);
	let showDetails = $state(false);
	let isLoading = $state(true);
	let loadingKey = $state(0);

	// Calculate total cost
	const totalCost = $derived(() => {
		let cost = selectedCar === 'car1' ? 100000 : 150000;
		if (accessory === 1) cost += 10000;
		return cost;
	});

	// Initialize first load
	$effect(() => {
		if (loadingKey === 0) {
			setTimeout(() => {
				isLoading = false;
			}, 2000);
		}
	});

	// Handle car selection
	function selectCarModel(carId: string) {
		if (selectedCar === carId) return;
		
		selectedCar = carId;
		isLoading = true;
		loadingKey++;

		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}

	// Get current car info
	const currentCarInfo = $derived(() => {
		const currentCar = carOptions.find(car => car.id === selectedCar);
		return {
			name: currentCar?.name || 'Sports Car',
			model: currentCar?.model || '/car1/car1.gltf',
			price: currentCar?.price || 100000
		};
	});

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
		<p class="mt-4 text-center text-lg font-thin text-gray-500">Customize your perfect vehicle</p>

		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- 3D Scene -->
			<div class="lg:col-span-2">
				<div class="relative aspect-video overflow-hidden rounded-lg bg-white/6">
					{#key loadingKey}
						<ConfiguratorScene
							class="h-full w-full"
							scale={1}
							objectPosition={[4, 2, 4]}
							model={currentCarInfo().model}
							target={[0, 0, 0]}
							selectedColor={selectedColor.hex}
							{accessory}
						/>
					{/key}

					{#if isLoading}
						<div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
							<div class="flex flex-col items-center gap-4">
								<div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
								<p class="text-sm font-thin text-gray-300">Loading {currentCarInfo().name}...</p>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Configurator Sections -->
			<div class="lg:col-span-1">
				<div class="space-y-6">
					
					<!-- Car Options Section -->
					<div class="border border-gray-800 bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-light uppercase tracking-widest text-white">Car Options</h3>
						<div class="space-y-3">
							{#each carOptions as car}
								<button
									onclick={() => selectCarModel(car.id)}
									class="w-full border p-4 text-left transition-all {selectedCar === car.id
										? 'border-red-900 bg-red-900/20'
										: 'border-gray-700 hover:border-gray-600'}"
								>
									<div class="text-sm font-light text-white uppercase tracking-wider">
										{car.name} - {formatPrice(car.price)}
									</div>
								</button>
							{/each}
							
							<button
								onclick={() => showDetails = !showDetails}
								class="mt-4 w-full border border-gray-700 px-4 py-2 text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600"
							>
								{showDetails ? 'Hide Car Specifications' : 'Show Car Specifications'}
							</button>
						</div>
					</div>

					<!-- Car Color Section -->
					<div class="border border-gray-800 bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-light uppercase tracking-widest text-white">Car Color</h3>
						<div class="grid grid-cols-2 gap-3">
							{#each colors as color}
								<button
									onclick={() => selectedColor = color}
									class="flex items-center gap-3 border p-3 text-left transition-all {selectedColor.name === color.name
										? 'border-red-900 bg-red-900/20'
										: 'border-gray-700 hover:border-gray-600'}"
								>
									<div
										class="h-4 w-4 border border-gray-600"
										style="background-color: {color.hex}"
									></div>
									<div class="text-xs font-light text-white uppercase tracking-wider">
										{color.name}
									</div>
								</button>
							{/each}
						</div>
					</div>

					<!-- Accessories Section -->
					<div class="border border-gray-800 bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-light uppercase tracking-widest text-white">Accessories</h3>
						<div class="space-y-3">
							<button
								onclick={() => accessory = 1}
								class="w-full border p-4 text-left transition-all {accessory === 1
									? 'border-red-900 bg-red-900/20'
									: 'border-gray-700 hover:border-gray-600'}"
							>
								<div class="text-sm font-light text-white uppercase tracking-wider">
									Performance Package - {formatPrice(10000)}
								</div>
							</button>
							<button
								onclick={() => accessory = 0}
								class="w-full border p-4 text-left transition-all {accessory === 0
									? 'border-red-900 bg-red-900/20'
									: 'border-gray-700 hover:border-gray-600'}"
							>
								<div class="text-sm font-light text-white uppercase tracking-wider">
									Standard Package
								</div>
							</button>
						</div>
					</div>

					<!-- Total Cost Section -->
					<div class="border border-gray-800 bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-light uppercase tracking-widest text-white">Total Cost</h3>
						<div class="border border-gray-700 p-4">
							<div class="text-2xl font-thin text-red-900">
								{formatPrice(totalCost())}
							</div>
							<p class="mt-2 text-xs font-thin text-gray-600">
								*Final price may vary based on additional options
							</p>
						</div>
					</div>

					<!-- Car Details Section -->
					{#if showDetails}
						<div class="border border-gray-800 bg-white/6 p-6">
							<h3 class="mb-4 text-lg font-light uppercase tracking-widest text-white">Specifications</h3>
							<div class="space-y-3 text-sm font-thin text-gray-400">
								<p>Model: {currentCarInfo().name}</p>
								<p>Color: {selectedColor.name}</p>
								<p>Package: {accessory === 1 ? 'Performance' : 'Standard'}</p>
								<p>Interactive 3D viewer with drag-to-rotate controls</p>
							</div>
						</div>
					{/if}

					<!-- Action Buttons -->
					<div class="space-y-3">
						<button class="flex w-full items-center justify-center gap-2 border border-red-900 px-6 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20">
							<Download class="h-4 w-4" />
							Save Configuration
						</button>
						<button class="flex w-full items-center justify-center gap-2 border border-white px-6 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black">
							<Share2 class="h-4 w-4" />
							Share
						</button>
						<a href="/contact" class="block w-full border border-gray-700 bg-white/6 px-6 py-3 text-center text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-gray-700">
							Contact Dealer
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
