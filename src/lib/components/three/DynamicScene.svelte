<script lang="ts">
	import { onMount } from 'svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0],
		priority = false,
		selectedColor = '#ffffff',
		enableZoom = false
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		model?: string;
		target?: [number, number, number];
		priority?: boolean;
		selectedColor?: string;
		enableZoom?: boolean;
	} = $props();

	let SceneComponent: any = null;
	let isLoading = $state(true);

	onMount(async () => {
		try {
			// Dynamically import the LazyScene component
			const module = await import('./LazyScene.svelte');
			SceneComponent = module.default;
			isLoading = false;
		} catch (error) {
			console.error('Failed to load 3D scene component:', error);
			isLoading = false;
		}
	});
</script>

<div class={className}>
	{#if isLoading}
		<!-- Loading placeholder -->
		<div class="flex h-full w-full animate-pulse items-center justify-center bg-white/6">
			<div class="text-center">
				<div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"></div>
				<p class="text-xs font-thin tracking-widest text-gray-500 uppercase">Loading 3D Engine</p>
			</div>
		</div>
	{:else if SceneComponent}
		<svelte:component
			this={SceneComponent}
			class="h-full w-full"
			{model}
			{scale}
			{objectPosition}
			{target}
			{selectedColor}
			{priority}
			{enableZoom}
		/>
	{:else}
		<!-- Fallback if loading fails -->
		<div class="flex h-full w-full items-center justify-center bg-white/6">
			<p class="text-xs font-thin tracking-widest text-gray-500 uppercase">3D Unavailable</p>
		</div>
	{/if}
</div>