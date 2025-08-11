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
	let lastTouchDistance = 0;
	let initialTouchDistance = 0;

	// Prevent wheel events from propagating to page scroll
	function handleWheel(event: WheelEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	// Calculate distance between two touch points
	function getTouchDistance(touches: TouchList): number {
		if (touches.length < 2) return 0;
		const touch1 = touches[0];
		const touch2 = touches[1];
		return Math.sqrt(
			Math.pow(touch2.clientX - touch1.clientX, 2) + 
			Math.pow(touch2.clientY - touch1.clientY, 2)
		);
	}

	// Handle touch start for pinch gestures
	function handleTouchStart(event: TouchEvent) {
		if (event.touches.length === 2) {
			event.preventDefault();
			initialTouchDistance = getTouchDistance(event.touches);
			lastTouchDistance = initialTouchDistance;
		}
	}

	// Handle touch move for pinch zoom
	function handleTouchMove(event: TouchEvent) {
		if (event.touches.length === 2) {
			event.preventDefault();
			event.stopPropagation();
			
			const currentDistance = getTouchDistance(event.touches);
			if (initialTouchDistance > 0) {
				const scale = currentDistance / lastTouchDistance;
				
				// Create a synthetic wheel event for OrbitControls
				const syntheticEvent = new WheelEvent('wheel', {
					deltaY: scale > 1 ? -100 : 100, // Negative for zoom in, positive for zoom out
					bubbles: true,
					cancelable: true
				});
				
				containerElement?.dispatchEvent(syntheticEvent);
				lastTouchDistance = currentDistance;
			}
		}
	}

	// Handle touch end
	function handleTouchEnd(event: TouchEvent) {
		if (event.touches.length < 2) {
			initialTouchDistance = 0;
			lastTouchDistance = 0;
		}
	}

	onMount(() => {
		if (containerElement) {
			// Desktop wheel events
			containerElement.addEventListener('wheel', handleWheel, { passive: false });
			
			// Mobile touch events for pinch zoom
			containerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
			containerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
			containerElement.addEventListener('touchend', handleTouchEnd, { passive: false });
			
			return () => {
				containerElement.removeEventListener('wheel', handleWheel);
				containerElement.removeEventListener('touchstart', handleTouchStart);
				containerElement.removeEventListener('touchmove', handleTouchMove);
				containerElement.removeEventListener('touchend', handleTouchEnd);
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