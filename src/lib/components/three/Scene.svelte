<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import ModelViewer from './ModelViewer.svelte';
	
	let { class: className = '' } = $props();
</script>

<div class="{className} relative" style="touch-action: none;">
	<Canvas>
		{@const _ = interactivity()}
		<ModelViewer />
	</Canvas>
</div>

<style>
	div :global(canvas) {
		touch-action: none;
		cursor: grab;
	}
	
	div :global(canvas:active) {
		cursor: grabbing;
	}
</style>