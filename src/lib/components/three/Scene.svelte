<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import ModelViewer from './ModelViewer.svelte';

	let {
		class: className = '',
		scale = 0.5,
		objectPosition = [0, 0, 0],
		model = '',
		target = [0, 0, 0]
	} = $props();
</script>

<div class="{className} relative" style="touch-action: none;">
	<Canvas>
		{@const _ = interactivity()}
		<ModelViewer {scale} {objectPosition} {model} {target} />
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
