<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import ModelViewer from './ModelViewer.svelte';
	import { onMount } from 'svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0],
		selectedColor = '#ffffff',
		materialColors = {},
		onMaterialsLoaded,
		enableZoom = false
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		model?: string;
		target?: [number, number, number];
		selectedColor?: string;
		materialColors?: Record<string, string>;
		onMaterialsLoaded?: (materials: string[]) => void;
		enableZoom?: boolean;
	} = $props();

	let containerElement: HTMLDivElement;

	// Prevent wheel events from propagating to page scroll when zooming is enabled
	function handleWheel(event: WheelEvent) {
		if (enableZoom) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	// Handle touch events for mobile zoom prevention
	function handleTouchMove(event: TouchEvent) {
		if (enableZoom && event.touches.length === 2) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	onMount(() => {
		if (containerElement && enableZoom) {
			// Desktop wheel events
			containerElement.addEventListener('wheel', handleWheel, { passive: false });
			// Mobile touch events
			containerElement.addEventListener('touchmove', handleTouchMove, { passive: false });

			return () => {
				containerElement.removeEventListener('wheel', handleWheel);
				containerElement.removeEventListener('touchmove', handleTouchMove);
			};
		}
	});
</script>

<div bind:this={containerElement} class="{className} relative" style="touch-action: none;">
	<Canvas
		rendererParameters={{
			antialias: true,
			alpha: true,
			physicallyCorrectLights: true,
			toneMapping: 'neutral',
			toneMappingExposure: 1.0
		}}
		colorManagementEnabled={true}
	>
		{@const _ = interactivity()}
		<ModelViewer {scale} {objectPosition} {model} {target} {selectedColor} {materialColors} {onMaterialsLoaded} {enableZoom} />
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
