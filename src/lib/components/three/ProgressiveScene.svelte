<script lang="ts">
	import { onMount } from 'svelte';
	import LazyScene from './LazyScene.svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		lightModel = '',
		heavyModel = '',
		target = [0, 0, 0],
		priority = false,
		selectedColor = '#ffffff',
		enableZoom = false,
		upgradeDelay = 3000 // Delay before loading heavy model (ms)
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		lightModel?: string;
		heavyModel?: string;
		target?: [number, number, number];
		priority?: boolean;
		selectedColor?: string;
		enableZoom?: boolean;
		upgradeDelay?: number;
	} = $props();

	let currentModel = $state(lightModel);
	let isUpgrading = $state(false);

	onMount(() => {
		// If we have both models, start with the light one
		if (lightModel && heavyModel) {
			currentModel = lightModel;
			
			// Upgrade to heavy model after delay
			setTimeout(() => {
				isUpgrading = true;
				// Smooth transition to heavy model
				setTimeout(() => {
					currentModel = heavyModel;
					isUpgrading = false;
				}, 100);
			}, upgradeDelay);
		} else {
			// If only one model, use it directly
			currentModel = heavyModel || lightModel;
		}
	});
</script>

<div class={className}>
	{#if currentModel}
		<div class="relative h-full w-full {isUpgrading ? 'opacity-90' : 'opacity-100'} transition-opacity duration-200">
			<LazyScene
				class="h-full w-full"
				model={currentModel}
				{scale}
				{objectPosition}
				{target}
				{selectedColor}
				{priority}
				{enableZoom}
			/>
			
			{#if isUpgrading}
				<div class="absolute bottom-4 right-4">
					<div class="flex items-center gap-2 bg-black/80 px-3 py-2 text-xs font-thin tracking-wider text-white">
						<div class="h-2 w-2 animate-pulse rounded-full bg-red-900"></div>
						UPGRADING MODEL
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>