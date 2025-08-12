<script lang="ts">
	import ConfiguratorScene from '$lib/components/three/ConfiguratorScene.svelte';
	import AccordionSection from '$lib/components/ui/AccordionSection.svelte';
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
		{ id: 'car1', name: 'Porsche Carrera GT', model: '/car1/car1.gltf', price: 10000000 },
		{ id: 'car2', name: 'McLaren P1', model: '/car2/car2.gltf', price: 15000000 }
	];

	// State management
	let selectedCar = $state('car1');
	let selectedColor = $state(colors[2]); // Default to blue
	let accessory = $state(0);
	let isLoading = $state(false);
	let loadingKey = $state(0);

	// Accordion state management
	let vehicleExpanded = $state(false); // Always expanded for primary selection
	let customizationExpanded = $state(false); // Start expanded for easy access
	let specsExpanded = $state(false); // Collapsed by default
	let mobileTabOpen = $state(false); // Mobile customization tab state

	// Calculate total cost
	const totalCost = $derived(() => {
		let cost = selectedCar === 'car1' ? 10000000 : 15000000;
		if (accessory === 1) cost += 1000000;
		return cost;
	});

	// Handle car selection
	function selectCarModel(carId: string) {
		if (selectedCar === carId) return;

		selectedCar = carId;
		isLoading = true;
		loadingKey++;

		// Quick loading state for model switch
		requestAnimationFrame(() => {
			setTimeout(() => {
				isLoading = false;
			}, 300);
		});
	}

	// Get current car info
	const currentCarInfo = $derived(() => {
		const currentCar = carOptions.find((car) => car.id === selectedCar);
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

<section class="min-h-screen bg-black">
	<!-- Mobile Layout (md and below) -->
	<div class="block md:hidden">
		<!-- Fullscreen 3D Layout -->
		<div class="fixed inset-0 bg-black">
			<!-- Fullscreen 3D Scene -->
			<div class="h-full w-full bg-white/6">
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
					<div
						class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
					>
						<div class="flex flex-col items-center gap-4">
							<div
								class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-white"
							></div>
							<p class="text-sm font-thin text-gray-300">Loading {currentCarInfo().name}...</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Floating Header -->
			<div
				class="absolute inset-x-0 top-0 z-20 border-b border-gray-800 bg-black/80 p-4 pt-6 backdrop-blur-sm"
			>
				<h1 class="text-center text-lg font-thin tracking-wider text-white">Configure Your Car</h1>
			</div>

			<!-- Current Selection Badge -->
			<div
				class="absolute top-20 right-4 z-20 rounded border border-gray-800 bg-black/90 p-3 backdrop-blur-sm"
			>
				<p class="text-xs font-light tracking-wider text-white uppercase">
					{currentCarInfo().name}
				</p>
				<p class="text-xs font-thin text-gray-500">
					{selectedColor.name} • {accessory === 1 ? 'Perf' : 'Std'}
				</p>
				<p class="mt-1 text-center text-lg font-thin text-red-900">
					{formatPrice(totalCost())}
				</p>
			</div>

			<!-- Collapsible Customization Tab -->
			<div class="absolute inset-x-0 bottom-0 z-20">
				<!-- Tab Handle -->
				<button
					onclick={() => (mobileTabOpen = !mobileTabOpen)}
					class="w-full border-t border-gray-800 bg-black/90 p-4 text-center backdrop-blur-sm transition-all hover:bg-black"
				>
					<div class="flex items-center justify-center gap-2">
						<span class="text-sm font-light tracking-wider text-white uppercase"> Customize </span>
						<div class="transition-transform {mobileTabOpen ? 'rotate-180' : ''}">
							<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 15l7-7 7 7"
								></path>
							</svg>
						</div>
					</div>
				</button>

				<!-- Collapsible Content -->
				<div
					class="transition-all duration-300 {mobileTabOpen
						? 'h-[30vh]'
						: 'h-0'} overflow-hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm"
				>
					<div class="h-full overflow-y-auto overscroll-contain">
						<div class="space-y-4 p-4 pb-8">
							<!-- Vehicle Selection -->
							<div>
								<h3 class="mb-3 text-xs font-thin tracking-widest text-gray-500 uppercase">
									Vehicle Model
								</h3>
								<div class="space-y-2">
									{#each carOptions as car}
										<button
											onclick={() => selectCarModel(car.id)}
											class="w-full border p-3 text-left transition-all {selectedCar === car.id
												? 'border-red-900 bg-red-900/20'
												: 'border-gray-700 hover:border-gray-600'}"
										>
											<div class="text-sm font-light tracking-wider text-white uppercase">
												{car.name}
											</div>
											<div class="text-xs font-thin text-gray-400">
												{formatPrice(car.price)}
											</div>
										</button>
									{/each}
								</div>
							</div>

							<!-- Color Selection -->
							<div>
								<h3 class="mb-3 text-xs font-thin tracking-widest text-gray-500 uppercase">
									Color
								</h3>
								<div class="grid grid-cols-4 gap-3">
									{#each colors as color}
										<button
											onclick={() => (selectedColor = color)}
											class="relative aspect-square border-2 transition-all {selectedColor.name ===
											color.name
												? 'scale-105 border-red-900 shadow-lg shadow-red-900/50'
												: 'border-gray-700 hover:border-gray-600'}"
											style="background-color: {color.hex}"
											title={color.name}
										>
											{#if selectedColor.name === color.name}
												<div class="absolute inset-0 flex items-center justify-center">
													<div
														class="h-2 w-2 rounded-full {color.hex === '#000000' ||
														color.hex === '#4a4a4a' ||
														color.hex === '#222222'
															? 'bg-white'
															: 'bg-black'}"
													></div>
												</div>
											{/if}
										</button>
									{/each}
								</div>
								<p class="mt-2 text-center text-sm font-thin text-gray-400">{selectedColor.name}</p>
							</div>

							<!-- Package Selection -->
							<div>
								<h3 class="mb-3 text-xs font-thin tracking-widest text-gray-500 uppercase">
									Package
								</h3>
								<div class="space-y-2">
									<button
										onclick={() => (accessory = 0)}
										class="w-full border p-3 text-left transition-all {accessory === 0
											? 'border-red-900 bg-red-900/20'
											: 'border-gray-700 hover:border-gray-600'}"
									>
										<div class="text-sm font-light tracking-wider text-white uppercase">
											Standard Package
										</div>
										<div class="text-xs font-thin text-gray-400">Base features included</div>
									</button>
									<button
										onclick={() => (accessory = 1)}
										class="w-full border p-3 text-left transition-all {accessory === 1
											? 'border-red-900 bg-red-900/20'
											: 'border-gray-700 hover:border-gray-600'}"
									>
										<div class="text-sm font-light tracking-wider text-white uppercase">
											Performance Package
										</div>
										<div class="text-xs font-thin text-gray-400">
											Premium upgrades • +{formatPrice(1000000)}
										</div>
									</button>
								</div>
							</div>

							<!-- Specifications (Additional Content) -->
							<div>
								<h3 class="mb-3 text-xs font-thin tracking-widest text-gray-500 uppercase">
									Current Config
								</h3>
								<div class="space-y-2 text-sm font-thin text-gray-400">
									<div class="flex justify-between">
										<span class="text-gray-500">Model:</span>
										<span class="text-white">{currentCarInfo().name}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-500">Color:</span>
										<span class="text-white">{selectedColor.name}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-500">Package:</span>
										<span class="text-white">{accessory === 1 ? 'Performance' : 'Standard'}</span>
									</div>
									<div
										class="mt-2 flex justify-between border-t border-gray-700 pt-2 font-light text-red-900"
									>
										<span>Total:</span>
										<span>{formatPrice(totalCost())}</span>
									</div>
								</div>
							</div>

							<!-- Action Buttons -->
							<div class="space-y-3 border-t border-gray-800 pt-4">
								<button
									class="flex w-full items-center justify-center gap-2 border border-red-900 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
								>
									<Download class="h-4 w-4" />
									Save Configuration
								</button>
								<div class="grid grid-cols-2 gap-3">
									<button
										class="flex items-center justify-center gap-2 border border-white py-2 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black"
									>
										<Share2 class="h-3 w-3" />
										Share
									</button>
									<a
										href="/contact"
										class="flex items-center justify-center border border-gray-700 bg-white/6 py-2 text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-gray-700"
									>
										Contact
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Desktop Layout (md and above) -->
	<div class="hidden py-8 md:block">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h1 class="text-center text-4xl font-thin text-white md:text-5xl">
				Configure Your Dream Car
			</h1>
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
							<div
								class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
							>
								<div class="flex flex-col items-center gap-4">
									<div
										class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-white"
									></div>
									<p class="text-sm font-thin text-gray-300">Loading {currentCarInfo().name}...</p>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Configurator Sections -->
				<div class="lg:col-span-1">
					<div class="flex h-full flex-col space-y-4">
						<!-- Main Configuration Sections -->
						<div class="flex-1 space-y-4">
							<!-- Vehicle Selection (Always Expanded) -->
							<AccordionSection title="Vehicle Selection" bind:isExpanded={vehicleExpanded}>
								{#snippet children()}
									<div class="space-y-3">
										{#each carOptions as car}
											<button
												onclick={() => selectCarModel(car.id)}
												class="w-full border p-4 text-left transition-all {selectedCar === car.id
													? 'border-red-900 bg-red-900/20'
													: 'border-gray-700 hover:border-gray-600'}"
											>
												<div class="text-sm font-light tracking-wider text-white uppercase">
													{car.name} - {formatPrice(car.price)}
												</div>
											</button>
										{/each}
									</div>
								{/snippet}
							</AccordionSection>

							<!-- Customization Section -->
							<AccordionSection title="Customization" bind:isExpanded={customizationExpanded}>
								{#snippet children()}
									<div class="space-y-6">
										<!-- Color Selection -->
										<div>
											<h4 class="mb-3 text-sm font-light tracking-wider text-gray-300 uppercase">
												Color
											</h4>
											<div class="grid grid-cols-2 gap-2">
												{#each colors as color}
													<button
														onclick={() => (selectedColor = color)}
														class="flex items-center gap-3 border p-3 text-left transition-all {selectedColor.name ===
														color.name
															? 'border-red-900 bg-red-900/20'
															: 'border-gray-700 hover:border-gray-600'}"
													>
														<div
															class="h-4 w-4 border border-gray-600"
															style="background-color: {color.hex}"
														></div>
														<div class="text-xs font-light tracking-wider text-white uppercase">
															{color.name}
														</div>
													</button>
												{/each}
											</div>
										</div>

										<!-- Package Selection -->
										<div>
											<h4 class="mb-3 text-sm font-light tracking-wider text-gray-300 uppercase">
												Package
											</h4>
											<div class="space-y-2">
												<button
													onclick={() => (accessory = 0)}
													class="w-full border p-3 text-left transition-all {accessory === 0
														? 'border-red-900 bg-red-900/20'
														: 'border-gray-700 hover:border-gray-600'}"
												>
													<div class="text-sm font-light tracking-wider text-white uppercase">
														Standard Package
													</div>
												</button>
												<button
													onclick={() => (accessory = 1)}
													class="w-full border p-3 text-left transition-all {accessory === 1
														? 'border-red-900 bg-red-900/20'
														: 'border-gray-700 hover:border-gray-600'}"
												>
													<div class="text-sm font-light tracking-wider text-white uppercase">
														Performance Package
													</div>
													<div class="mt-1 text-xs font-thin text-gray-400">
														+{formatPrice(1000000)}
													</div>
												</button>
											</div>
										</div>
									</div>
								{/snippet}
							</AccordionSection>

							<!-- Specifications Section -->
							<AccordionSection title="Specifications" bind:isExpanded={specsExpanded}>
								{#snippet children()}
									<div class="space-y-3 text-sm font-thin text-gray-400">
										<div class="flex justify-between">
											<span class="text-gray-500">Model:</span>
											<span class="text-white">{currentCarInfo().name}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-gray-500">Color:</span>
											<span class="text-white">{selectedColor.name}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-gray-500">Package:</span>
											<span class="text-white">{accessory === 1 ? 'Performance' : 'Standard'}</span>
										</div>
										<div class="mt-4 border-t border-gray-700 pt-3">
											<p class="text-xs text-gray-500">
												Interactive 3D viewer with drag-to-rotate controls
											</p>
										</div>
									</div>
								{/snippet}
							</AccordionSection>
						</div>

						<!-- Sticky Summary & Actions -->
						<div class="sticky bottom-0 space-y-4 bg-black/90 pt-4 backdrop-blur-sm">
							<!-- Total Cost -->
							<div class="border border-gray-800 bg-white/6 p-4">
								<div class="flex items-center justify-between">
									<span class="text-sm font-light tracking-wider text-gray-300 uppercase"
										>Total Cost</span
									>
									<div class="text-xl font-thin text-red-900">
										{formatPrice(totalCost())}
									</div>
								</div>
								<p class="mt-2 text-xs font-thin text-gray-600">
									*Final price may vary based on additional options
								</p>
							</div>

							<!-- Action Buttons -->
							<div class="space-y-2">
								<button
									class="flex w-full items-center justify-center gap-2 border border-red-900 px-4 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
								>
									<Download class="h-4 w-4" />
									Save Configuration
								</button>
								<div class="grid grid-cols-2 gap-2">
									<button
										class="flex items-center justify-center gap-2 border border-white px-3 py-2 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black"
									>
										<Share2 class="h-3 w-3" />
										Share
									</button>
									<a
										href="/contact"
										class="flex items-center justify-center border border-gray-700 bg-white/6 px-3 py-2 text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-gray-700"
									>
										Contact
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
