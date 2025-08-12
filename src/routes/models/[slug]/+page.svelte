<script lang="ts">
	import type { PageData } from './$types';
	import LazyScene from '$lib/components/three/LazyScene.svelte';
	import NoModelScene from '$lib/components/three/NoModelScene.svelte';
	import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const { vehicle } = data;

	let currentImageIndex = $state(0);
	let selectedColor = $state(vehicle.colors[0]);
	let showSpecs = $state(false);
	let isModelLoading = $state(false);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 0
		}).format(price);
	};

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % vehicle.images.length;
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + vehicle.images.length) % vehicle.images.length;
	}
</script>

<svelte:head>
	<title>{vehicle.brand} {vehicle.model} {vehicle.variant} - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-20">
	<!-- Back Navigation -->
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<a
			href="/models"
			class="inline-flex items-center gap-2 text-xs font-thin tracking-widest text-gray-500 uppercase transition-colors hover:text-white"
		>
			<ArrowLeft class="h-3 w-3" />
			Back to Models
		</a>
	</div>

	<!-- Hero Section -->
	<div class="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-5xl font-thin tracking-wider text-white md:text-7xl">
				{vehicle.brand}
				{vehicle.model}
			</h1>
			<p class="mt-4 text-2xl font-thin tracking-widest text-gray-500 uppercase">
				{vehicle.variant}
			</p>
			<div class="mt-8">
				<p class="text-xs font-thin tracking-widest text-gray-600 uppercase">Starting from</p>
				<p class="mt-2 text-4xl font-thin text-red-900">{formatPrice(vehicle.price)}</p>
			</div>
		</div>
	</div>

	<!-- Main Content Grid -->
	<div class="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<!-- Left Column - 3D Model and Gallery -->
			<div class="space-y-8">
				<div class="relative aspect-video overflow-hidden border border-gray-800 bg-white/6">
					{#if vehicle.has3DModel && vehicle.modelPath}
						<LazyScene
							class="h-full w-full"
							model={vehicle.modelPath}
							scale={vehicle.modelScale || 1}
							objectPosition={vehicle.modelPosition || [4, 2, 4]}
							target={vehicle.modelTarget || [0, 0, 0]}
							selectedColor={selectedColor.hex}
							priority={true}
							enableZoom={true}
						/>
					{:else}
						<NoModelScene class="h-full w-full" />
					{/if}
				</div>

				<!-- Main Image Display -->
				<div class="group relative aspect-video overflow-hidden border border-gray-800 bg-white/6">
					<img
						src={vehicle.images[currentImageIndex]}
						alt="{vehicle.brand} {vehicle.model}"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>

					{#if vehicle.images.length > 1}
						<button
							onclick={prevImage}
							class="absolute top-1/2 left-4 -translate-y-1/2 border border-gray-700 bg-black/50 p-3 backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-black/70"
						>
							<ChevronLeft class="h-4 w-4 text-white" />
						</button>
						<button
							onclick={nextImage}
							class="absolute top-1/2 right-4 -translate-y-1/2 border border-gray-700 bg-black/50 p-3 backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-black/70"
						>
							<ChevronRight class="h-4 w-4 text-white" />
						</button>
					{/if}

					<!-- Image Counter -->
					<div
						class="absolute right-4 bottom-4 border border-gray-700 bg-black/50 px-3 py-1 backdrop-blur-sm"
					>
						<span class="text-xs font-thin text-gray-300">
							{currentImageIndex + 1} / {vehicle.images.length}
						</span>
					</div>
				</div>

				<!-- Thumbnail Grid -->
				<div class="grid grid-cols-4 gap-2">
					{#each vehicle.images as image, index}
						<button
							onclick={() => (currentImageIndex = index)}
							class="aspect-video overflow-hidden border transition-all {currentImageIndex === index
								? 'border-red-900 opacity-100'
								: 'border-gray-800 opacity-40 hover:opacity-70'}"
						>
							<img src={image} alt="Thumbnail {index + 1}" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			</div>

			<!-- Right Column - Details -->
			<div class="space-y-12">
				<!-- Color Selection -->
				<div>
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">
						Exterior Color
					</h3>
					<div class="flex gap-4">
						{#each vehicle.colors as color}
							<button
								onclick={() => (selectedColor = color)}
								class="relative h-14 w-14 border-2 transition-all {selectedColor.hex === color.hex
									? 'scale-110 border-red-900'
									: 'border-gray-700 hover:border-gray-600'}"
								style="background-color: {color.hex}"
								title={color.name}
							>
								{#if selectedColor.hex === color.hex}
									<div class="absolute inset-0 flex items-center justify-center">
										<div
											class="h-2 w-2 rounded-full {color.hex === '#000000' ||
											color.hex === '#4a4a4a'
												? 'bg-white'
												: 'bg-black'}"
										></div>
									</div>
								{/if}
							</button>
						{/each}
					</div>
					<p class="mt-4 text-sm font-thin text-gray-400">{selectedColor.name}</p>
				</div>

				<!-- Key Features -->
				<div>
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">
						Key Features
					</h3>
					<div class="grid grid-cols-1 gap-4">
						{#each vehicle.features.slice(0, 6) as feature}
							<div class="group flex items-start gap-3">
								<div class="mt-2 h-1 w-1 bg-red-900 transition-colors group-hover:bg-red-800"></div>
								<span
									class="text-sm font-thin text-gray-300 transition-colors group-hover:text-white"
								>
									{feature}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="space-y-4 border-t border-gray-800 pt-8">
					<a
						href="/configurator"
						class="block w-full border border-red-900 px-8 py-4 text-center text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
					>
						Configure Your {vehicle.model}
					</a>
					<a
						href="/contact"
						class="block w-full border border-gray-700 px-8 py-4 text-center text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-white/5"
					>
						Schedule Test Drive
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Specifications Section -->
	<div class="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<button
				onclick={() => (showSpecs = !showSpecs)}
				class="inline-flex items-center gap-2 border border-gray-700 px-8 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-white/5"
			>
				{showSpecs ? 'Hide' : 'View'} Technical Specifications
			</button>
		</div>

		{#if showSpecs}
			<div class="grid grid-cols-1 gap-px border border-gray-800 bg-gray-800 md:grid-cols-3">
				<!-- Engine Specs -->
				<div class="bg-black p-8">
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">
						Performance
					</h3>
					<dl class="space-y-4">
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Engine</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">{vehicle.specifications.engine}</dd>
						</div>
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Power Output</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">{vehicle.specifications.power}</dd>
						</div>
						<div>
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Torque</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">{vehicle.specifications.torque}</dd>
						</div>
					</dl>
				</div>

				<!-- Drivetrain Specs -->
				<div class="bg-black p-8">
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">Drivetrain</h3>
					<dl class="space-y-4">
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Transmission</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.transmission}
							</dd>
						</div>
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Drive Type</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.drivetrain}
							</dd>
						</div>
						<div>
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Fuel Type</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.fuelType}
							</dd>
						</div>
					</dl>
				</div>

				<!-- Dimensions -->
				<div class="bg-black p-8">
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">Dimensions</h3>
					<dl class="space-y-4">
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Length</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.dimensions.length}
							</dd>
						</div>
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Width</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.dimensions.width}
							</dd>
						</div>
						<div>
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Height</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.dimensions.height}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<!-- Additional Specs -->
			<div class="mt-px grid grid-cols-1 gap-px border border-gray-800 bg-gray-800 md:grid-cols-2">
				<div class="bg-black p-8">
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">Capacity</h3>
					<dl class="space-y-4">
						<div class="border-b border-gray-800 pb-4">
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Seating</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.seatingCapacity} Passengers
							</dd>
						</div>
						<div>
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Fuel Tank</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.fuelCapacity}
							</dd>
						</div>
					</dl>
				</div>

				<div class="bg-black p-8">
					<h3 class="mb-6 text-xs font-thin tracking-widest text-gray-500 uppercase">Wheelbase</h3>
					<dl class="space-y-4">
						<div>
							<dt class="text-xs font-thin tracking-wider text-gray-600 uppercase">Distance</dt>
							<dd class="mt-1 text-sm font-thin text-gray-300">
								{vehicle.specifications.dimensions.wheelbase}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom CTA -->
	<div class="mx-auto mt-24 max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<div class="border border-gray-800 bg-white/6 p-12">
			<h2 class="text-2xl font-thin tracking-wider text-white">Ready to Experience Excellence?</h2>
			<p class="mx-auto mt-4 max-w-2xl text-sm font-thin text-gray-500">
				Visit our showroom to see the {vehicle.brand}
				{vehicle.model}
				{vehicle.variant} in person, or contact our team for a personalized consultation.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
				<a
					href="/contact"
					class="inline-block border border-red-900 px-8 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
				>
					Contact Sales Team
				</a>
				<a
					href="/models"
					class="inline-block border border-gray-700 px-8 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:border-gray-600 hover:bg-white/5"
				>
					Explore Other Models
				</a>
			</div>
		</div>
	</div>
</section>
