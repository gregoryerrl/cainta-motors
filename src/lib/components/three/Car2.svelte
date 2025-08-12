<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF } from '@threlte/extras';

	let { selectedColor = '#0000FF' }: { selectedColor?: string } = $props();

	let gltf: any = $state();

	function handleLoad(event: any) {
		gltf = event.detail;
		console.log('Car2 loaded, materials:', Object.keys(gltf.materials || {}));
	}
</script>

{#if gltf}
	<!-- We'll need to discover the actual node and material names for car2 -->
	<T.Group>
		{#each Object.entries(gltf.nodes) as [nodeName, node]}
			{#if node.geometry}
				<T.Mesh geometry={node.geometry} material={node.material} material.color={selectedColor} />
			{/if}
		{/each}
	</T.Group>
{/if}

<!-- Load the GLTF model -->
<GLTF url="/car2/car2.gltf" on:load={handleLoad} />
