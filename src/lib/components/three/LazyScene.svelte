<script lang="ts">
	import { onMount } from 'svelte';
	import Scene from './Scene.svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0],
		placeholder = true,
		priority = false,
		selectedColor = '#ffffff',
		materialColors = {},
		onMaterialsLoaded
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		model?: string;
		target?: [number, number, number];
		placeholder?: boolean;
		priority?: boolean;
		selectedColor?: string;
		materialColors?: Record<string, string>;
		onMaterialsLoaded?: (materials: string[]) => void;
	} = $props();

	let isVisible = $state(priority);
	let container: HTMLDivElement;

	onMount(() => {
		// If priority, load immediately
		if (priority) {
			isVisible = true;
			return;
		}

		// Set up Intersection Observer for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						observer.disconnect();
					}
				});
			},
			{
				// Start loading when element is 200px away from viewport
				rootMargin: '200px',
				threshold: 0.01
			}
		);

		if (container) {
			observer.observe(container);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={container} class={className}>
	{#if isVisible}
		<Scene {scale} {objectPosition} {model} {target} {selectedColor} {materialColors} {onMaterialsLoaded} class={className} />
	{:else if placeholder}
		<!-- Placeholder while not loaded -->
		<div class="flex h-full w-full animate-pulse items-center justify-center bg-white/6">
			<div class="text-center">
				<div
					class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"
				></div>
				<p class="text-xs font-thin tracking-widest text-gray-500 uppercase">3D Model Loading</p>
			</div>
		</div>
	{/if}
</div>
