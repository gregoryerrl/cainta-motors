<script lang="ts">
	import Scene from '$lib/components/three/Scene.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="h-screen w-screen bg-black">
	<Scene
		class="h-full w-full"
		scale={0.3}
		objectPosition={[0, 0, 0.6]}
		model="/honda_city_rs.glb"
		target={[0, 0, 0.16]}
	/>
</div>
