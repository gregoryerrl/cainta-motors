<script lang="ts">
	import type { PageData } from './$types';
	import Scene from '$lib/components/three/Scene.svelte';
	import { Check, ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const { vehicle } = data;

	let currentImageIndex = $state(0);
	let selectedColor = $state(vehicle.colors[0]);
	let showSpecs = $state(false);

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

<section class="min-h-screen bg-black">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<nav class="mb-8">
			<a href="/models" class="text-gray-400 hover:text-white"> ← Back to Models </a>
		</nav>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div>
				<div class="sticky top-24">
					<h1 class="text-4xl font-bold text-white md:text-5xl">
						{vehicle.brand}
						{vehicle.model}
					</h1>
					<p class="mt-2 text-2xl text-gray-400">{vehicle.variant}</p>

					<div class="mt-8">
						<p class="text-sm text-gray-500">Starting from</p>
						<p class="text-4xl font-bold text-white">{formatPrice(vehicle.price)}</p>
					</div>

					<div class="mt-8">
						<h3 class="mb-4 text-lg font-semibold text-white">Available Colors</h3>
						<div class="flex gap-3">
							{#each vehicle.colors as color}
								<button
									onclick={() => (selectedColor = color)}
									class="relative h-12 w-12 rounded-full border-2 transition-all {selectedColor.hex ===
									color.hex
										? 'scale-110 border-red-600'
										: 'border-gray-600'}"
									style="background-color: {color.hex}"
									title={color.name}
								>
									{#if selectedColor.hex === color.hex}
										<Check
											class="absolute inset-0 m-auto h-6 w-6 {color.hex === '#000000' ||
											color.hex === '#4a4a4a'
												? 'text-white'
												: 'text-black'}"
										/>
									{/if}
								</button>
							{/each}
						</div>
						<p class="mt-2 text-sm text-gray-400">{selectedColor.name}</p>
					</div>

					<div class="mt-8">
						<h3 class="mb-4 text-lg font-semibold text-white">Key Features</h3>
						<ul class="grid grid-cols-1 gap-2">
							{#each vehicle.features.slice(0, 6) as feature}
								<li class="flex items-center gap-2 text-gray-300">
									<Check class="h-4 w-4 text-green-500" />
									{feature}
								</li>
							{/each}
						</ul>
					</div>

					<div class="mt-8 flex gap-4">
						<a
							href="/configurator"
							class="flex-1 rounded-full bg-red-600 px-6 py-3 text-center font-medium text-white transition-all hover:bg-red-700"
						>
							Configure
						</a>
						<a
							href="/contact"
							class="flex-1 rounded-full border-2 border-white px-6 py-3 text-center font-medium text-white transition-all hover:bg-white hover:text-black"
						>
							Test Drive
						</a>
					</div>
				</div>
			</div>

			<div class="space-y-8">
				{#if vehicle.modelPath}
					<div class="aspect-video overflow-hidden rounded-lg bg-white/6">
						<Scene class="h-full w-full" />
					</div>
				{/if}

				<div class="relative aspect-video overflow-hidden rounded-lg bg-white/6">
					<img
						src={vehicle.images[currentImageIndex]}
						alt="{vehicle.brand} {vehicle.model}"
						class="h-full w-full object-cover"
					/>

					{#if vehicle.images.length > 1}
						<button
							onclick={prevImage}
							class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20"
						>
							<ChevronLeft class="h-6 w-6 text-white" />
						</button>
						<button
							onclick={nextImage}
							class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20"
						>
							<ChevronRight class="h-6 w-6 text-white" />
						</button>
					{/if}
				</div>

				<div class="grid grid-cols-4 gap-2">
					{#each vehicle.images as image, index}
						<button
							onclick={() => (currentImageIndex = index)}
							class="aspect-video overflow-hidden rounded-lg {currentImageIndex === index
								? 'ring-2 ring-red-600'
								: 'opacity-60 hover:opacity-100'}"
						>
							<img src={image} alt="Thumbnail {index + 1}" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-16">
			<button
				onclick={() => (showSpecs = !showSpecs)}
				class="mb-8 rounded-full bg-white/6 px-6 py-3 text-white hover:bg-gray-700"
			>
				{showSpecs ? 'Hide' : 'Show'} Specifications
			</button>

			{#if showSpecs}
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div class="rounded-lg bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-semibold text-white">Engine</h3>
						<dl class="space-y-2">
							<div>
								<dt class="text-sm text-gray-500">Type</dt>
								<dd class="text-white">{vehicle.specifications.engine}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Power</dt>
								<dd class="text-white">{vehicle.specifications.power}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Torque</dt>
								<dd class="text-white">{vehicle.specifications.torque}</dd>
							</div>
						</dl>
					</div>

					<div class="rounded-lg bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-semibold text-white">Transmission</h3>
						<dl class="space-y-2">
							<div>
								<dt class="text-sm text-gray-500">Type</dt>
								<dd class="text-white">{vehicle.specifications.transmission}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Drivetrain</dt>
								<dd class="text-white">{vehicle.specifications.drivetrain}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Fuel Type</dt>
								<dd class="text-white">{vehicle.specifications.fuelType}</dd>
							</div>
						</dl>
					</div>

					<div class="rounded-lg bg-white/6 p-6">
						<h3 class="mb-4 text-lg font-semibold text-white">Dimensions</h3>
						<dl class="space-y-2">
							<div>
								<dt class="text-sm text-gray-500">Length</dt>
								<dd class="text-white">{vehicle.specifications.dimensions.length}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Width</dt>
								<dd class="text-white">{vehicle.specifications.dimensions.width}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500">Height</dt>
								<dd class="text-white">{vehicle.specifications.dimensions.height}</dd>
							</div>
						</dl>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
