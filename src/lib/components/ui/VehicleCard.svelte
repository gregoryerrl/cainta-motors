<script lang="ts">
	import type { Vehicle } from '$lib/data/vehicles';
	import { ArrowRight } from 'lucide-svelte';
	import LazyScene from '$lib/components/three/LazyScene.svelte';
	import { onMount } from 'svelte';

	interface Props {
		vehicle: Vehicle;
		forceDisable3D?: boolean;
	}

	let { vehicle, forceDisable3D = false }: Props = $props();

	let selectedColor = $state(
		vehicle.colors.find((c) => c.hex === '#000000') ||
			vehicle.colors.find((c) => c.hex.toLowerCase().includes('black')) ||
			vehicle.colors[0]
	);
	let showColorPicker = $state(false);
	let isMobile = $state(false);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 0
		}).format(price);
	};

	onMount(() => {
		// Detect mobile devices for performance optimization
		isMobile = window.innerWidth < 768;

		const handleResize = () => {
			isMobile = window.innerWidth < 768;
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Show 3D model only if not mobile (or not forced disabled) and vehicle supports it
	let show3DModel = $derived(
		!forceDisable3D && !isMobile && vehicle.has3DModel && vehicle.modelPath
	);
</script>

<article
	class="group relative border border-gray-800 bg-black transition-all hover:border-gray-600"
>
	<div class="relative aspect-[4/3] overflow-hidden">
		{#if show3DModel}
			<!-- 3D Model Viewer -->
			<div class="h-full w-full bg-black">
				<LazyScene
					class="h-full w-full"
					model={vehicle.modelPath}
					scale={vehicle.modelScale || 1}
					objectPosition={vehicle.modelPosition || [4, 2, 4]}
					target={vehicle.modelTarget || [0, 0, 0]}
					selectedColor={selectedColor.hex}
					priority={true}
					enableZoom={false}
				/>
			</div>
		{:else}
			<!-- Regular Image -->
			<img
				src={vehicle.image}
				alt="{vehicle.brand} {vehicle.model} {vehicle.variant}"
				class="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-80"
				loading="lazy"
			/>
		{/if}

		<!-- 3D Model Badge -->
		<div class="absolute top-3 right-3">
			{#if vehicle.has3DModel}
				<div
					class="flex items-center gap-1 bg-red-900/80 px-2 py-1 text-xs font-thin tracking-wider text-white"
				>
					<svg
						class="h-3 w-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					3D
				</div>
			{:else}
				<div
					class="flex items-center gap-1 bg-gray-700/80 px-2 py-1 text-xs font-thin tracking-wider text-gray-300"
				>
					<svg
						class="h-3 w-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clip-rule="evenodd"
						></path>
					</svg>
					PHOTOS
				</div>
			{/if}
		</div>

		<!-- Color Picker for supported models (only show when 3D model is active) -->
		{#if show3DModel && vehicle.supportsColorChange && vehicle.colors.length > 0}
			<div class="absolute bottom-3 left-3">
				<button
					onclick={() => (showColorPicker = !showColorPicker)}
					class="flex items-center gap-2 bg-black/80 px-3 py-2 text-xs font-thin tracking-wider text-white transition-all hover:bg-black/90"
				>
					<div
						class="h-3 w-3 rounded-full border border-gray-400"
						style="background-color: {selectedColor.hex}"
					></div>
					{selectedColor.name}
				</button>

				{#if showColorPicker}
					<div class="absolute bottom-full left-0 mb-2 border border-gray-700 bg-black/90 p-3">
						<div class="grid grid-cols-2 gap-2">
							{#each vehicle.colors as color}
								<button
									onclick={() => {
										selectedColor = color;
										showColorPicker = false;
									}}
									class="flex items-center gap-2 px-2 py-1 text-xs font-thin text-white transition-all hover:bg-white/10 {selectedColor.hex ===
									color.hex
										? 'bg-red-900/20'
										: ''}"
								>
									<div
										class="h-3 w-3 rounded-full border border-gray-400"
										style="background-color: {color.hex}"
									></div>
									<span class="truncate">{color.name}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="p-6">
		<div class="mb-2 text-xs font-light tracking-widest text-red-900">
			{vehicle.category.toUpperCase()}
		</div>
		<h3 class="text-xl font-thin text-white">
			{vehicle.brand}
			{vehicle.model}
		</h3>
		<p class="text-sm font-thin text-gray-500">{vehicle.variant}</p>

		<div class="mt-6 flex items-end justify-between">
			<div>
				<p class="text-xs font-thin text-gray-600">Starting from</p>
				<p class="text-2xl font-thin text-white">{formatPrice(vehicle.price)}</p>
			</div>

			<a
				href="/models/{vehicle.slug}"
				class="flex items-center gap-2 text-xs font-light tracking-wider text-gray-500 transition-colors hover:text-white"
			>
				VIEW DETAILS
				<ArrowRight class="h-3 w-3" />
			</a>
		</div>
	</div>
</article>
