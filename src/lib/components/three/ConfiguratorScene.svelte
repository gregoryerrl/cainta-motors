<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import ConfiguratorModelViewer from './ConfiguratorModelViewer.svelte';
	import { onMount } from 'svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0],
		selectedColor = '#ffffff',
		accessory = 0
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		model?: string;
		target?: [number, number, number];
		selectedColor?: string;
		accessory?: number;
	} = $props();

	let containerElement: HTMLDivElement;

	// Prevent wheel events from propagating to page scroll
	function handleWheel(event: WheelEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	onMount(() => {
		if (containerElement) {
			// Prevent wheel events directly on the container
			containerElement.addEventListener('wheel', handleWheel, { passive: false });
			
			return () => {
				containerElement.removeEventListener('wheel', handleWheel);
			};
		}
	});
</script>

<div 
	bind:this={containerElement}
	class="{className} relative" 
	style="touch-action: none;"
	role="application"
>
	<Canvas>
		{@const _ = interactivity()}
		<ConfiguratorModelViewer {scale} {objectPosition} {model} {target} {selectedColor} {accessory} />
	</Canvas>
</div>

<style>
	div :global(canvas) {
		touch-action: none;
		cursor: grab;
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: auto;
	}

	div :global(canvas:active) {
		cursor: grabbing;
	}
</style>