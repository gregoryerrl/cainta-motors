<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import ModelViewer from './ModelViewer.svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0],
		selectedColor = '#ffffff',
		materialColors = {},
		onMaterialsLoaded
	}: {
		class?: string;
		scale?: number;
		objectPosition?: [number, number, number];
		model?: string;
		target?: [number, number, number];
		selectedColor?: string;
		materialColors?: Record<string, string>;
		onMaterialsLoaded?: (materials: string[]) => void;
	} = $props();
</script>

<div class="{className} relative" style="touch-action: none;">
	<Canvas>
		{@const _ = interactivity()}
		<ModelViewer {scale} {objectPosition} {model} {target} {selectedColor} {materialColors} {onMaterialsLoaded} />
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
