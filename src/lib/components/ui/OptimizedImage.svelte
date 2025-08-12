<script lang="ts">
	import { onMount } from 'svelte';

	let {
		src,
		alt,
		class: className = '',
		loading = 'lazy',
		width,
		height,
		sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
	}: {
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		width?: number;
		height?: number;
		sizes?: string;
	} = $props();

	let imageElement: HTMLImageElement = $state();
	let isLoaded = $state(false);
	let hasError = $state(false);
	let supportsWebP = $state(false);

	// Check WebP support
	onMount(() => {
		const webPTest = new Image();
		webPTest.onload = webPTest.onerror = () => {
			supportsWebP = webPTest.height === 2;
		};
		webPTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	});

	// Generate responsive image sources
	const getImageSrc = (originalSrc: string, webp: boolean = false) => {
		if (webp && supportsWebP) {
			// Convert extension to .webp if supported
			return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
		}
		return originalSrc;
	};

	const handleLoad = () => {
		isLoaded = true;
	};

	const handleError = () => {
		hasError = true;
		isLoaded = true;
	};
</script>

<div class="relative {className}">
	{#if !isLoaded}
		<!-- Loading placeholder with blur effect -->
		<div class="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900">
			<div class="flex h-full items-center justify-center">
				<div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-gray-400"></div>
			</div>
		</div>
	{/if}

	{#if !hasError}
		<picture>
			{#if supportsWebP}
				<source srcset={getImageSrc(src, true)} type="image/webp" {sizes} />
			{/if}
			<img
				bind:this={imageElement}
				src={getImageSrc(src)}
				{alt}
				{loading}
				{width}
				{height}
				class="h-full w-full object-cover transition-all duration-500 {isLoaded ? 'opacity-100' : 'opacity-0'} {className}"
				onload={handleLoad}
				onerror={handleError}
			/>
		</picture>
	{:else}
		<!-- Error fallback -->
		<div class="flex h-full w-full items-center justify-center bg-gray-900">
			<div class="text-center">
				<svg class="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<p class="mt-2 text-xs font-thin text-gray-500">Image unavailable</p>
			</div>
		</div>
	{/if}
</div>